/*
* n o t e s
! ---------------------------------------------------------
! ---------------------------------------------------------
! ---------------------------------------------------------
! ---------------------------------------------------------
! ---------------------------------------------------------
? Need to make a decision. Crawl up Type hierarchy and make Properties Collection, or leave Properties under Types and that's it.
* If Properties are their own collection, how do you easily roll up the properties from Types? Right now they're in an array.
* Maybe Properties don't need to be a higher-level model. Perhaps they could exist just under Types and that's it.
* Why did I need to reference Properties quickly?

* Looking for Properties wouldn't be too bad? Crawl up the Type inheritence and collect all of their Property uuids in an array, then search the Properties Collection.
! ---------------------------------------------------------
! ---------------------------------------------------------
! ---------------------------------------------------------
! ---------------------------------------------------------
! ---------------------------------------------------------
TODO Types need a Key! One Key Property that gets searched first before other things get searched. I am such a dumb dumb for not thinking of that sooner.

* * * * * * * * * * * * * * * * * * *
* Types hold Properties
? Should Properties be in their own array?
! Stop doing random work until the structure is decided
* Type and Items are 'tables'
* If you want Items of a Type, you filter out the items array for matching Type.

* * * * * * * * * * * * * * * * * * *
! Figure out if the arrays can be changed to a dictionary. The id would be the uuid and the value would be the item. That would mean faster lookup and no direct references.
* Add 100k items, 100 types, and 10 properties per type to arrays (types hold properties?) then do the same using dictionaries where properties are separate
* Write out all functions but leave them blank then pseudocode dictionary versions

* * * * * * * * * * * * * * * * * * *
? Should an Item be allowed to have multiple Types? There's not a huge reason to say no. Multiple inheritence can be useful.
* Really the Type could have multiple parent Types. That would make more sense.
*/

import ManifestConfig from './config';
import models from './models';
import Collection from './collection';

export default class Manifest {
	Config = ManifestConfig;
	Models = models;

	constructor() {
		this.properties = new Collection('Properties');
		this.types = new Collection('Types');
		this.items = new Collection('Items');
	}

	get isValid() {
		return (
			this.types &&
			this.items &&
			//Can models disappear because they're constructors? Is that how Vuex stores them?
			this.Models.Item &&
			this.Models.Property &&
			this.Models.Type &&
			this.Models.Result
		);
	}

	//#region Add - Item, Type, Property
	//Used for adding any instance of a class to its 'table'
	//! Move to Collection class?
	addTo(collection, record) {
		if (!collection || !record) throw Error('Must provide a collection and a record');

		let foundRecord = collection[record.uuid];
		if (foundRecord) {
			//oh no
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				`Unable to add to ${collection.name}. Record with uuid already exists: ${record.uuid}`,
				record
			);
		} else if (!foundRecord && record.isValid) {
			collection[record.uuid] = record;
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Success,
				`Successfully added record: ${record.uuid} to ${collection.name}`,
				record
			);
		} else {
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				`Unable to add record. Record invalid: ${record.uuid}`,
				record
			);
		}
	}

	//Adds an Item to Manifest
	addItem(item) {
		if (this.addTo(this.items, item).isSuccessful) {
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Success,
				`Added Item: '${item.uuid}' of Type: '${item.type.name}' with '${item.properties.length}' properties`,
				item
			);
		} else return new this.Models.Result(this.Config.RESULT_TYPE.Error, `Unable to add Item in Manifest.addItem()`);
	}

	//Adds a Type to Manifest
	//! OK to go to Collection
	addType(type) {
		if (type && type.isValid) {
			let foundType = this.types.find(t => t.name === type.name);
			if (foundType)
				return new this.Models.Result(
					this.Config.RESULT_TYPE.Error,
					`Attempted to add a duplicate Type: ${type.name}`
				);

			this.types.push(type);
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Success,
				`Added new Type: '${type.name}' - '${type.uuid}'`
			);
		} else
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				`Attempted to add a null Type in Manifest.addType()`
			);
	}

	//* Adds a Property doesn't need to exist because you add Properties to Types directly.
	//#endregion

	//#region Remove - Item, Type
	removeItem(item) {
		if (item) {
			let foundIndex = this.items.findIndex(x => x.uuid === item.uuid);
			if (foundIndex) {
				let deletedItem = this.items.splice(foundIndex, 1);
				return new this.Models.Result(this.Config.RESULT_TYPE.Success, `Item removed: ${deletedItem.uuid}`);
			} else {
				return new this.Models.Result(
					this.Config.RESULT_TYPE.Error,
					`Unable to remove item: ${item.uuid}. Could not locate. Where did you find this item?`
				);
			}
		}
	}

	removeType(type) {
		if (type) {
			let foundIndex = this.types.findIndex(x => x.uuid === type.uuid);
			if (foundIndex) {
				let deletedType = this.types.splice(foundIndex, 1);
				return new this.Models.Result(this.Config.RESULT_TYPE.Success, `Type removed: ${deletedItem.uuid}`);
			} else {
				return new this.Models.Result(
					this.Config.RESULT_TYPE.Error,
					`Unable to remove type: ${type.uuid}. Could not locate. Where did you find this type?`
				);
			}
		}
	}

	//Can't remove Property because it doesn't reference its parent. I don't want to iterate every type and then all of its properties.

	//#endregion

	//#region Search - Item, Type
	//This search needs to be really customizable because eventually when there are Views in Manifest, they'll need to have baked in filtering and that could have somewhat complex filters. I don't want to limit users on the fitlers themselves, so they'll need to be additive and subtractive.
	//! Filters could be like a pipeline. There's something in Vue for that. Ask Cody about that.
	//Need to figure out where I want to index everything so searching is faster. If I make all properties indexed then this will be a lot faster.

	//! All of this is unlikely to work and is very likely to be rewritten.
	//! Treat it like pseudocode
	//Search everything about all Items
	searchItems(searchString) {
		this.items.filter(item => {
			let matched = false;

			//Declaring variable inside loop is apparently faster
			for (var property in item.properties) {
				if (item.properties[property] === searchString) matched = true;
			}

			return matched;
		});
	}

	//Search Items of a Type
	searchItems(searchString, type) {}

	//Search Items with a Property
	searchItems(searchString, property) {}

	//Search Items of a Type with a Property
	searchItems(searchString, type, propertyName) {
		//Having Type and Property is only beneficial to be more specific, though it likely won't see performance gains.
		//If you filter down to just the Items of a given Type, then you're looping all Items. Then you'd have to loop the ones you filtered down to and check for the property
	}

	//#endregion
}
