const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below:
app.get("/restaurants/:id", async (request, response) => {
  response.send(Restaurant.findByPk(request.params.id));
});

app.post("/restaurants", async (request, response) => {
  await Restaurant.create(request.body);
  response.status(204);
});

app.put("/restaurants/:id", async (request, response) => {
  const updatedRestaurant = await Restaurant.update(request.body, {
    where: { id: request.params.id },
  });

  response.send(updatedRestaurant);
});

app.delete("/restaurants/:id", async (request, response) => {
  await Restaurant.destroy({
    where: { id: request.params.id },
  });

  response.status(204);
});

module.exports = app;
