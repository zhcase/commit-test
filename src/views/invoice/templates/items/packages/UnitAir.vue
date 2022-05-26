<template>
  <div  class="item-content">
    <basic-form-2
      :schema="basicForm"
      :span="24"
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
  name: "invoiceSalerTemplate",
  mixins: [mixinsItemsProvider],
  data () {
    return {
      basicForm: [
        {
          field: "fillUnit",
          label: "填开单位",
          component: "Input",
          placeholder: "请输入填开单位",
          type: "textarea",
          rows: 4,
          'show-word-limit': true,
          maxlength: 200,
        },
      ],
      formModel: {
        fillUnit: "",
      },
    }
  },
  methods: {
    setInitData (data) {
      let {fillUnit} = data.invoiceManageVehicleInfo || {}
      let basicForm = this.basicForm.slice()
      let keys = ["fillUnit"]
      this.basicForm = this.assinDefaultValue(basicForm, data.invoiceManageVehicleInfo, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {fillUnit}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
/deep/.el-textarea__inner {
  font-size: 16px;
}
</style>