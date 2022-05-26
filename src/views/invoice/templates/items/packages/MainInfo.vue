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
import config from "@/views/invoice/config";
import { formateDate } from "@/utils/format";
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider";
export default {
  name: "invoiceMainInfoTemplate",
  mixins: [mixinsItemsProvider],
  data() {
    var pickerOptionsStart = {
      // 时间不能大于当前时间
      disabledDate: (time) => {
        return time.getTime() > Date.now();
      },
    };
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
          field: "invoiceCode",
          label: "发票代码",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入发票代码",
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
          field: "invoiceDate",
          label: "开票日期",
          component: "DatePicker",
          defaultValue: "",
          type: "date",
          "picker-options": pickerOptionsStart,
          "value-format": "yyyy-MM-dd",
          placeholder: "请选择开票日期",
        },
      ],
      formModel: {
        invoiceType: "",
        invoiceCode: "",
        invoiceNum: "",
        invoiceDate: "",
      },
    };
  },
  methods: {
    setInitData(data) {
      let { invoiceType, invoiceCode, invoiceNum, invoiceDate } = data || {};
      invoiceDate = formateDate(data.invoiceDate, "yyyy-MM-dd");
      let basicForm = this.basicForm.slice();
      let keys = ["invoiceType", "invoiceCode", "invoiceNum", "invoiceDate"];
      this.basicForm = this.assinDefaultValue(basicForm, data, keys);
      this.$nextTick(() => {
        console.log("发票类型：", invoiceType);
        if (this.basicForm[0].component == "Text") {
          invoiceType = config.TEMPLATE[invoiceType]?.label;
        }
        this.formModel =  this.disabled ? {} : { invoiceType, invoiceCode, invoiceNum, invoiceDate };
      });
    },
  },
};
</script>