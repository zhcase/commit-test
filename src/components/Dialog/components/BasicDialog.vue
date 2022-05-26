<!--
 * @Author: zeHua
 * @Date: 2021-09-24 15:47:02
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-27 09:51:42
 * @FilePath: /yd-admin/src/components/Dialog/components/BasicDialog.vue
-->

<template>
  <div>
    <el-dialog
      title="提示"
      v-on="$listeners"
      v-bind="$attrs"
      :class="isScreen ? 'vdialog' : ''"
      ref="dialog"
      v-dialogDrag
      :width="isScreen ? '100%' : ''"
      height="100%"
      :style="{ height: isScreen ? '100%' : '' }"
    >
      <div slot="title">
        <el-tooltip
          class="item"
          effect="dark"
          :content="isScreen ? '还原' : '最大化'"
          placement="bottom"
        >
          <i
            class="el-icon-full-screen
"
            style="float:right;margin-right:30px;cursor:pointer"
            v-if="screen"
            @click="handleScreenClick"
          ></i>
        </el-tooltip>
      </div>
      <slot> </slot>
    </el-dialog>
  </div>
</template>

<script>
import '../hooks/utils.js';
export default {
  name: 'BasicDialog',
  props: {
    screen: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      obj: { name: 11 },
      isScreen: false,
    };
  },
  created() {
    this.$nextTick(() => {
      console.log(this.$refs.dialog);
      // this.$refs.dialog.attributes('v-dialogDrag', 'true');
    });
  },
  methods: {
    /**
     * 点击全屏dialog
     */
    handleScreenClick() {
      this.isScreen = !this.isScreen;
    },
  },
};
</script>

<style lang="scss">
.vdialog {
  .el-dialog {
    width: 100% !important;
    height: 100%;
    margin-top: 0 !important;
    margin-bottom: 0;
  }
}
</style>
