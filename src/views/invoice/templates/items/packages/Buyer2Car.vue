<template>
  <div  class="item-content">
    <div class="invoice-item-title">买方</div>
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
          field: "buyerUnit",
          label: "买方单位/个人",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入买方单位/个人",
        },
        {
          field: "buyerUnitCode",
          label: "单位代码/身份证号码",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入单位代码/身份证号码",
        },
        {
          field: "buyerUnitAddress",
          label: "买方单位/个人住址",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入买方单位/个人住址",
        },
        {
          field: "buyerUnitPhone",
          label: "电话",
          component: "Input",
          defaultValue: "",
          maxlength: 30,
          placeholder: "请输入电话",
        },
      ],
      formModel: {
        buyerUnit: "",
        buyerUnitCode: "",
        buyerUnitAddress: "",
        buyerUnitPhone: ""
      },
    }
  },
  methods: {
    setInitData (data) {
      let {buyerUnit, buyerUnitCode, buyerUnitAddress, buyerUnitPhone} = data.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["buyerUnit", "buyerUnitCode", "buyerUnitAddress", "buyerUnitPhone"]
      this.basicForm = this.assinDefaultValue(basicForm, data.invoiceManageVehicleInfo, keys)
      this.$nextTick(() => {
        this.formModel = this.disabled ? {} : {buyerUnit, buyerUnitCode, buyerUnitAddress, buyerUnitPhone}
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