<template>
	<div class="Item">
		<div id="headerBar">
			<span id="title">item.name</span>
			<span id="type">item.type</span>
			<span id="uuid">item.uuid</span>
		</div>
		<div id="body">
			<div class="propertiesWrapper">
				<div class="properties">
					<DiaryEntry
						class="property"
						v-for="(property, i) in item.type.properties"
						:key="i"
						v-bind:entry.sync="property"
						:index="i"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Item",
	components: {},
	props: {
		item: Object
	},
	data() {
		return {};
	},
	computed: {},
	methods: {}
};
</script>

<style scoped>
.Item {
}
</style>