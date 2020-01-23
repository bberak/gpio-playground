const { Gpio } = require('pigpio');

[17, 18].forEach(pin => {
  const button = new Gpio(pin, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.EITHER_EDGE
  });

  button.on('interrupt', level => console.log(pin, level));
});
