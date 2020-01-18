const { Gpio } = require('pigpio');

const led = new Gpio(17, {
    mode: Gpio.OUTPUT
});
 
let level = 0; 
let step = 5;

setInterval(() => {
 led.pwmWrite(level);
 //led.digitalWrite(1);
 level += step;

 if (level >= 255 || level <= 0)
   step *= -1;
}, 20);

const reader = new Gpio(18, {
   mode: Gpio.INPUT,
   pullUpDown: Gpio.PUP_DOWN,
   edge: Gpio.RISING_EDGE
});

reader.on('interrupt', power => console.log(`LED is ${power ? "on" : "off"}`));



