<template>
	<div class="AddProperty">
		<input v-model="name" placeholder="Property Name" />
		<!-- //TODO Make the buttons a dropdown with generated options using Manifest.config -->
		<button id="textButton" @click="$emit('addProperty', name, 'Text');">Text</button>
		<button id="numberButton" @click="$emit('addProperty', name, 'Numeric');">Number</button>
		<button id="dateButton" @click="$emit('addProperty', name, 'Date');">Date</button>
	</div>
</template>

<script>
// import Property from '@/components/Property';
export default {
	name: 'AddProperty',
	components: {
		// Property,
	},
	props: {
		// type: Object,
	},
	data() {
		return {
			name: '',
		};
	},
	computed: {},
	methods: {},
};
</script>

<style scoped>
.AddProperty {
}
</style>
