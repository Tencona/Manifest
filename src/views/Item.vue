<template>
	<div class="Item">
		<div id="headerBar">
			<!-- <span id="title">{{item.name}}</span> -->
			<span id="type">Name: {{item.type.name}}</span>
			<br />
			<span id="uuid">uuid: {{item.uuid}}</span>
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
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Property from '@/components/Property';

export default {
	name: 'Item',
	components: {
		Property,
	},
	props: {},
	mounted() {
		let keys = Object.keys(this.manifest.items).slice(1); //Remove 'name'
		let randomItem = this.manifest.items[keys[Math.floor(Math.random() * keys.length)]];

		if (randomItem) {
			this.item = randomItem;
		}
	},
	data() {
		return { item: this.getDefaultItem() };
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
	},
};
</script>

<style scoped>
.Item {
}

.properties {
	background: rgb(235, 235, 235);
}
</style>