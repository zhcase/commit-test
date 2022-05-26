<template>
  <div  class="item-content">
    <div class="invoice-item-title">销售方</div>
    <basic-form-2
      :schema="basicForm"
      :span="12"
      ref="form"
      :formModel.sync="formModel"
      :labelWidth="labelWidth"
      :formClass="buyFormClass"
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
  name: "invoiceSalerTemplate",
  mixins: [mixinsItemsProvider],
  data () {
    return {
      buyFormClass: "invoice-form invoice-buy-form",
      basicForm: [
        {
          field: "sellName",
          label: "名称",
          component: "Input",
          maxlength: 200,
          placeholder: "请输入销售方名称",
        },
        {
          field: "sellTaxpayerNumber",
          label: "纳税人识别号",
          component: "Input",
          maxlength: 50,
          placeholder: "请输入纳税人识别号",
        },
      ],
      formModel: {
        sellName: "",
        sellTaxpayerNumber: "",
      },
    }
  },
  methods: {
    setInitData (data) {
      let {sellName, sellTaxpayerNumber} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["sellName", "sellTaxpayerNumber"]
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {sellName, sellTaxpayerNumber}
      })
      if (this.disabled) {
        this.buyFormClass = "invoice-form invoice-buy-form"
      } else {
        this.buyFormClass = "invoice-form invoice-buy-form"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>