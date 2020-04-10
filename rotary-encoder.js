const { Gpio } = require('pigpio');

const switchButton = new Gpio(27, { 
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_DOWN,
	edge: Gpio.EITHER_EDGE
});

switchButton.on('interrupt', level => console.log('switchButton', level, new Date()));

let direction = 'cw';
let count = 0;

const channelA = new Gpio(17, {
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_UP,
	edge: Gpio.RISING_EDGE
});

const channelB = new Gpio(18, {
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_UP,
	edge: Gpio.RISING_EDGE
});

const onTwistClockwise = (a) => {	
	const b = channelB.digitalRead();
	
	if (a && !b) {
		count++;
		console.log(count);
	}
}


channelA.on('interrupt', onTwistClockwise);

const onTwistCounterClockwise = (b) => {
	const a = channelA.digitalRead();
	
	if (b && !a) {
		count--;
		console.log(count);
	}
}

channelB.on('interrupt', onTwistCounterClockwise);