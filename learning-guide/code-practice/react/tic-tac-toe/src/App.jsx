// 井字棋（Tic-Tac-Toe）—— React 官方教程的完整实现
// 教程原文：https://zh-hans.react.dev/learn/tutorial-tic-tac-toe
//
// 这个文件里有三个组件，数据自上而下流动：
//   Game（持有所有状态）
//     └─ Board（只负责根据 props 画棋盘）
//          └─ Square（只负责画一个按钮）
//
// 这是 React 最核心的思想之一："状态上提"（lifting state up）：
// 谁需要协调多个子组件，状态就放在谁身上。

import { useState } from 'react'

// ---------------------------------------------------------------
// Square：最小的展示组件
// ---------------------------------------------------------------
// 它自己不存任何状态，显示什么、点击后干什么，全部由父组件通过 props 决定。
// 这种组件叫"受控组件"，好处是行为可预测、容易复用。
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

// ---------------------------------------------------------------
// Board：棋盘
// ---------------------------------------------------------------
// squares  —— 长度 9 的数组，元素是 'X' / 'O' / null
// xIsNext  —— 当前该谁走
// onPlay   —— 走完一步后通知父组件（Game）
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // 两种情况直接忽略点击：已经有人赢了，或者这格已经被占了
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    // 关键点：不要直接改 squares[i]，而是先复制一份再改。
    // React 靠"引用是否变化"判断要不要重新渲染，直接改原数组
    // 引用没变，React 就发现不了；而且保留旧数组才能实现"时间旅行"。
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'

    onPlay(nextSquares)
  }

  // 每次渲染都重新算一遍胜负和提示文字。
  // 这类能从 state 推导出来的值不要单独存成 state，算就行了。
  const winner = calculateWinner(squares)
  const status = winner
    ? '获胜者：' + winner
    : '下一位玩家：' + (xIsNext ? 'X' : 'O')

  return (
    <>
      <div className="status">{status}</div>
      {/* 这里为了对照教程写成手动展开，练习时可以试着改用 map 生成 */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

// ---------------------------------------------------------------
// Game：顶层组件，唯一持有状态的地方
// ---------------------------------------------------------------
export default function Game() {
  // history 存的是"每一步之后的棋盘快照"，初始只有一个全空棋盘
  const [history, setHistory] = useState([Array(9).fill(null)])
  // currentMove 表示现在看的是第几步
  const [currentMove, setCurrentMove] = useState(0)

  // 这两个值都能从上面的 state 推导出来，所以不需要额外的 useState
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    // slice(0, currentMove + 1) 的意思是：如果你回退到了第 2 步又落子，
    // 就把第 2 步之后的旧历史丢掉，从这里开辟新分支
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  // 用 map 把 history 数组转成一串按钮，这是 React 里渲染列表的标准做法。
  // key 用来告诉 React 列表项的身份，不写 key 控制台会警告。
  const moves = history.map((squares, move) => {
    const description = move > 0 ? '回到第 ' + move + ' 步' : '回到游戏开始'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------
// 纯函数：判断胜负
// ---------------------------------------------------------------
// 注意这里完全没有用到 React。这类纯逻辑抽出来单独写，
// 既好测试，也让组件保持清爽。
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // 三行
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // 三列
    [0, 4, 8],
    [2, 4, 6], // 两条对角线
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
