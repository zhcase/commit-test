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
          field: "vatRate",
          label: "增值税税率或征收率",
          component: "Input",
          placeholder: "请输入增值税税率或征收率",
          append: "%",
        },
        {
          field: "vatTax",
          label: "增值税税额",
          component: "Input",
          placeholder: "请输入增值税税额",
          append: "元",
          sformat: "money",
          maxlength: 10,
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
          componentProps: {
            onBlur: (value, item) => {
              this.onBlurFormatPrice(value, item)
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item)
            }
          }
        },
        {
          field: "competentTaxAuthority",
          label: "主管税务机关",
          component: "Input",
          placeholder: "请输入主管税务机关",
          maxlength: 200
        },
        {
          field: "competentTaxAuthorityCode",
          label: "主管税务机关及代码",
          component: "Input",
          placeholder: "请输入主管税务机关及代码",
          maxlength: 200
        },
        {
          field: "noTaxPrice",
          label: "不含税价（小写）",
          component: "Input",
          placeholder: "请输入不含税价（小写）",
          append: "元",
          sformat: "money",
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
          componentProps: {
            onBlur: (value, item) => {
              this.onBlurFormatPrice(value, item)
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item)
            }
          }
        },
        {
          field: "taxPaymentNumber",
          label: "完税凭证号码",
          component: "Input",
          placeholder: "请输入完税凭证号码",
          maxlength: 50
        },
        {
          field: "tonnage",
          label: "吨位",
          component: "Input",
          placeholder: "请输入吨位",
          maxlength: 50
        },
        {
          field: "passengersNumber",
          label: "限乘人数",
          component: "Input",
          placeholder: "请输入限乘人数",
          maxlength: 3
        },
      ],
      formModel: {
        vatRate: "",
        vatTax: "",
        competentTaxAuthority: "",
        competentTaxAuthorityCode: "",
        noTaxPrice: "",
        taxPaymentNumber: "",
        tonnage: "",
        passengersNumber: "",
      }
    };
  },
  methods: {
    setInitData (data) {
      let {vatRate, vatTax, competentTaxAuthority, competentTaxAuthorityCode, noTaxPrice,taxPaymentNumber,tonnage,passengersNumber} = data.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["vatRate", "vatTax", "competentTaxAuthority", "competentTaxAuthorityCode", "noTaxPrice", "taxPaymentNumber", "tonnage", "passengersNumber"]
      this.basicForm = this.assinDefaultValue(basicForm, data.invoiceManageVehicleInfo || {}, keys)
      this.$nextTick(() => {
        // this.$refs.form.clearValidate()
        this.formModel =  this.disabled ? {} : {
          vatRate, 
          vatTax: this.formatPrice(vatTax),
          competentTaxAuthority, competentTaxAuthorityCode, 
          noTaxPrice: this.formatPrice(noTaxPrice),
          taxPaymentNumber,tonnage,passengersNumber
        }
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>