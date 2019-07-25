import { match } from 'minimatch';

export default { executeCommand };

function executeCommand(manifest, userInput) {
	//Create
	//Read (Search)
	//Update
	//Delete
	////

	//#region Add
	//Add Item
	//add -item "item name" -type "type name"
	//Add Type
	//add -type "type name"
	//Add Property
	//add -prop "property name" -type "type name" -ptype "num/text/date"
	if (userInput.cmd === 'add') {
		const firstValue = userInput.args[0].values[0];
		//Check if "type" is one of the args then look up that Type in Manifest
		var matchedType = userInput.args.find(args => args.name === 'type');
		if (matchedType && matchedType.values && matchedType.values[0])
			matchedType = manifest.types.find(type => type.name === matchedType.values[0]);
		switch (userInput.args[0].name) {
			case 'item':
				matchedType = manifest.types.find(type => type.name === firstValue);
				if (matchedType) {
					const item = new manifest.Models.Item(matchedType);
					const result = manifest.addItem(item);
					result.payload = { item: item, type: matchedType }; //Override payload so lastItem and lastType can both be updated
					return result;
				}
				break;
			case 'type':
				const newType = new manifest.Models.Type(firstValue);
				return manifest.addType(newType);
				break;
			case 'prop':
				if (matchedType) {
					let valueType;
					if (userInput.args[2]) {
						switch (userInput.args[2].values[0]) {
							case 'num':
							case 'int':
								valueType = manifest.Config.VALUE_TYPES.NUMERIC;
								break;
							case 'date':
								valueType = manifest.Config.VALUE_TYPES.DATE;
								break;
							case 'text':
							case 'string':
							default:
								valueType = manifest.Config.VALUE_TYPES.TEXT;
								break;
						}
					} else valueType = manifest.Config.VALUE_TYPES.TEXT;
					const newProperty = new manifest.Models.Property(firstValue, valueType);
					const result = matchedType.addProperty(newProperty);
					result.payload = { type: matchedType, property: newProperty };
					return result;
				}
				break;
		}
	}
	//#endregion

	//#region Search
	//search -item "search text"
	//Matches on item name or uuid
	//search -type "search text"
	//Matches on type name or uuid
	//search -item -<property name> -<property value> -<property name 2> -<property value 2>
	//Matches all itms where the given properties have the specified values
	//search -type -<property name>  -<property name 2>
	//Matches all types that have the given properties
	//#endregion
}
