import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 是开发服务器 + 打包工具。
// react 插件负责把 JSX 语法编译成浏览器能执行的 JS 函数调用。
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false, // 不自动打开浏览器，启动后手动访问 http://localhost:5173
  },
});
