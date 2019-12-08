<template>
	<div class="Item">
		<div id="headerBar">
			<div class="headLeft">
				left
				<!-- <span id="title">{{item.name}}</span> -->
				<span id="type">Name: {{item.type.name}}</span>
				&nbsp;
				<span id="uuid">uuid: {{item.uuid.substr(0,8)}}</span>
			</div>
			<div class="headRight">
				<button id="btnAddProperty" @click="editMode = !editMode">{{editMode ? "Save" : "Edit"}}</button>
			</div>
		</div>
		<div id="body">
			<div class="properties">
				<Property
					class="property"
					v-for="(property, i) in item.type.properties"
					:key="i"
					v-bind:property.sync="property"
					:index="i"
					@value-changed="valueChanged"
				/>
			</div>
			<AddProperty v-show="editMode" @addProperty="propertyAdded" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Property from '@/components/Property';
import AddProperty from '@/components/AddProperty';

export default {
	name: 'Item',
	components: {
		Property,
		AddProperty,
	},
	props: {},
	mounted() {
		let keys = Object.keys(this.manifest.items).slice(1); //Remove 'name'
		let randomItem = this.manifest.items[keys[Math.floor(Math.random() * keys.length)]];

		while (this.manifest.items.length > 0 && randomItem.type.typeTags.length < 2) {
			randomItem = this.manifest.items[keys[Math.floor(Math.random() * keys.length)]];
		}
		if (randomItem) {
			this.item = randomItem;
		}
	},
	data() {
		return { item: this.getDefaultItem(), editMode: false };
	},
	computed: {
		...mapState(['manifest']),
	},
	methods: {
		getDefaultItem() {
			return { uuid: 'uuid', type: {}, properties: {} };
		},
		valueChanged(property, value) {
			console.log(`Set Item Property: ${property.name} > ${value}`);
		},
		propertyAdded(name, valType) {
			let valueType = Object.entries(this.manifest.Config.VALUE_TYPES)
				.map(x => x[1])
				.find(x => x.name === valType);
			if (!valueType) {
				console.error('Unable to match value type when adding property');
			}
			//TODO on success of adding a property, emit to `AddProperty` that it needs to clear its name field
			this.item.type.addProperty(new this.manifest.Models.Property(name, this.item.type.uuid, valueType));
		},
	},
};
</script>

<style scoped>
.Item {
	display: flex;
	flex-direction: column;
}

#headerBar {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.properties {
	/* background: rgb(235, 235, 235); */
}
</style>