<template>
  <div  class="item-content">
    <div class="invoice-item-title">购买方</div>
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
  name: "invoiceBuyerTemplate",
  mixins: [mixinsItemsProvider],
  data () {
    return {
      buyFormClass: "invoice-form invoice-buy-form",
      basicForm: [
        {
          field: "buyName",
          label: "名称",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入名称",
        },
        {
          field: "buyTaxpayerNumber",
          label: "纳税人识别号",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入纳税人识别号",
        }
      ],
      formModel: {
        buyName: "",
        buyTaxpayerNumber: ""
      },
    }
  },
  methods: {
    setInitData (data) {
      let {buyName, buyTaxpayerNumber} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["buyName", "buyTaxpayerNumber"]
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {buyName, buyTaxpayerNumber}
      })
      if (this.disabled) {
        this.buyFormClass = "invoice-form invoice-buy-form"
      } else {
        this.buyFormClass = "invoice-form invoice-buy-form"
      }
    },
    onChangeHandle (value) {
      // this.$nextTick(() => {
      //   this.formModel.buyAccount = `${value}+rrr`
      // })
      console.log("触发change事件：", value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>