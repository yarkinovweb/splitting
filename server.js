const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const userRoute = require("./src/routes/userRoute");
const projectRoute = require("./src/routes/projectRoute");

app.use(cors());
app.use(express.json());

app.use("/auth", userRoute);
app.use("/project", projectRoute);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
