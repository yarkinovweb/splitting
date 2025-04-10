const jwt = require("jsonwebtoken");

const users = [];

exports.register = (username, email, password) => {
  let newUser = {
    // id: Math.random(),
    username,
    email,
    password,
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
  return token;
};

exports.getAllUsers = () => {
  return users;
};
