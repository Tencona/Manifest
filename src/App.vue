<template>
	<div id="app">
		<div id="nav">
			<img id="navlogo" alt="Manifest logo" src="@/assets/logo.png" />
			<div id="navLinks">
				<router-link to="/">Home</router-link>|
				<router-link to="/dashboard">Dashboard</router-link>|
				<router-link to="/item">Item</router-link>|
				<router-link to="/console">Console</router-link>|
				<router-link to="/about">About</router-link>|
				<router-link to="/sandbox">Sandbox</router-link>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
// import { mapState } from "vuex";
import manifest from '@/Manifest/manifest';
import gendata from '@/Manifest/data/generate-test-data';

export default {
	mounted() {
		if (!this.$store.state.manifest || !this.$store.state.manifest.isValid) {
			this.$store.dispatch('setManifest', new manifest());
			console.warn('Had to reinitialize Manifest. Figure out why. Models disappearing?');
		}
		if (this.$store.state.manifest.items.length === 0) {
			gendata.init(this.$store.state.manifest);
			gendata.generate();
		}
	},
};
</script>

<style>
html {
	background-color: rgb(32, 32, 35);
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: rgb(110, 55, 235);
}
#nav {
	display: flex;
	flex-direction: row;
}

#navLinks {
	align-self: center;
}

#nav a {
	font-weight: bold;
	color: rgb(112, 112, 112);
	text-decoration-line: none;
}

#nav a.router-link-exact-active {
	color: rgb(110, 55, 235);
}

#nav img {
	height: 32px;
	width: 32px;
	padding: 0px 16px 0px 0px;
	align-self: center;
}
</style>
