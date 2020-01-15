<template>
	<div class="TextProperty">
		<textarea cols="1" rows="1" v-model="value" @input="valueChanged" />
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
	display: flex;
	flex: 1 0;
}
textarea {
	border: none;
	border-radius: 0.2em;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.23) inset;
	flex: 1 0;
	resize: none;
	line-height: 1;
	font-size: 20px;
	width: 100%;
	height: 100%;
	outline: none;
}

/*//? Do I want to make my own textarea in the future? */
/* Scrollbar Start */
.scroller {
	scroll-behavior: smooth;
	overflow-y: auto;
	max-height: 500px;
}
.scroller::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.scroller::-webkit-scrollbar-track {
	background: none;
	border-radius: 8px;
}
.scroller::-webkit-scrollbar-track:hover {
	background-color: rgb(44, 44, 55);
}
.scroller::-webkit-scrollbar-thumb {
	background: rgb(150, 150, 150);
	border-radius: 8px;
}
.scroller::-webkit-scrollbar-thumb:hover {
	background: rgb(245, 245, 245);
}
.scroller::-webkit-scrollbar-corner {
	display: none;
}
/* Scrollbar End */
</style>