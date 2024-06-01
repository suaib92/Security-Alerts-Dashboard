// routes/data.js

const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// GET all data
router.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
