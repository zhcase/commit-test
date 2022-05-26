<template>
  <div class="item-content">
    <div class="invoice-item-title">车票信息</div>
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
    <el-divider v-show="!disabled"></el-divider>
  </div>

</template>

<script>
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
export default {
  name: "invoiceSkuTemplate",
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
          field: "voyage",
          label: "车程",
          component: "Input",
          placeholder: "请输入车程",
          maxlength: 50
        },
        {
          field: "trainNumber",
          label: "车次号",
          component: "Input",
          placeholder: "请输入车次号",
          maxlength: 50
        },
        {
          field: 'driveDate',
          label: '日期',
          component: 'DatePicker',
          defaultValue: "",
          'value-format':"yyyy-MM-dd",
          "picker-options": pickerOptionsStart,
          type:'date',
          placeholder: '请选择日期',
        },
        {
          field: 'driveTime',
          label: '时间',
          component: 'OtherTimePicker',
          placeholder: '请选择时间',
          format: 'HH:mm',
          'value-format': "HH:mm",
        },
      ],
      formModel: {
        voyage: "",
        trainNumber: "",
        driveDate: "",
        driveTime: ""
      }
    };
  },
  created () {
    let basicForm = this.basicForm.slice()
    let formModel = this.deepClone(this.formModel)
    this.baseFormList = [{ formModel, basicForm }]
  },
  methods: {
    addNewSku () {
      let basicForm = this.basicForm.slice()
      let formModel = this.deepClone(this.formModel)
      basicForm = basicForm.map(item => {
        item.defaultValue = ""
        return item
      })
      let temp = { formModel, basicForm }
      let baseFormList = this.baseFormList.slice()
      baseFormList.push(temp)
      this.baseFormList = baseFormList
    },
    deleteSku(item, index) {
      if (this.baseFormList.length > 1) {
        this.baseFormList.splice(index, 1)
      }
    },
    setInitData (data) {
      let {voyage, trainNumber, driveDate, driveTime} = data?.invoiceManageAirInfo || {}
      // let {voyage, trainNumber, invoiceDate: driveDate, driveTime} = data || {}
      let basicForm = this.basicForm.slice()
      let keys = ["voyage", "trainNumber", "driveDate", "driveTime"]
      this.basicForm = this.assinDefaultValue(basicForm, data.invoiceManageAirInfo, keys)
      this.$nextTick(() => {
        this.formModel =  this.disabled ? {} : {voyage, trainNumber, driveDate, driveTime}
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>