/*
* n o t e s
? Should Manifest be restructured to put Items inside of Types? It would increase speed in a lot of ways and I can't remember if there was a benefit to structuring it flatly, but I know I had some reason in the past.
	TODO: Figure out why things are structured flatly instead of in a hierarchy.
		Did I think about adding Items without a Type? Like adding an Item first? That could be it, but right now Item requires a Type in its constructor.
		Maybe it was just an attempt to keep everything separated, but that's silly. It'd be so much slower.
		* Things are stored flatly because of JSON being unable to handle a circular reference. Items have a reference to their Type, so Types cannot have an array of their Items.

TODO Types need a Key! One Key Property that gets searched first before other things get searched. I am such a dumb dumb for not thinking of that sooner.
*/

import ManifestConfig from './config';
import models from './models';

export default class Manifest {
	Config = ManifestConfig;
	Models = models;

	constructor() {
		this.properties = [];
		this.types = [];
		this.items = [];
	}
	//#region Add - Item, Type
	//Adds an Item to Manifest
	addItem(item) {
		if (item && item.isValidItem) {
			this.items.push(item);

			//This is circular structure. That's why Items are flat and not stored inside of this.items
			item.type.items.push(item);
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Success,
				`Added Item: \`${item.uuid}\` of Type: \`${item.type.name}\` with \`${
					item.properties.length
				}\` properties`,
				item
			);
		} else
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				'Attempted to add a null Item in Manifest.addItem()'
			);
	}

	//Adds a Type to Manifest
	addType(type) {
		if (type && type.isValidType) {
			if (this.types.map(t => t.name).includes(type.name))
				return new this.Models.Result(
					this.Config.RESULT_TYPE.Error,
					`Attempted to add a duplicate Type: ${type.name}`
				);

			this.types.push(type);
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Success,
				`Added new Type: \`${type.name}\` - \`${type.uuid}\``
			);
		} else
			return new this.Models.Result(
				this.Config.RESULT_TYPE.Error,
				'Attempted to add a null Type in Manifest.addItem()'
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
