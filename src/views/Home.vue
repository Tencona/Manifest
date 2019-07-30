<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<button @click="generateData">Generate Data</button>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import manifest from "../Manifest/manifest";
import gendata from "../Manifest/data/generate-test-data";

export default {
	name: "home",
	components: {},
	mounted() {},
	computed: {
		...mapState(["manifest"])
	},
	methods: {
		generateData() {
			gendata.init(this.manifest);
			gendata.generate();
		}
	}
};
</script>
