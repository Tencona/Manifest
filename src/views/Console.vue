<template>
	<div class="Console">
		<h1>CONSOLE</h1>
		<Graybox ref="graybox" title="Graybox" :onCommand="runCommand" :configuration="config" />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Graybox from 'graybox/src/components/Graybox';
import ConsoleCommands from '@/support/ConsoleCommands';

export default {
	name: 'Console',
	components: {
		Graybox,
	},
	props: {},
	data() {
		return {
			config: {
				globalPrefix: 'Manifest',
			},
			lastItem: {},
			lastType: {},
			lastProperty: {},
		};
	},
	computed: {
		...mapState(['manifest']),
	},
	methods: {
		runCommand: function(userInput) {
			let result = ConsoleCommands.executeCommand(this.manifest, userInput);

			if (result.payload) {
				if (result.payload.item) this.lastItem = result.payload.item;
				if (result.payload.type) this.lastType = result.payload.type;
				if (result.payload.property) this.lastProperty = result.payload.property;
			}
			if (result.isSuccessful) {
				this.$store.dispatch('setManifest', this.manifest);
			}

			return {
				cmdOutput: result.message,
			};
		},
	},
};
</script>

<style scoped>
.Console {
}
</style>