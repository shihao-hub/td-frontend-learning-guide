# AGENTS.md

## 仓库结构说明

本目录（`frontend-learning-guide`）采用 **平铺 monorepo** 结构管理所有前端学习项目：

- 每个子目录都是一个独立的单元（`learning-guide/` 是学习文档与随文练习，后续练习项目如 `nextjs-playground/` 直接在根目录新建子目录），彼此无依赖归属关系，各自维护自己的依赖与配置。
- 整个目录作为单一 Git 仓库进行版本管理，不为单个子目录单独建仓；新增项目时直接在根目录创建新子目录即可，**不要在子项目内单独 `git init`**，也不要建 `apps/`、`packages/` 之类的分组目录。
- 在本目录下工作时，先确认目标所在子目录，再在该子目录的上下文中执行安装、构建、测试等操作。

## 隔离性原则（重要）

- 各子目录（子项目）之间**零共享**：没有 workspace 协议、共享代码、共享依赖或隐含约定，不要假设对一个项目的改动需要另一个项目"配合"。
- 每个项目自带 `package.json` + 自己的 `node_modules`，统一使用 **pnpm** 安装依赖；lock 文件只用 pnpm-lock.yaml，发现混入的 package-lock.json 一律删除后用 pnpm 重装。
- 开发某个子目录时，**只在该子目录范围内工作**，不要想着顺带修改另一个子目录的事情。
- 即使认为其他子目录似乎也需要相应改动，也不要自行跨项目修改；先向用户说明情况，由用户决定是否另行处理。

## 与 creativault 工作仓库的模式区分

本仓库是**平铺自治模式**（参照 `python_projects` 的管理方式）。真实项目 creativault（`C:\WorkingProjects\creativault*\frontend`）使用的是 **pnpm workspace + Turborepo + 根级 Biome** 的 workspace 共享模式——两者是不同的工程形态。

- 学习 monorepo/workspace 机制（P3 工程化内容）时，以 creativault 真实仓库为参照，不要把本仓库的结构当成它的样子。
- 本仓库刻意保持无根 `package.json`、无 workspace，是为了让每个练习项目自治、随学随建随弃。

## 约束

- 请使用中文回答
