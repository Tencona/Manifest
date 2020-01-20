<template>
	<div class="Home">
		<!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
		<button @click="generateData">Generate Data</button>

		<button id="show-modal" @click="showModal = true">Show Modal</button>
		<modal v-show="showModal" @close="showModal = false">
			<h3 slot="header">custom header</h3>
		</modal>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import manifest from '@/Manifest/manifest';
import gendata from '@/Manifest/data/generate-test-data';
import Modal from '@/components/Modal';

export default {
	name: 'Home',
	components: { Modal },
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
.Home {
}
</style>