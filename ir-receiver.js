const { Gpio } = require('pigpio');

const reader = new Gpio(18, {
   mode: Gpio.INPUT,
   pullUpDown: Gpio.PUP_DOWN,
   edge: Gpio.EITHER_EDGE,
   //alert: true
});

//reader.on('alert', console.log);
reader.on('interrupt', console.log);



