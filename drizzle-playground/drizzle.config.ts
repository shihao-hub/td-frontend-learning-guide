import { defineConfig } from 'drizzle-kit'

// drizzle-kit 配置：generate 生成迁移 SQL / push 直接同步表结构 / studio 可视化
export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './drizzle', // 迁移文件目录
  dbCredentials: { url: './dev.db' },
})
