import { Result } from '@/Manifest/models/result';

export default class Collection extends Map {
	constructor(name, map) {
		super(map);
		this.name = name;
	}

	get length() {
		return this.size;
	}

	add(record) {
		if (!record) throw Error('Must provide and a record');

		const foundRecord = this.get(record.uuid);
		if (foundRecord) {
			// oh no
			return Result.error(
				`Unable to add to ${this.name}. Record with uuid already exists: ${record.uuid}`,
				record
			);
		}
		if (!foundRecord && record.isValid) {
			this.set(record.uuid, record);
			return Result.success(`Successfully added record: ${record.uuid} to ${this.name}`, record);
		}
		return Result.error(`Unable to add record. Record invalid: ${record.uuid}`, record);
	}

	remove(record) {
		if (!record) throw Error('Must provide a record');
		const { uuid } = record;
		const foundRecord = this.delete(uuid);
		if (foundRecord) {
			// oh yes
			return Result.success(`Removed record: ${uuid}`, record);
		}
		return Result.warning(`Unable to remove record - record not part of the collection: ${uuid}`, record);
	}

	// region Array functions for values only
	filter(expression) {
		return [...this.values()].filter(expression);
	}

	find(expression) {
		return [...this.values()].find(expression);
	}
	// #endregion
}
