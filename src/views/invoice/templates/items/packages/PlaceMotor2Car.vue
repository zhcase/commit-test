<template>
  <div  class="item-content">
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
// import {BasicForm} from "@/components/Form/index"
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
export default {
  name: "invoiceBuyerTemplate",
  mixins: [mixinsItemsProvider],
  // components: {BasicForm2: BasicForm},
  data () {
    return {
      basicForm: [
        {
          field: "sellName",
          label: "经营，拍卖单位",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入经营，拍卖单位",
        },
        {
          field: "sellAddress",
          label: "经营，拍卖单位地址",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入经营，拍卖单位地址",
        },
        {
          field: "sellTaxpayerNumber",
          label: "纳税人识别号",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入纳税人识别号",
        },
        {
          field: "sellBank",
          label: "开户银行",
          component: "Input",
          defaultValue: "",
          maxlength: 30,
          placeholder: "请输入开户银行",
        },
        {
          field: "sellAccount",
          label: "账号",
          component: "Input",
          defaultValue: "",
          maxlength: 30,
          placeholder: "请输入账号",
          componentProps: {
            onBlur: (value, item) => {
              this.formatCard(value, item)
            }
          },
        },
        {
          field: "sellPhone",
          label: "电话",
          component: "Input",
          defaultValue: "",
          maxlength: 30,
          placeholder: "请输入电话",
        },
        {
          field: "buyName",
          label: "二手车市场",
          component: "Input",
          defaultValue: "",
          maxlength: 30,
          placeholder: "请输入二手车市场",
        },
      ],
      formModel: {
        sellName: "",
        sellAddress: "",
        sellTaxpayerNumber: "",
        sellBank: "",
        sellAccount: "",
        sellPhone: "",
        buyName: "",
      },
    }
  },
  methods: {
    setInitData (data) {
      let {sellName, sellAddress, sellTaxpayerNumber, sellBank, sellAccount, sellPhone, buyName} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["sellName", "sellAddress", "sellTaxpayerNumber", "sellBank", "sellAccount", "sellPhone", "buyName"]
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {sellName, sellAddress, sellTaxpayerNumber, sellBank, sellAccount, sellPhone, buyName}
      })
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