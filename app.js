const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();
const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(bodyParser.json());
app.use(cors());

// Serve only the static files form the dist directory
app.use(express.static("../dist/datis-ui"));
app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "../dist/datis-ui" })
);

mongoose
  .connect(
    "mongodb+srv://siddharth:" +
      "PJQVu6P23NKnwhe1" +
      "@cluster0.wsd5h.mongodb.net/datis?w=majority",
    connectConfig
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed! ");
  });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
