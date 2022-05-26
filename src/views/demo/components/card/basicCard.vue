<template>
	<div>
		<date-card :data="basicData" @changeDate="handleChange"></date-card>
	</div>
</template>

<style scoped>
</style>

<script>
import DateCard from "@/components/Card/dateCard";
export default {
	components: {
		DateCard
	},
	data() {
		return {
			basicData: [
				{
					content: "￥12323",
					color: "red",
					fontSize: "12"
				},
				{
					content: "￥12323"
				},
				{
					content: "￥12323"
				},
				{
					content: "￥12323"
				},
				{
					content: "￥12323"
				},
				{
					content: "￥12323"
				},
				{
					content: "￥12323"
				},
				{
					content: "￥12323"
				},
				{
					content: "￥12323"
				},
				{
					content: "￥12323"
				}
			]
		};
	},
	methods: {
		//   接收一个 val
		handleChange(val) {
			console.log(val);
		}
	}
};
</script>