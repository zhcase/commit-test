<template>
  <div class="item-content">
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
  </div>
</template>

<script>
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
export default {
  name: "invoiceRemarkTemplate",
  mixins: [mixinsItemsProvider],
  data() {
    return {
      basicForm: [
        {
          field: "remark",
          label: "备注",
          component: "Input",
          placeholder: "请输入备注",
          type: "textarea",
          rows: 4,
          'show-word-limit': true,
          maxlength: 200,
          componentProps: {
            fontSize: "16px"
          },
        },
      ],
      formModel: {
        remark: "",
      },
    };
  },
  methods: {
    setInitData (data) {
      let {remark} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["remark"]
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {remark}
      })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-textarea__inner {
  font-size: 16px;
}
</style>