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
console.log(userName, userRole);  // 'John' 'admin'

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
console.log(avatar);
