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
          field: "vehicleType",
          label: "车辆类型",
          component: "Input",
          placeholder: "请输入车辆类型",
          maxlength: 50
        },
        {
          field: "model",
          label: "厂牌型号",
          component: "Input",
          placeholder: "请输入厂牌型号",
          maxlength: 50
        },
        {
          field: "production",
          label: "产地",
          component: "Input",
          placeholder: "请输入产地",
          maxlength: 50
        },
        {
          field: "certificateNum",
          label: "合格证号",
          component: "Input",
          placeholder: "请输入合格证号",
          maxlength: 50
        },
        {
          field: "importCertificate",
          label: "进口证明书号",
          component: "Input",
          placeholder: "请输入进口证明书号",
          maxlength: 50
        },
        {
          field: "commodityInspectionOrder",
          label: "商检单号",
          component: "Input",
          placeholder: "请输入商检单号",
          maxlength: 50
        },
        {
          field: "engineNumber",
          label: "发动机号码",
          component: "Input",
          placeholder: "请输入发动机号码",
          maxlength: 50
        },
        {
          field: "frameNumber",
          label: "车辆识别代号/车架号码",
          component: "Input",
          placeholder: "请输入车辆识别代号/车架号码",
          maxlength: 50
        },
      ],
      formModel: {
        vehicleType: "",
        model: "",
        production: "",
        importCertificate: "",
        commodityInspectionOrder: "",
        engineNumber: "",
        frameNumber: "",
      }
    };
  },
  methods: {
    setInitData (data) {
      let {vehicleType, model, production, certificateNum,importCertificate, commodityInspectionOrder, engineNumber, frameNumber} = data.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["vehicleType", "model", "production", "certificateNum","importCertificate", "commodityInspectionOrder", "engineNumber", "frameNumber"]
      this.basicForm = this.assinDefaultValue(basicForm, data.invoiceManageVehicleInfo, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {vehicleType, model, production, certificateNum,importCertificate, commodityInspectionOrder, engineNumber, frameNumber}
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>