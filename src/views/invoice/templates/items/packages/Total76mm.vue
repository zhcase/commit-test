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
  name: "invoiceTotalTemplate",
  mixins: [mixinsItemsProvider],
  data () {
    return {
      basicForm: [
        {
          field: "totalPriceTaxStr",
          label: "合计金额(大写)",
          component: "Text",
          placeholder: "",
          style: {
            fontWeight: "bold",
            width: "auto"
          },
          componentProps: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "16px"
          },
        },
        {
          field: "totalPriceTax",
          label: "合计金额(小写)",
          component: "Input",
          placeholder: "",
          append: "元",
          sformat: "money",
          maxlength: 10,
          style: {
            fontWeight: "bold"
          },
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
          componentProps: {
            color: "#333",
            fontWeight: "bold",
            onBlur: (value, item) => {
              this.toChiesHandle(value, item)
              this.onBlurFormatPrice(value, item)
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item)
            }
          },
        },
      ],
      formModel: {
        totalPriceTaxStr: "",
        totalPriceTax: "",
      },
    }
  },
  methods: {
    setInitData (data) {
      let {totalPriceTaxStr, totalPriceTax} = data || {}
      let basicForm = this.basicForm.slice()
      data.totalPriceTaxStr = this.toChies(totalPriceTax)
      let keys = ["totalPriceTaxStr", "totalPriceTax"]
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {
          totalPriceTaxStr,
          totalPriceTax: this.priceFormat(totalPriceTax)
        }
      })
    },
    // 将小写联动到大写
    toChiesHandle (value, item) {
      let str = this.toChies(value)
      this.setDataModel(str, {field: "totalPriceTaxStr"})
    }
  }
}
</script>