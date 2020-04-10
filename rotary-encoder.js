const { Gpio } = require("pigpio");

const createRotaryEncoder = ({
	buttonPin,
	channelAPin,
	channelBPin,
	onPushButton = () => {},
	onClockwise = () => {},
	onCounterClockwise = () => {},
} = {}) => {
	if (buttonPin) {
		const switchButton = new Gpio(buttonPin, {
			mode: Gpio.INPUT,
			pullUpDown: Gpio.PUD_UP,
			alert: true
		});
		
		switchButton.glitchFilter(10000);		

		const _onPushButton = (level) => {
			if (!level)
				onPushButton();
		};

		switchButton.on("alert", _onPushButton);
	}

	if (channelAPin && channelBPin) {
		const channelA = new Gpio(channelAPin, {
			mode: Gpio.INPUT,
			pullUpDown: Gpio.PUD_UP,
			edge: Gpio.RISING_EDGE
		});

		const channelB = new Gpio(channelBPin, {
			mode: Gpio.INPUT,
			pullUpDown: Gpio.PUD_UP,
			edge: Gpio.RISING_EDGE
		});

		const _onClockwise = (a) => {
			const b = channelB.digitalRead();

			if (a && !b) onClockwise();
		};

		channelA.on("interrupt", _onClockwise);

		const _onCounterClockwise = (b) => {
			const a = channelA.digitalRead();

			if (b && !a) onCounterClockwise();
		};

		channelB.on("interrupt", _onCounterClockwise);
	}
};

let count = 0;

const encoder = createRotaryEncoder({
	//channelAPin: 17,
	//channelBPin: 18,
	//onClockwise: () => console.log(++count),
	//onCounterClockwise: () => console.log(--count),
	buttonPin: 17,
	onPushButton: () => console.log(++count)
});
