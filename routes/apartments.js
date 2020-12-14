const express = require("express");
const Apartments = require("../models/apartments");
const Residents = require("../models/residents");
const router = express.Router();
const Tas = require('../models/tas')

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.owner != null && req.query.owner !== "") {
    searchOptions.owner = new RegExp(req.query.owner, "i");
  }
  try {
    
    const data = await Apartments.find(searchOptions);
    res.render("apartments/index", {
      apartments: data,
      searchOptions: req.query,
    });
  } catch (err) {
    console.log(err);
    res.redirect("apartments/index");
  }
});

router.post("/", async (req, res) => {
  let str = req.body.residents;

  console.log(req.body);

  const data = await new Apartments({
    owner: req.body.owner,
    accountNumber: req.body.accountNumber,
    area: req.body.area,
    adress: req.body.adress,
    benefits: req.body.benefits,
    phoneNumber: req.body.phoneNumber,
    services: req.body,
    residents: str == null ? "" : str,
  });
  try {
    
    const newApartment = await data.save();
    res.redirect("apartments");
  } catch (error) {
    console.log(error);
    res.render("apartments/new", {
      apartments: data,
      errorMessage: "Error creating apartment",
    });
  }
});

router.get("/new", async (req, res) => {
  const tas = await Tas.find({});
  const data = await Residents.find({});
  res.render("apartments/new", {
    apartments: new Apartments(),
    residents: data,
    tas: tas
  });
});

router.post("/update", async (req, res) => {
  console.log(req.body);
  const tas = await Tas.find({});
  let id = req.body.id.trim();
  let old = await Apartments.findById(id);

  await Apartments.findOneAndUpdate(
    { _id: id },
    {
      owner: req.body.owner,
      accountNumber: req.body.accountNumber,
      area: req.body.area,
      adress: req.body.adress,
      benefits: req.body.benefits,
      phoneNumber: req.body.phoneNumber,
      services: req.body,
      residents:
        req.body.residents == null ? old.residents : req.body.residents,
    }
  );
  res.redirect("/apartments");
});

router.get("/:id", async (req, res) => {
  const tas = await Tas.find({});
  const data = await Apartments.findById(req.params.id.trim());
  const residents = await Residents.find({});
  res.render("apartments/edit", { apartments: data, residents: residents, tas: tas });
});

router.get("/:id/del", async (req, res) => {
  const data = await Apartments.findById(req.params.id);
  await data.remove();
  res.redirect("/apartments");
});

module.exports = router;
