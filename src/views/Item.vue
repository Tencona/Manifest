<template>
	<div class="Item">
		<div id="headerBar">
			<div class="headLeft">
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
			<grid-layout
				:layout.sync="propertiesLayout"
				:col-num="12"
				:row-height="30"
				:is-draggable="true"
				:is-resizable="true"
				:is-mirrored="false"
				:prevent-overlap="true"
				:vertical-compact="true"
				:margin="[10, 10]"
				:use-css-transforms="true"
			>
				<grid-item
					class="gridItem"
					v-for="property in propertiesLayout"
					:x="property.x"
					:y="property.y"
					:w="property.w"
					:h="property.h"
					:i="property.i"
					:key="property.prop.uuid"
					:dragIgnoreFrom="'.propertyWrap'"
				>
					<Property class="property" v-bind:property.sync="property.prop" @value-changed="valueChanged"></Property>
				</grid-item>
			</grid-layout>
			<AddProperty v-show="editMode" @addProperty="propertyAdded" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Property from '@/components/Property';
import AddProperty from '@/components/AddProperty';
import VueGridLayout from 'vue-grid-layout';

export default {
	name: 'Item',
	components: {
		GridLayout: VueGridLayout.GridLayout,
		GridItem: VueGridLayout.GridItem,
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

		//Set up layout for item
		let layout = [];
		let xa = 0;
		let ya = 0;
		let width = 4;
		let height = 2;
		// debugger;
		this.item.type.properties.forEach((property, i) => {
			layout.push({
				x: width * (i % 3),
				y: ya,
				w: width,
				h: height,
				i: i,
				prop: property,
			});
			if (i % 3 == 2) ya += height;
		});

		this.propertiesLayout = layout;
	},
	data() {
		return { item: this.getDefaultItem(), editMode: false, propertiesLayout: [] };
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
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

.gridItem {
	background: white;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.23), 0px 3px 6px rgba(0, 0, 0, 0.16);
	border-radius: 3px;
}
</style>