const express = require("express");
const app = express();
const restaurantsRouter = require("./routes/restaurants.js");
app.use(express.json());
app.use(express.urlencoded());

app.use("/restaurants", restaurantsRouter);

module.exports = app;
