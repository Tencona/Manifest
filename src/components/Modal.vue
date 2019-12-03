<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<button class="modal-default-button" @click="$emit('close')">x</button>
					<div class="modal-content">
						<div class="modal-header">
							<slot name="header">default header</slot>
						</div>

						<div class="modal-body">
							<slot name="body">default body</slot>
						</div>

						<div class="modal-footer">
							<slot name="footer">default footer</slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Modal',
	components: {},
	props: {},
	data() {
		return {};
	},
	computed: {},
	methods: {},
};
</script>

<style scoped>
.Modal {
}

.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: all 0.2s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 300px;
	margin: 0px auto;
	padding: 4px 4px;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.2s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-content {
	padding: 10px 10px 10px 10px;
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
	background: none;
	outline: none;
	border: none;
	color: gray;
	font-size: 12pt;
}

.modal-enter {
	opacity: 0;
}
.modal-enter-to {
	opacity: 1;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.02);
	transform: scale(1.02);
}
</style>