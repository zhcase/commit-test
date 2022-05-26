<template>
  <div class="template-content scroll-style" ref="topMark">
    <Description ref="desc" />
    <MainInfo ref="mainInfo" />
    <Saler76mm ref="saler76mm" />
    <Cashier ref="cashier" />
    <Buyer76mm ref="buyer76mm" />
    <Sku76mm ref="sku76mm"  @deleteSku="deleteSku" />
    <Total76mm ref="total76mm" />

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
 * 详情组件 - 发票模板 - (增值税普通发票（卷票）76mm、57mm) - type: 5
 * 
 * 大致功能说明：
 * 1、组合templates/items的原子组件形成模板
 * 2、初始化传递给原子组件使用provider的方式注入detailData，子组件获取数据
 * 3、通过refs的方式拿取原子组件填写的值，通过onSubmit 传递给详情组件
 * 
 */

import { Description, MainInfo, Saler76mm, Cashier, Buyer76mm, Sku76mm, Total76mm } from "@/views/invoice/templates/items/index"
import mixinsTemplateProvider from "@/views/invoice/mixins/mixins-template-provider"
export default {
  name: "VATOrdinary76mm",
  mixins: [mixinsTemplateProvider],
  components: { Description, MainInfo, Saler76mm, Cashier, Buyer76mm, Sku76mm, Total76mm },
  methods: {
    onSubmit () {
      let data = this.createParams(
        ["desc", "mainInfo", "saler76mm", "cashier", "buyer76mm", "sku76mm", "total76mm"],
        "invoiceManageItemInfoList",
        "sku76mm"
      )
      // 调整数据结构
      let formatData = this.formatParams([
        "price",
        "money",
        "totalPriceTax",
      ], data)
      this.$emit("submit", formatData)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>