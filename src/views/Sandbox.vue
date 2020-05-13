<template>
	<div class="Sandbox">
		<!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
		<button @click="generateData">Generate Data</button>
	</div>
</template>

<script>
import { mapState } from 'vuex';
// import Manifest from '@/Manifest/manifest';
import gendata from '@/Manifest/data/generate-test-data';

export default {
	name: 'Sandbox',
	components: {},
	mounted() {},
	data() {
		return { showModal: false };
	},
	computed: {
		...mapState(['manifest']),
	},
	methods: {
		generateData() {
			gendata.init(this.manifest);
			gendata.generate();
		},
	},
};
</script>

<style scoped>
</style>
