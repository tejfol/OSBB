const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  owner: { type: String },
  accountNumber: { type: String },
  area: { type: String },
  adress: { type: String },
  benefits: [String],
  phoneNumber: { type: String },
  services: {
    electricity: {
      type: Boolean,
      default: false,
      cost: {
        type: String,
      },
    },
    water: {
      type: Boolean,
      default: false,
      cost: {
        type: String,
      },
    },
    trash: {
      type: Boolean,
      default: false,
      cost: {
        type: String,
      },
    },
    lift: {
      type: Boolean,
      default: false,
      cost: {
        type: String,
      },
    },
    quarter: {
      type: Boolean,
      default: false,
      cost: {
        type: String,
      },
    },
    gas: {
      type: Boolean,
      default: false,
      cost: {
        type: String,
      },
    },
    date: { type: Date, default: Date.now },
  },
  residents: [String],
});

let Apartments = mongoose.model("Apartments", apartmentSchema);

module.exports = Apartments;
