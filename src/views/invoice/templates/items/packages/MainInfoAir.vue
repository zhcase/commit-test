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
import { BasicForm } from "@/components/Form/index";
import config from "@/views/invoice/config";
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider";
export default {
  name: "invoiceMainInfoTemplate",
  mixins: [mixinsItemsProvider],
  components: { BasicForm2: BasicForm },
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
          field: "printingSerialNumber",
          label: "印刷序号",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入印刷序号",
        },
        {
          field: "invoiceNum",
          label: "电子客票号码",
          component: "Input",
          defaultValue: "",
          maxlength: 50,
          placeholder: "请输入电子客票号码",
        },
        {
          field: "invoiceDate",
          label: "开票日期",
          component: "DatePicker",
          defaultValue: "",
          "value-format": "yyyy-MM-dd",
          type: "date",
          "picker-options": pickerOptionsStart,
          placeholder: "请选择开票日期",
        },
      ],
      formModel: {
        invoiceType: "",
        printingSerialNumber: "",
        invoiceNum: "",
        invoiceDate: "",
      },
    };
  },
  methods: {
    setInitData(data) {
      data = {...data,...data.invoiceManageVehicleInfo}
      let { invoiceType, printingSerialNumber, invoiceNum, invoiceDate } =
        data || {};
      let basicForm = this.basicForm.slice();
      let keys = [
        "invoiceType",
        "printingSerialNumber",
        "invoiceNum",
        "invoiceDate",
      ];
      data.invoiceNum = invoiceNum ?? printingSerialNumber;
      this.basicForm = this.assinDefaultValue(basicForm, data, keys);
      this.$nextTick(() => {
        console.log("发票类型：", invoiceType);
        if (this.basicForm[0].component == "Text") {
          invoiceType = config.TEMPLATE[invoiceType].label;
        }
        this.formModel =  this.disabled ? {} : {
          invoiceType,
          printingSerialNumber,
          invoiceNum,
          invoiceDate,
        };
      });
    },
  },
};
</script>