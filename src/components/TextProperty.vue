<template>
	<div class="TextProperty">
		<input v-model="value" @input="valueChanged" />
	</div>
</template>

<script>
export default {
	name: 'TextProperty',
	components: {},
	props: {
		item: Object,
		property: Object,
	},
	mounted() {
		//Load value from item
		if (this.item.values.has(this.property.uuid)) {
			this.value = this.item.values.get(this.property.uuid);
		}
	},
	data() {
		return {
			value: '',
		};
	},
	computed: {},
	methods: {
		valueChanged() {
			//? Debounce this?
			this.$emit('value-changed', this.value);
		},
	},
};
</script>

<style scoped>
.TextProperty {
}
input {
	border: none;
	border-radius: 0.2em;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.23) inset;
}
</style>