import { auth } from '@/lib/auth'
import { db, subscription } from '@/lib/db'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const subscriptionSchema = z.object({
  channelId: z.string().trim().min(1).max(128),
  channelTitle: z.string().trim().min(1).max(200),
})

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? null
}

export async function GET() {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await db.select().from(subscription).where(eq(subscription.userId, userId)).orderBy(desc(subscription.createdAt))
  return NextResponse.json({ subscriptions: items })
}

export async function POST(request: Request) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const parsed = subscriptionSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 })

  const item = { id: crypto.randomUUID(), userId, ...parsed.data, createdAt: new Date() }
  await db.insert(subscription).values(item)
  return NextResponse.json({ subscription: item }, { status: 201 })
}
