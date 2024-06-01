// models/Data.js

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  revenue: { type: Number, required: true },
  clicks: { type: Number, required: true },
  impressions: { type: Number, required: true },
  visits: { type: Number, required: true },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
