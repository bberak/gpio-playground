const { Gpio } = require('pigpio');

const reader = new Gpio(17, {
   mode: Gpio.INPUT,
   pullUpDown: Gpio.PUP_DOWN,
   edge: Gpio.RISING_EDGE,
   alert: true
});

let count = 0;
reader.on('alert', () => { count++; console.log(`Interrupts: ${count}`);  });
//reader.on('interrupt', power => console.log(`Oscillator is ${power ? "on" : "off"}`));



