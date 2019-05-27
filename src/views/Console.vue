<template>
	<div class="Console">
		<h1>C O N S O L E</h1>
		<Graybox ref="graybox" title="Graybox" :onCommand="runCommand" :configuration="config"/>
	</div>
</template>

<script>
import Graybox from "vue-graybox/src/components/Graybox";

export default {
	name: "Console",
	components: {
		Graybox
	},
	props: {},
	data() {
		return {
			config: {
				globalPrefix: "Manifest"
			}
		};
	},
	computed: {},
	methods: {
		runCommand: function(userInput) {
			return {
				cmdOutput: "Example output."
			};
		}
	}
};
</script>

<style scoped>
.Console {
}
</style>