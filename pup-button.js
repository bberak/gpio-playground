const { Gpio } = require('pigpio');

[2, 3, 23, 24, 12, 26, 20].forEach(pin => {
  const button = new Gpio(pin, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.EITHER_EDGE
  });

  button.on('interrupt', level => console.log(pin, level));
});
