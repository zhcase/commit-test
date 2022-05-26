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
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
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
          field: "airportPrice",
          label: "机场建设费（民航发展基金）",
          component: "Input",
          placeholder: "请输入机场建设费（民航发展基金）",
          // rules: [{ validator: checkNum, trigger: "blur" }],
          append: "元",
          sformat: "money",
          maxlength: 10,
          componentProps: {
            onBlur: value => {
              return this.onBlurSetRate(value)
            }
          },
        },
        {
          field: "airportRate",
          label: "税率",
          component: "Input",
          disabled: true,
          placeholder: "",
          maxlength: 10,
          append: "%",
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
          field: "airportTax",
          label: "税额",
          component: "Input",
          disabled: true,
          placeholder: "",
          sformat: "money",
          maxlength: 10,
          append: "元"
        },
        {
          field: "airportNoTaxPrice",
          label: "不含税价",
          component: "Input",
          disabled: true,
          placeholder: "",
          sformat: "money",
          maxlength: 10,
          append: "元"
        }
      ],
      formModel: {
        airportPrice: "",
        airportRate: "",
        airportTax: "",
        airportNoTaxPrice: ""
      }
    };
  },
  methods: {
    setInitData (data) {
      let {airportPrice, airportRate, airportTax, airportNoTaxPrice} = data?.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["airportPrice", "airportRate", "airportTax", "airportNoTaxPrice"]
      data.airportPrice = this.formatPrice(airportPrice || 0)
      data.airportNoTaxPrice = this.formatPrice(airportNoTaxPrice || 0) // 显示机场建设费（民航发展基金）
      data.airportRate = 0  // 不可修改，显示：0元
      data.airportTax = 0   // 不可修改，显示：0元
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {
          airportPrice: this.formatPrice(airportPrice || 0), 
          airportRate, 
          airportTax, 
          airportNoTaxPrice: this.formatPrice(airportNoTaxPrice || 0)
        }
      })
    },
    onBlurSetRate (value) {
      // 校验是否金额格式
      // if (!/^(([1-9]\d*)|\d)(\.\d+)?$/.test(value)) {
      //   return false;
      // }
      value = (value || 0) * 1
      let airportPrice = this.formatPrice(value)
      let airportNoTaxPrice = this.formatPrice(value)
      this.setDataModel(airportPrice, {field: "airportPrice"})
      this.setDataModel(airportNoTaxPrice, {field: "airportNoTaxPrice"})
      this.totalChange({
        templateName: "AirTransportElectronic"
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>