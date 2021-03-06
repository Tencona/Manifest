import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import Item from '@/views/Item.vue';
import Console from '@/views/Console.vue';
import Sandbox from '@/views/Sandbox.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
		},
		{
			path: '/item',
			name: 'item',
			component: Item,
		},
		{
			path: '/console',
			name: 'console',
			component: Console,
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
		},
		{
			path: '/sandbox',
			name: 'sandbox',
			component: Sandbox,
		},
	],
});
