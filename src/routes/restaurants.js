const express = require("express");
const { body, param, validationResult } = require("express-validator");
const Restaurant = require("../../models");

const router = express.Router();

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.send(restaurants);
});

router.get(
  "/restaurants/:id",
  param("id").isInt().withMessage("ID must be an integer"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.send(restaurant);
  }
);

router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required"),
  body("location").notEmpty().withMessage("Location is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newRestaurant = await Restaurant.create(req.body);
    res.send(newRestaurant);
  }
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID must be an integer"),
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("location").optional().notEmpty().withMessage("Location cannot be empty"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updatedRestaurant = await Restaurant.update(req.body, {
      where: { id: req.params.id },
    });
    res.send(updatedRestaurant);
  }
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID must be an integer"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Restaurant.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  }
);

module.exports = router;
