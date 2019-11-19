import Manifest from '../manifest';
import ManifestConfig from '../config';
import { Result, RESULT_TYPE } from './result';
import { exists, uuid } from '../extensions/utility';

export default class Type {
	constructor(name) {
		this.uuid = uuid();
		this.name = name;
		this.parentType = undefined;
		this.pageLayout = undefined; //Unsure how to handle this.
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
