<template>
	<div class="Property">
		<div class="nameWrap">
			<div class="propName" :title="'uuid: ' + property.uuid">{{property.name}}</div>
			<div class v-if="property.valueType.name === 'Text'">
				<div class="propertyTypeDisplay">T</div>
			</div>
			<div v-else-if="property.valueType.name === 'Numeric'">
				<div class="propertyTypeDisplay">N</div>
			</div>
			<div v-else-if="property.valueType.name === 'Date'">
				<div class="propertyTypeDisplay">D</div>
			</div>
			<input v-model="value" @input="valueChanged" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Property',
	components: {},
	props: {
		property: Object,
		index: Number,
	},
	mounted() {
		console.log(`Loading Property: ${this.property}`);
	},
	data() {
		return {
			value: '', //TODO Whenever this value changes, check to see if it passes the Property validation, then signal up to the Item to set its value
		};
	},
	computed: {},
	methods: {
		valueChanged() {
			//? Debounce this?
			if (!this.property.validation || (this.property.validation && this.property.validation(this.value)))
				this.$emit('value-changed', this.property, this.value);
		},
	},
};
</script>

<style scoped>
input {
	border: none;
	border-radius: 0.2em;
}
.Property {
	display: flex;
	flex-direction: row;
}

.nameWrap {
	display: flex;
	flex-direction: row;
	padding: 0.4em 0.2em;
}

.propertyTypeDisplay {
	color: lightgray;
	font-size: 0.6em;
	padding-right: 0.4em;
}
</style>