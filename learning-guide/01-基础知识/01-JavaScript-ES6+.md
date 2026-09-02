# JavaScript ES6+ 核心特性

> 作为 Python 开发者，你会发现 JavaScript 的很多特性与 Python 类似

## 1. 变量声明

### const vs let vs var

```javascript
// const - 常量（类似 Python 的约定大写变量）
const API_URL = 'https://api.example.com';
const user = { name: 'John' };  // 对象内容可变，但不能重新赋值

// let - 块级作用域变量（推荐）
let count = 0;
count = 1;  // ✅ 可以重新赋值

// var - 函数作用域（避免使用，旧语法）
var oldStyle = 'deprecated';
```

**与 Python 对比**：
```python
# Python 没有严格的常量声明
API_URL = "https://api.example.com"  # 约定大写表示常量
count = 0
count = 1  # 可以重新赋值
```

**规则**：
- 默认使用 `const`
- 需要重新赋值时使用 `let`
- 永远不要使用 `var`

---

## 2. 箭头函数

### 基本语法

```javascript
// 传统函数
function add(a, b) {
  return a + b;
}

// 箭头函数（简洁）
const add = (a, b) => a + b;

// 多行函数体
const processUser = (user) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return { ...user, fullName };
};

// 单个参数可省略括号
const double = x => x * 2;

// 无参数
const getTimestamp = () => Date.now();
```

**与 Python Lambda 对比**：
```python
# Python lambda（仅支持单表达式）
add = lambda a, b: a + b
double = lambda x: x * 2

# Python 常规函数
def process_user(user):
    full_name = f"{user['firstName']} {user['lastName']}"
    return {**user, 'fullName': full_name}
```

**关键差异**：
- JavaScript 箭头函数可以多行，Python lambda 只能单表达式
- 箭头函数不绑定 `this`（重要！后面会讲）

---

## 3. 模板字符串

```javascript
// 使用反引号 ` 而非引号
const name = 'Alice';
const age = 25;

// 字符串插值
const greeting = `Hello, ${name}! You are ${age} years old.`;

// 多行字符串
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// 表达式计算
const message = `Next year you'll be ${age + 1}`;
```

**与 Python f-string 对比**：
```python
# Python f-string
name = "Alice"
age = 25
greeting = f"Hello, {name}! You are {age} years old."

# Python 多行字符串
html = f"""
  <div>
    <h1>{name}</h1>
    <p>Age: {age}</p>
  </div>
"""
```

---

## 4. 解构赋值

### 对象解构

```javascript
const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  role: 'admin'
};

// 提取属性
const { name, email } = user;
console.log(name);  // 'John'

// 重命名
const { name: userName, role: userRole } = user;

// 默认值
const { age = 18 } = user;  // user 没有 age，使用默认值

// 嵌套解构
const data = {
  user: {
    profile: {
      avatar: 'url'
    }
  }
};
const { user: { profile: { avatar } } } = data;
```

**与 Python 对比**：
```python
# Python 字典解包（需要手动）
user = {
    'id': 1,
    'name': 'John',
    'email': 'john@example.com'
}

# Python 没有原生解构语法，需要手动提取
name = user['name']
email = user['email']

# 或使用 **kwargs
def process(**kwargs):
    name = kwargs.get('name')
    email = kwargs.get('email')
```

### 数组解构

```javascript
const colors = ['red', 'green', 'blue'];

// 提取元素
const [first, second] = colors;
console.log(first);  // 'red'

// 跳过元素
const [, , third] = colors;

// 剩余元素
const [primary, ...others] = colors;
console.log(others);  // ['green', 'blue']
```

**与 Python 对比**：
```python
# Python 解包
colors = ['red', 'green', 'blue']
first, second, third = colors

# Python 剩余元素
first, *others = colors
```

---

## 5. 展开运算符（Spread Operator）

### 数组展开

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 合并数组
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// 复制数组（浅拷贝）
const copy = [...arr1];

// 添加元素
const withNew = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]
```

**与 Python 对比**：
```python
# Python 列表操作
arr1 = [1, 2, 3]
arr2 = [4, 5, 6]

# 合并
combined = arr1 + arr2

# 复制
copy = arr1.copy()  # 或 arr1[:]

# 解包
combined = [*arr1, *arr2]
```

### 对象展开

```javascript
const user = { name: 'John', age: 25 };
const location = { city: 'NYC', country: 'USA' };

// 合并对象
const profile = { ...user, ...location };
// { name: 'John', age: 25, city: 'NYC', country: 'USA' }

// 复制对象（浅拷贝）
const userCopy = { ...user };

// 更新属性（不可变更新）
const updated = { ...user, age: 26 };  // 创建新对象

// 添加新属性
const withEmail = { ...user, email: 'john@example.com' };
```

**与 Python 对比**：
```python
# Python 字典操作
user = {'name': 'John', 'age': 25}
location = {'city': 'NYC', 'country': 'USA'}

# 合并（Python 3.9+）
profile = user | location

# 或使用解包
profile = {**user, **location}

# 复制
user_copy = user.copy()

# 更新
updated = {**user, 'age': 26}
```

---

## 6. 默认参数

```javascript
// 函数默认参数
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

greet();  // 'Hello, Guest!'
greet('Alice');  // 'Hello, Alice!'
greet('Bob', 'Hi');  // 'Hi, Bob!'

// 对象默认值
function createUser({ name, age = 18, role = 'user' }) {
  return { name, age, role };
}

createUser({ name: 'Alice' });  
// { name: 'Alice', age: 18, role: 'user' }
```

**与 Python 完全一致**：
```python
def greet(name='Guest', greeting='Hello'):
    return f"{greeting}, {name}!"
```

---

## 7. 数组方法（重要！）

### map - 转换数组

```javascript
const numbers = [1, 2, 3, 4, 5];

// 每个元素乘以 2
const doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]

// 提取对象属性
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const names = users.map(user => user.name);  // ['Alice', 'Bob']
```

**与 Python 对比**：
```python
# Python map（返回迭代器）
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda n: n * 2, numbers))

# 或列表推导式（更常用）
doubled = [n * 2 for n in numbers]
names = [user['name'] for user in users]
```

### filter - 筛选数组

```javascript
const numbers = [1, 2, 3, 4, 5];

// 筛选偶数
const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]

// 筛选对象
const adults = users.filter(user => user.age >= 18);
```

**与 Python 对比**：
```python
# Python filter
evens = list(filter(lambda n: n % 2 == 0, numbers))

# 或列表推导式
evens = [n for n in numbers if n % 2 == 0]
adults = [user for user in users if user['age'] >= 18]
```

### reduce - 归约

```javascript
const numbers = [1, 2, 3, 4, 5];

// 求和
const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15

// 分组
const users = [
  { id: 1, role: 'admin' },
  { id: 2, role: 'user' },
  { id: 3, role: 'admin' }
];

const byRole = users.reduce((acc, user) => {
  if (!acc[user.role]) {
    acc[user.role] = [];
  }
  acc[user.role].push(user);
  return acc;
}, {});
// { admin: [...], user: [...] }
```

**与 Python 对比**：
```python
from functools import reduce

# Python reduce
numbers = [1, 2, 3, 4, 5]
sum_val = reduce(lambda acc, n: acc + n, numbers, 0)

# 或直接使用 sum()
sum_val = sum(numbers)
```

### 链式调用

```javascript
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 17, active: false },
  { name: 'Charlie', age: 30, active: true }
];

// 筛选活跃的成年用户，提取姓名
const activeAdultNames = users
  .filter(user => user.active)
  .filter(user => user.age >= 18)
  .map(user => user.name);
// ['Alice', 'Charlie']
```

**与 Python 对比**：
```python
# Python 需要嵌套或多步
active_adult_names = [
    user['name'] 
    for user in users 
    if user['active'] and user['age'] >= 18
]
```

---

## 8. 对象简写

```javascript
const name = 'Alice';
const age = 25;

// 属性简写
const user = { name, age };  
// 等同于 { name: name, age: age }

// 方法简写
const calculator = {
  // 旧写法
  add: function(a, b) {
    return a + b;
  },
  // 新写法
  subtract(a, b) {
    return a - b;
  }
};

// 动态属性名
const key = 'email';
const user2 = {
  name: 'Bob',
  [key]: 'bob@example.com'  // email: 'bob@example.com'
};
```

---

## 9. 可选链（Optional Chaining）

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'NYC'
  }
};

// 安全访问嵌套属性
const city = user?.address?.city;  // 'NYC'
const zip = user?.address?.zip;    // undefined（不会报错）

// 数组
const firstUser = users?.[0];

// 方法调用
user.getName?.();  // 如果 getName 存在则调用
```

**与 Python 对比**：
```python
# Python 需要手动检查
city = user.get('address', {}).get('city')

# 或使用 try-except
try:
    city = user['address']['city']
except (KeyError, TypeError):
    city = None
```

---

## 10. 空值合并（Nullish Coalescing）

```javascript
const value1 = null ?? 'default';     // 'default'
const value2 = undefined ?? 'default'; // 'default'
const value3 = 0 ?? 'default';        // 0（注意！0 不是 null）
const value4 = '' ?? 'default';       // ''（空字符串不是 null）

// 与 || 的区别
const a = 0 || 'default';    // 'default'（0 是 falsy）
const b = 0 ?? 'default';    // 0（0 不是 null/undefined）
```

**与 Python 对比**：
```python
# Python 没有直接等价物，通常用 or
value = some_var or 'default'

# 但 or 会把 0、'' 等视为 False
# 精确检查需要：
value = some_var if some_var is not None else 'default'
```

---

## 11. 模块系统

### 导出（Export）

```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export class Calculator {
  // ...
}

// 默认导出（每个文件只能有一个）
export default function multiply(a, b) {
  return a * b;
}
```

### 导入（Import）

```javascript
// 命名导入
import { PI, add } from './math.js';

// 导入并重命名
import { add as sum } from './math.js';

// 导入全部
import * as math from './math.js';
console.log(math.PI);

// 默认导入
import multiply from './math.js';

// 混合导入
import multiply, { PI, add } from './math.js';
```

**与 Python 对比**：
```python
# Python import
from math_module import PI, add
from math_module import add as sum
import math_module as math

# Python 没有"默认导出"概念
```

---

## 实战练习

### 练习 1：数组转换
```javascript
// 将用户列表转换为 {id: user} 的映射
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// 使用 reduce
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
```

### 练习 2：对象合并与更新
```javascript
// 不可变更新嵌套对象
const state = {
  user: {
    name: 'Alice',
    profile: {
      age: 25,
      city: 'NYC'
    }
  }
};

// 更新 age
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      age: 26
    }
  }
};
```

### 练习 3：链式调用
```javascript
// 处理 API 响应
const response = {
  data: [
    { id: 1, status: 'active', value: 100 },
    { id: 2, status: 'inactive', value: 50 },
    { id: 3, status: 'active', value: 200 }
  ]
};

// 筛选活跃项，提取值，求和
const total = response.data
  .filter(item => item.status === 'active')
  .map(item => item.value)
  .reduce((sum, val) => sum + val, 0);
// 300
```

---

## 下一步

掌握这些 ES6+ 特性后，你已经具备了阅读现代 JavaScript 代码的能力。接下来学习：

1. **[TypeScript 类型系统](./02-TypeScript-类型系统.md)** - 为 JavaScript 添加类型安全
2. **[异步编程](./03-异步编程.md)** - Promise 和 async/await（你已经熟悉 Python 版本）

---

## 常见问题

### Q: JavaScript 的 `this` 是什么？
A: `this` 在箭头函数和普通函数中行为不同，是 JavaScript 的复杂概念。在 React 中，我们主要使用箭头函数和 Hooks，很少直接操作 `this`。

### Q: 什么时候用 map，什么时候用 for 循环？
A: 
- 需要转换数组 → 用 `map`
- 需要筛选数组 → 用 `filter`
- 需要副作用（API 调用、日志）→ 用 `forEach` 或 `for`
- 需要提前退出 → 用 `for` + `break`

### Q: 如何深拷贝对象？
A:
```javascript
// 简单对象
const copy = JSON.parse(JSON.stringify(obj));

// 复杂对象（含函数、Date 等）
import { cloneDeep } from 'lodash';
const copy = cloneDeep(obj);

// 或使用 structuredClone（现代浏览器）
const copy = structuredClone(obj);
```
