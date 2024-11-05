const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:
app.get("/restaurants/:id", async (request, response) => {
  response.send(Restaurant.findByPk(request.params.id));
});

module.exports = app;
