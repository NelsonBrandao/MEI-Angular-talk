var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());

var MAX_TEMPERATURE = 40;
var MIN_TEMPERATURE = 30;

app.get('/currentTemperature', (req, res) => {
  res.json({
    temperature: Math.floor(
      Math.random() * (MAX_TEMPERATURE - MIN_TEMPERATURE) + MIN_TEMPERATURE
    ),
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
