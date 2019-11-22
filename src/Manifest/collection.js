import { Result, RESULT_TYPE } from '@/Manifest/models/result';
export default class Collection {
	constructor(name) {
		this._ = {};
		this._.name = name;
		//? Maybe hide all of the properties like "name" and whatever else I add under "_" and then on `get` if `obj[prop]` is null, check to see if `obj._[prop]` has it, otherwise, return undefined
		//* That should be quick enough and allow me to still do things like `collection.name`
		//* That's janky. I love it.

		//? Is there a performance loss to this?
		return new Proxy(this, {
			get: function(obj, prop) {
				return prop in obj ? obj[prop] : prop in obj._ ? obj._[prop] : undefined;
			},

			set: function(obj, prop, value) {
				prop in obj._ ? (obj._[prop] = value) : (obj[prop] = value);
				return true;
			},
		});
	}

	add(record) {
		if (!record) throw Error('Must provide a collection and a record');

		let foundRecord = this[record.uuid];
		if (foundRecord) {
			//oh no
			return new Result(
				RESULT_TYPE.Error,
				`Unable to add to ${this.name}. Record with uuid already exists: ${record.uuid}`,
				record
			);
		} else if (!foundRecord && record.isValid) {
			this[record.uuid] = record;
			return new Result(RESULT_TYPE.Success, `Successfully added record: ${record.uuid} to ${this.name}`, record);
		} else {
			return new Result(RESULT_TYPE.Error, `Unable to add record. Record invalid: ${record.uuid}`, record);
		}
	}
}
