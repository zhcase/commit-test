<template>
  <div  class="item-content">
    <div class="invoice-item-title">旅客</div>
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
import config from "@/views/invoice/config";
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
export default {
  name: "invoiceBuyerTemplate",
  mixins: [mixinsItemsProvider],
  data () {
    return {
      basicForm: [
        {
          field: "invoiceType",
          label: "发票类型",
          component: "Select",
          disabled: true,
          defaultValue: "",
          componentProps: {
            options: config.INVOICETYPE,
          },
        },
        {
          field: "passengerName",
          label: "旅客姓名",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入旅客姓名",
        },
        {
          field: "invoiceNum",
          label: "发票号码",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入发票号码",
        },
        {
          field: "idCard",
          label: "有效身份证件号码",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入有效身份证件号码",
        },
      ],
      formModel: {
        passengerName: "",
        idCard: "",
      },
    }
  },
  methods: {
    setInitData (data) {
      data = {...data,...data.invoiceManageVehicleInfo}
      let {invoiceType, passengerName, invoiceNum, idCard} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["invoiceType", "passengerName", "invoiceNum", "idCard"]
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        if (this.basicForm[0].component == "Text") {
          invoiceType = config.TEMPLATE[invoiceType].label;
        }
        this.formModel =  this.disabled ? {} : {invoiceType, passengerName, invoiceNum, idCard}
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>