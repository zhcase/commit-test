<template>
  <div class="template-content scroll-style" ref="topMark">
    <Description ref="desc" />
    <MainInfo ref="mainInfo" />
    <Buyer76mm ref="buyerMotor" />
    <SkuMotor ref="skuMotor" />
    <Total76mm ref="total" />
    <Saler ref="saler" />
    <TaxMotor ref="taxMotor" />

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
 * 详情组件 - 发票模板 - 机动车销售统一发票 - type: 2
 * 
 * 大致功能说明：
 * 1、组合templates/items的原子组件形成模板
 * 2、初始化传递给原子组件使用provider的方式注入detailData，子组件获取数据
 * 3、通过refs的方式拿取原子组件填写的值，通过onSubmit 传递给详情组件
 * 
 */

import { Description, MainInfo, Buyer76mm, SkuMotor, Total76mm, Saler, TaxMotor } from "@/views/invoice/templates/items/index"
import mixinsTemplateProvider from "@/views/invoice/mixins/mixins-template-provider"
export default {
  name: "MotorVehicleSales",
  mixins: [mixinsTemplateProvider],
  components: { Description, MainInfo, Buyer76mm, SkuMotor, Total76mm, Saler, TaxMotor },
  data () {
    return {
      formatKeys: [
        "vehicleType",
        "model",
        "production",
        "certificateNum",
        "importCertificate",
        "commodityInspectionOrder",
        "engineNumber",
        "frameNumber",
        "vatRate",
        "vatTax",
        "competentTaxAuthority",
        "competentTaxAuthorityCode",
        "noTaxPrice",
        "taxPaymentNumber",
        "tonnage",
        "passengersNumber"
      ]
    }
  },
  methods: {
    onSubmit () {
      let data = this.createParams(
        ["desc", "mainInfo", "buyerMotor", "skuMotor", "total", "saler", "taxMotor"],
        null,
        null
      )
      // 调整数据结构
      let formatData = this.formatParams(["totalPriceTax", "noTaxPrice", "vatTax"], data)

      let addData = this.formatAddParams(formatData)

      this.$emit("submit", addData)
    },
    formatAddParams (data) {
      let invoiceManageVehicleInfo =  {}
      let keys = this.formatKeys
      
      keys.forEach(key => {
        invoiceManageVehicleInfo[key] = data[key]??""
        delete data[key]
      })
      data.invoiceManageVehicleInfo = invoiceManageVehicleInfo
      return data
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>