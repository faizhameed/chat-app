const users = [];

// addUser, removeUser,getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validateData
  if (!username || !room) {
    return {
      error: "Username and Room are required",
    };
  }

  //Check for existing user
  const existingUser = users.find(
    (user) => user.room === room && user.username === username
  );

  //validate username
  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

addUser({
  id: 22,
  username: "Faiz",
  room: "cool",
});

console.log(users);
const removedUser = removeUser(22);
console.log(removedUser, users);
