export default {
	Manifest: {},
	config: {
		numTypes: 50,
		numItems: 2500,
		numProperties: 5,
	},
	initialized: false,
	init(manifest, forceReinitialize) {
		if (this.initialized && !forceReinitialize) return;
		this.Manifest = manifest;
		this.properties = [];

		this.initialized = true;
	},
	generate: function() {
		var a = this.generateType(this.config.numTypes);

		this.generateItem(this.config.numItems);
	},

	//#region Raw Random Primitives
	getRandomInt: function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	getRandomString: function(length, chars) {
		//https://stackoverflow.com/a/10727155
		var mask = '';
		if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
		if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (chars.indexOf('#') > -1) mask += '0123456789';
		if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
		var result = '';
		for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
		return result;
	},
	getRandomDate: function() {
		return new Date(631173600000 + Math.floor(Math.random() * 1924905600000)); //1/1/1990 to 12/31/2050
	},
	//#endregion
	//#region Misc
	chance: function(val) {
		if (val >= 100) return true;
		else if (val <= 0) return false;

		return this.getRandomInt(1, 100) <= val ? true : false;
	},
	//#endregion

	//#region GetRandom
	getRandomElement: function(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	},
	getRandomItem: function() {
		return this.getRandomElement(this.Manifest.items);
	},
	getRandomType: function() {
		return this.getRandomElement(this.Manifest.types);
	},
	getRandomProperty: function() {
		return this.getRandomElement(this.Manifest.properties);
	},
	getRandomPropertyType: function() {
		return this.getRandomElement(Object.entries(this.Manifest.Config.VALUE_TYPES).map(x => x[1]));
	},
	//#endregion

	//#region Generate
	generateType: function(number = 1) {
		let arr = [];
		for (let i = 0; i < number; i++) {
			let type = new this.Manifest.Models.Type(this.getRandomString(5, 'aA'));

			if (this.Manifest.types.length > 0 && this.chance(20)) {
				type.parentType = this.getRandomType(); //Not going to grab itself because it's not in `this.types` yet
			}

			let propertiesPerType = this.getRandomInt(1, this.config.numProperties);
			for (let p = 0; p < propertiesPerType; p++) {
				type.addProperty(this.generateProperty()[0]);
			}

			this.Manifest.addType(type);
		}
		return this.Manifest.types.slice(number * -1);
	},
	generateItem: function(number = 1) {
		let arr = [];
		for (let i = 0; i < number; i++) {
			let item = new this.Manifest.Models.Item(this.getRandomType());

			this.Manifest.addItem(item);
		}
		return this.Manifest.items.slice(number * -1);
	},
	generateProperty: function(number = 1) {
		let arr = [];
		for (let i = 0; i < number; i++) {
			let property = new this.Manifest.Models.Property(
				this.getRandomString(5, 'aA'),
				this.getRandomPropertyType()
			);

			this.properties.push(property);
		}
		return this.properties.slice(number * -1);
	},
	//#endregion
};
