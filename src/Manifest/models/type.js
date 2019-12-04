import Collection from '@/Manifest/collection';
import ManifestConfig from '@/Manifest/config';
import { Result, RESULT_TYPE } from '@/Manifest/models/result';
import { exists, uuid } from '@/Manifest/extensions/utility';

export default class Type {
	constructor(name) {
		this.uuid = uuid();
		this.name = name;
		this.typeTags = new Collection('TypeTags'); //Unsure how to handle this.
		this._properties = [];
	}

	get isValid() {
		return !!this.uuid && !!this.name;
	}

	addProperty(property) {
		if (property && property.isValid) {
			if (this.properties.map(x => x.name).includes(property.name)) {
				return new Result(
					RESULT_TYPE.Error,
					`Attempted to add a Property in Type.addProperty() but a Property with the same name already exists: ${property.name}`
				);
			}

			this._properties.push(property);
			return new Result(
				RESULT_TYPE.Success,
				`Added Property - name: '${property.name}'\nvalueType: '${property.valueType.name}'\nvalidation: ${
					property.validation ? 'true' : 'false'
				}`
			);
		} else return new Result(RESULT_TYPE.Error, 'Attempted to add an invalid Property in Type.addProperty()');
	}

	removeProperty(property) {
		if (property) {
			let foundProperty = this._properties.findIndex(x => x.uuid === property.uuid);
			if (foundProperty) {
				this._properties.splice(foundProperty, 1);

				return new Result(
					RESULT_TYPE.Success,
					`Successfully removed Property: ${property.uuid} from Type: ${this.uuid}`
				);
			} else {
				return new Result(
					RESULT_TYPE.Error,
					`Attempted to remove a Property: ${property.uuid} that doesn't belong to Type: ${this.uuid}`
				);
			}
		} else
			return new Result(
				RESULT_TYPE.Error,
				`Attempted to remove a Property that doesn't exist in Type.removeProperty()'`
			);
	}

	getTaggedProperties(seenTypes) {
		//Combine all parent Types and with this._properties
		let props = this._properties;

		if (seenTypes.indexOf(this.uuid) === -1) {
			seenTypes.push(this.uuid);
		}
		let types = this.typeTags;
		let arr = Object.keys(this.typeTags); //Remove hidden properties under '_'
		if (arr[0] === '_') arr = arr.slice(1);

		//Iterate over every seen type and remove them from arr so we don't call them again
		for (let i = 0; i < seenTypes.length; i++) {
			let index = arr.indexOf(seenTypes[i]);
			if (index !== -1) arr.splice(index, 1);
		}

		arr.forEach(uuid => {
			props = props.concat(types[uuid].getTaggedProperties(seenTypes));
		});

		return props;
	}

	get properties() {
		//Combine all parent Types and with this._properties
		let props = this._properties;

		//Getting properties from this object means we're at the start so add ourselves to the seenTypes dictionary
		let seenTypes = [];
		seenTypes.push(this.uuid);
		let types = this.typeTags;
		let arr = Object.keys(this.typeTags); //Remove hidden properties under '_'
		if (arr[0] === '_') arr = arr.slice(1);
		arr.forEach(uuid => {
			props = props.concat(types[uuid].getTaggedProperties(seenTypes));
		});

		return props;
	}
	set properties(value) {
		return value;
	}
}
