export class Collection {
	constructor(name) {
		this.name = name;

		return new Proxy(this, {
			get: function(obj, prop) {
				return prop in obj ? obj[prop] : 44;
			},

			set: function(obj, prop, value) {
				obj[prop] = value;
				return true;
			},
		});
	}
}
