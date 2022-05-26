<!--
 * @Author: zeHua
 * @Date: 2021-07-08 15:22:16
 * @LastEditors: zeHua
 * @LastEditTime: 2021-07-08 16:39:01
 * @FilePath: /yd-admin/src/components/flow/index.vue
-->
<template>
  <div class="app-flow">
    <div class="design-line">
      <div class="pr-line"></div>
      <div class="design-btn-content">
        <FlowBtn />
      </div>
      <div class="add-node-btn">
        <el-button
          type="primary"
          icon="el-icon-plus
"
          circle
        ></el-button>
      </div>
      <div class="design-line">
        <div class="pr-line"></div>
        <div class="design-btn-content node-collect">
          <!-- <FlowBtn /> -->
          <el-button size="mini" round>添加条件</el-button>
        </div>
        <!-- <div class="add-node-btn"> -->
        <!-- <el-button size="mini" round>添加条件</el-button> -->

        <!-- <el-button
            type="primary"
            icon="el-icon-plus
"
            circle
          ></el-button> -->
        <!-- </div> -->
        <div class="design-line left-line condition-node">
          <div class="pr-line"></div>
          <div class="design-btn-content">
            <!-- <FlowBtn /> -->
            <!-- <el-button size="mini" round>添加条件</el-button> -->
          </div>
          <div class="add-node-btn">
            <!-- <el-button size="mini" round>添加条件</el-button> -->

            <!-- <el-button
            type="primary"
            icon="el-icon-plus
"
            circle
          ></el-button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="endNode">
      <span>流程结束</span>
    </div>
  </div>
</template>

<script>
import FlowBtn from "./flowBtn.vue";
export default {
  components: {
    FlowBtn,
  },
};
</script>

<style lang='scss' scoped>
.app-flow {
  position: relative;
  width: 100%;
  .design-line.left-line::before {
    top: -2px;
    left: -1px;
  }

  .design-line {
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin: 0px auto;
    height: auto;
    display: -ms-flexbox;
    /* display: flex; */
    width: 100%;
    position: relative;
    z-index: 99;

    .node-collect {
      border-top: 2px solid #ccc;
      width: 100% !important;
      cursor: pointer;
      padding: 15px;
      text-align: center;
      z-index: 99;
      /* border-bottom: 2px solid #ccc; */
      button {
        cursor: pointer;
        margin: 0 auto;
        position: absolute;
        margin-top: -15px;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        -webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 12%);
        box-shadow: 0 1px 4px 0 rgb(0 0 0 / 12%);
      }
    }
    .design-btn-content {
      z-index: 99;
      width: 100%;
      width: fit-content;
      cursor: pointer;
      text-align: center;
      margin: 0px auto;
      height: auto;
      display: -ms-flexbox;
      display: flex;
      position: relative;
    }
    .add-node-btn {
      padding: 32px 0 40px;
      width: 500px;
      position: relative;
      z-index: 999;
      text-align: center;
      margin: 0 auto;
    }
    .pr-line {
      display: block;
      width: 2px;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
      background-color: #ccc;
      z-index: 0;
    }
  }
  .endNode::after {
    content: "";
    display: table;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #d9d9d9;
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, -37px);
    -ms-transform: translate(-50%, -37px);
    transform: translate(-50%, -37px);
  }
  .endNode {
    position: absolute;
    bottom: -50px;
    left: 50%;

    -webkit-transform: translate(-50%, -18px);
    -ms-transform: translate(-50%, -18px);
    transform: translate(-50%, -18px);
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>