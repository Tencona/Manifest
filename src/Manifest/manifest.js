/*
* n o t e s
TODO Types need a Key! One Key Property that gets searched first before other things get searched. I am such a dumb dumb for not thinking of that sooner.
* Types hold Properties
* Type and Items are 'tables'
* If you want Items of a Type, you filter out the items array for matching Type.

* Alright so addProperty was moved to Manifest because that's what makes sense, duh. Did some stress testing and at 200k Items it's still sub 100ms to filter them by Type.
* Need to start on the UI.
* Make an Item page. It needs to just render out the name and the Item's properties from the Type.
*/

import ManifestConfig from './config';
import models from './models';

export default class Manifest {
	Config = ManifestConfig;
	Models = models;

	constructor() {
		// this.properties = [];
		this.types = [];
		this.items = [];
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

	//#region Add - Item, Type
	//Adds an Item to Manifest
	addItem(item) {
		if (item && item.isValidItem) {
			this.items.push(item);

			//This is circular structure. That's why Items are flat and not stored inside of this.items
			// item.type.items.push(item);
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Success,
				`Added Item: '${item.uuid}' of Type: '${item.type.name}' with '${item.properties.length}' properties`,
				item
			);
		} else
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				`Attempted to add a null Item in Manifest.addItem()`
			);
	}

	//Adds a Type to Manifest
	addType(type) {
		if (type && type.isValidType) {
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

	//Adds a Property to Manifest
	addProperty(type, property) {
		if (type && type.isValidType && property && property.isValidProperty) {
			//Find Type
			let foundType = this.types.find(t => t.name === type.name);
			if (foundType) {
				//Look for dupe Property
				let foundProperty = foundType.properties.find(p => p.name === property.name);
				if (foundProperty) {
					return new Result(
						RESULT_TYPE.Error,
						`Attempted to add a Property to Type (${type.name}) in Manifest.addProperty() but a Property with the same name already exists: ${property.name}`
					);
				}

				//Add Property to Type's private Properties
				foundType._properties.push(property);
				return new Result(
					RESULT_TYPE.Success,
					`Added Property - name: '${property.name}' to Type: '${foundType.name}'
					\nvalueType: '${property.valueType.name}'
					\nvalidation: ${property.validation ? 'true' : 'false'}`
				);
			}
		} else
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				`Attempted to add a Property to a null Type in Manifest.addProperty()`
			);
	}
	//#endregion

	//#region Remove - Item, Type
	removeItem(item) {
		if (item) {
		}
	}

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
