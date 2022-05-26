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
    // 校验是否金额
    var checkNum = (rule, value, callback) => {
      if (value != "") {
        value = value.toString().replace(/\,/g, "");
        if (!/^(([1-9]\d*)|\d|\,)(\.\d+)?$/.test(value)) {
          return callback(new Error("输入需为数字"));
        } else {
          return callback();
        }
      }
    };
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
          field: "modelType",
          label: "规格型号",
          component: "Input",
          index: 0,
          placeholder: "请输入规格型号",
        },
        {
          field: "unit",
          label: "单位",
          component: "Input",
          index: 0,
          placeholder: "请输入单位",
        },
        {
          field: "quantity",
          label: "数量",
          component: "Input",
          index: 0,
          maxlength: 10,
          placeholder: "请输入数量",
        },
        {
          field: "price",
          label: "单价",
          component: "Input",
          placeholder: "请输入单价",
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
          },
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
          },
        },
        {
          field: "taxRate",
          label: "税率",
          component: "Input",
          placeholder: "请输入税率",
          append: "%",
          index: 0,
          maxlength: 10,
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
          },
        },
      ],
      formModel: {
        itemName: "",
        modelType: "",
        unit: "",
        quantity: "",
        price: "",
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
        let {itemName ,modelType ,unit ,quantity ,price ,money ,taxRate ,tax} = item || {}
        let keys = ["itemName", "modelType", "unit", "quantity", "price", "money", "taxRate", "tax"]
        item.price = this.formatPrice(price)
        item.money = this.formatPrice(money)
        item.tax = this.formatPrice(tax)
        let setDefaultBasicForm = this.assinDefaultValue(basicForm, item, keys)
        let baseformitem = {
            formModel:  this.disabled ? {} : {
              itemName ,modelType ,unit ,quantity ,
              price: this.formatPrice(price),
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