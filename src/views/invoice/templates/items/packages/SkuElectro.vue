<template>
  <div class="item-content">
    <div class="invoice-item-title" v-show="baseFormList.length > 0">发票信息</div>
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
      <el-button icon="el-icon-circle-plus-outline" v-show="!disabled" class="sku-add-btn" size="mini" type="primary" @click="addNewSku">新增</el-button>
    </div>
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
      baseFormList: [
        {
          formModel: {},
          basicForm: []
        }
      ],
      basicForm: [
        {
          field: "itemName",
          label: "项目名称",
          component: "Input",
          index: 0,
          placeholder: "请输入项目名称",
        },
        {
          field: "vehicleNum",
          label: "车牌号",
          component: "Input",
          index: 0,
          placeholder: "请输入车牌号",
        },
        {
          field: "vehicleStyle",
          label: "类型",
          component: "Input",
          index: 0,
          placeholder: "请输入类型",
        },
        {
          field: 'passStartDate',
          label: '通行日期起',
          component: 'DatePicker',
          defaultValue: "",
          'value-format':"yyyy-MM-dd",
          type:'date',
          index: 0,
          placeholder: '请选择通行日期起',
        },
        {
          field: 'passEndDate',
          label: '通行日期止',
          component: 'DatePicker',
          defaultValue: "",
          'value-format':"yyyy-MM-dd",
          type:'date',
          index: 0,
          placeholder: '请选择通行日期止',
        },
        {
          field: "money",
          label: "金额",
          component: "Input",
          placeholder: "请输入金额",
          append: "元",
          index: 0,
          sformat: "money",
          maxlength: 10,
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
          componentProps: {
            onBlur: (value, item) => {
              return this.onBlurFormatPrice(value, item, this.baseFormList)
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item, this.baseFormList)
            }
          }
        },
        {
          field: "taxRate",
          label: "税率",
          component: "Input",
          placeholder: "请输入税率",
          append: "%",
          index: 0,
          componentProps: {
            onBlur: (value, item) => {
              return this.onBlurFormatNumber(value, item, this.baseFormList);
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item, this.baseFormList)
            }
          },
        },
        {
          field: "tax",
          label: "税额",
          component: "Input",
          placeholder: "请输入税额",
          append: "元",
          index: 0,
          sformat: "money",
          maxlength: 10,
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
          componentProps: {
            onBlur: (value, item) => {
              return this.onBlurFormatPrice(value, item, this.baseFormList)
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item, this.baseFormList)
            }
          }
          
        },
      ],
      formModel: {
        itemName: "",
        vehicleNum: "",
        vehicleStyle: "",
        passStartDate: "",
        passEndDate: "",
        money: "",
        taxRate: "",
        tax: "",
      }
    };
  },
  // created () {
  //   this.initSku()
  // },
  methods: {
    setInitData (data) {
      let {invoiceManageItemInfoList} = data || {}
      if (!invoiceManageItemInfoList) {
        return this.initSku()
      }  
      let baseFormList = invoiceManageItemInfoList.map((item, index) => {
        let basicForm = this.deepClone(this.basicForm)
        item.taxRate = item.taxRate?.replace(/\%/g,'')
        let {itemName ,vehicleNum ,vehicleStyle ,passStartDate ,passEndDate ,money ,taxRate ,tax} = item || {}
        let keys = ["itemName", "vehicleNum", "vehicleStyle", "passStartDate", "passEndDate", "money", "taxRate", "tax"]
        item.money = this.formatPrice(money)
        item.tax = this.formatPrice(tax)
        let setDefaultBasicForm = this.assinDefaultValue(basicForm, item, keys)
        let baseformitem = {
            formModel:  this.disabled ? {} : {
              itemName ,vehicleNum ,vehicleStyle ,passStartDate ,passEndDate ,
              money: this.formatPrice(money),
              taxRate, 
              tax: this.formatPrice(tax)
            },
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