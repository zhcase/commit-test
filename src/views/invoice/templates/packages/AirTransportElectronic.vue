<template>
  <div class="template-content scroll-style" ref="topMark">
    <Description ref="desc" />
    <MainInfoAir ref="mainInfo" />
    <Passenge ref="passenge" />
    <SkuTrainAir ref="skuTrainAir"  @deleteSku="deleteSku"/>
    <TaxTicketAir ref="taxTicketAir"  @change="changeHandle"/>
    <TaxAirportAir ref="taxAirportAir"  @change="changeHandle"/>
    <TaxFuelAir ref="taxFuelAir" @change="changeHandle"/>
    <Total ref="total" :totalData="totalData" />
    <UnitAir ref="unitAir" />

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
 * 详情组件 - 发票模板 - 航空运输电子客票行程单 - type: 8
 * 
 * 大致功能说明：
 * 1、组合templates/items的原子组件形成模板
 * 2、初始化传递给原子组件使用provider的方式注入detailData，子组件获取数据
 * 3、通过refs的方式拿取原子组件填写的值，通过onSubmit 传递给详情组件
 * 
 */

import {Description, MainInfoAir, Passenge, SkuTrainAir, TaxTicketAir, TaxAirportAir, TaxFuelAir, Total, UnitAir} from "@/views/invoice/templates/items/index"
import mixinsTemplateProvider from "@/views/invoice/mixins/mixins-template-provider"
export default {
  name: "SelectInvoice",
  mixins: [mixinsTemplateProvider],
  components: {Description, MainInfoAir, Passenge, SkuTrainAir, TaxTicketAir, TaxAirportAir, TaxFuelAir, Total, UnitAir},
  data() {
    return {
      totalData: {},
      formatKeys: [
        "airportPrice",
        "airportRate",
        "airportTax",
        "airportNoTaxPrice",
        "fuelPrice",
        "fuelRate",
        "fuelTax",
        "fuelNoTaxPrice",
        "ticketPrice",
        "ticketRate",
        "ticketTax",
        "ticketNoTaxPrice"
      ]
    }
  },
  methods: {
    onSubmit () {
      let data = this.createParams(
        ["desc", "mainInfo", "passenge", "skuTrainAir", "taxTicketAir", "taxAirportAir", "taxFuelAir", "total", "unitAir"],
        "invoiceManageAirInfoList",
        "skuTrainAir"
      )
      // 将金额转换成数字类型，接口保存string报错
      let numberKeys = this.formatKeys.concat([
        "totalMoney",
        "totalPriceTax",
        "totalTax"
      ])
      let data2Number = this.formatParams2Number(data)
      // 调整数据结构
      let formatData = this.formatAddParams(data2Number)
      formatData = {...formatData, invoiceManageVehicleInfo: {...formatData.invoiceManageVehicleInfo,...this.createParams(['mainInfo','passenge','unitAir'],null,null)}}

      this.$emit("submit", formatData)
    },
    // createParams (getModel = ["desc", "mainInfo", "passenge", "skuTrainAir", "taxTicketAir", "taxAirportAir", "taxFuelAir", "total", "unitAir"]) {
    //   let data = getModel.reduce((prev, curr) => {
    //     let ret = {}
    //     if (curr == "skuTrainAir") {
    //         ret = {
    //           invoiceManageAirInfoList: this.$refs[curr].baseFormList.map(item => item.formModel)
    //         }
    //     } else {
    //       ret = {
    //         ...this.$refs[curr]?.formModel
    //       }
    //     }
    //     return Object.assign({}, prev, ret)
    //   }, {})
    //   return data
    // },
    changeHandle (options) {
      let data = this.createParams(
        ["taxTicketAir", "taxAirportAir", "taxFuelAir"],
        "invoiceManageAirInfoList",
        "skuTrainAir"
      )
      data.templateName = options.templateName
      for (let key in data) {
        let value = data[key]
        this.$set(this.totalData, key, value)
      }
    },
    formatParams2Number (data) {
      // 哪些字段需要转换成为数字
      let numberKeys = this.formatKeys.concat([
        "totalMoney",
        "totalPriceTax",
        "totalTax"
      ])

      let data2Number = {}

      for(let key in data) {
        let value = data[key]
        if (numberKeys.includes(key)) {
          data2Number[key] = this.delcommafy(value)
        } else {
          data2Number[key] = value
        }
      }
      return data2Number
    },
    // 提交前重新组织入参 这个模板的结构跟其他的不同，这些字段需要放入invoiceManageVehicleInfo对象中
    formatAddParams (data) {
      let invoiceManageVehicleInfo =  {}
      let keys = this.formatKeys
      
      keys.forEach(key => {
        invoiceManageVehicleInfo[key] = data[key]
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