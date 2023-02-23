const express = require("express");
const { Flight } = require("../models/Flight.model");

const flightRouter = express.Router();

flightRouter.get("/flights", async (req, res) => {
  let query = req.query;
  try {
    const flights = await Flight.find(query);
    res.status(200).send(flights);
  } catch (error) {
    res.status(400).send({ error });
  }
});

flightRouter.get("/flights/:id", async (req, res) => {
  const id = req.params.id;
  const flight = await Flight.findOne({ _id: id });
  try {
    res.status(200).send(flight);
  } catch (error) {
    res.status(400).send({ error });
  }
});

flightRouter.post("/flights", async (req, res) => {
  const payload = req.body;
  try {
    const new_flight = new Flight(payload);
    await new_flight.save();
    res.status(200).send("Created the flight");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

flightRouter.patch("/flights/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const flight = await Flight.findOne({ _id: id });
  try {
    if (!flight) {
      return res.send(`flight with id ${id} not found`);
    }
    await Flight.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send(`flight with id ${id} updated`);
  } catch (error) {
    res.status(400).send({ error });
  }
});

flightRouter.delete("/flights/:id", async (req, res) => {
  const id = req.params.id;
  const flight = await Flight.findOne({ _id: id });
  try {
    if (!flight) {
      return res.status(404).send(`flight with id ${id} not found`);
    }
    await Flight.findByIdAndDelete({ _id: id });
    res.status(200).send(`flight with id ${id} deleted`);
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { flightRouter };
