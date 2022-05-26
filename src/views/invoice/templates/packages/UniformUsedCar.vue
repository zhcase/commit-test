<template>
  <div class="template-content scroll-style" ref="topMark">
    <Description ref="desc" />
    <MainInfo ref="mainInfo" />
    <Buyer2Car ref="buyerMotor" />
    <Saler2Car ref="saler" />
    <SkuMotor2Car ref="skuMotor" />
    <Total76mm ref="total" />
    <PlaceMotor2Car ref="place" />
    <Remark ref="remark" />

    <div class="template-btn-content" v-if="!disabled">
      <el-button class="template-btn-item" type="primary" @click="onSubmit">提交</el-button>
      <el-button class="template-btn-item" @click="onCancel">取消</el-button>
    </div>
    <div class="template-btn-content" v-else>
      <el-button class="template-btn-item" @click="onCancel">关闭</el-button>
    </div>
  </div>
</template>

<script>

/**
 * 详情组件 - 发票模板 - 二手车销售统一发票 - type: 7
 * 
 * 大致功能说明：
 * 1、组合templates/items的原子组件形成模板
 * 2、初始化传递给原子组件使用provider的方式注入detailData，子组件获取数据
 * 3、通过refs的方式拿取原子组件填写的值，通过onSubmit 传递给详情组件
 * 
 */

import { Description,MainInfo, Buyer2Car, Saler2Car, SkuMotor2Car, Total76mm, PlaceMotor2Car, Remark } from "@/views/invoice/templates/items/index"
import mixinsTemplateProvider from "@/views/invoice/mixins/mixins-template-provider"
export default {
  name: "UniformUsedCar",
  mixins: [mixinsTemplateProvider],
  components: { Description,MainInfo, Buyer2Car, Saler2Car, SkuMotor2Car, Total76mm, PlaceMotor2Car, Remark },
  methods: {
    onSubmit () {
      let data = this.createParams(
        ["desc", "mainInfo",  "total", "place", "remark"],
        null,
        null
      )
      // 调整数据结构
      let formatData = {...this.formatParams(["totalPriceTax"], data), invoiceManageVehicleInfo: this.createParams(['buyerMotor','saler','skuMotor'],null,null)}
      formatData.sellAccount && (formatData.sellAccount = formatData.sellAccount.replace(/ /g, ''))
      this.$emit("submit", formatData)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>