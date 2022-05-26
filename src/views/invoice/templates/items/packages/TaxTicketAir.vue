<template>
  <div class="item-content">
    <basic-form-2
      :schema="basicForm"
      :span="12"
      ref="form"
      :formModel.sync="formModel"
      :labelWidth="labelWidth"
      :formClass="formClass"
    >
      <template #footer>
        <div></div>
      </template>
    </basic-form-2>
    <el-divider></el-divider>
  </div>
</template>

<script>
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider";
export default {
  name: "invoiceSkuTemplate",
  mixins: [mixinsItemsProvider],
  data() {
    // 校验是否金额
    var checkNum = (rule, value, callback) => {
      if (value != "") {
        value = value.toString().replace(/\,/g, "");
        if (!/^(([1-9]\d*)|\d|\,)(\.\d+)?$/.test(value)) {
          return callback(new Error("输入需为数字"));
        } else {
          return callback();
        }
      }
    };
    return {
      basicForm: [
        {
          field: "ticketPrice",
          label: "票价",
          component: "Input",
          placeholder: "请输入票价",
          // rules: [{ validator: checkNum, trigger: "blur" }],
          append: "元",
          maxlength: 10,
          sformat: "money",
          componentProps: {
            onBlur: (value) => {
              return this.onBlurSetRate(value);
            },
          },
        },
        {
          field: "ticketRate",
          label: "税率",
          component: "Input",
          disabled: true,
          placeholder: "",
          append: "%",
          maxlength: 10,
          componentProps: {
            onBlur: (value, item) => {
              return this.onBlurFormatNumber(value, item, this.baseFormList);
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item, this.baseFormList)
            }
          },
        },
        {
          field: "ticketTax",
          label: "税额",
          component: "Input",
          disabled: true,
          placeholder: "",
          sformat: "money",
          append: "元",
          maxlength: 10,
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
        },
        {
          field: "ticketNoTaxPrice",
          label: "不含税价",
          component: "Input",
          disabled: true,
          placeholder: "",
          sformat: "money",
          append: "元",
          maxlength: 10,
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
        },
      ],
      formModel: {
        ticketPrice: "",
        ticketRate: "9",
        ticketTax: "",
        ticketNoTaxPrice: "",
      },
    };
  },
  methods: {
    setInitData(data) {
      let ticketRate = 9;
      let { ticketPrice, ticketTax, ticketNoTaxPrice } =
        data?.invoiceManageVehicleInfo || {};
      let basicForm = this.basicForm.slice();
      let keys = ["ticketPrice", "ticketRate", "ticketTax", "ticketNoTaxPrice"];
      let setRate = this.onBlurSetRate(ticketPrice);
      data.ticketPrice = this.formatPrice(ticketPrice || 0);
      data.ticketRate = ticketRate;
      data.ticketTax = ticketTax || setRate.ticketTax;
      data.ticketNoTaxPrice = ticketNoTaxPrice || setRate.ticketNoTaxPrice;
      this.basicForm = this.assinDefaultValue(basicForm, data, keys);
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {
          ticketPrice,
          ticketRate,
          ticketTax,
          ticketNoTaxPrice,
        };
      });
    },
    onBlurSetRate(value) {
      // 校验是否金额格式
      // if (!/^(([1-9]\d*)|\d)(\.\d+)?$/.test(value)) {
      //   return false;
      // }
      value = (value || 0) * 1;
      let ticketTax = value * 1 * 0.09; // 税额=票价*税率（9%）
      let ticketNoTaxPrice = value * 1 - ticketTax; // 不含税价=票价-税额
      let setRate = {
        ticketRate: "9", // 票价税率固定9%
        ticketTax,
        ticketNoTaxPrice,
      };
      let ticketPrice = this.formatPrice(value);
      ticketTax = this.formatPrice(ticketTax);
      ticketNoTaxPrice = this.formatPrice(ticketNoTaxPrice);

      this.setDataModel(ticketPrice, { field: "ticketPrice" });
      this.setDataModel(ticketTax, { field: "ticketTax" });
      this.setDataModel(ticketNoTaxPrice, { field: "ticketNoTaxPrice" });
      this.totalChange({
        templateName: "AirTransportElectronic",
      });
      return setRate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>