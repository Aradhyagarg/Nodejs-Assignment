const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json());

const dbConnect = require("./config/database");
dbConnect();

const routerMe = require("./routes/routers");
app.use("/api/v1", routerMe);

/*const routertax = require("./routes/routesTax");
app.use("/api/v2", routertax);*/

app.get("/", (req, res) => {
  res.send("hi");
})

const PORT = process.env.PORT;

app.listen((PORT), () => {
  console.log(`Server is running on port ${PORT}`);
});
