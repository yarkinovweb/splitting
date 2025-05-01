const jwt = require("jsonwebtoken");
const { users } = require("../config/database");
const { v4: uuidv4 } = require("uuid");

exports.register = (username, email, password) => {
  let newUser = {
    id: uuidv4(),
    username,
    email,
    password,
    participatedProjects: [],
    ownedProjects: [],
  };
  users.push(newUser);
  return { ...newUser };
};

const secret_key = "asdfghjkl";

exports.login = (email, password) => {
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!foundUser) {
    return null;
  }

  const token = jwt.sign(foundUser, secret_key, { expiresIn: "1h" });
  return { token, id: foundUser.id };
};

exports.getAllUsers = () => {
  return users;
};

exports.getUserById = (id) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error("User not found!");
  }
  return { ...user };
};
