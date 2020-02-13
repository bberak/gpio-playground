const mcpadc = require('mcp-spi-adc');

const sensor = mcpadc.open(7, {speedHz: 20000}, err => {
  if (err) throw err;

  setInterval(_ => {
    sensor.read((err, reading) => {
      if (err) throw err;

      //console.log(reading.value * 3.3);
      //console.log((reading.value * 3.3 - 0.5) * 100);
      console.log(reading);
    });
  }, 100);
});
