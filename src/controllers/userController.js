const userService = require("../services/userService");

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields!" });
  }
  const user = userService.register(username, email, password);
  return res.status(201).json({ user, message: "Successfully created!" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  let token = userService.login(email, password);

  if (!token) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.status(202).json({ token, message: "Login successful!" });
};

exports.getUsers = (req, res) => {
  const users = userService.getAllUsers();
  return res.status(200).json(users);
};
