import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool)

export const user = pgTable('user', { id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull(), emailVerified: boolean('emailVerified').notNull(), image: text('image'), createdAt: timestamp('createdAt').notNull(), updatedAt: timestamp('updatedAt').notNull() })
export const libraryItem = pgTable('library_item', { id: text('id').primaryKey(), userId: text('userId').notNull(), kind: text('kind').notNull(), videoId: text('videoId').notNull(), title: text('title').notNull(), channelTitle: text('channelTitle'), thumbnailUrl: text('thumbnailUrl'), createdAt: timestamp('createdAt').notNull() })
export const subscription = pgTable('subscription', { id: text('id').primaryKey(), userId: text('userId').notNull(), channelId: text('channelId').notNull(), channelTitle: text('channelTitle').notNull(), createdAt: timestamp('createdAt').notNull() })
