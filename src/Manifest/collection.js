import { Result, RESULT_TYPE } from '@/Manifest/models/result';
export default class Collection {
	constructor(name) {
		this._ = {};
		this._.name = name;
		this._.length = 0;
		//? Maybe hide all of the properties like "name" and whatever else I add under "_" and then on `get` if `obj[prop]` is null, check to see if `obj._[prop]` has it, otherwise, return undefined
		//* That should be quick enough and allow me to still do things like `collection.name`
		//* That's janky. I love it.

		//? Is there a performance loss to this?
		return new Proxy(this, {
			//If the prop exists in the obj, return it, otherwise look under obj._
			//This means you can access .name and add any other number of properties and have them all easily contained in one object
			get: function(obj, prop) {
				return prop in obj ? obj[prop] : prop in obj._ ? obj._[prop] : undefined;
			},

			//Checks to see if the property exists in the hidden properties first because otherwise it'll store everything there
			//If it's not a hiddeen property, it gets added to the collection
			//TODO? Should this set even be allowed?
			//? If the record doesn't exist, call add()?
			//* Calling add() if it doens't exist makes sense because if it *does* exist then it's just updating that value. But that shouldn't really ever happen either?
			set: function(obj, prop, value) {
				prop in obj._ ? (obj._[prop] = value) : (obj[prop] = value);
				return true;
			},
		});
	}

	add(record) {
		if (!record) throw Error('Must provide and a record');

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
			this.length++;
			return new Result(RESULT_TYPE.Success, `Successfully added record: ${record.uuid} to ${this.name}`, record);
		} else {
			return new Result(RESULT_TYPE.Error, `Unable to add record. Record invalid: ${record.uuid}`, record);
		}
	}

	remove(record) {
		if (!record) throw Error('Must provide a record');

		let foundRecord = this[record.uuid];
		if (foundRecord) {
			//oh yes
			delete this[record.uuid];
			return new Result(RESULT_TYPE.Success, `Removed record: ${record.uuid}`, record);
		} else {
			return new Result(
				RESULT_TYPE.Warning,
				`Unable to remove record - record not part of the collection: ${record.uuid}`,
				record
			);
		}
	}
}
