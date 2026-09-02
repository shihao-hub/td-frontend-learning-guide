// 03 联合 / 交叉 / 字面量 / 收窄
// 收窄（narrowing）是 TS 日常：TS 能根据分支条件把宽类型缩小

// 1. 联合类型：值可能是几种之一
type ID = number | string;

function printId(id: ID) {
  // 此处 id 是 number|string，直接 toUpperCase 会报错
  if (typeof id === "string") {
    console.log("字符串ID:", id.toUpperCase()); // 分支内收窄为 string
  } else {
    console.log("数字ID:", id.toFixed(2)); // 收窄为 number
  }
}
printId("abc-001");
printId(42);

// 2. 判别联合（discriminated union）：TS 最常用模式，前后端接口状态建模全靠它
type Result = { ok: true; data: string[] } | { ok: false; error: string };

function handle(r: Result) {
  if (r.ok) {
    console.log("数据:", r.data); // r 收窄为成功分支
  } else {
    console.error("失败:", r.error); // 失败分支
  }
}
handle({ ok: true, data: ["a", "b"] });
handle({ ok: false, error: "网络超时" });

// 3. in 收窄 / null 检查
interface Bird {
  fly: () => void;
}
interface Fish {
  swim: () => void;
}
function move(animal: Bird | Fish) {
  if ("fly" in animal) animal.fly();
  else animal.swim();
}
move({ swim: () => console.log("swimming") });

// 4. 交叉类型：合并多个类型的全部属性（& ）
type WithId = { id: number };
type WithTime = { createdAt: Date };
type Record2 = WithId & WithTime;
const r: Record2 = { id: 1, createdAt: new Date() };
console.log(r);

// 5. 非空断言与可选链（strict 模式的日常）
const maybeName: string | null = Math.random() > 0.5 ? "shawn" : null;
console.log(maybeName?.length ?? 0); // 可选链 + 空值合并，Python 里没有的直接对应物

// TODO(练习)1: 写 type Shape = {kind:'circle'; r:number} | {kind:'rect'; w:number; h:number}，
// 实现 area(s: Shape): number（提示 switch s.kind）

type Shape =
  { kind: "circle"; r: number } | { kind: "rect"; w: number; h: number };
function area(s: Shape): number {
  if (s.kind === "circle") {
    return Math.PI * s.r ** 2;
  } else {
    return s.w * s.h;
  }
}

// TODO(练习)2: 处理 API 返回的 value: string | null | undefined，安全打印长度
type RepValue = string | null | undefined

function print


export {};
