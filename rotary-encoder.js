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
	edge: Gpio.EITHER__EDGE
});

const onTwist = (a) => {	
	
	//const a = channelA.digitalRead();
	const b = channelB.digitalRead();
	
	if (a && !b) {
		count++;
		console.log(count);
	}

	/*	
	if (!a && b)
		direction = 'ccw';
	
	if (a && !b)
		direction = 'cw'

	if (a && b) {
		count = direction === 'cw' ? count + 1 : count - 1;
		console.log('count', count);
	}
	*/
}


channelA.on('interrupt', onTwist);
//channelB.on('interrupt', onTwist);
