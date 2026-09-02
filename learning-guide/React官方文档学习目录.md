# React 官方文档学习目录（Python 后端快速通道）

> 配套 [zh-hans.react.dev/learn](https://zh-hans.react.dev/learn) 使用。
> 设计目标：**每天 30-60 分钟，每节可勾选、每阶段有能跑的产出、第一周就上手上项目代码。**

---

## 使用说明（正反馈三原则）

1. **一节一勾**：官方文档每个小节 20-40 分钟，读完把 `- [ ]` 勾成 `- [x]`，进度肉眼可见
2. **一阶一成果**：每个阶段结束都有一个能运行、能截图的东西（🏆 里程碑）
3. **卡住就跳**：卡住超过 20 分钟 → 记到文末「问题清单」，继续下一节，回头再补

> 官方文档每节都有 **Sandpack 在线代码块**（直接改代码立刻看效果）和节末 **「挑战」（Try some challenges）**。
> 顺序：读正文 → 玩 Sandpack → 做挑战 → 对答案。这是最快的正反馈循环。
> 只读不写 = 白学。每节至少把示例代码**亲手敲一遍**。

---

## 总览：6 个阶段 × 官方章节

```
阶段 0           阶段 1            阶段 2           阶段 3           阶段 4            阶段 5
JS/TS 最小集    快速入门+井字棋    描述 UI          添加交互         管理状态          逃生舱(按需)
(1-2天)         (2-3天)           (2-3天)          (2-3天)          (3-4天)           (2-3天)
──────────────  ────────────────  ───────────────  ───────────────  ────────────────  ────────────────
够用就走的       第一个组件跑起来   组件/JSX/Props   事件/useState    状态设计/共享      useRef/useEffect
Python 对照表    完整小游戏        条件/列表渲染     不可变更新       reducer/Context   自定义 Hook
```

本地配套：

| 资源 | 位置 | 用途 |
|------|------|------|
| 组件基础笔记 | [02-React核心/01-React-组件基础.md](./02-React核心/01-React-组件基础.md) | 阶段 2 的中文精读版（含 Python 对比） |
| JS/TS 笔记 | [01-基础知识/](./01-基础知识/) | 阶段 0 展开，按需查阅 |
| 练习场 | [code-practice/react/](./code-practice/react/) | 井字棋骨架已就绪 |
| 资源清单 | [02-React核心/00-推荐教程与学习资源.md](./02-React核心/00-推荐教程与学习资源.md) | 视频课/进阶阅读 |

---

## 阶段 0：JS/TS 最小集（1-2 天）

> **不系统学 JS/TS**，只掌握「读 React 代码必需」的 20%。
> 下表左列是你在 React 代码里**天天见**的语法，右列是 Python 对照。先混个脸熟，后面阶段遇到再回来查。

### JS 速查：见到就会认

| JS 写法 | Python 对照 | React 里用在哪 |
|---------|------------|---------------|
| `const x = 1` / `let x = 1` | `x = 1`（const = 不可重新赋值） | 变量声明，**优先 const** |
| 箭头函数 `x => x * 2` | `lambda x: x * 2` | 事件处理 `onClick={() => ...}` |
| 模板字符串 `` `Hi ${name}` `` | `f"Hi {name}"` | JSX 里的动态文本 |
| 对象解构 `const { id, name } = user` | `id, name = user`（元组解包） | 接 props：`function Btn({ onClick })` |
| 对象展开 `{ ...user, age: 30 }` | `{**user, "age": 30}` | **state 不可变更新**（阶段 3 核心） |
| 数组展开 `[ ...list, item ]` | `[*list, item]` | 列表新增（同样是不可变更新） |
| `arr.map(f)` | `[f(x) for x in arr]` | **渲染列表**（天天用） |
| `arr.filter(f)` | `[x for x in arr if f(x)]` | 搜索/筛选 |
| `arr.find(f)` | `next((x for x in arr if f(x)), None)` | 按 id 查找 |
| 三元 `cond ? a : b` | `a if cond else b` | 条件渲染 |
| 可选链 `user?.addr?.city` | `user.get("addr", {}).get("city")` | 安全取嵌套字段 |
| 空值合并 `x ?? 默认值` | `x if x is not None else 默认值` | 默认值 |
| `===`（严格相等） | 无（Python 只有 `==`） | **一律用 `===`**，别用 `==` |
| `null` / `undefined` | `None`（JS 有两个，几乎可混着当 None 理解） | `x == null` 可同时判两者 |
| `import / export` | `from x import y` | 组件导入导出 |
| `async/await` + `fetch()` | `asyncio` + `httpx` | 调你自己的 FastAPI 接口 |

### TS 速查：够用版

| TS 写法 | Python 对照 | 用途 |
|---------|------------|------|
| `interface Props { title: string }` | `dataclass` / `TypedDict` | 给 props 定类型 |
| `type Action = 'add' \| 'delete'` | `Literal["add", "delete"]` | reducer 的 action 类型 |
| 泛型 `useState<string[]>` | `list[str]` | 声明 state 的类型 |
| `Partial<T>` / `Pick<T, K>` | （≈ 全可选 / 部分 字段） | 表单、更新对象 |
| `any` vs `unknown` | `Any`（unknown 用前必须收窄，更安全） | 尽量少用 any |
| 类型收窄 `if (typeof x === 'string')` | `isinstance(x, str)` 后类型检查器就认识 | 条件渲染常用 |

- [ ] 读完 [01-基础知识/01-JavaScript-ES6+.md](./01-基础知识/01-JavaScript-ES6+.md)（跳读，对照上表）
- [ ] 读完 [01-基础知识/02-TypeScript-类型系统.md](./01-基础知识/02-TypeScript-类型系统.md)（跳读）

🏆 **里程碑 M0**：能在浏览器控制台里熟练写出解构、展开、`map`（拿 Python 里等价写法自测一遍）。

---

## 阶段 1：快速入门 + 井字棋（2-3 天）—— 第一波正反馈

| # | 官方小节 | 时长 | 关键收获 | 完成 |
|---|---------|------|---------|------|
| 1 | [快速入门](https://zh-hans.react.dev/learn) | 1-2h | 组件/JSX/props/state/事件的一次性总览：**别求全懂，先建地图** | - [ ] |
| 2 | [React 哲学](https://zh-hans.react.dev/learn/thinking-in-react) | 1h | 把 UI 拆成组件的思维方式（后端转前端最重要的心智模型） | - [ ] |
| 3 | [实战教程：井字棋](https://zh-hans.react.dev/learn/tutorial-tic-tac-toe) | 2-3h | 跟着敲出第一个完整应用，**必须亲手敲** | - [ ] |

**配套动作**：
- 井字棋敲完后，**关掉教程自己再写一遍**（写不出来的地方 = 你真正的知识缺口，记下来）
- 进阶：完成官方教程末尾 3 个挑战（历史列表 / 升降序 / 高亮连线）
- 本地练习场：[code-practice/react/tic-tac-toe](./code-practice/react/tic-tac-toe)（Vite 骨架，`npm run dev` 即可跑）

🏆 **里程碑 M1**：浏览器里跑起你亲手写的井字棋，历史记录可回退。

---

## 阶段 2：描述 UI（2-3 天）—— 配套本地笔记精读

> 官方章节：[描述 UI](https://zh-hans.react.dev/learn/describing-the-ui)
> 本地精读：[02-React核心/01-React-组件基础.md](./02-React核心/01-React-组件基础.md)（中文重排版，含 Python 对比）

| # | 官方小节 | 时长 | 前置 JS/TS（回阶段 0 查） | 完成 |
|---|---------|------|--------------------------|------|
| 4 | [你的第一个组件](https://zh-hans.react.dev/learn/your-first-component) | 30m | 函数、`export default` | - [ ] |
| 5 | [导入和导出组件](https://zh-hans.react.dev/learn/importing-and-exporting-components) | 30m | `import` / `export` | - [ ] |
| 6 | [使用 JSX 编写标记](https://zh-hans.react.dev/learn/writing-markup-with-jsx) | 30m | HTML 基础 | - [ ] |
| 7 | [JSX 中使用大括号](https://zh-hans.react.dev/learn/javascript-in-jsx-with-curly-braces) | 30m | 模板字符串、对象字面量 | - [ ] |
| 8 | [将 Props 传递给组件](https://zh-hans.react.dev/learn/passing-props-to-a-component) | 45m | 解构、展开运算符、`interface` | - [ ] |
| 9 | [条件渲染](https://zh-hans.react.dev/learn/conditional-rendering) | 45m | 三元、`&&`、类型收窄 | - [ ] |
| 10 | [渲染列表](https://zh-hans.react.dev/learn/rendering-lists) | 45m | **`map`**（对应 Python 列表推导） | - [ ] |
| 11 | [保持组件纯粹](https://zh-hans.react.dev/learn/keeping-components-pure) | 30m | 纯函数概念（后端已会，迁移即可） | - [ ] |

**概念对照（后端直译）**：
- props ≈ **只读关键字参数**，父传子，单向
- key ≈ **数据库主键**，列表元素的身份标识，永远别用数组下标糊弄（除非列表不变）
- 组件 ≈ 纯函数：`UI = f(props)`

🏆 **里程碑 M2**：不抄教程，写一个「团队成员卡片列表」页——数据写死在数组里，用 `map` 渲染，加一个「在线/离线」条件渲染徽章。

---

## 阶段 3：添加交互（2-3 天）—— React 真正的开始

> 官方章节：[添加交互](https://zh-hans.react.dev/learn/adding-interactivity)

| # | 官方小节 | 时长 | 前置 JS/TS | 完成 |
|---|---------|------|-----------|------|
| 12 | [响应事件](https://zh-hans.react.dev/learn/responding-to-events) | 45m | 箭头函数（`onClick={fn}` 传函数本身，**不加括号**） | - [ ] |
| 13 | [State：组件的记忆](https://zh-hans.react.dev/learn/state-a-components-memory) | 45m | 解构赋值 `[a, setA] = ...` | - [ ] |
| 14 | [渲染和提交](https://zh-hans.react.dev/learn/render-and-commit) | 30m | 无（纯概念：触发→渲染→提交） | - [ ] |
| 15 | [State 如同一张快照](https://zh-hans.react.dev/learn/state-as-a-snapshot) | 45m | 值传递 vs 引用传递（Python 同款考点） | - [ ] |
| 16 | [把一系列 state 更新加入队列](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates) | 45m | 函数式更新 `setX(x => x + 1)` | - [ ] |
| 17 | [更新 state 中的对象](https://zh-hans.react.dev/learn/updating-objects-in-state) | 45m | **对象展开**（≈ `{**u, "age": 30}`） | - [ ] |
| 18 | [更新 state 中的数组](https://zh-hans.react.dev/learn/updating-arrays-in-state) | 1h | **数组展开 + map/filter**（本阶段最重要一节） | - [ ] |

**后端最容易踩的坑（提前打疫苗）**：
- state 是**只读快照**：`user.name = 'x'` 直接改对象 = React 不知道，界面不动
- 正确姿势永远是**创建新对象/新数组**再 setState：`setUser({ ...user, name: 'x' })`
- 心智模型：把 state 当成数据库里的不可变记录，改 = INSERT 新版本，不是 UPDATE

🏆 **里程碑 M3**：Todo App v1——添加/删除/切换完成状态（不可变更新三连：数组展开、filter、map）。

---

## 阶段 4：管理状态（3-4 天）—— 从「能用」到「会设计」

> 官方章节：[管理状态](https://zh-hans.react.dev/learn/managing-state)

| # | 官方小节 | 时长 | 关键收获 | 完成 |
|---|---------|------|---------|------|
| 19 | [使用 State 响应输入](https://zh-hans.react.dev/learn/reacting-to-input-with-state) | 45m | 状态机思维：改数据而非改 DOM | - [ ] |
| 20 | [选择 state 结构](https://zh-hans.react.dev/learn/choosing-the-state-structure) | 45m | 哪些该进 state、怎么拆（≈ 数据库范式设计） | - [ ] |
| 21 | [在组件间共享状态](https://zh-hans.react.dev/learn/sharing-state-between-components) | 45m | **状态提升**（≈ 把变量挪到共同父作用域） | - [ ] |
| 22 | [state 的保留与重置](https://zh-hans.react.dev/learn/preserving-and-resetting-state) | 45m | 为什么同一位置的组件 state 不重置、`key` 重置大法 | - [ ] |
| 23 | [提取状态逻辑到 reducer](https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer) | 1h | reducer ≈ 事件处理器集中分发（写过后端会觉得眼熟） | - [ ] |
| 24 | [通过 Context 传递数据](https://zh-hans.react.dev/learn/passing-data-deeply-with-context) | 45m | ≈ 全局依赖注入，告别 props 逐层透传 | - [ ] |
| 25 | [使用 Reducer 和 Context 扩展](https://zh-hans.react.dev/learn/scaling-up-with-reducer-and-context) | 30m | 两者组合成页面级状态中枢 | - [ ] |

🏆 **里程碑 M4**：Todo App v2——加搜索框 + 筛选（全部/未完成），筛选条件与列表状态提升到共同父组件。

---

## 阶段 5：逃生舱（2-3 天）—— 只学核心 4 节，其余选学

> 官方章节：[紧急逃生舱](https://zh-hans.react.dev/learn/escape-hatches)
> 学完阶段 4 再来。前 4 节必学，后 3 节遇到问题再回来查。

| # | 官方小节 | 时长 | 关键收获 | 完成 |
|---|---------|------|---------|------|
| 26 | [使用 Ref 引用值](https://zh-hans.react.dev/learn/referencing-values-with-refs) | 45m | useRef：不触发渲染的「盒子」（存 id、计时器） | - [ ] |
| 27 | [使用 Ref 操作 DOM](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) | 30m | 聚焦输入框、滚动等少数合法场景 | - [ ] |
| 28 | [使用 Effect 同步数据](https://zh-hans.react.dev/learn/synchronizing-with-effects) | 1h | useEffect ≈ FastAPI lifespan：与外部系统同步，**不是生命周期钩子** | - [ ] |
| 29 | [你可能不需要 Effect](https://zh-hans.react.dev/learn/you-might-not-need-an-effect) | 45m | ⭐ **全文档最值钱的一节**：80% 的 useEffect 都是误用 | - [ ] |
| 30 | [自定义 Hook 复用逻辑](https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks) | 1h | 把逻辑抽成 `useXxx`（≈ 组合复用，装饰器的感觉） | - [ ] |
| 31 | （选学）[Effect 的生命周期](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects) | 1h | Effect 何时重跑、cleanup 何时执行 | - [ ] |
| 32 | （选学）[分离事件与 Effect](https://zh-hans.react.dev/learn/separating-events-from-effects) / [移除 Effect 依赖](https://zh-hans.react.dev/learn/removing-effect-dependencies) | 1h | 依赖数组报错/行为诡异时再精读 | - [ ] |

🏆 **里程碑 M5**：Todo App v3——用 `useEffect` + 自定义 `useLocalStorage` Hook 实现刷新后数据不丢。

---

## 贯穿全程：TS + React 速查

写组件时随手查，不用背：

| 场景 | 写法 |
|------|------|
| Props 类型 | `interface Props { title: string; count?: number; onClick: () => void }` |
| children | `children: React.ReactNode` |
| 事件 | `onChange: (e: React.ChangeEvent<HTMLInputElement>) => void` |
| useState 泛型 | `const [user, setUser] = useState<User \| null>(null)` |
| 判空收窄 | `{user && <p>{user.name}</p>}` 或 `{user ? <A/> : <B/>}` |

- 权威速查：[React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/)
- Hook API 疑难：[内置 Hooks 参考](https://zh-hans.react.dev/reference/react/hooks)

---

## Python → React 心智模型对照表（贴墙上）

| React 概念 | 后端类比 | 一句话 |
|-----------|---------|--------|
| 组件 | 纯函数 | `UI = f(props, state)` |
| props | 只读关键字参数 | 父传子，单向，永不修改 |
| state | 组件私有记忆 | 改它 = 触发重渲染（创建新值，别原地改） |
| 重新渲染 | 函数被重新调用 | React 重跑你的函数，对比差异后更新 DOM |
| key | 数据库主键 | 列表元素身份，变了/复用全靠它 |
| 状态提升 | 变量挪到共同父作用域 | 两个子组件要同步 → state 上移 |
| useEffect | FastAPI lifespan / Depends(yield) 的清理 | 只用于**与外部系统同步**（API、订阅、定时器、localStorage） |
| 自定义 Hook | 抽公共逻辑的函数（≈ 装饰器） | `use` 开头，内部可以调用其他 Hook |
| Context | 依赖注入容器 | 跨层级传数据，避免 props 透传 |
| 受控组件 | 单一数据源 | input 的 value 绑 state，input 只是展示 |

---

## 卡点急救表

| 症状 | 去哪 |
|------|------|
| state 改了界面不动 | [更新 state 中的对象](https://zh-hans.react.dev/learn/updating-objects-in-state)（你在原地修改） |
| useEffect 无限循环 | [你可能不需要 Effect](https://zh-hans.react.dev/learn/you-might-not-need-an-effect) |
| 列表渲染 key 警告 | [渲染列表](https://zh-hans.react.dev/learn/rendering-lists) |
| TS props / 泛型报错 | [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/) |
| 输入框打不了字 | value 绑了 state 却没写 onChange（受控组件） |
| 某个 Hook 不会用 | [Hooks API 参考](https://zh-hans.react.dev/reference/react/hooks) |

---

## 成就打卡

| 里程碑 | 内容 | 日期 |
|--------|------|------|
| 🏆 M0 | JS/TS 对照表自测通过 | ____ |
| 🏆 M1 | 井字棋完整可玩 | ____ |
| 🏆 M2 | 团队卡片列表页（map + 条件渲染） | ____ |
| 🏆 M3 | Todo App v1（增删改） | ____ |
| 🏆 M4 | Todo App v2（搜索 + 筛选） | ____ |
| 🏆 M5 | Todo App v3（localStorage 持久化） | ____ |
| 🏆 M6 | 读懂项目里一个完整页面，说出每个 Hook 的作用 | ____ |

---

## 问题清单（卡住 20 分钟就记下来，继续前进）

### 问题 1
- 小节：
- 疑问：
- 后来怎么弄懂的：

### 问题 2
- 小节：
- 疑问：
- 后来怎么弄懂的：

---

## 一页纸总结

| 阶段 | 官方章节 | 小节数 | 用时 | 产出 |
|------|---------|--------|------|------|
| 0 | （本地笔记） | 2 | 1-2 天 | 语法对照表自测 |
| 1 | 快速入门 / 哲学 / 井字棋 | 3 | 2-3 天 | 井字棋 |
| 2 | 描述 UI | 8 | 2-3 天 | 卡片列表页 |
| 3 | 添加交互 | 7 | 2-3 天 | Todo v1 |
| 4 | 管理状态 | 7 | 3-4 天 | Todo v2 |
| 5 | 逃生舱 | 5+3 | 2-3 天 | Todo v3 |

**总计约 2-3 周**。学完阶段 4 即可开始读项目代码（不必等阶段 5）。
