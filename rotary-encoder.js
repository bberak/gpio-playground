const { Gpio } = require("pigpio");

const createRotaryEncoder = ({
	channelAPin = 17,
	channelBPin = 18,
	buttonPin = 27,
	onPushButton = () => {},
	onClockwise = () => {},
	onCounterClockwise = () => {},
} = {}) => {
	const switchButton = new Gpio(buttonPin, {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_DOWN,
		edge: Gpio.EITHER_EDGE,
	});

	switchButton.on("interrupt", onPushButton);

	const channelA = new Gpio(channelAPin, {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_UP,
		edge: Gpio.RISING_EDGE,
	});

	const channelB = new Gpio(channelBPin, {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_UP,
		edge: Gpio.RISING_EDGE,
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
};

const encoder = createRotaryEncoder({
	channelAPin: 17,
	channelBPin: 18,
	onClockwise: () => console.log("CW", new Date()),
	onCounterClockwise: () => console.log("CCW", new Date()),
});
