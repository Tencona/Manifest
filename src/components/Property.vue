<template>
	<div class="Property">
		<div class="name" :title="'uuid: ' + property.uuid">{{property.name}}</div>
		<div v-if="property.valueType.name === 'Text'">
			Text Property
			<input v-model="value" @input="valueChanged" />
		</div>
		<div v-else-if="property.valueType.name === 'Numeric'">
			Numeric Property
			<input v-model="value" @input="valueChanged" />
		</div>
		<div v-else-if="property.valueType.name === 'Date'">
			Date Property
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
.Property {
}
</style>