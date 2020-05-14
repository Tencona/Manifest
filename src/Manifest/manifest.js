/*
 * n o t e s
 */

import ManifestConfig from '@/Manifest/config';
import models from '@/Manifest/models';
import Collection from '@/Manifest/collection';

export default class Manifest {
	Config = ManifestConfig;

	Models = models;

	constructor() {
		this.types = new Collection('Types');
		this.items = new Collection('Items');
	}

	get isValid() {
		return (
			this.types &&
			this.items &&
			// Can models disappear because they're constructors? Is that how Vuex stores them?
			this.Models.Item &&
			this.Models.Property &&
			this.Models.Type &&
			this.Models.Result
		);
	}

	// #region Add - Item, Type
	// Adds an Item to Manifest
	addItem(item) {
		if (this.items.add(item).isSuccessful) {
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Success,
				`Added Item: '${item.uuid}' of Type: '${item.type.name}' with '${item.type.properties.length}' properties`,
				item
			);
		}
		return new this.Models.Result(this.Config.RESULT_TYPE.Error, 'Unable to add Item in Manifest.addItem()');
	}

	// Adds a Type to Manifest
	addType(type) {
		if (this.types.add(type).isSuccessful) {
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Success,
				`Added new Type: '${type.name}' - '${type.uuid}'`
			);
		}
		return new this.Models.Result(
			this.Config.RESULT_TYPE.Error,
			'Attempted to add a null Type in Manifest.addType()'
		);
	}

	//* Adds a Property doesn't need to exist because you add Properties to Types directly.
	// #endregion

	// #region Remove - Item, Type
	removeItem(item) {
		if (item) {
			const foundIndex = this.items.findIndex(x => x.uuid === item.uuid);
			if (foundIndex) {
				const deletedItem = this.items.splice(foundIndex, 1);
				return new this.Models.Result(this.Config.RESULT_TYPE.Success, `Item removed: ${deletedItem.uuid}`);
			}
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				`Unable to remove item: ${item.uuid}. Could not locate. Where did you find this item?`
			);
		}
		return new this.Models.Result(this.Config.RESULT_TYPE.Error, 'Unable to remove item. No input provided.');
	}

	removeType(type) {
		if (type) {
			const foundIndex = this.types.findIndex(x => x.uuid === type.uuid);
			if (foundIndex) {
				const deletedType = this.types.splice(foundIndex, 1);
				return new this.Models.Result(this.Config.RESULT_TYPE.Success, `Type removed: ${deletedType.uuid}`);
			}
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				`Unable to remove type: ${type.uuid}. Could not locate. Where did you find this type?`
			);
		}
		return new this.Models.Result(this.Config.RESULT_TYPE.Error, 'Unable to remove type. No type provided.');
	}
	// #endregion

	// #region Search - Item, Type
	// This search needs to be really customizable because eventually when there are Views in Manifest, they'll need to have baked in filtering and that could have somewhat complex filters. I don't want to limit users on the fitlers themselves, so they'll need to be additive and subtractive.
	//! Filters could be like a pipeline. There's something in Vue for that. Ask Cody about that.
	// Need to figure out where I want to index everything so searching is faster. If I make all properties indexed then this will be a lot faster.

	//! All of this is unlikely to work and is very likely to be rewritten.
	//! Treat it like pseudocode
	// Search everything about all Items
	// searchItems(searchString) {
	// 	this.items.filter(item => {
	// 		let matched = false;

	// 		// Declaring variable inside loop is apparently faster
	// 		for (const property in item.properties) {
	// 			if (item.properties[property] === searchString) matched = true;
	// 		}

	// 		return matched;
	// 	});
	// }

	// TODO write Manifest.searchItems(Type)
	// Search Items of a Type
	// searchItems(searchString, type) {}

	// TODO write Manifest.searchItems(Property)
	// Search Items with a Property
	// searchItems(searchString, property) {}

	// TODO write Manifest.searchItems(of Type with Property)
	// Search Items of a Type with a Property
	// searchItems(searchString, type, propertyName) {
	// 	// Having Type and Property is only beneficial to be more specific, though it likely won't see performance gains.
	// 	// If you filter down to just the Items of a given Type, then you're looping all Items. Then you'd have to loop the ones you filtered down to and check for the property
	// }

	// #endregion
}
