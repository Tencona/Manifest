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
	generate() {
		this.generateType(this.config.numTypes);

		this.generateItem(this.config.numItems);
	},

	// #region Raw Random Primitives
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
	},
	getRandomString(length, chars) {
		// https://stackoverflow.com/a/10727155
		let mask = '';
		if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
		if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (chars.indexOf('#') > -1) mask += '0123456789';
		if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
		let result = '';
		for (let i = length; i > 0; i -= 1) result += mask[Math.floor(Math.random() * mask.length)];
		return result;
	},
	getRandomDate() {
		return new Date(631173600000 + Math.floor(Math.random() * 1924905600000)); // 1/1/1990 to 12/31/2050
	},
	// #endregion
	// #region Misc
	chance(val) {
		if (val >= 100) return true;
		if (val <= 0) return false;

		return this.getRandomInt(1, 100) <= val;
	},
	// #endregion

	// #region GetRandom
	getRandomElement(collection) {
		// TODO add number to request an amount of random elements so the slice can be cached
		const arr = collection instanceof Map ? [...collection.values()] : [...collection];
		return arr[Math.floor(Math.random() * arr.length)];
	},
	getRandomItem() {
		return this.getRandomElement(this.Manifest.items);
	},
	getRandomType() {
		return this.getRandomElement(this.Manifest.types);
	},
	getRandomProperty() {
		return this.getRandomElement(this.Manifest.properties);
	},
	getRandomPropertyType() {
		return this.getRandomElement(Object.entries(this.Manifest.Config.VALUE_TYPES).map(x => x[1]));
	},
	// #endregion

	// #region Generate
	// #region Add TagTypes
	addTagType(that, type) {
		const rType = that.getRandomType();
		type.typeTags.set(rType.uuid, rType); // Not going to grab itself because it's not in `this.types` yet
	},
	generateType(number = 1) {
		for (let i = 0; i < number; i += 1) {
			const type = new this.Manifest.Models.Type(this.getRandomString(5, 'aA'));

			if (this.Manifest.types.length > 0 && this.chance(40)) {
				do {
					this.addTagType(this, type);
				} while (this.chance(20));
			}
			// #endregion

			const propertiesPerType = this.getRandomInt(1, this.config.numProperties);
			for (let p = 0; p < propertiesPerType; p += 1) {
				type.addProperty(this.generateProperty(type)[0]);
			}

			this.Manifest.addType(type);
		}
		// return this.Manifest.types.slice(number * -1);
	},
	generateItem(number = 1) {
		for (let i = 0; i < number; i += 1) {
			const item = new this.Manifest.Models.Item(this.getRandomType(), this.getRandomString(5, 'aA'));

			this.Manifest.addItem(item);
		}
		// return this.Manifest.items.slice(number * -1);
	},
	generateProperty(type, number = 1) {
		const arr = [];
		for (let i = 0; i < number; i += 1) {
			const property = new this.Manifest.Models.Property(
				this.getRandomString(5, 'aA'),
				type.uuid,
				this.getRandomPropertyType()
			);

			arr.push(property);
		}
		return arr;
	},
	// #endregion
};
