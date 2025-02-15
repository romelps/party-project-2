const express = require('express');
const mongoose = require('mongoose');
const PartyPlanner = require('./models/party');

const app = express();
const PORT = process.env.PORT || 3000;

// ...existing code...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
