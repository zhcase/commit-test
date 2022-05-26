<template>
  <div class="template-content scroll-style" ref="topMark">
    <Description ref="desc" />
    <MainInfoTran ref="mainInfoTran" />
    <TranInfo ref="tranInfo" />
    <TaxTicketAir ref="taxTicketAir" />
    <Total ref="total" />
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
 * 详情组件 - 发票模板 - 火车票 - type: 9
 *
 * 大致功能说明：
 * 1、组合templates/items的原子组件形成模板
 * 2、初始化传递给原子组件使用provider的方式注入detailData，子组件获取数据
 * 3、通过refs的方式拿取原子组件填写的值，通过onSubmit 传递给详情组件
 *
 */

import {
  Description,
  MainInfoTran,
  TaxTicketAir,
  TranInfo,
  Total,
} from "@/views/invoice/templates/items/index";
import mixinsTemplateProvider from "@/views/invoice/mixins/mixins-template-provider";
export default {
  name: "TrainTickets",
  mixins: [mixinsTemplateProvider],
  components: { Description, MainInfoTran, TaxTicketAir, TranInfo, Total },
  data() {
    return {
      formatKeys: ["voyage", "trainNumber", "driveDate", "driveTime"],
    };
  },
  methods: {
    onSubmit() {
      // let data = this.createParams(
      //   ["desc", "mainInfoTran", "tranInfo", "total"],
      //   "invoiceManageVehicleInfo",
      //   "tranInfo"
      // )
      let data = this.createParams(
        ["desc", "mainInfoTran", "tranInfo", "total"],
        null,
        null
      );
      // 调整数据结构
      let formatData = this.formatParams(
        ["totalMoney", "totalTax", "totalPriceTax"],
        data
      );

      formatData.invoiceDate = formatData.driveDate;
      let adParams = this.formatAddParams(formatData),
        tranInfoData = this.createParams(["tranInfo"], null, null);

      adParams = {
        ...adParams,
        invoiceManageAirInfo: {
          ...this.detailData.invoiceManageAirInfo,
          ...tranInfoData,
        },
        invoiceManageVehicleInfo: {
          ...adParams.invoiceManageVehicleInfo,
          ...this.createParams(
            ["taxTicketAir", "mainInfoTran", "tranInfo"],
            null,
            null
          ),
        },
      };
      adParams.invoiceManageVehicleInfo.ticketPrice = String(
        adParams.invoiceManageVehicleInfo.ticketPrice
      ).replace(/\,/g, "");
      adParams.invoiceManageVehicleInfo.ticketTax = String(
        adParams.invoiceManageVehicleInfo.ticketTax
      ).replace(/\,/g, "");
      adParams.invoiceManageVehicleInfo.ticketNoTaxPrice = String(
        adParams.invoiceManageVehicleInfo.ticketNoTaxPrice
      ).replace(/\,/g, "");
      this.$emit("submit", adParams);
    },
    formatAddParams(data) {
      let invoiceManageVehicleInfo = {};
      let keys = this.formatKeys;

      keys.forEach((key) => {
        invoiceManageVehicleInfo[key] = data[key] ?? "";
        delete data[key];
      });
      data.invoiceManageVehicleInfo = invoiceManageVehicleInfo;
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>