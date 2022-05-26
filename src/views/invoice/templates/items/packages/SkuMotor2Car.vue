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
  name: "invoiceSkuTemplate",
  mixins: [mixinsItemsProvider],
  data() {
    return {
      basicForm: [
        {
          field: "vehicleCode",
          label: "车牌照号",
          component: "Input",
          placeholder: "请输入车牌照号",
        },
        {
          field: "registrationCode",
          label: "登记证号",
          component: "Input",
          placeholder: "请输入登记证号",
        },
        {
          field: "vehicleType",
          label: "车辆类型",
          component: "Input",
          placeholder: "请输入车辆类型",
        },
        {
          field: "frameNumber",
          label: "车辆识别代号/车架号码",
          component: "Input",
          placeholder: "请输入车辆识别代号/车架号码",
        },
        {
          field: "model",
          label: "车牌型号",
          component: "Input",
          placeholder: "请输入车牌型号",
        },
        {
          field: "transferVehicleOffice",
          label: "转入地车辆管理所名称",
          component: "Input",
          placeholder: "请输入转入地车辆管理所名称",
        },
      ],
      formModel: {
        vehicleCode: "",
        registrationCode: "",
        vehicleType: "",
        frameNumber: "",
        model: "",
        transferVehicleOffice: ""
      }
    };
  },
  methods: {
    setInitData (data) {
      let {vehicleCode, registrationCode, vehicleType, frameNumber, model, transferVehicleOffice} = data.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["vehicleCode", "registrationCode", "vehicleType", "frameNumber", "model", "transferVehicleOffice"]
      this.basicForm = this.assinDefaultValue(basicForm, data.invoiceManageVehicleInfo || {}, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {vehicleCode, registrationCode, vehicleType, frameNumber, model, transferVehicleOffice}
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>