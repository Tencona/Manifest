<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<button @click.native="generateData">Generate Data</button>
	</div>
</template>

<script>
// @ is an alias to /src
import manifest from "../Manifest/manifest.js";
import gendata from "../Manifest/data/generate-test-data";

export default {
	name: "home",
	components: {},
	mounted() {},
	methods: {
		generateData() {
			gendata.init(manifest);
			gendata.generate();
			var s = "";
		}
	}
};
</script>
