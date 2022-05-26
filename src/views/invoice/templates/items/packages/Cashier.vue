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
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
export default {
  name: "invoiceSalerTemplate",
  mixins: [mixinsItemsProvider],
  data () {
    return {
      basicForm: [
        {
          field: "cashier",
          label: "收款员",
          component: "Input",
          maxlength: 200,
          placeholder: "请输入销售方名称",
        },
      ],
      formModel: {
        cashier: "",
      },
    }
  },
  methods: {
    setInitData (data) {
      let {cashier} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["cashier"]
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {cashier}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>