import { auth } from '@/lib/auth'
import { db, libraryItem } from '@/lib/db'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const createItemSchema = z.object({
  kind: z.enum(['history', 'favorite', 'playlist']),
  videoId: z.string().trim().min(1).max(128),
  title: z.string().trim().min(1).max(300),
  channelTitle: z.string().trim().max(200).optional(),
  thumbnailUrl: z.string().url().max(2048).optional(),
})

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? null
}

export async function GET(request: Request) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const kind = new URL(request.url).searchParams.get('kind')
  const items = await db
    .select()
    .from(libraryItem)
    .where(kind ? and(eq(libraryItem.userId, userId), eq(libraryItem.kind, kind)) : eq(libraryItem.userId, userId))
    .orderBy(desc(libraryItem.createdAt))
    .limit(100)

  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = createItemSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid library item' }, { status: 400 })

  const item = {
    id: crypto.randomUUID(),
    userId,
    ...parsed.data,
    createdAt: new Date(),
  }
  await db.insert(libraryItem).values(item)
  return NextResponse.json({ item }, { status: 201 })
}
