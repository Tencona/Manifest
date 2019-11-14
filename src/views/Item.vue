<template>
	<div class="Item">
		<div id="headerBar">
			<span id="title">{{item.name}}</span>
			<span id="type">{{item.type.name}}</span>
			<span id="uuid">{{item.uuid}}</span>
		</div>
		<div id="body">
			<div class="propertiesWrapper">
				<div class="properties">
					<!-- <DiaryEntry
						class="property"
						v-for="(property, i) in item.type.properties"
						:key="i"
						v-bind:entry.sync="property"
						:index="i"
					/>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Item',
	components: {},
	props: {},
	mounted() {
		console.log(this.manifest);
		let rIndex = Math.floor(Math.random() * this.manifest.items.length);
		if (rIndex) {
			this.item = this.manifest.items[rIndex];
		}
	},
	data() {
		return { item: {} };
	},
	computed: {
		...mapState(['manifest']),
	},
	methods: {},
};
</script>

<style scoped>
.Item {
}
</style>