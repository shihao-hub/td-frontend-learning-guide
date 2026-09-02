# React 组件基础

> React 的核心思想：UI = f(state)，用户界面是状态的函数

## 什么是组件？

组件是 React 应用的基本构建块，类似于 Python 的函数或类，但它返回的是 UI 描述。

**与后端对比**：
```python
# 后端：函数返回数据
def get_user(user_id: int) -> dict:
    return {"id": user_id, "name": "Alice"}

# 前端：组件返回 UI
function UserProfile({ userId }) {
  return <div>User ID: {userId}</div>
}
```

---

## 1. 创建第一个组件

### 函数组件（现代推荐）

```typescript
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

// 使用
<Button onClick={() => console.log('Clicked!')}>
  Click Me
</Button>
```

**组件规则**：
1. 组件名必须大写开头（`Button` 而非 `button`）
2. 返回 JSX（看起来像 HTML，实际是 JavaScript）
3. 可以接收 props（类似函数参数）

---

## 2. JSX 语法

JSX 是 JavaScript 的语法扩展，让你可以在 JavaScript 中写类似 HTML 的代码。

### 基本 JSX

```tsx
// JSX 表达式
const name = 'Alice';
const element = <h1>Hello, {name}!</h1>;

// 属性
const img = <img src="avatar.jpg" alt="Avatar" />;

// 子元素
const div = (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// 必须有一个根元素，或使用 Fragment
const fragment = (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

### JSX 中的 JavaScript 表达式

```tsx
function Greeting({ user }) {
  return (
    <div>
      {/* 变量 */}
      <h1>Hello, {user.name}!</h1>
      
      {/* 条件渲染 */}
      {user.isAdmin && <p>Admin User</p>}
      
      {/* 三元表达式 */}
      <p>{user.isActive ? 'Active' : 'Inactive'}</p>
      
      {/* 函数调用 */}
      <p>{formatDate(user.createdAt)}</p>
      
      {/* 数组方法 */}
      <ul>
        {user.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
```

**与 Python 模板对比**：
```python
# Python Jinja2 模板
"""
<div>
  <h1>Hello, {{ user.name }}!</h1>
  
  {% if user.is_admin %}
  <p>Admin User</p>
  {% endif %}
  
  <p>{{ 'Active' if user.is_active else 'Inactive' }}</p>
  
  <ul>
  {% for tag in user.tags %}
    <li>{{ tag }}</li>
  {% endfor %}
  </ul>
</div>
"""
```

### JSX 注意事项

```tsx
// ❌ 错误：class 是 JavaScript 保留字
<div class="container">

// ✅ 正确：使用 className
<div className="container">

// ❌ 错误：style 不能是字符串
<div style="color: red">

// ✅ 正确：style 是对象
<div style={{ color: 'red', fontSize: '16px' }}>

// ❌ 错误：多个根元素
return (
  <h1>Title</h1>
  <p>Content</p>
);

// ✅ 正确：使用 Fragment 或包装元素
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

---

## 3. Props（属性）

Props 是组件的输入，类似于函数参数。**Props 是只读的**。

### 基础 Props

```tsx
interface GreetingProps {
  name: string;
  age: number;
}

function Greeting({ name, age }: GreetingProps) {
  return <p>Hello, {name}! You are {age} years old.</p>;
}

// 使用
<Greeting name="Alice" age={25} />
```

### children Prop

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

// 使用
<Card title="User Profile">
  <p>Name: Alice</p>
  <p>Email: alice@example.com</p>
</Card>
```

### 默认值和可选 Props

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';  // 可选
  disabled?: boolean;
}

function Button({ 
  children, 
  variant = 'primary',  // 默认值
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Props 解构

```tsx
// ✅ 推荐：解构 props
function User({ name, email }: { name: string; email: string }) {
  return <div>{name} - {email}</div>;
}

// ❌ 不推荐：使用整个 props 对象
function User(props: { name: string; email: string }) {
  return <div>{props.name} - {props.email}</div>;
}
```

**与 Python 函数参数对比**：
```python
# Python 函数参数
def greeting(name: str, age: int = 18):
    return f"Hello, {name}! You are {age} years old."

# 关键字参数
greeting(name="Alice", age=25)
```

---

## 4. 条件渲染

### && 运算符

```tsx
function UserGreeting({ user }) {
  return (
    <div>
      {user.isLoggedIn && (
        <p>Welcome back, {user.name}!</p>
      )}
      
      {user.unreadMessages > 0 && (
        <p>You have {user.unreadMessages} unread messages</p>
      )}
    </div>
  );
}
```

### 三元运算符

```tsx
function Status({ isOnline }) {
  return (
    <div>
      {isOnline ? (
        <span className="online">Online</span>
      ) : (
        <span className="offline">Offline</span>
      )}
    </div>
  );
}
```

### 提前返回

```tsx
function UserProfile({ user }) {
  // 提前返回（loading 状态）
  if (!user) {
    return <div>Loading...</div>;
  }
  
  // 提前返回（错误状态）
  if (user.error) {
    return <div>Error: {user.error}</div>;
  }
  
  // 正常渲染
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### 复杂条件

```tsx
function Dashboard({ user, permissions }) {
  // 计算显示内容
  const canViewAnalytics = permissions.includes('analytics');
  const canManageUsers = permissions.includes('manage_users');
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {canViewAnalytics && <AnalyticsWidget />}
      {canManageUsers && <UserManagement />}
      
      {!canViewAnalytics && !canManageUsers && (
        <p>You don't have permission to view this page</p>
      )}
    </div>
  );
}
```

---

## 5. 列表渲染

### 基础列表

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

**key 的重要性**：
- `key` 帮助 React 识别哪些元素改变了
- 必须在列表中唯一
- 不要使用数组索引作为 key（除非列表永远不会重新排序）

```tsx
// ❌ 错误：使用索引作为 key（不稳定）
{users.map((user, index) => (
  <li key={index}>{user.name}</li>
))}

// ✅ 正确：使用唯一 ID
{users.map(user => (
  <li key={user.id}>{user.name}</li>
))}

// ✅ 正确：组合多个字段生成唯一 key
{items.map(item => (
  <div key={`${item.type}-${item.id}`}>
    {item.name}
  </div>
))}
```

### 提取列表项组件

```tsx
// 提取为独立组件
interface UserItemProps {
  user: User;
}

function UserItem({ user }: UserItemProps) {
  return (
    <li className="user-item">
      <img src={user.avatar} alt={user.name} />
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </li>
  );
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

### 筛选和排序列表

```tsx
function FilteredUserList({ users, searchTerm }: { 
  users: User[]; 
  searchTerm: string;
}) {
  // 筛选
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // 排序
  const sortedUsers = [...filteredUsers].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  
  return (
    <ul>
      {sortedUsers.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

---

## 6. 事件处理

### 基础事件

```tsx
function EventExample() {
  // 事件处理函数
  function handleClick() {
    console.log('Button clicked!');
  }
  
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('Input value:', event.target.value);
  }
  
  return (
    <div>
      {/* 点击事件 */}
      <button onClick={handleClick}>
        Click Me
      </button>
      
      {/* 内联箭头函数 */}
      <button onClick={() => console.log('Inline click')}>
        Inline
      </button>
      
      {/* 输入事件 */}
      <input onChange={handleInputChange} />
    </div>
  );
}
```

### 事件对象

```tsx
function FormExample() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();  // 阻止默认行为
    console.log('Form submitted');
  }
  
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      console.log('Enter pressed');
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input onKeyDown={handleKeyDown} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 传递参数给事件处理函数

```tsx
function TodoList({ todos }: { todos: Todo[] }) {
  function handleDelete(id: number) {
    console.log('Delete todo:', id);
  }
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          {/* 使用箭头函数传递参数 */}
          <button onClick={() => handleDelete(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

**常见事件类型**：
```typescript
// 鼠标事件
React.MouseEvent<HTMLButtonElement>
React.MouseEvent<HTMLDivElement>

// 键盘事件
React.KeyboardEvent<HTMLInputElement>

// 表单事件
React.FormEvent<HTMLFormElement>
React.ChangeEvent<HTMLInputElement>
React.ChangeEvent<HTMLSelectElement>
React.ChangeEvent<HTMLTextAreaElement>

// 焦点事件
React.FocusEvent<HTMLInputElement>
```

---

## 7. 组件组合

### 组合模式

```tsx
// 容器组件
function Container({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

// 组合使用
function Page() {
  return (
    <Container>
      <Header />
      <Content />
      <Footer />
    </Container>
  );
}
```

### Slot 模式（具名插槽）

```tsx
interface LayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

function Layout({ header, sidebar, content }: LayoutProps) {
  return (
    <div className="layout">
      <div className="header">{header}</div>
      <div className="main">
        <aside>{sidebar}</aside>
        <main>{content}</main>
      </div>
    </div>
  );
}

// 使用
<Layout
  header={<Header />}
  sidebar={<Sidebar />}
  content={<MainContent />}
/>
```

---

## 8. 实战示例

### 用户卡片组件

```tsx
// types.ts
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  isOnline: boolean;
}

// UserCard.tsx
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: number) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="user-card">
      {/* 头像和在线状态 */}
      <div className="avatar-container">
        <img src={user.avatar} alt={user.name} />
        {user.isOnline && <span className="online-badge">●</span>}
      </div>
      
      {/* 用户信息 */}
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        
        {/* 条件渲染角色徽章 */}
        {user.role === 'admin' && (
          <span className="badge badge-admin">Admin</span>
        )}
      </div>
      
      {/* 操作按钮 */}
      <div className="actions">
        {onEdit && (
          <button onClick={() => onEdit(user)}>
            Edit
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(user.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
```

### 用户列表组件

```tsx
// UserList.tsx
interface UserListProps {
  users: User[];
  searchTerm?: string;
  onEditUser?: (user: User) => void;
  onDeleteUser?: (userId: number) => void;
}

export function UserList({ 
  users, 
  searchTerm = '',
  onEditUser,
  onDeleteUser 
}: UserListProps) {
  // 筛选用户
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // 空状态
  if (filteredUsers.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found</p>
      </div>
    );
  }
  
  // 渲染列表
  return (
    <div className="user-list">
      {filteredUsers.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
      ))}
    </div>
  );
}
```

---

## 9. 最佳实践

### ✅ 组件设计原则

1. **单一职责**：每个组件只做一件事
2. **Props 接口明确**：使用 TypeScript 定义清晰的 Props
3. **可复用性**：通过 props 让组件灵活可配置
4. **组合优于继承**：使用组件组合而非继承

### ✅ 命名规范

```tsx
// 组件名：PascalCase
function UserProfile() {}

// Props 接口：组件名 + Props
interface UserProfileProps {}

// 事件处理函数：handle + 事件名
function handleClick() {}
function handleInputChange() {}

// 布尔值 props：is/has/should + 名词/动词
interface ButtonProps {
  isDisabled?: boolean;
  hasIcon?: boolean;
  shouldAutoFocus?: boolean;
}
```

### ✅ 文件组织

```
src/components/
├── UserCard/
│   ├── UserCard.tsx       # 组件实现
│   ├── UserCard.test.tsx  # 测试
│   ├── index.ts           # 导出
│   └── types.ts           # 类型定义（如果复杂）
```

---

## 下一步

掌握组件基础后，接下来学习：

1. **[Hooks - useState 和 useEffect](./02-Hooks-基础.md)** - 状态管理
2. **[组件间通信](./03-组件通信.md)** - Props 传递和状态提升

---

## 常见问题

### Q: 组件和元素的区别？
A:
- **组件**：可复用的 UI 单元，是函数或类
- **元素**：组件的实例，是对象

```tsx
// Button 是组件
function Button() { return <button>Click</button>; }

// <Button /> 是元素（组件的实例）
const element = <Button />;
```

### Q: 何时提取组件？
A: 当你发现：
- 代码重复
- 组件超过 300 行
- 某部分逻辑独立且可复用

### Q: Props 可以修改吗？
A: **不能！** Props 是只读的。需要修改时使用 state（下一章学习）。

```tsx
// ❌ 错误：修改 props
function Button({ label }: { label: string }) {
  label = 'New Label';  // ❌ 不允许
  return <button>{label}</button>;
}

// ✅ 正确：使用 state（下一章）
function Button({ initialLabel }: { initialLabel: string }) {
  const [label, setLabel] = useState(initialLabel);
  return <button>{label}</button>;
}
```
