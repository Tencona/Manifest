export default {
	Manifest: {},
	types: [],
	items: [],
	properties: [],
	config: {
		numTypes: 3,
		numItems: 25,
		numProperties: 5,
	},
	init(manifest) {
		this.Manifest = manifest;
	},
	generate: function() {
		this.generateType(50);

		return {
			types: this.types,
			items: this.items,
			properties: this.properties,
		};
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
		if (chars.indexOf('!') > -1)
			mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
		var result = '';
		for (var i = length; i > 0; --i)
			result += mask[Math.floor(Math.random() * mask.length)];
		return result;
	},
	getRandomDate: function() {
		return new Date(
			631173600000 + Math.floor(Math.random() * 1924905600000)
		); //1/1/1990 to 12/31/2050
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
		return this.getRandomElement(this.items);
	},
	getRandomType: function() {
		return this.getRandomElement(this.types);
	},
	getRandomProperty: function() {
		return this.getRandomElement(this.properties);
	},
	getRandomPropertyType: function() {
		return this.getRandomElement(
			Object.entries(this.Manifest.Config.PROPERTY_TYPES).map(x => x[1])
		);
	},
	//#endregion

	//#region Generate
	generateType: function(number = 1) {
		let arr = [];
		for (let i = 0; i < number; i++) {
			let type = new this.Manifest.Models.Type(
				this.getRandomString(5, 'aA')
			);

			if (this.types.length > 0 && this.chance(20)) {
				type.parentType = this.getRandomType(); //Not going to grab itself because it's not in `this.types` yet
			}

			let propertiesPerType = this.getRandomInt(
				1,
				this.config.numProperties
			);
			for (let p = 0; p < propertiesPerType; p++) {
				type.addProperty(this.generateProperty()[0]);
			}

			arr.push(type);
			this.types.push(type);
		}
		return arr;
	},
	generateItem: function(number = 1) {
		let arr = [];
		for (let i = 0; i < number; i++) {
			let item = new this.Manifest.Models.Item(
				this.getRandomString(5, 'aA')
			);

			arr.push(item);
			this.items.push(item);
		}
		return arr;
	},
	generateProperty: function(number = 1) {
		let arr = [];
		for (let i = 0; i < number; i++) {
			let property = new this.Manifest.Models.Property(
				this.getRandomString(5, 'aA'),
				this.getRandomPropertyType()
			);

			arr.push(property);
			this.properties.push(property);
		}
		return arr;
	},
	//#endregion
};
