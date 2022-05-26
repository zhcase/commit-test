<!--
 * @Author: zeHua
 * @Date: 2021-09-09 09:07:00
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-10 11:27:45
 * @FilePath: /yd-admin/src/components/Form/components/SelectInputGroup.vue
-->
<template>
  <div class="input-group">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.input-group {
  display: flex;
}
</style>
