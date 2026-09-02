// 数据库客户端：better-sqlite3（本地文件 dev.db）+ drizzle 包装
// creativault 用的是 postgres 驱动，但 drizzle API 90% 一致——切换只改这一文件

import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

export const sqlite = new Database('dev.db')
sqlite.pragma('journal_mode = WAL') // SQLite 性能常识：WAL 模式
sqlite.pragma('foreign_keys = ON') // SQLite 默认不强制外键，要手动开

// 把 schema 传进去，解锁 db.query.xxx 关系查询（04 演示）
export const db = drizzle(sqlite, { schema })
