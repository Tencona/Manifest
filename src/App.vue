<template>
	<div id="app">
		<div id="nav">
			<img id="navlogo" alt="Manifest logo" src="@/assets/logo.png" />
			<div id="navLinks">
				<router-link to="/">Home</router-link>
				<router-link to="/dashboard">Dashboard</router-link>
				<router-link to="/item">Item</router-link>
				<router-link to="/console">Console</router-link>
				<router-link to="/about">About</router-link>
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
	background-color: white;
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
	padding: 8px;
	height: 60px;
	flex-direction: row;
	background: linear-gradient(180deg, #ab8af4 0%, #6e37eb 100%);
	/* Card Elevation 2 */
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.23), 0px 3px 6px rgba(0, 0, 0, 0.16);
	border-radius: 8px;
}

#navLinks {
	align-self: center;
}

#nav a {
	font-weight: bold;
	color: rgb(85, 65, 135);
	text-decoration-line: none;
	padding: 0px 8px 0px 8px;
}

#nav a.router-link-exact-active {
	color: white;
	font-size: 115%;
}

#nav img {
	height: 32px;
	width: 32px;
	padding: 0px 16px 0px 0px;
	align-self: center;
}
</style>
