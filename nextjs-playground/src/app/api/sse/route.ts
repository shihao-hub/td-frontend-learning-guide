// SSE Route Handler（P2）：ReadableStream 手写事件流
// 这就是 AI 对话流式输出的底层形态（creativault 的 useStream 最终也是消费这种流）

export const dynamic = 'force-dynamic' // 流式响应必须每次动态执行

const TOKENS = [
  '理解',
  ' SSE',
  ' 的',
  '关键',
  '：',
  '服务端',
  '一点点',
  '往',
  '响应流',
  '里',
  '写',
  '数据',
  '，',
  '浏览器',
  '边收',
  '边',
  '渲染',
  '。',
]

export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      // 模拟 LLM 逐 token 输出
      for (const token of TOKENS) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`)) // SSE 格式：data: xxx\n\n
        await new Promise((r) => setTimeout(r, 120))
      }
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
