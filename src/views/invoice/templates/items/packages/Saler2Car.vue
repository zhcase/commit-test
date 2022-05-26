<template>
  <div  class="item-content">
    <div class="invoice-item-title">卖方</div>
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
// import {BasicForm} from "@/components/Form/index"
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
export default {
  name: "invoiceBuyerTemplate",
  mixins: [mixinsItemsProvider],
  // components: {BasicForm2: BasicForm},
  data () {
    return {
      buyFormClass: "invoice-form invoice-buy-form",
      basicForm: [
        {
          field: "sellerUnit",
          label: "卖方单位/个人",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入卖方单位/个人",
        },
        {
          field: "sellerUnitCode",
          label: "单位代码/身份证号码",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入单位代码/身份证号码",
        },
        {
          field: "sellerUnitAddress",
          label: "卖方单位/个人住址",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入卖方单位/个人住址",
        },
        {
          field: "sellerUnitPhone",
          label: "电话",
          component: "Input",
          defaultValue: "",
          maxlength: 30,
          placeholder: "请输入电话",
        },
      ],
      formModel: {
        sellerUnit: "",
        sellerUnitCode: "",
        sellerUnitAddress: "",
        sellerUnitPhone: ""
      },
    }
  },
  methods: {
    setInitData (data) {
      let {sellerUnit, sellerUnitCode, sellerUnitAddress, sellerUnitPhone} = data.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["sellerUnit", "sellerUnitCode", "sellerUnitAddress", "sellerUnitPhone"]
      this.basicForm = this.assinDefaultValue(basicForm, data.invoiceManageVehicleInfo, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {sellerUnit, sellerUnitCode, sellerUnitAddress, sellerUnitPhone}
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