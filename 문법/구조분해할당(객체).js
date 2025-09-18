const user = { id: 1, username: "user1", name: "우효" };

// 객체에서 원하는 속성만 꺼내오기
const { id, username } = user;

// const id = user.id;
// const username = user.username;

console.log(id);       // 1
console.log(username); // "user1"