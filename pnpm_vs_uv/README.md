# pnpm vs uv —— 给 uv 用户的 pnpm 指南

> 结论先行：**pnpm 可以成为你的 uv**。它是 Node 生态中最接近 uv 定位的工具——
> 管运行时（`pnpm runtime` ≈ `uv python`）、管依赖（`pnpm add` ≈ `uv add`）、
> 管全局工具（`pnpm add -g` ≈ `uv tool`）、临时执行（`pnpm dlx` ≈ `uvx`）、
> 甚至能自举自己（本目录 package.json 里的 `devEngines.packageManager` 就是）。
>
> 需要重建的心智只有几处：**没有 venv**、**semver `^`/`~`**、**lockfile 不跨包管理器通用**、**构建脚本安全门**，见第 4 节。
>
> 所有命令按 pnpm 11.22（本机版本）核对过官方文档。

## 0. 总速查表

| 我的 uv 习惯 | pnpm 对应 | 说明 |
|---|---|---|
| `uv init` | `pnpm init` | 生成 `package.json`（≈ pyproject.toml）|
| `uv python install` | `pnpm runtime set node lts -g` | 旧写法 `pnpm env use --global`（已废弃）；还能装 deno/bun |
| `uv python list` | `pnpm env list`（加 `--remote` 看远端可装）| `pnpm runtime` 目前只有 `set`，列版本仍用旧的 env |
| `uv python pin` | `pnpm runtime set node 22` | 不带 `-g` 时写入项目 `devEngines.runtime`，缺失自动下载 |
| `uv venv .venv` | **不需要** | Node 没有 venv：隔离就是项目目录下的 `node_modules/`，见第 2 节 |
| `uv add xxx` | `pnpm add xxx` | 写 package.json + 装 node_modules + 更新 pnpm-lock.yaml |
| `uv add --dev xxx` | `pnpm add -D xxx` | dev 依赖（类型、构建工具类）|
| `uv remove xxx` | `pnpm remove xxx` | |
| `uv sync` | `pnpm install` | 按 lockfile 同步装齐（clone 项目后第一件事）；CI 加 `--frozen-lockfile`（pnpm 在 CI 环境默认就是冻结模式）|
| `uv lock` | `pnpm install --lockfile-only` | 只更新 lockfile 不实际安装 |
| `uv lock --upgrade` | `pnpm update` | 升级 lockfile 里的版本 |
| `uv run xxx` | `pnpm exec xxx` | 在项目环境里找命令执行（即 `node_modules/.bin`）|
| （跑项目脚本）| `pnpm run <脚本名>` | 跑 package.json 的 scripts；`pnpm <脚本名>` 是简写 |
| `uvx xxx` | `pnpm dlx xxx` | 不装进项目、临时跑一个 CLI |
| `uv tool install xxx` | `pnpm add -g xxx` | 全局装包，bin 变成全局命令；Windows 首次需 `pnpm setup` |
| `uv tool list` | `pnpm ls -g` | |
| `uv tool upgrade` | `pnpm update -g` | |
| `uv cache clean` | `pnpm store prune` | 清理全局 store（位置用 `pnpm store path` 看）|
| `uv pip list` / `uv tree` | `pnpm list --depth 0` / `pnpm why <pkg>` | `why` 还能回答"是谁把它装进来的" |
| `uv self update` | `pnpm self-update` | 更新 pnpm 自己 |
| `uv.toml` / `[tool.uv]` | `pnpm-workspace.yaml` | v11 起所有 pnpm 设置都放这里（不再读 package.json 的 `pnpm` 字段）；`.npmrc` 是老位置 |

## 1. 支柱一：管理语言运行时（`uv python` ↔ `pnpm runtime`）

### 全局安装 Node（≈ `uv python install`）

```bash
pnpm runtime set node lts -g      # 装 LTS 并设为全局默认（别名 pnpm rt）
pnpm runtime set node 22 -g       # 装 22.x 大版本
pnpm runtime set node latest -g   # 最新版；也支持 nightly / rc / 代号（argon）
pnpm runtime set deno 2 -g        # 同一个命令还能管 deno / bun
```

注意两点：

- 旧命令 `pnpm env use --global lts` 已废弃（还能用，新脚本别再写）。
- v11 起 pnpm 装的 Node **不自带 npm/npx/corepack**（省一半文件量）；真需要 `pnpm add -g npm`。

### 列出版本（≈ `uv python list`）

```bash
pnpm env list              # 本机已装的（runtime 还没有 list 子命令，用旧的）
pnpm env list --remote     # 远端可装的版本
pnpm env list --remote 22  # 只看 22.x
```

### 项目固定版本（≈ `uv python pin` + 自动下载）

```bash
pnpm runtime set node 22     # 不带 -g：写入本项目的 devEngines.runtime（默认行为）
pnpm runtime set node 22 -P  # 写入 engines.runtime（给依赖声明用）
```

等价的 package.json 手写形式：

```json
"devEngines": {
  "runtime": { "name": "node", "version": "^22.0.0", "onFail": "download" }
}
```

工作方式非常 uv：`pnpm install` 时解析版本区间 → 精确版本和校验和写进 **lockfile** → 项目内脚本统一用它；本机没有就按 `onFail: "download"` 自动下载。从此"同事 Node 版本不一样"这类问题消失。

### 你已经在用的自举机制

本目录 package.json 里已有的这段：

```json
"devEngines": {
  "packageManager": { "name": "pnpm", "version": "11.22.0", "onFail": "download" }
}
```

是同一套机制管 **pnpm 自己**：任何机器进入这个项目跑 pnpm，版本不对会自动下载指定版本——这就是 uv "单二进制自举"思想的 pnpm 版。

> **⚠️ 已踩过的坑（pnpm 11.22）**：`pnpm init` 会把这里的 version 写成区间 `^11.22.0`，
> 但校验只接受**精确版本号**，导致项目里所有 pnpm 命令报
> `Invalid package manager specification ... expected a semver version`。
> 已知 bug：[pnpm#13969](https://github.com/pnpm/pnpm/issues/13969)，修复已合入（新版 init 写精确版本并同步写 legacy `packageManager` 字段）。
> 手动修复：把 `^11.22.0` 改成 `11.22.0` 即可（本目录已改）。

## 2. 支柱二：依赖管理与环境隔离（`uv venv/add/sync` ↔ node_modules）

### 为什么没有 venv

Python 需要 venv 是因为解释器默认去**全局 site-packages** 找包，不隔离就互相污染。
Node 的模块解析是从**当前文件所在目录逐级向上找 `node_modules/`**——
进了这个项目目录，import 到的自然就是 `./node_modules` 这套依赖，天然按项目隔离。
所以流程里没有"创建环境/激活环境"这一步，`cd` 进去就是"激活"了。

### node_modules 比 .venv 更省磁盘：全局 store + 硬链接

这是 pnpm 最像 uv 的设计（≈ uv cache 的 hardlink 模式）：

- 所有包只在**全局 store** 存一份（位置：`pnpm store path`）。
- 每个项目的 `node_modules` 是从 store **硬链接**过来的，同一台机器上 100 个项目都装 react，磁盘上也只有一份实体。
- `uv cache clean` 的对应物是 `pnpm store prune`（清掉没人引用的包）。

### 读懂 node_modules 结构（pnpm 特色）

```
node_modules/
├── typescript -> .pnpm/typescript@5.x.y/node_modules/typescript   # 符号链接
└── .pnpm/     # 真实布局：每个包自己的 node_modules，各找各的依赖
```

顶层只放**你直接声明的依赖**（symlink 进 `.pnpm`），传递依赖全部收进 `.pnpm` 的隔离目录里。
这就是"严格模式"：没写进 package.json 的包你 import 不到——对比 npm/yarn 的扁平结构（见第 4 节幽灵依赖）。

### 日常命令

```bash
pnpm add react            # 生产依赖；-D 开发依赖；--optional 可选依赖
pnpm remove react
pnpm install              # 按 pnpm-lock.yaml 同步（≈ uv sync，幂等，随时跑）
pnpm install --frozen-lockfile   # CI 用：lockfile 与 package.json 不一致直接失败
pnpm update               # ≈ uv lock --upgrade
pnpm list --depth 0       # ≈ uv pip list：只看直接依赖
pnpm why react            # 谁引它进来的；排查"怎么会有这个包"神器
```

### 跑命令与脚本

| uv | pnpm | 说明 |
|---|---|---|
| `uv run tsc --version` | `pnpm exec tsc --version` | 从 `node_modules/.bin` 找命令 |
| `uv run python app.py` | `node app.js`（或 `pnpm exec tsx src/x.ts`）| 跑代码本身 |
| `uv run <入口点>` | `pnpm run <脚本名>`（简写 `pnpm <脚本名>`）| package.json 的 `scripts` ≈ `[project.scripts]` |

本目录 package.json 加了 `"type": "module"`：表示 `.js` 按 ES Module（`import`/`export`）解析，Python 没有这个历史包袱，知道有这回事即可。

## 3. 支柱三：全局工具与临时执行（`uv tool`/`uvx` ↔ `pnpm add -g`/`dlx`）

### `pnpm add -g`（≈ `uv tool install`）

```bash
pnpm add -g typescript    # 之后任意位置都有 tsc 命令
pnpm ls -g                # ≈ uv tool list
pnpm update -g            # ≈ uv tool upgrade
pnpm remove -g typescript # ≈ uv tool uninstall
```

- Windows 首次使用前跑一次 `pnpm setup`：创建 `PNPM_HOME`、把全局 bin 目录加进 PATH（v11 全局命令放在 `PNPM_HOME\bin`）。
- **与 uv tool 的关键差异**：`uv tool install` 给每个工具建独立 venv，互不干扰；pnpm 的全局工具**共享同一个全局环境**，两个工具依赖同一包的不同大版本时可能打架（少见，遇到了再处理）。

### `pnpm dlx`（≈ `uvx`）

```bash
pnpm dlx cowsay hello        # 临时下载执行，不进项目也不进全局
pnpm dlx create-next-app@latest my-app   # 脚手架类工具的标准用法
```

## 4. uv 用户专属差异篇（容易踩的点）

### 4.1 semver 速成：`^` 和 `~`

Python 写 `>=1.2.3,<2`；npm 生态用前缀符号：

| 写法 | 含义 | 等价 Python |
|---|---|---|
| `^1.2.3` | 兼容 1.x：`>=1.2.3 <2.0.0` | `~=1.2.3`（大版本内）|
| `~1.2.3` | 只动补丁：`>=1.2.3 <1.3.0` | `~=1.2.3`（小版本内）|
| `1.2.3` | 精确锁定 | `==1.2.3` |

package.json 里写的是**区间**，lockfile 里才是精确版本——和 uv.lock 之于 pyproject.toml 完全同构。

### 4.2 lockfile 不跨包管理器通用（为什么必须"只用 pnpm"）

npm/yarn/pnpm 的 lockfile 互不兼容（npm-lock / yarn.lock / pnpm-lock.yaml）。
谁用错的包管理器装一次，就会生成第二套 lock + 一份不同结构的 node_modules。
所以 AGENTS.md 规定本仓库统一 pnpm、lock 只留 pnpm-lock.yaml、混入 package-lock.json 一律删掉重装——
这是纪律问题，不是技术问题。creativault 真实仓库同理。

### 4.3 幽灵依赖：creativault 选 pnpm 的原因

npm/yarn 把所有传递依赖"提升"到顶层 node_modules，你没声明的包也能 import——
代码能跑，但 package.json 是假的，依赖一升级就塌（ghost/phantom dependencies）。
pnpm 默认严格结构（见第 2 节 `.pnpm` 布局），**没声明就 import 不到**，
相当于 uv 严格 venv 之于"系统 Python 里什么都能 import"。

### 4.4 同一个包多版本共存

Python 一个环境里 numpy 只能有一个版本；Node 依赖树里 A 要 react@18、B 要 react@19 时，
`.pnpm` 里两份并存、各链接各的。日常不用管，但排查 bug 时别假设"全项目只有一个版本"——`pnpm why`/`pnpm list` 看真实情况。

### 4.5 构建脚本安全门：`pnpm approve-builds`

Node 包可以带 `postinstall` 脚本（装的时候执行任意代码），是供应链攻击面，Python 没有对应物。
pnpm 10 起**默认不执行**依赖的构建脚本，装完会提示 `Ignored build scripts: ...`，
你审过之后用 `pnpm approve-builds` 放行。遇到某个包装完"不工作"（比如缺编译产物），先想是不是被这个门拦了。

实操补充（本目录真实踩过，装 tsx 时 esbuild 被拦）：

- 非交互放行：`pnpm approve-builds esbuild`（不用进交互界面）
- 它写进 `pnpm-workspace.yaml` 的是 `allowBuilds:` 映射表（pnpm 11 的新设置；**pnpm 10 的 `onlyBuiltDependencies` 在 11 里已被忽略**，手写无效）
- 已装过才被拦的包，改配置后要 `pnpm rebuild <包名>` 触发补跑

### 4.6 peerDependencies 一句话

包声明"我需要宿主项目提供 react@18"这类**宿主侧依赖**（插件生态常见，如 Next.js 插件）。
pnpm 默认 `autoInstallPeers` 会自动补上，日常无感，看依赖树时认识这个词即可。

## 5. workspace 预告（P3 工程化再深入）

对标 uv workspace / creativault 的真实形态（pnpm workspace + Turborepo）：

- `pnpm-workspace.yaml` 声明成员：`packages: ['apps/*', 'packages/*']`（v11 起它同时是 pnpm 的全局配置文件）
- 包间依赖用 `workspace:*` 协议（≈ uv 的 workspace sources）
- `catalog:` 协议：全仓统一版本表（≈ uv 的 `workspace.dependencies` 集中管版本）
- `pnpm -r` 递归所有成员执行命令；`pnpm --filter <包名>` 只对部分执行

本仓库刻意**不用** workspace（平铺自治模式，见 AGENTS.md），学到 P3 时切到 creativault 仓库实践。

## 6. 实战工具：学习进度报告器（src/ 多模块）

本目录用上面全部知识写了一个**真实工具**（对标 Python 的 main.py 习惯）：
扫描各 playground README 的知识点清单 + `learning-guide/学习进度追踪.md` 的周计划打卡，一条命令看全景。

代码按职责拆在 `src/` 下：`types.ts`（接口）、`parser.ts`（Markdown 解析）、`collector.ts`（扫描文件）、`render.ts`（彩条渲染）、`main.ts`（入口编排）。

```bash
pnpm report                # 进度总览（彩条 + 百分比 + 总计，当前全仓 149 项）
pnpm report --remaining    # 追加列出所有未完成项
pnpm report --no-color     # 纯文本输出
pnpm check                 # tsc --noEmit 类型检查
```

仓库任意位置可用：`pnpm -C pnpm_vs_uv report`（工具自动定位仓库根，不依赖当前目录）。

它的依赖正好示范了第 2 节的分类规则：

| 依赖 | 装法 | 角色 |
|---|---|---|
| `typescript` / `tsx` / `@types/node` | `pnpm add -D`（开发工具）| 编译、执行、Node 类型标注 |
| `chalk`（彩色）/ `string-width`（中文对齐占 2 列的计算）| `pnpm add`（运行时 import 的）| main.ts 里真实 import 的运行依赖 |

两个坑的活记录：TS 7 不再自动扫描 `@types/`，tsconfig 要写 `"types": ["node"]`；
esbuild 构建脚本放行见 4.5。

## 7. 随文练习（在本目录打卡）

| # | 练习 | 命令 | 通过标准 |
|---|---|---|---|
| 1 | 看运行时状态 | `pnpm -v` / `pnpm env list` / `node -v` | 能说出三者的区别 |
| 2 | 分开装依赖 | `pnpm add -D typescript`、`pnpm add -D tsx`、`pnpm add chalk`、`pnpm add string-width` | package.json、pnpm-lock.yaml、node_modules 三处都有变化；能说清哪些该 `-D` 哪些不该 |
| 3 | 看 store 结构 | `pnpm store path`；`Get-ChildItem node_modules\.pnpm` | 理解顶层 symlink 与 `.pnpm` 真实布局 |
| 4 | 项目内执行 | `pnpm exec tsc --version` | 输出版本号，且全局没装 typescript 也能跑 |
| 5 | scripts 入口 | `pnpm report`（scripts 里是 `tsx src/main.ts`） | 全仓库进度报告打出来 |
| 6 | 临时执行 | `pnpm dlx cowsay hello` | 有牛说话，且 node_modules 里没多出 cowsay |
| 7 | 依赖侦查 | `pnpm list --depth 0` / `pnpm why chalk` / `pnpm why esbuild` | 能解释 chalk 和 esbuild 分别是怎么进来的 |
| 8 | lockfile 恢复 | `Remove-Item -Recurse -Force node_modules` 后 `pnpm install` | ≈ `uv sync`：删了也能精确还原 |

练习 8 做完，你对"pnpm install = uv sync"的体感就到位了。
