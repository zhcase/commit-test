<template>
  <div class="item-content">
    <div class="invoice-item-title" v-show="baseFormList.length > 0">航班信息</div>
    <div class="item-content-sku-item" v-for="(item, index) in baseFormList" :key="`sku-${index}`">
      <basic-form-2
        :schema="item.basicForm"
        :span="12"
        ref="form"
        :formModel.sync="item.formModel"
        :labelWidth="labelWidth"
        :formClass="formClass"
      >
        <template #footer>
          <div></div>
        </template>
      </basic-form-2>
      <div v-show="!disabled && baseFormList.length > 1">
        <el-divider content-position="right">
          <i class="el-icon-delete invoice-delete-icon" size="mini" type="danger" @click="deleteSku(item, index)"></i>
        </el-divider>
      </div>
    </div>
    <div>
      <el-button v-show="!disabled" icon="el-icon-circle-plus-outline" class="sku-add-btn" size="mini" type="primary" @click="addNewSku">新增</el-button>
    </div>
    <el-divider v-show="!disabled"></el-divider>
  </div>

</template>

<script>
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
export default {
  name: "invoiceSkuTemplate",
  mixins: [mixinsItemsProvider],
  data() {
    return {
      baseFormList: [],
      basicForm: [
        {
          field: "voyage",
          label: "航程",
          component: "Input",
          placeholder: "请输入航程",
          maxlength: 50
        },
        {
          field: "carrier",
          label: "承运人",
          component: "Input",
          placeholder: "请输入承运人",
          maxlength: 50
        },
        {
          field: "trainNumber",
          label: "航班号",
          component: "Input",
          placeholder: "请输入航班号",
          maxlength: 50
        },
        {
          field: "seatClasses",
          label: "座位等级",
          component: "Input",
          placeholder: "请输入座位等级",
          maxlength: 50
        },
        {
          field: 'driveDate',
          label: '日期',
          component: 'DatePicker',
          defaultValue: "",
          'value-format':"yyyy-MM-dd",
          type:'date',
          placeholder: '请选择日期',
        },
        {
          field: 'driveTime',
          label: '时间',
          component: 'OtherTimePicker',
          defaultValue: "",
          format: 'HH:mm',
          'value-format': "HH:mm",
          placeholder: '请选择时间',
        },
      ],
      formModel: {
        voyage: "",
        carrier: "",
        trainNumber: "",
        seatClasses: "",
        driveDate: "",
        driveTime: ""
      }
    };
  },
  // created () {
  //   let basicForm = this.deepClone(this.basicForm)
  //   let formModel = this.deepClone(this.formModel)
  //   this.baseFormList = [{ formModel, basicForm }]
  // },
  methods: {
    addNewSku () {
      let basicForm = this.deepClone(this.basicForm)
      let formModel = this.deepClone(this.formModel)
      basicForm = basicForm.map(item => {
        item.defaultValue = ""
        return item
      })
      let temp = { formModel, basicForm }
      let baseFormList = this.deepClone(this.baseFormList)
      baseFormList.push(temp)
      this.baseFormList = baseFormList
    },
    deleteSku(item, index) {
      if (this.baseFormList.length > 1) {
        this.baseFormList.splice(index, 1)
      }
    },
    setInitData (data) {
      let {invoiceManageAirInfoList} = data || {}
      if (!invoiceManageAirInfoList) {
        return this.initSku();
      } 
      let baseFormList = invoiceManageAirInfoList.map((item, index) => {
        let basicForm = this.deepClone(this.basicForm)
        let {voyage, carrier, trainNumber, seatClasses, driveDate, driveTime} = item || {}
        let keys = ["voyage", "carrier", "trainNumber", "seatClasses", "driveDate", "driveTime"]
        let setDefaultBasicForm = this.assinDefaultValue(basicForm, item, keys)
        let baseformitem = {
            formModel:  this.disabled ? {} : {voyage, carrier, trainNumber, seatClasses, driveDate, driveTime},
            basicForm: setDefaultBasicForm
          }
        return baseformitem
      })
      baseFormList = baseFormList.map((item, index) => {
        item.basicForm = item.basicForm.map(field => {
          field.index = index
          return field
        })
        return item
      })
      this.baseFormList = baseFormList
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>