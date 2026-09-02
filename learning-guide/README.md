# 前端全栈学习指南

> 面向后端开发者（Python/FastAPI）转向全栈开发的系统化学习路径

## 📚 学习路线图

```
第1阶段（1-2周）    第2阶段（2-3周）    第3阶段（2-3周）    第4阶段（2-3周）    第5-6阶段（持续）
─────────────────  ─────────────────  ─────────────────  ─────────────────  ─────────────────
TypeScript 基础   →  React 19 核心   →  Next.js 16     →  项目技术栈      →  架构理解+实战
- ES6+ 语法         - 组件化思想        - App Router      - Tailwind CSS     - BFF 模式
- 类型系统          - Hooks             - Server/Client   - Radix UI         - Monorepo
- 异步编程          - 状态管理          - Server Actions  - Zustand          - 代码复用
                   - 事件处理          - 数据获取        - 表单+校验        - 项目实战
                                                        - 国际化
```

## 🎯 学习优先级映射（P0-P3）

> 01-06 目录是**知识分类**，下表是**学习顺序**（按项目实际使用频率排优先级），两者正交。核心技术关系一句话：TypeScript 是前提，React + Next.js 是主角，Node.js 只需基础概念不必系统学；Next.js 一个框架同时干了页面渲染（前端）+ API Route/BFF 中间层（服务端），"前端里的前后端"分界线就是 RSC vs `'use client'`。

| 优先级 | 技术 | 学到什么程度 | 对应目录 | 周次 |
|---|---|---|---|---|
| **P0** | TypeScript | 类型注解、接口/泛型、类型推断（strict 模式） | [01-基础知识](./01-基础知识/) | W1-2 |
| **P0** | React 19 | 函数组件 + Hooks（useState/useEffect/useMemo/useCallback）、props、组件组合 | [02-React核心](./02-React核心/) | W3-4 |
| **P0** | Next.js App Router | **RSC vs `'use client'` 边界（本项目架构的钥匙）**、`app/` 目录路由、文件约定（page/layout/error） | [03-NextJS实战](./03-NextJS实战/) | W5-6 |
| **P0** | Tailwind CSS | 能看懂和写 utility class | [04-项目技术栈](./04-项目技术栈/) | W5-6 随用随学 |
| **P1** | Zustand | 客户端全局状态（+ persist 持久化） | [04-项目技术栈](./04-项目技术栈/) | W7+ 项目实战 |
| **P1** | React Hook Form + Zod | 表单 + 校验（固定搭配） | [04-项目技术栈](./04-项目技术栈/) | W7+ |
| **P1** | SWR | 客户端请求 `/api/*`（配合 BFF 模式） | [04-项目技术栈](./04-项目技术栈/) | W7+ |
| **P1** | next-intl | 国际化（满屏的 `t('xxx')`） | [04-项目技术栈](./04-项目技术栈/) | W7+ |
| **P1** | @creativault/ui | 项目组件库（基于 Radix UI）：先学 Button/Dialog/Table | [04-项目技术栈](./04-项目技术栈/) | W7+ |
| **P2** | Route Handlers（`route.ts`） | 怎么写 API 路由、转发请求 | [03-NextJS实战](./03-NextJS实战/) | W7+ 随用随学 |
| **P2** | Server Actions | 项目写操作的标准方式 | [03-NextJS实战](./03-NextJS实战/) | W7+ |
| **P2** | 环境变量 | `NEXT_PUBLIC_` 前缀规则（什么暴露给浏览器） | [03-NextJS实战](./03-NextJS实战/) | W7+ |
| **P2** | 鉴权概念 | JWT / httpOnly Cookie / 同源策略（理解 BFF 为什么存在） | [03-NextJS实战](./03-NextJS实战/) | W7+ |
| **P2** | SSE 流 | Agent 对话的 `useStream`（可后置） | [03-NextJS实战](./03-NextJS实战/) | 后置 |
| **P3** | 工程化 | pnpm monorepo + Turborepo、Biome、Vitest、Drizzle ORM、Framer Motion | [05-架构与规范](./05-架构与规范/) | 按需 |

**建议节奏**：TS（1-2 周）→ React（2-3 周）→ Next.js 核心啃 RSC 边界（2 周）→ 直接上手项目（SWR + Zustand + next-intl 仿写页面）→ P2 读到 route.ts 时随用随学。

## 📖 目录结构

### [01-基础知识](./01-基础知识/)
- JavaScript ES6+ 核心特性
- TypeScript 类型系统
- 异步编程（Promise、async/await）
- 模块化与工具链

### [02-React核心](./02-React核心/)
- React 19 核心概念
- 组件化开发
- Hooks 全解析
- 状态管理基础

> **主学习线**：[React 官方文档学习目录](./React官方文档学习目录.md) —— 配套 [zh-hans.react.dev/learn](https://zh-hans.react.dev/learn) 的逐节打卡地图（含 JS/TS 前置对照 + Python 类比 + 里程碑），React 部分从这份文件开始。

### [03-NextJS实战](./03-NextJS实战/)
- Next.js 16 App Router
- Server Components vs Client Components
- Server Actions
- 数据获取与缓存策略
- API Routes（BFF 层）

### [04-项目技术栈](./04-项目技术栈/)
- Tailwind CSS 样式系统
- Radix UI 组件库
- React Hook Form + Zod
- Zustand 状态管理
- next-intl 国际化
- Drizzle ORM

### [05-架构与规范](./05-架构与规范/)
- Monorepo 架构（pnpm + Turborepo）
- BFF 网关模式
- 三层架构
- 代码规范与最佳实践
- 国际化规范
- UI 组件复用

### [06-实战练习](./06-实战练习/)
- 阅读现有代码指南
- 常见任务实战
- Bug 修复练习
- 功能开发实例

## 🎯 学习策略

### 时间分配建议
- **70% 时间**：阅读项目现有代码（最重要！）
- **20% 时间**：查阅官方文档
- **10% 时间**：实验性编写小功能

### 后端开发者的优势
✅ 已掌握的可迁移技能：
- 编程基础（变量、函数、条件、循环）
- 异步编程思维（你已经熟悉 Python async/await）
- API 设计思维
- 数据库操作（ORM）
- 类型系统（TypeScript 类似 Python 类型注解）

### 需要转变的思维

| 后端思维 | 前端思维 | 类比 |
|---------|---------|------|
| 类/模块 | 组件（函数） | FastAPI 路由函数 → React 组件 |
| 同步代码为主 | 异步+响应式 | async def → async function |
| 服务端渲染结果 | 客户端交互+状态管理 | Jinja2 模板 → React 状态 |
| SQL 查询 | Props 传递+状态提升 | Repository → Props drilling |
| REST API | Server Actions / API Routes | FastAPI router → Next.js API |

## 🚀 快速上手

### 第一周目标
1. ✅ 理解 TypeScript 基础类型
2. ✅ 能够阅读项目中的 React 组件
3. ✅ 理解 props 和 state 的区别
4. ✅ 完成第一个 Hello World 组件

### 第二周目标
1. ✅ 掌握常用 Hooks（useState、useEffect、useCallback）
2. ✅ 理解组件生命周期
3. ✅ 能够编写简单的交互组件
4. ✅ 理解事件处理和表单

### 第三周目标
1. ✅ 理解 Next.js App Router 路由系统
2. ✅ 区分 Server Components 和 Client Components
3. ✅ 编写第一个 Server Action
4. ✅ 完成一个完整的页面（含数据获取）

### 第四周目标
1. ✅ 熟练使用 Tailwind CSS
2. ✅ 掌握表单处理（React Hook Form + Zod）
3. ✅ 理解客户端状态管理（Zustand）
4. ✅ 实现国际化功能

## 📝 学习检查清单

### JavaScript/TypeScript
- [ ] 理解 ES6+ 语法（箭头函数、解构、展开运算符）
- [ ] 掌握 TypeScript 类型注解
- [ ] 理解 interface vs type
- [ ] 掌握泛型基础
- [ ] 理解 Promise 和 async/await

### React 基础
- [ ] 理解组件化思想
- [ ] 掌握 JSX 语法
- [ ] 理解 props 传递
- [ ] 掌握 useState 和 useEffect
- [ ] 理解条件渲染和列表渲染
- [ ] 掌握事件处理

### Next.js
- [ ] 理解文件系统路由
- [ ] 区分 Server/Client Components
- [ ] 掌握数据获取方式
- [ ] 理解 Server Actions
- [ ] 掌握 API Routes

### 项目技术栈
- [ ] 熟练使用 Tailwind CSS
- [ ] 掌握 Radix UI 基础
- [ ] 理解表单处理流程
- [ ] 掌握 Zod 校验
- [ ] 理解国际化实现

### 项目规范
- [ ] 理解 BFF 网关模式
- [ ] 掌握 Monorepo 结构
- [ ] 遵循代码规范
- [ ] 理解组件复用原则
- [ ] 掌握国际化规范

## 🛠️ 开发工具

### VS Code 推荐插件
- **ES7+ React/Redux/React-Native snippets** - React 代码片段
- **Tailwind CSS IntelliSense** - Tailwind 智能提示
- **Biome** - 代码格式化和 Lint（项目已配置）
- **Error Lens** - 行内错误提示
- **TypeScript Error Translator** - TypeScript 错误翻译

### 浏览器工具
- **React Developer Tools** - React 组件调试
- **Redux DevTools** - 状态管理调试（如果用到）
- **Next.js DevTools** - Next.js 专用调试工具

### 常用命令
```bash
# 启动开发服务器
cd frontend
pnpm dev              # 启动 web 应用
pnpm dev:admin        # 启动 admin 应用
pnpm dev:dubhe        # 启动 dubhe 应用

# 代码检查
pnpm lint             # Biome 检查
pnpm typecheck        # TypeScript 类型检查

# 构建
pnpm build            # 构建应用

# 数据库
pnpm db:generate      # 生成数据库迁移
pnpm db:push          # 推送到数据库
pnpm db:studio        # 打开数据库管理界面
```

## 📚 推荐学习资源

### 官方文档（必读）
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/) - 中文版可用
- [React 官方文档](https://react.dev/) - 最新版，强烈推荐
- [Next.js 官方文档](https://nextjs.org/docs) - 权威指南
- [Tailwind CSS 文档](https://tailwindcss.com/docs) - 样式系统

### 项目规范文档（必读）
位于项目根目录 `.kiro/steering/` 和 `.claude/rules/`：
- `frontend-architecture.md` - 前端核心架构
- `frontend-i18n-conventions.md` - 国际化规范
- `frontend-ui-styling.md` - UI 组件与样式规范
- `common-conventions.md` - 全局开发约定

### 在线教程
- [JavaScript.info](https://javascript.info/) - JavaScript 深入教程（有中文版）
- [React 官方教程](https://react.dev/learn) - 交互式学习
- [Next.js Learn](https://nextjs.org/learn) - 官方实战教程

## 💡 学习建议

### 从后端思维到前端思维

#### 1. 组件 ≈ 函数
```python
# 后端：FastAPI 路由函数
@router.get("/users/{user_id}")
async def get_user(user_id: int) -> UserResponse:
    return UserResponse(...)
```

```typescript
// 前端：React 组件
function UserProfile({ userId }: { userId: number }) {
  return <div>User: {userId}</div>
}
```

#### 2. Props ≈ 函数参数
```python
# 后端：函数参数
def send_email(to: str, subject: str, body: str):
    ...
```

```typescript
// 前端：组件 Props
function EmailForm({ to, subject, body }: EmailFormProps) {
  return <form>...</form>
}
```

#### 3. State ≈ 类的属性
```python
# 后端：类属性
class UserService:
    def __init__(self):
        self.cache = {}  # 状态
```

```typescript
// 前端：React 状态
function UserList() {
  const [users, setUsers] = useState([]);  // 状态
  return <ul>...</ul>
}
```

#### 4. useEffect ≈ 生命周期钩子
```python
# 后端：依赖注入/初始化
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时
    await init_db()
    yield
    # 关闭时
    await close_db()
```

```typescript
// 前端：副作用
useEffect(() => {
  // 组件挂载时
  fetchData();
  return () => {
    // 组件卸载时
    cleanup();
  };
}, []);
```

### 常见陷阱

#### ❌ 错误：直接修改状态
```typescript
// Python 中可以直接修改
users.append(new_user)

// React 中不能直接修改
users.push(newUser);  // ❌ 错误！
```

#### ✅ 正确：使用 setState
```typescript
setUsers([...users, newUser]);  // ✅ 正确
```

#### ❌ 错误：在组件中直接调用后端 API
```typescript
// ❌ 禁止
fetch('https://backend-api.com/users');
```

#### ✅ 正确：通过 BFF 转发
```typescript
// ✅ 正确
fetch('/api/users');  // 通过 Next.js API Route
```

## 📞 获取帮助

### 遇到问题时
1. **优先查看项目规范文档** - 大多数规范已经定义清楚
2. **阅读官方文档** - React/Next.js 文档非常详细
3. **查看项目现有代码** - 寻找类似实现作为参考
4. **使用 AI 助手** - 我可以帮你解答具体问题

### 学习进度追踪
建议在每个阶段完成后，在对应目录创建 `学习笔记.md`，记录：
- ✅ 已掌握的知识点
- ❓ 遇到的问题和解决方案
- 💡 心得体会
- 📌 需要深入学习的内容

## 🎓 结语

从后端到全栈是一个自然的过渡，你已经具备了很多可迁移的技能。前端开发的核心在于：

1. **组件化思维** - 一切皆组件
2. **状态管理** - 数据如何流动
3. **用户体验** - 交互和视觉呈现

保持耐心，多读代码，多实践。预计 **4-6 周** 可以开始独立完成前端任务，**2-3 个月** 可以达到熟练水平。

祝学习顺利！🚀
