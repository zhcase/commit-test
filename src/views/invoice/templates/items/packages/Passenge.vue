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
          field: "passengerName",
          label: "旅客姓名",
          component: "Input",
          defaultValue: "",
          maxlength: 200,
          placeholder: "请输入旅客姓名",
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
      let {passengerName, idCard} = data.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["passengerName", "idCard"]
      this.basicForm = this.assinDefaultValue(basicForm, data.invoiceManageVehicleInfo, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {passengerName, idCard}
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