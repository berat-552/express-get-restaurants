const express = require("express");
const Restaurant = require("../../models");

const router = express.Router();

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.findAll();

  res.send(restaurants);
});

router.get("/restaurants/:id", async (request, response) => {
  response.send(Restaurant.findByPk(request.params.id));
});

router.post("/", async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body);

  res.send(newRestaurant);
});

router.put("/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.update(request.body, {
    where: { id: request.params.id },
  });

  response.send(updatedRestaurant);
});

router.delete("/:id", async (req, res) => {
  await Restaurant.destroy({ where: { id: req.params.id } });

  res.status(204);
});

module.exports = router;
