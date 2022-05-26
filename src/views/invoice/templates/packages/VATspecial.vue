<template>
  <div class="template-content scroll-style" ref="topMark">
    <Description ref="desc"></Description>
    <MainInfo ref="mainInfo"></MainInfo>
    <Buyer ref="buyer"></Buyer>
    <Sku ref="sku" @deleteSku="deleteSku"></Sku>
    <Total ref="total"></Total>
    <Saler ref="saler"></Saler>
    <Remark ref="remark"></Remark>
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
 * 详情组件 - 发票模板 - （增值税专用发票、增值税普通发票、增值税电子普通发票） - type: 0、3、4
 * 
 * 大致功能说明：
 * 1、组合templates/items的原子组件形成模板
 * 2、初始化传递给原子组件使用provider的方式注入detailData，子组件获取数据
 * 3、通过refs的方式拿取原子组件填写的值，通过onSubmit 传递给详情组件
 * 
 */

import {Description, MainInfo, Buyer, Sku, Total, Saler, Remark} from "@/views/invoice/templates/items/index"
import mixinsTemplateProvider from "@/views/invoice/mixins/mixins-template-provider"
export default {
  name: "VATspecial",
  mixins: [mixinsTemplateProvider],
  components: {Description, MainInfo, Buyer, Sku, Total, Saler, Remark},
  methods: {
    onSubmit () {
      let data = this.createParams(
        ["desc", "mainInfo", "buyer", "sku", "total", "saler", "remark"],
        "invoiceManageItemInfoList",
        "sku"
      )
      // 调整数据结构
      let formatData = this.formatParams([
        "price",
        "money",
        "tax",
        "totalMoney",
        "totalTax",
        "totalPriceTax",
      ], data)

      formatData.buyAccount = formatData?.buyAccount?.replace(/ /g, '')
      this.$emit("submit", formatData)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>