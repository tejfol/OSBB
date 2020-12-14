const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  owner: { type: String },
  accountNumber: { type: String },
  area: { type: String },
  adress: { type: String },
  benefits: [String],
  phoneNumber: { type: String },
  services: {
    
    ////////////////
    electricityCost:{
      type: String
    },
    trashCost:{
      type: String
    },
    liftCost:{
      type: String
    },
    quarterCost:{
      type: String
    },
    gasCost:{
      type: String
    },
    waterCost:{
      type: String
    },
    /////////////
    electricityType:{
      type: String
    },
    trashType:{
      type: String
    },
    liftType:{
      type: String
    },
    quarterType:{
      type: String
    },
    gasType:{
      type: String
    },
    waterType:{
      type: String
    },

    
    electricity: {
      type: String
    },
    water: {
      type: String
    },
    trash: {
      type: String
    },
    lift: {
      type: String
    },
    quarter: {
      type: String
    },
    gas: {
      type: String
    },
    date: { type: Date, default: Date.now },
  },
  residents: [String],
});

let Apartments = mongoose.model("Apartments", apartmentSchema);

module.exports = Apartments;
