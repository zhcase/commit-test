<template>
  <div class="item-content" id="describe">
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
  name: "invoiceDescriptionTemplate",
  mixins: [mixinsItemsProvider],
  data() {
    return {
      basicForm: [
        {
          field: "invoiceDescribe",
          label: "发票描述",
          component: "Input",
          placeholder: "请输入发票描述",
          type: "textarea",
          'show-word-limit': true,
          rows: 4,
          maxlength: 100,
          componentProps: {
            fontSize: "16px"
          },
          rules: [
            { required: true, message: "请输入发票描述", trigger: "blur" },
          ],
        },
      ],
      formModel: {
        invoiceDescribe: "",
      },
    };
  },
  methods: {
    setInitData (data) {
      let {invoiceDescribe} = data || {}
      let basicForm = this.basicForm
      let keys = ["invoiceDescribe"]
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : { invoiceDescribe }
        // 移除表单项的校验结果
        // this.$refs.form.clearValidate()
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
/deep/.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    margin-right: 0px;
}
/deep/.el-textarea__inner {
  font-size: 16px;
}
</style>