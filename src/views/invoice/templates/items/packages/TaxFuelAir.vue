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
          field: "fuelPrice",
          label: "燃油附加费",
          component: "Input",
          placeholder: "请输入燃油附加费",
          rules: [{ validator: checkNum, trigger: "blur" }],
          append: "元",
          sformat: "money",
          maxlength: 10,
          componentProps: {
            onBlur: value => {
              this.onBlurSetRate(value)
            }
          },
        },
        {
          field: "fuelRate",
          label: "税率",
          component: "Input",
          disabled: true,
          placeholder: "请输入税率",
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
          field: "fuelTax",
          label: "税额",
          component: "Input",
          disabled: true,
          placeholder: "",
          sformat: "money",
          maxlength: 10,
          append: "元"
        },
        {
          field: "fuelNoTaxPrice",
          label: "不含税价",
          component: "Input",
          disabled: true,
          placeholder: "",
          sformat: "money",
          maxlength: 10,
          append: "元"
        },
        
      ],
      formModel: {
        fuelPrice: "",
        fuelRate: "",
        fuelTax: "",
        fuelNoTaxPrice: "",
      }
    };
  },
  methods: {
    setInitData (data) {
      let fuelRate = 9
      let {fuelPrice, fuelTax, fuelNoTaxPrice} = data?.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["fuelPrice", "fuelRate", "fuelTax", "fuelNoTaxPrice"]
      let setRate = this.onBlurSetRate(data.fuelPrice || 0)
      data.fuelPrice = this.formatPrice(fuelPrice || 0) || 0
      data.fuelRate = fuelRate??0
      data.fuelTax = setRate.fuelTax??0
      data.fuelNoTaxPrice = setRate.fuelNoTaxPrice??0
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {fuelPrice, fuelRate, fuelTax, fuelNoTaxPrice}
      })
    },
    onBlurSetRate (value) {
      // 校验是否金额格式
      // if (!/^(([1-9]\d*)|\d)(\.\d+)?$/.test(value)) {
      //   return false;
      // }
      value = (value || 0) * 1
      let fuelTax = value * 1 * 0.09 // 税额=票价*税率（9%）
      let fuelNoTaxPrice = value * 1 - fuelTax // 不含税价=票价-税额
      let setRate = {
        fuelRate: "9", // 票价税率固定9%
        fuelTax,
        fuelNoTaxPrice,
      }
      let fuelPrice = this.formatPrice(value)??0
      fuelTax = this.formatPrice(fuelTax)
      fuelNoTaxPrice = this.formatPrice(fuelNoTaxPrice)
      this.setDataModel(fuelPrice, {field: "fuelPrice"})
      this.setDataModel(fuelTax, {field: "fuelTax"})
      this.setDataModel(fuelNoTaxPrice, {field: "fuelNoTaxPrice"})
      this.totalChange({
        templateName: "AirTransportElectronic"
      })
      return setRate
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>