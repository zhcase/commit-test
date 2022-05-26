<!--
 * @Author: zeHua
 * @Date: 2021-07-23 09:40:07
 * @LastEditors: zeHua
 * @LastEditTime: 2022-05-25 14:12:42
 * @FilePath: \dailyoffice\src\views\life\index.vue
-->
<template>
	<div>
		<children></children>
	</div>
</template>

<script>
import children from "./children.vue";
export default {
	components: {
		children
	},
	beforeCreate() {
		console.log("%c -----父组件beforeCreate----", "color:blue");
	},
	created() {
		console.log("%c  -----父组件created----", "color:blue");
	},
	beforeMount() {
		console.log("%c  -----父组件beforeMount----", "color:blue");
	},
	mounted() {
		console.log("%c -----父组件mounted----", "color:blue");
	},
	beforeDestroy() {
		console.log("%c -----父组件beforeDestroy----", "color:blue");
	},
	destroyed() {
		console.log("%c -----父组件destroyed----", "color:blue");
	}
};
</script>