// 02 接口与类型别名：interface vs type
// Python 类比：TypedDict / dataclass / Protocol 的合体角色

// 1. interface：描述对象形状，可 extends 合并
interface User {
  id: number;
  name: string;
  email?: string; // ? 可选属性，类比 Python 里 Optional + 默认值
}

interface AdminUser extends User {
  permissions: string[];
}

const admin: AdminUser = {
  id: 1,
  name: "shawn",
  permissions: ["read", "write"],
};
console.log(admin);

// 2. type：同样能描述对象，还能描述联合、元组、函数签名等
type Status = "active" | "banned" | "pending"; // 字符串字面量联合，Python 的 Literal
type Point = [number, number]; // 元组，Python 的 tuple[float, float]
type Callback = (code: number) => void; // 函数类型，Python 的 Callable[[int], None]

const s: Status = "active";
const p: Point = [3, 4];
const cb: Callback = (code) => console.log("callback", code);
console.log(s, p);
cb(200);

// 3. 二者怎么选：对象形状优先 interface（可扩展、报错信息友好）；联合/工具类型用 type。
//    creativault 项目里两者混用，读代码时都能认出来即可。

// 4. 结构化类型（duck typing 的编译期版本）
interface HasLog {
  name: string;
  log(): void;
}
class ConsoleLogger {
  name: string = "ConsoleLogger";
  log() {
    console.log("structure ok, name: ", this.name);
  } // 没写 implements 也兼容——形状对就行
}
function run(l: HasLog) {
  l.log();
}
run(new ConsoleLogger());

// TODO(练习)1: 定义 Article interface（id, title, content, publishedAt?: string, tags: string[]）
interface Article {
  id: number;
  title: string;
  content: string;
  publishedAt?: string;
  tags: string[];
}

// TODO(练习)2: 用 type 定义 ApiResponse<T> 联合：{ ok: true; data: T } | { ok: false; error: string }（泛型先照抄，04 详讲）
type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string }

const apiResponse: ApiResponse<number> = {
  ok: true,
  data: 1,
}
console.log(apiResponse)

const apiResponse2: ApiResponse<string> = {
  ok: false,
  error: '1',
}
console.log(apiResponse2)


// TODO(练习)3: 声明一个满足 ApiResponse<string[]> 的成功值并打印
const apiResponse3: ApiResponse<string[]> = {
  ok: true,
  data: ['react', 'ts'],
}
console.log(apiResponse3)

export {};
