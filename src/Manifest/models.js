import Item from './models/item';
import Property from './models/property';
import Type from './models/type';
import { Result, RESULT_TYPE } from './models/result'; //Move this elsewhere? It's not part of the data model

export default {
	Item: Item,
	Property: Property,
	Result: Result,
	Type: Type,
};
