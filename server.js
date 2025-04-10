const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const userRoute = require("./src/routes/userRoute");

app.use(cors());
app.use(express.json());
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
