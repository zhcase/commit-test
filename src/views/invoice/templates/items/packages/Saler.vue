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
        {
          field: "sellAddress",
          label: "地址",
          component: "Input",
          maxlength: 200,
          placeholder: "请输入地址",
        },
        {
          field: "sellPhone",
          label: "电话",
          component: "Input",
          maxlength: 30,
          placeholder: "请输入电话",
        },
        {
          field: "sellBank",
          label: "开户行",
          component: "Input",
          maxlength: 50,
          placeholder: "请输入销售方开户行",
        },
        {
          field: "sellAccount",
          label: "账号",
          component: "Input",
          maxlength: 50,
          placeholder: "请输入账号名",
          componentProps: {
            onBlur: (value, item) => {
              this.formatCard(value, item)
            }
          },
        },
      ],
      formModel: {
        sellName: "",
        sellTaxpayerNumber: "",
        sellAddress: "",
        sellPhone: "",
        sellBank: "",
        sellAccount: "",
      },
    }
  },
  methods: {
    setInitData (data) {
      let {sellName, sellTaxpayerNumber, sellAddress, sellPhone, sellBank, sellAccount} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["sellName", "sellTaxpayerNumber", "sellAddress", "sellPhone", "sellBank", "sellAccount"]
      data.sellAccount = this.addLineCard(sellAccount)
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {sellName, sellTaxpayerNumber, sellAddress, sellPhone, sellBank, sellAccount}
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