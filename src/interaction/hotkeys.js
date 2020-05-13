export default class Hotkeys {
	static keyCodes = [
		// This is every keycode with a descriptor.
		{
			keyCode: 3,
			keyDesc: ['break'],
		},
		{
			keyCode: 8,
			keyDesc: ['backspace', 'back'],
		},
		{
			keyCode: 9,
			keyDesc: ['tab'],
		},
		{
			keyCode: 12,
			keyDesc: ['clear'],
		},
		{
			keyCode: 13,
			keyDesc: ['enter'],
		},
		{
			keyCode: 16,
			keyDesc: ['shift'],
			modifier: true,
		},
		{
			keyCode: 17,
			keyDesc: ['ctrl', 'control'],
			modifier: true,
		},
		{
			keyCode: 18,
			keyDesc: ['alt'],
			modifier: true,
		},
		{
			keyCode: 19,
			keyDesc: ['pause'],
		},
		{
			keyCode: 20,
			keyDesc: ['caps lock'],
		},
		{
			keyCode: 27,
			keyDesc: ['escape', 'esc'],
		},
		{
			keyCode: 32,
			keyDesc: ['spacebar', 'space'],
		},
		{
			keyCode: 33,
			keyDesc: ['page up', 'pgup'],
		},
		{
			keyCode: 34,
			keyDesc: ['page down', 'pgdn'],
		},
		{
			keyCode: 35,
			keyDesc: ['end'],
		},
		{
			keyCode: 36,
			keyDesc: ['home'],
		},
		{
			keyCode: 37,
			keyDesc: ['left arrow', 'left'],
		},
		{
			keyCode: 38,
			keyDesc: ['up arrow', 'up'],
		},
		{
			keyCode: 39,
			keyDesc: ['right arrow', 'right'],
		},
		{
			keyCode: 40,
			keyDesc: ['down arrow', 'down'],
		},
		{
			keyCode: 41,
			keyDesc: ['select'],
		},
		{
			keyCode: 42,
			keyDesc: ['print'],
		},
		{
			keyCode: 43,
			keyDesc: ['execute'],
		},
		{
			keyCode: 44,
			keyDesc: ['print screen', 'prntscrn'],
		},
		{
			keyCode: 45,
			keyDesc: ['insert', 'ins'],
		},
		{
			keyCode: 46,
			keyDesc: ['delete', 'del'],
		},
		{
			keyCode: 48,
			keyDesc: ['0'],
		},
		{
			keyCode: 49,
			keyDesc: ['1'],
		},
		{
			keyCode: 50,
			keyDesc: ['2'],
		},
		{
			keyCode: 51,
			keyDesc: ['3'],
		},
		{
			keyCode: 52,
			keyDesc: ['4'],
		},
		{
			keyCode: 53,
			keyDesc: ['5'],
		},
		{
			keyCode: 54,
			keyDesc: ['6'],
		},
		{
			keyCode: 55,
			keyDesc: ['7'],
		},
		{
			keyCode: 56,
			keyDesc: ['8'],
		},
		{
			keyCode: 57,
			keyDesc: ['9'],
		},
		{
			keyCode: 58,
			keyDesc: [':'],
		},
		{
			keyCode: 59,
			keyDesc: ['equals', '='],
		},
		{
			keyCode: 60,
			keyDesc: ['<'],
		},
		{
			keyCode: 61,
			keyDesc: ['equals (firefox)'],
		},
		{
			keyCode: 63,
			keyDesc: ['ß'],
		},
		{
			keyCode: 64,
			keyDesc: ['@ (firefox)'],
		},
		{
			keyCode: 65,
			keyDesc: ['a'],
		},
		{
			keyCode: 66,
			keyDesc: ['b'],
		},
		{
			keyCode: 67,
			keyDesc: ['c'],
		},
		{
			keyCode: 68,
			keyDesc: ['d'],
		},
		{
			keyCode: 69,
			keyDesc: ['e'],
		},
		{
			keyCode: 70,
			keyDesc: ['f'],
		},
		{
			keyCode: 71,
			keyDesc: ['g'],
		},
		{
			keyCode: 72,
			keyDesc: ['h'],
		},
		{
			keyCode: 73,
			keyDesc: ['i'],
		},
		{
			keyCode: 74,
			keyDesc: ['j'],
		},
		{
			keyCode: 75,
			keyDesc: ['k'],
		},
		{
			keyCode: 76,
			keyDesc: ['l'],
		},
		{
			keyCode: 77,
			keyDesc: ['m'],
		},
		{
			keyCode: 78,
			keyDesc: ['n'],
		},
		{
			keyCode: 79,
			keyDesc: ['o'],
		},
		{
			keyCode: 80,
			keyDesc: ['p'],
		},
		{
			keyCode: 81,
			keyDesc: ['q'],
		},
		{
			keyCode: 82,
			keyDesc: ['r'],
		},
		{
			keyCode: 83,
			keyDesc: ['s'],
		},
		{
			keyCode: 84,
			keyDesc: ['t'],
		},
		{
			keyCode: 85,
			keyDesc: ['u'],
		},
		{
			keyCode: 86,
			keyDesc: ['v'],
		},
		{
			keyCode: 87,
			keyDesc: ['w'],
		},
		{
			keyCode: 88,
			keyDesc: ['x'],
		},
		{
			keyCode: 89,
			keyDesc: ['y'],
		},
		{
			keyCode: 90,
			keyDesc: ['z'],
		},
		{
			keyCode: 91,
			keyDesc: ['windows key', 'left ⌘', 'chromebook search key'],
		},
		{
			keyCode: 92,
			keyDesc: ['right window key'],
		},
		{
			keyCode: 93,
			keyDesc: ['windows menu', 'right ⌘'],
		},
		{
			keyCode: 96,
			keyDesc: ['numpad 0'],
		},
		{
			keyCode: 97,
			keyDesc: ['numpad 1'],
		},
		{
			keyCode: 98,
			keyDesc: ['numpad 2'],
		},
		{
			keyCode: 99,
			keyDesc: ['numpad 3'],
		},
		{
			keyCode: 100,
			keyDesc: ['numpad 4'],
		},
		{
			keyCode: 101,
			keyDesc: ['numpad 5'],
		},
		{
			keyCode: 102,
			keyDesc: ['numpad 6'],
		},
		{
			keyCode: 103,
			keyDesc: ['numpad 7'],
		},
		{
			keyCode: 104,
			keyDesc: ['numpad 8'],
		},
		{
			keyCode: 105,
			keyDesc: ['numpad 9'],
		},
		{
			keyCode: 106,
			keyDesc: ['multiply', '*'],
		},
		{
			keyCode: 107,
			keyDesc: ['add', '+'],
		},
		{
			keyCode: 108,
			keyDesc: ['numpad period (firefox)'],
		},
		{
			keyCode: 109,
			keyDesc: ['subtract', '-'],
		},
		{
			keyCode: 110,
			keyDesc: ['decimal point'],
		},
		{
			keyCode: 111,
			keyDesc: ['divide'],
		},
		{
			keyCode: 112,
			keyDesc: ['f1'],
		},
		{
			keyCode: 113,
			keyDesc: ['f2'],
		},
		{
			keyCode: 114,
			keyDesc: ['f3'],
		},
		{
			keyCode: 115,
			keyDesc: ['f4'],
		},
		{
			keyCode: 116,
			keyDesc: ['f5'],
		},
		{
			keyCode: 117,
			keyDesc: ['f6'],
		},
		{
			keyCode: 118,
			keyDesc: ['f7'],
		},
		{
			keyCode: 119,
			keyDesc: ['f8'],
		},
		{
			keyCode: 120,
			keyDesc: ['f9'],
		},
		{
			keyCode: 121,
			keyDesc: ['f10'],
		},
		// {
		//   keyCode: 122,
		//   keyDesc: ["f11"],
		//   ignore: true
		// },
		// {
		//   keyCode: 123,
		//   keyDesc: ["f12"],
		//   ignore: true
		// },
		{
			keyCode: 124,
			keyDesc: ['f13'],
		},
		{
			keyCode: 125,
			keyDesc: ['f14'],
		},
		{
			keyCode: 126,
			keyDesc: ['f15'],
		},
		{
			keyCode: 127,
			keyDesc: ['f16'],
		},
		{
			keyCode: 128,
			keyDesc: ['f17'],
		},
		{
			keyCode: 129,
			keyDesc: ['f18'],
		},
		{
			keyCode: 130,
			keyDesc: ['f19'],
		},
		{
			keyCode: 131,
			keyDesc: ['f20'],
		},
		{
			keyCode: 132,
			keyDesc: ['f21'],
		},
		{
			keyCode: 133,
			keyDesc: ['f22'],
		},
		{
			keyCode: 134,
			keyDesc: ['f23'],
		},
		{
			keyCode: 135,
			keyDesc: ['f24'],
		},
		{
			keyCode: 144,
			keyDesc: ['num lock'],
		},
		{
			keyCode: 145,
			keyDesc: ['scroll lock'],
		},
		{
			keyCode: 160,
			keyDesc: ['^'],
		},
		{
			keyCode: 161,
			keyDesc: ['!'],
		},
		{
			keyCode: 163,
			keyDesc: ['#'],
		},
		{
			keyCode: 164,
			keyDesc: ['$'],
		},
		{
			keyCode: 165,
			keyDesc: ['ù'],
		},
		{
			keyCode: 166,
			keyDesc: ['page backward'],
		},
		{
			keyCode: 167,
			keyDesc: ['page forward'],
		},
		{
			keyCode: 169,
			keyDesc: ['closing paren (AZERTY)'],
		},
		{
			keyCode: 170,
			keyDesc: ['*'],
		},
		{
			keyCode: 171,
			keyDesc: ['~ + * key'],
		},
		{
			keyCode: 173,
			keyDesc: ['minus (firefox)', 'mute/unmute'],
		},
		{
			keyCode: 174,
			keyDesc: ['decrease volume level'],
		},
		{
			keyCode: 175,
			keyDesc: ['increase volume level'],
		},
		{
			keyCode: 176,
			keyDesc: ['next'],
		},
		{
			keyCode: 177,
			keyDesc: ['previous'],
		},
		{
			keyCode: 178,
			keyDesc: ['stop'],
		},
		{
			keyCode: 179,
			keyDesc: ['play/pause'],
		},
		{
			keyCode: 180,
			keyDesc: ['e-mail'],
		},
		{
			keyCode: 181,
			keyDesc: ['mute/unmute (firefox)'],
		},
		{
			keyCode: 182,
			keyDesc: ['decrease volume level (firefox)'],
		},
		{
			keyCode: 183,
			keyDesc: ['increase volume level (firefox)'],
		},
		{
			keyCode: 186,
			keyDesc: ['semi-colon', ';', 'ñ'],
		},
		{
			keyCode: 187,
			keyDesc: ['equal sign', 'equals'],
		},
		{
			keyCode: 188,
			keyDesc: ['comma'],
		},
		{
			keyCode: 189,
			keyDesc: ['dash'],
		},
		{
			keyCode: 190,
			keyDesc: ['period'],
		},
		{
			keyCode: 191,
			keyDesc: ['forward slash', 'ç'],
		},
		{
			keyCode: 192,
			keyDesc: ['grave accent', 'ñ', 'æ'],
		},
		{
			keyCode: 193,
			keyDesc: ['?', '/', '°'],
		},
		{
			keyCode: 194,
			keyDesc: ['numpad period (chrome)'],
		},
		{
			keyCode: 219,
			keyDesc: ['open bracket'],
		},
		{
			keyCode: 220,
			keyDesc: ['back slash'],
		},
		{
			keyCode: 221,
			keyDesc: ['close bracket', 'å'],
		},
		{
			keyCode: 222,
			keyDesc: ['single quote', 'ø'],
		},
		{
			keyCode: 223,
			keyDesc: ['`'],
		},
		{
			keyCode: 224,
			keyDesc: ['left or right ⌘ key (firefox)'],
		},
		{
			keyCode: 225,
			keyDesc: ['altgr'],
		},
		{
			keyCode: 226,
			keyDesc: ['< /git >'],
		},
		{
			keyCode: 230,
			keyDesc: ['GNOME Compose Key'],
		},
		{
			keyCode: 231,
			keyDesc: ['ç'],
		},
		{
			keyCode: 233,
			keyDesc: ['XF86Forward'],
		},
		{
			keyCode: 234,
			keyDesc: ['XF86Back'],
		},
		{
			keyCode: 255,
			keyDesc: ['toggle touchpad'],
		},
	];

	static activeKeys = [];

	static keyFunctions = [];

	static initialize() {
		document.onkeydown = function(e) {
			Hotkeys.keyDown(e);
		};
		document.onkeyup = function(e) {
			Hotkeys.keyUp(e);
		};

		this.add([
			{
				keys: ['control', 'q'],
				func() {
					console.log('hotkeys active');
				},
			},
			{ keys: ['ctrl', 'z'], func: Hotkeys.undo },
			{ keys: ['ctrl', 'y'], func: Hotkeys.redo },
		]);
	}

	// Used to interpret what keys were sent
	// Any modifier key *MUST* be accompanied by at least some regular key.
	static interpretKeyStrings = function(keys) {
		if (keys.every(x => x.modifier)) {
			throw Error('Cannot use a modifier key by itself. It must be accompanied by a regular key.');
		}

		const rKeys = []; // Resolved keys
		for (let i = 0; i < keys.length; i += 1) {
			const lower = keys[i].toLowerCase().trim();
			const desiredKey = this.keyCodes.find(x => x.keyDesc.includes(lower));
			if (desiredKey) rKeys.push(desiredKey.keyCode);
			else {
				throw Error(
					`No corresponding key found for input: ${keys[i]}\nPlease check Hotkeys.js keyCodes for the correct input.`
				);
			}
		}
		return rKeys;
	};

	// Used for adding new Hotkeys
	static add = function(bindings) {
		bindings.forEach(bind => {
			bind.keys = this.interpretKeyStrings(bind.keys); // Turns key strings into numbers.

			const isFunction = function(functionToCheck) {
				const getType = {};
				return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
			};
			if (!isFunction(bind.func)) throw Error(`Invalid function provided for hotkey: ${bind.keys.join(', ')}`);
			this.keyFunctions.push({
				keys: bind.keys,
				func: bind.func,
			});
		});
	};

	// Runs on keydown, capturing keys for my key prison
	static keyDown = function(e) {
		const event = e || window.event;

		if (
			document.activeElement.tagName.includes('INPUT') ||
			document.activeElement.tagName.includes('TEXTAREA') ||
			!document.hasFocus() // To allow input instead of triggering a hotkey while in a form, and to make sure we're not capturing when the window isn't focused.
		) {
			return;
		}
		if (!this.keyCodes.find(x => x.keyCode === event.keyCode)) return;

		this.activeKeys = [];
		if (event.shiftKey) this.activeKeys.push(16);
		if (event.ctrlKey) this.activeKeys.push(17);
		if (event.altKey) this.activeKeys.push(18);
		// Add new key afterwards so it doesn't double up
		if (!this.activeKeys.find(x => x === event.keyCode)) this.activeKeys.push(event.keyCode);

		// See if they've got a combo to run and prevent the default keybinds.
		if (this.activeKeys.some(x => !this.keyCodes.find(y => y.keyCode === x).modifier)) {
			// If there are any keys that are not a modifier, proceed.
			const binding = this.keyFunctions.find(x => x.keys.equals(this.activeKeys));
			if (binding) {
				event.preventDefault();
				binding.func();
			}
		}
	};

	// Remove all activeKeys because as soon as any key is let go, we're no longer looking for a combo
	static keyUp = function() {
		this.activeKeys = [];
	};

	// ? Where do I want to actually put these functions?
	// TODO: undo and redo
	static undo = function() {
		console.log('Undo hotkey triggered! It\'s super ineffective!');
	};

	static redo = function() {
		console.log('Redo hotkey triggered! It\'s super ineffective!');
	};
}
