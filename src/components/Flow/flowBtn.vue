<!--
 * @Author: zeHua
 * @Date: 2021-07-08 15:26:04
 * @LastEditors: zeHua
 * @LastEditTime: 2021-07-08 15:49:58
 * @FilePath: /yd-admin/src/components/Flow/flowBtn.vue
-->
<template>
  <div class="flow-btn node-wrap-box-start">
    <div class="title">发起人</div>
    <div class="content">
      <span class="text"></span> 所有人
      <span class="arrow"><i class="el-icon-arrow-right"></i></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.node-wrap-box-start {
  .title {
    background-color: #0960bd !important;
  }
}
.flow-btn {
  width: 220px;
  background: #fff;
  /* -webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 12%); */
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 12%);
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  z-index: 99;
  .title {
    position: relative;
    padding-left: 10px;
    padding-right: 30px;
    width: 100%;
    line-height: 24px;
    font-size: 12px;
    color: #fff;
    text-align: left;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .content {
    position: relative;
    font-size: 14px;
    padding: 17px 30px 17px 10px;
    .text {
      display: block;
      text-align: left;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      overflow: hidden;
      white-space: nowrap;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 20px;
      height: 14px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>