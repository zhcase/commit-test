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
        },
        {
          field: "buyAddress",
          label: "地址",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入地址",
        },
        {
          field: "buyPhone",
          label: "电话",
          component: "Input",
          defaultValue: "",
          maxlength: 30,
          placeholder: "请输入电话",
        },
        {
          field: "buyBank",
          label: "开户行",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入购买方开户行",
        },
        {
          field: "buyAccount",
          label: "账号",
          component: "Input",
          defaultValue: "",
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
        buyName: "",
        buyTaxpayerNumber: "",
        buyAddress: "",
        buyPhone: "",
        buyBank: "",
        buyAccount: "",
      },
    }
  },
  methods: {
    setInitData (data) {
      let {buyName, buyTaxpayerNumber, buyAddress, buyPhone, buyBank, buyAccount} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["buyName", "buyTaxpayerNumber", "buyAddress", "buyPhone", "buyBank", "buyAccount"]
      data.buyAccount = this.addLineCard(buyAccount)
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel = this.disabled ? {} : {buyName, buyTaxpayerNumber, buyAddress, buyPhone, buyBank, buyAccount}
      })
      if (this.disabled) {
        this.buyFormClass = "invoice-form invoice-buy-form"
      } else {
        this.buyFormClass = "invoice-form invoice-buy-form"
      }
    },
    onChangeHandle (value) {
      console.log("触发change事件：", value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>