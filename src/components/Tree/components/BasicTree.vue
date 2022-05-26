<!--
 * @Author: zeHua
 * @Date: 2021-09-17 09:39:39
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-17 14:43:46
 * @FilePath: /yd-admin/src/components/Tree/components/BasicTree.vue
-->
<template>
  <el-tree v-on="$listeners" v-bind="$attrs" ref="tree"></el-tree>
</template>
<script>
export default {
  name: 'basicTree',
  data() {
    return {
      method: null,
    };
  },
  props: {
    refs: {
      required: false,
      type: String,
    },
  },
  mounted() {
    this.method = this.$refs.tree;
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>
