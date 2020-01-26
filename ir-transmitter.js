const { Gpio } = require('pigpio');

const ir = new Gpio(18, {
    mode: Gpio.OUTPUT
});
 
let on = true;

setInterval(() => {
 ir.digitalWrite(on);
 on = !on;
}, 1000);


