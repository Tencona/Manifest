import Manifest from '../manifest';
import ManifestConfig from '../config';
import { Result, RESULT_TYPE } from './result';
import { exists, uuid } from '../extensions/utility';

export default class Type {
	//TODO Types need a Key! One Key Property that gets searched first before other things get searched. I am such a dumb dumb for not thinking of that sooner.
	constructor(name) {
		this.uuid = uuid();
		this.name = name;
		this.parentType = undefined;
		this.pageLayout = undefined; //Unsure how to handle this.
		this._properties = [];

		//! This could be a bad idea. Circular reference and all.
		// this.items = [];
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

	get properties() {
		//Combine all parent Types and with this._properties
		let props = this._properties;
		if (this.parentType) props = props.concat(this.parentType.properties);

		return props;
	}
	set properties(value) {
		return value;
	}
}
