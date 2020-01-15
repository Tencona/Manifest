<template>
	<div class="Property">
		<div class="header">Header</div>
		<div class="propertyWrap">
			<div class="propName" :title="'uuid: ' + property.uuid">{{property.name}}</div>
			<div class v-if="property.valueType.name === 'Text'">
				<div class="propertyTypeDisplay">T</div>
				<TextProperty
					v-bind:item.sync="item"
					v-bind:property.sync="property"
					@value-changed="valueChanged"
				/>
			</div>
			<div v-else-if="property.valueType.name === 'Numeric'">
				<div class="propertyTypeDisplay">N</div>
			</div>
			<div v-else-if="property.valueType.name === 'Date'">
				<div class="propertyTypeDisplay">D</div>
			</div>
		</div>
		<div class="footer">Footer</div>
	</div>
</template>

<script>
import TextProperty from '@/components/TextProperty';

export default {
	name: 'Property',
	components: {
		TextProperty,
	},
	props: {
		item: Object,
		property: Object,
	},
	mounted() {
		console.log(`Loading Property: ${this.property.uuid}`);
	},
	data() {
		return {
			value: '',
		};
	},
	computed: {},
	methods: {
		valueChanged(value) {
			//TODO Whenever this value changes, check to see if it passes the Property validation, then signal up to the Item to set its value
			//? Debounce this?
			if (!this.property.validation || (this.property.validation && this.property.validation(value)))
				this.$emit('value-changed', this.property, value);
		},
	},
};
</script>

<style scoped>
.Property {
	display: flex;
	flex-direction: column;
}

.propertyWrap {
	display: flex;
	flex-direction: row;
	padding: 0.4em 0.2em 0.4em 0.2em;
}

.propertyTypeDisplay {
	color: lightgray;
	font-size: 0.6em;
	padding-right: 0.4em;
}
</style>