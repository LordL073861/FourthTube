import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ service: 'youtube-3ds-next', version: 'v1', status: 'ok' })
}
