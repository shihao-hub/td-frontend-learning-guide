# TypeScript 类型系统

> 作为 Python 开发者，你会发现 TypeScript 的类型注解与 Python 3.5+ 的类型提示非常相似

## 为什么需要 TypeScript？

```javascript
// JavaScript - 运行时才发现错误
function add(a, b) {
  return a + b;
}
add(1, '2');  // '12' - 字符串拼接，不是你想要的结果

// TypeScript - 编译时就发现错误
function add(a: number, b: number): number {
  return a + b;
}
add(1, '2');  // ❌ 编译错误：类型不匹配
```

**与 Python 类型提示对比**：
```python
# Python 类型提示（需要 mypy 检查）
def add(a: int, b: int) -> int:
    return a + b

add(1, '2')  # mypy 会报错
```

---

## 1. 基础类型

### 原始类型

```typescript
// 数字
let age: number = 25;
let price: number = 19.99;

// 字符串
let name: string = 'Alice';
let message: string = `Hello, ${name}`;

// 布尔值
let isActive: boolean = true;

// null 和 undefined
let nullable: null = null;
let notDefined: undefined = undefined;
```

**与 Python 对比**：
```python
# Python 类型提示
age: int = 25
name: str = 'Alice'
is_active: bool = True
nullable: None = None
```

### 数组

```typescript
// 数组类型声明（两种方式）
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ['a', 'b', 'c'];

// 只读数组
let readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4);  // ❌ 错误
```

**与 Python 对比**：
```python
from typing import List

numbers: List[int] = [1, 2, 3]
strings: List[str] = ['a', 'b', 'c']
```

### 元组（Tuple）

```typescript
// 固定长度和类型的数组
let user: [string, number] = ['Alice', 25];
let point: [number, number] = [10, 20];

// 访问元素
let name = user[0];  // string
let age = user[1];   // number
```

**与 Python 对比**：
```python
from typing import Tuple

user: Tuple[str, int] = ('Alice', 25)
point: Tuple[int, int] = (10, 20)
```

---

## 2. 对象类型

### Interface（接口）

```typescript
// 定义对象形状
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;        // 可选属性
  readonly role: string;  // 只读属性
}

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin'
};

// user.role = 'user';  // ❌ 错误：只读属性
```

**与 Python 对比**：
```python
from typing import TypedDict, Optional

class User(TypedDict):
    id: int
    name: str
    email: str
    age: Optional[int]  # 可选
    role: str

# 或使用 dataclass
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
    email: str
    role: str
    age: int | None = None
```

### Type Alias（类型别名）

```typescript
// 定义复杂类型
type ID = number | string;
type Status = 'pending' | 'approved' | 'rejected';

type User = {
  id: ID;
  name: string;
  status: Status;
};

// 使用
let userId: ID = 123;
userId = 'abc-123';  // ✅ 都可以

let status: Status = 'pending';
// status = 'invalid';  // ❌ 错误
```

**与 Python 对比**：
```python
from typing import Union, Literal

ID = Union[int, str]
Status = Literal['pending', 'approved', 'rejected']

class User:
    id: ID
    name: str
    status: Status
```

### Interface vs Type

```typescript
// Interface - 可以扩展
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type - 使用交叉类型
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};

// Interface - 可以重复声明（声明合并）
interface Window {
  title: string;
}
interface Window {
  size: number;
}
// Window 现在有 title 和 size

// Type - 不能重复声明
```

**推荐使用原则**：
- **对象形状** → 优先用 `interface`
- **联合类型、元组、工具类型** → 用 `type`
- **React 组件 Props** → 两者都可以，项目中常用 `interface`

---

## 3. 联合类型与交叉类型

### 联合类型（Union Types）

```typescript
// 可以是多种类型之一
type Result = string | number;

let result: Result;
result = 'success';  // ✅
result = 200;        // ✅
// result = true;    // ❌ 错误

// 字面量联合
type Status = 'loading' | 'success' | 'error';

function handleStatus(status: Status) {
  if (status === 'loading') {
    console.log('Loading...');
  } else if (status === 'success') {
    console.log('Success!');
  } else {
    console.log('Error!');
  }
}
```

**与 Python 对比**：
```python
from typing import Union, Literal

Result = Union[str, int]
Status = Literal['loading', 'success', 'error']

def handle_status(status: Status):
    if status == 'loading':
        print('Loading...')
    elif status == 'success':
        print('Success!')
    else:
        print('Error!')
```

### 交叉类型（Intersection Types）

```typescript
// 合并多个类型
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type Staff = Person & Employee;

const staff: Staff = {
  name: 'Alice',
  age: 25,
  employeeId: 'E001',
  department: 'Engineering'
};
```

---

## 4. 泛型（Generics）

### 基础泛型

```typescript
// 泛型函数
function identity<T>(value: T): T {
  return value;
}

let num = identity<number>(123);      // number
let str = identity<string>('hello');  // string
let auto = identity(true);            // 自动推断为 boolean

// 泛型数组
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = getFirst([1, 2, 3]);    // number
const firstName = getFirst(['a', 'b']);     // string
```

**与 Python 对比**：
```python
from typing import TypeVar, List, Optional

T = TypeVar('T')

def identity(value: T) -> T:
    return value

def get_first(arr: List[T]) -> Optional[T]:
    return arr[0] if arr else None
```

### 泛型接口

```typescript
// 响应包装
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

// 使用
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'Alice' },
  status: 200,
  message: 'Success'
};

const usersResponse: ApiResponse<User[]> = {
  data: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ],
  status: 200,
  message: 'Success'
};
```

**与 Python 对比**：
```python
from typing import Generic, TypeVar

T = TypeVar('T')

class ApiResponse(Generic[T]):
    data: T
    status: int
    message: str

class User:
    id: int
    name: str

user_response: ApiResponse[User] = ApiResponse(...)
users_response: ApiResponse[list[User]] = ApiResponse(...)
```

### 泛型约束

```typescript
// 约束泛型必须有某些属性
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength('hello');        // ✅ string 有 length
logLength([1, 2, 3]);      // ✅ array 有 length
// logLength(123);         // ❌ number 没有 length
```

---

## 5. 工具类型（Utility Types）

### Partial - 所有属性变为可选

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// 更新用户时可能只传部分字段
function updateUser(id: number, updates: Partial<User>) {
  // ...
}

updateUser(1, { name: 'New Name' });  // ✅ 只传 name
updateUser(1, { email: 'new@example.com' });  // ✅ 只传 email
```

### Required - 所有属性变为必需

```typescript
interface User {
  id: number;
  name?: string;
  email?: string;
}

type CompleteUser = Required<User>;
// 等同于
// {
//   id: number;
//   name: string;
//   email: string;
// }
```

### Pick - 选择部分属性

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

// 只选择公开信息
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
// {
//   id: number;
//   name: string;
//   email: string;
// }
```

### Omit - 排除部分属性

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 排除敏感信息
type SafeUser = Omit<User, 'password'>;
// {
//   id: number;
//   name: string;
//   email: string;
// }
```

### Record - 创建键值对类型

```typescript
// 所有键都是 string，值都是 number
type UserAges = Record<string, number>;

const ages: UserAges = {
  'Alice': 25,
  'Bob': 30
};

// 限定键的范围
type Status = 'idle' | 'loading' | 'success' | 'error';
type StatusMessages = Record<Status, string>;

const messages: StatusMessages = {
  idle: 'Not started',
  loading: 'Loading...',
  success: 'Success!',
  error: 'Error occurred'
};
```

---

## 6. 函数类型

### 函数签名

```typescript
// 函数类型定义
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;

// 可选参数
function greet(name: string, greeting?: string): string {
  return `${greeting || 'Hello'}, ${name}!`;
}

// 默认参数
function createUser(name: string, role: string = 'user') {
  return { name, role };
}

// 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

**与 Python 对比**：
```python
from typing import Callable, Optional

AddFunction = Callable[[int, int], int]

def add(a: int, b: int) -> int:
    return a + b

def greet(name: str, greeting: Optional[str] = None) -> str:
    return f"{greeting or 'Hello'}, {name}!"

def sum_numbers(*numbers: int) -> int:
    return sum(numbers)
```

### 函数重载

```typescript
// 函数重载（描述多种调用方式）
function parse(value: string): string[];
function parse(value: number): number;
function parse(value: string | number): string[] | number {
  if (typeof value === 'string') {
    return value.split(',');
  }
  return value;
}

const arr = parse('a,b,c');  // string[]
const num = parse(123);      // number
```

**Python 没有直接的函数重载，需要用 `@overload` 装饰器**。

---

## 7. 类型断言与类型守卫

### 类型断言（Type Assertion）

```typescript
// 告诉 TypeScript："相信我，我知道这是什么类型"
const input = document.getElementById('input') as HTMLInputElement;
input.value = 'Hello';

// 或使用尖括号语法（不推荐，与 JSX 冲突）
const input2 = <HTMLInputElement>document.getElementById('input');
```

### 类型守卫（Type Guards）

```typescript
// typeof 守卫
function process(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();  // TypeScript 知道这里是 string
  }
  return value * 2;  // TypeScript 知道这里是 number
}

// instanceof 守卫
class Dog {
  bark() { console.log('Woof!'); }
}
class Cat {
  meow() { console.log('Meow!'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// 自定义类型守卫
interface User {
  type: 'user';
  name: string;
}

interface Admin {
  type: 'admin';
  name: string;
  permissions: string[];
}

function isAdmin(account: User | Admin): account is Admin {
  return account.type === 'admin';
}

function checkPermissions(account: User | Admin) {
  if (isAdmin(account)) {
    console.log(account.permissions);  // TypeScript 知道这是 Admin
  }
}
```

---

## 8. React 中的 TypeScript

### 组件 Props

```typescript
// 函数组件的 Props 类型
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ children, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// 使用
<Button onClick={() => console.log('Clicked')}>
  Click Me
</Button>
```

### Hooks 类型

```typescript
// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// 复杂状态
interface FormState {
  email: string;
  password: string;
  errors: Record<string, string>;
}

const [form, setForm] = useState<FormState>({
  email: '',
  password: '',
  errors: {}
});

// useRef
const inputRef = useRef<HTMLInputElement>(null);

// useEffect（不需要类型注解）
useEffect(() => {
  // ...
}, []);
```

### 事件类型

```typescript
// 常见事件类型
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log(event.currentTarget);
}

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

// 组件中使用
interface FormProps {
  onSubmit: (data: FormData) => void;
}

function MyForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 9. 项目中的类型组织

### 类型文件结构

```
src/
├── types/
│   ├── user.ts          # 用户相关类型
│   ├── api.ts           # API 响应类型
│   ├── common.ts        # 通用类型
│   └── index.ts         # 统一导出
```

### 示例：用户类型

```typescript
// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = 'user' | 'admin' | 'moderator';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt'>>;
```

### 示例：API 响应类型

```typescript
// src/types/api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string>;
}
```

---

## 10. 常见模式

### 区分类型（Discriminated Unions）

```typescript
// 使用 type 字段区分
type LoadingState = {
  type: 'loading';
};

type SuccessState<T> = {
  type: 'success';
  data: T;
};

type ErrorState = {
  type: 'error';
  error: string;
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// 使用
function renderState<T>(state: AsyncState<T>) {
  switch (state.type) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <div>{state.data}</div>;  // TypeScript 知道有 data
    case 'error':
      return <Error message={state.error} />;  // TypeScript 知道有 error
  }
}
```

### 只读深层属性

```typescript
// 深层只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface Config {
  api: {
    url: string;
    timeout: number;
  };
}

const config: DeepReadonly<Config> = {
  api: {
    url: 'https://api.example.com',
    timeout: 5000
  }
};

// config.api.url = 'other';  // ❌ 错误：只读
```

---

## 实战练习

### 练习 1：定义用户系统类型

```typescript
// 定义完整的用户系统类型
interface User {
  id: number;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  role: 'user' | 'admin';
  createdAt: Date;
}

// 创建用户输入（排除自动生成的字段）
type CreateUserInput = Omit<User, 'id' | 'createdAt'>;

// 更新用户输入（所有字段可选，但不能改 id）
type UpdateUserInput = Partial<Omit<User, 'id'>>;

// 公开用户信息（排除敏感字段）
type PublicUser = Omit<User, 'email'>;
```

### 练习 2：API 响应泛型

```typescript
// 定义通用响应类型
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// 使用
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users');
  return response.json();
}
```

---

## 下一步

掌握 TypeScript 类型系统后，你可以：

1. **[异步编程](./03-异步编程.md)** - Promise 和 async/await
2. **[React 核心概念](../02-React核心/01-React-基础.md)** - 开始学习 React

---

## 常见问题

### Q: TypeScript 编译后是什么？
A: TypeScript 编译成纯 JavaScript，类型信息在编译时就被移除了。

### Q: 什么时候用 interface，什么时候用 type？
A: 
- 对象形状 → `interface`
- 联合类型、元组 → `type`
- React Props → 两者都可以，推荐 `interface`

### Q: `any` 和 `unknown` 的区别？
A:
```typescript
let a: any = 'hello';
a.foo();  // ✅ 编译通过（运行时报错）

let u: unknown = 'hello';
// u.foo();  // ❌ 编译错误：必须先检查类型
if (typeof u === 'string') {
  u.toUpperCase();  // ✅ 类型守卫后可以使用
}
```

### Q: 如何处理第三方库没有类型定义？
A:
```typescript
// 1. 安装 @types 包
npm install @types/lodash

// 2. 如果没有 @types，自己声明
declare module 'my-untyped-library' {
  export function doSomething(): void;
}
```
