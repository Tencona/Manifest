import Item from '@/Manifest/models/item';
import Property from '@/Manifest/models/property';
import Type from '@/Manifest/models/type';
import { Result, RESULT_TYPE } from '@/Manifest/models/result'; //Move this elsewhere? It's not part of the data model

export default {
	Item: Item,
	Property: Property,
	Result: Result,
	Type: Type,
};
