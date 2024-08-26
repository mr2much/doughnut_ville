require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json({ limit: "1mb" }));

app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Server up and running" });
});

app.get("/favicon.ico", (req, res) => {
  res.status(204);
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
