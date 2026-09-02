// React 应用的入口文件。
// 运行链路：index.html -> 这个文件 -> App.jsx 里的组件树 -> 真实 DOM
import { createRoot } from 'react-dom/client'
import Game from './App.jsx'
import './styles.css'

// 1. 拿到 index.html 里的 <div id="root">
const container = document.getElementById('root')

// 2. createRoot 把这个 DOM 节点交给 React 管理
const root = createRoot(container)

// 3. render 把组件树渲染进去。之后所有的 DOM 更新都由 React 负责，
//    你不需要再手写 document.createElement / innerHTML
root.render(<Game />)
