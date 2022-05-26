<template>
  <div>
    <el-tabs tab-position="left" style="height: 100%"   :class="pane"  @tab-click="handleClick">
      <el-tab-pane label="物品清单" :lazy="true">
        <inventory :tabValue="tabValue"></inventory>
      </el-tab-pane>
      <el-tab-pane label="我申请的流程" :lazy="true">
        <applyFlow :tabValue="tabValue"></applyFlow>
      </el-tab-pane>
      <el-tab-pane label="待我审批的流程" :lazy="true">
        <approvalFlow :tabValue="tabValue"></approvalFlow>
      </el-tab-pane>
      <el-tab-pane label="指定我为审批人的流程" :lazy="true">
        <assignApplyFlow :tabValue="tabValue"></assignApplyFlow>
      </el-tab-pane>
      <el-tab-pane label="我作为直属负责人" :lazy="true">
        <iasPrincipal :tabValue="tabValue"></iasPrincipal>
      </el-tab-pane>
      <el-tab-pane label="资产管理员" :lazy="true">
        <assetAdmin :tabValue="tabValue"></assetAdmin>
      </el-tab-pane>
      <el-tab-pane label="其他业务负责人" :lazy="true">
        <otherBusiness :tabValue="tabValue"></otherBusiness>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import inventory from "@/views/workhandover/components/inventory";
import applyFlow from "@/views/workhandover/components/applyFlow";
import approvalFlow from "@/views/workhandover/components/approvalFlow";
import assignApplyFlow from "@/views/workhandover/components/assignApplyFlow";
import iasPrincipal from "@/views/workhandover/components/iasPrincipal";
import assetAdmin from "@/views/workhandover/components/assetAdmin";
import otherBusiness from "@/views/workhandover/components/otherBusiness";

export default {
  components: {inventory, applyFlow, approvalFlow, assignApplyFlow, iasPrincipal, assetAdmin, otherBusiness},
  data() {
    return {
      pane: '.el-tabs--left .el-tabs__item.is-left',
      tabValue:"",
    };
  },
  methods:{
    handleClick(val){
      this.tabValue=val.index;
    }
  }
  
};
</script>
<style scoped>
/deep/ .el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}
/deep/ .el-tabs__item.is-active {
  background-color: #ecf5ff;
}
</style>