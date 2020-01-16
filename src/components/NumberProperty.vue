<template>
	<div class="NumberProperty">
		<input type="number" v-model="value" @input="valueChanged" @mousewheel="valueScrolled" />
	</div>
</template>

<script>
export default {
	name: 'NumberProperty',
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
			value: 0,
		};
	},
	computed: {},
	methods: {
		valueChanged() {
			//? Debounce this?
			this.$emit('value-changed', this.value);
		},
		valueScrolled(event) {
			event.preventDefault();

			let incrementAmount = 1;
			if (event.ctrlKey && event.shiftKey) incrementAmount = 25;
			else if (event.ctrlKey) incrementAmount = 10;
			else if (event.shiftKey) incrementAmount = 5;

			//TODO Handle this better..
			if (this.value.toString().includes('.')) {
				let split = this.value.toString().split('.');
				let integer = parseInt(split[0]);
				if (event.deltaY < 0) {
					integer += incrementAmount;
				} else integer -= incrementAmount;
				this.value = parseFloat(integer + '.' + split[1]);
			} else {
				if (event.deltaY < 0) {
					this.value += incrementAmount;
				} else this.value -= incrementAmount;
			}

			this.valueChanged();
		},
	},
};
</script>

<style scoped>
.NumberProperty {
	display: flex;
	flex: 1 0;
}
input {
	border: none;
	border-radius: 0.2em;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.23) inset;
	flex: 1 0;
	/* resize: none; */
	/* line-height: 1; */
	font-size: 20px;
	width: 100%;
	height: 100%;
	outline: none;
}
</style>