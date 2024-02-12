require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const routes = require("./routes");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
