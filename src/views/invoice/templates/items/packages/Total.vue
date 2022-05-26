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
import mixinsItemsProvider from "@/views/invoice/mixins/mixins-items-provider"
export default {
  name: "invoiceTotalTemplate",
  mixins: [mixinsItemsProvider],
  props: ["totalData"],
  data () {
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
      basicForm: [
        {
          field: "totalMoney",
          label: "合计金额",
          component: "Input",
          placeholder: "请输入合计金额",
          append: "元",
          sformat: "money",
          maxlength: 10,
          style: {
            fontWeight: "bold"
          },
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
          componentProps: {
            color: "#333",
            fontWeight: "bold",
            onBlur: (value, item) => {
              this.onBlurFormatPrice(value, item)
              this.onBlurSetRate()
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item)
            }
          }
        },
        {
          field: "totalTax",
          label: "合计税额",
          component: "Input",
          placeholder: "请输入合计税额",
          append: "元",
          sformat: "money",
          maxlength: 10,
          style: {
            fontWeight: "bold"
          },
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
          componentProps: {
            color: "#333",
            fontWeight: "bold",
            onBlur: (value, item) => {
              this.onBlurFormatPrice(value, item)
              this.onBlurSetRate()
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item)
            }
          }
        },
        {
          field: "totalPriceTaxStr",
          label: "价税合计（大写）",
          component: "Text",
          disabled: true,
          placeholder: "",
          componentProps: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "16px"
          }
        },
        {
          field: "totalPriceTax",
          label: "价税合计（小写）",
          component: "Input",
          placeholder: "",
          append: "元",
          sformat: "money",
          maxlength: 10,
          style: {
            fontWeight: "bold"
          },
          // rules: [{ validator: this.checkNum, trigger: "blur" }],
          componentProps: {
            color: "#333",
            fontWeight: "bold",
            onBlur: (value, item) => {
              this.toChiesHandle(value, item)
              this.onBlurFormatPrice(value, item)
            },
            onFocus: (value, item) => {
              this.onFocusFormatPrice(value, item)
            }
          },
        },
      ],
      formModel: {
        totalMoney: "",
        totalTax: "",
        totalPriceTaxStr: "",
        totalPriceTax: "",
      },
    }
  },
  watch: {
    totalData: {
      handler: function (data) {
        this.calculateDataModel(data)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setInitData (data) {
      let {totalMoney, totalTax, totalPriceTaxStr, totalPriceTax} = data || {}
      let basicForm = this.basicForm.slice()
      data.totalPriceTaxStr = this.toChies(totalPriceTax)
      let keys = ["totalMoney", "totalTax", "totalPriceTaxStr", "totalPriceTax"]
      data.totalMoney = this.formatPrice((totalMoney || 0))
      data.totalTax = this.formatPrice((totalTax || 0))
      data.totalPriceTax = this.formatPrice((totalPriceTax || 0))
      this.basicForm = this.assinDefaultValue(basicForm, data, keys)
      this.$nextTick(() => {
        // this.$refs.form.clearValidate()
        this.formModel =  this.disabled ? {} : {
          totalMoney: this.formatPrice(totalMoney), 
          totalTax: this.formatPrice(totalTax), 
          totalPriceTaxStr, 
          totalPriceTax: this.formatPrice(totalPriceTax)
        }
      })
    },
    // 将小写联动到大写
    toChiesHandle (value, item) {
      let str = this.toChies(value)
      this.setDataModel(str, {field: "totalPriceTaxStr"})
    },
    onBlurSetRate () {
      let { totalMoney, totalTax } = this.formModel
      totalMoney = this.delcommafy(totalMoney)
      totalTax = this.delcommafy(totalTax)
      let total = totalMoney + totalTax
      this.setDataModel(total.toFixed(2), {field: "totalPriceTax"})
      this.toChiesHandle(total)
    },
    /**
     * 航空运单、火车票 输入票价、服务费、燃油费后，需要联动总价计算
     * 
     * 识别航空运单模板的标识是data.templateName = "AirTransportElectronic"
     * 
     * @param {Object} data 当前发票模板的数据
     */
    calculateDataModel (data) {
      let {templateName, ticketNoTaxPrice, ticketTax, fuelNoTaxPrice, fuelTax, airportNoTaxPrice, airportTax } = data || {}
      // 机票发票需
      if (templateName == "AirTransportElectronic") {
        // 清除显示的金额格式
        ticketNoTaxPrice = this.delcommafy(ticketNoTaxPrice)
        ticketTax = this.delcommafy(ticketTax)
        airportNoTaxPrice = this.delcommafy(airportNoTaxPrice)
        airportTax = this.delcommafy(airportTax)
        fuelNoTaxPrice = this.delcommafy(fuelNoTaxPrice)
        fuelTax = this.delcommafy(fuelTax)
        // 计算对应的总价
        let totalMoney = ticketNoTaxPrice + airportNoTaxPrice + fuelNoTaxPrice
        let totalTax = ticketTax + fuelTax
        let totalPriceTax = totalMoney + totalTax
        let totalPriceTaxStr = this.toChies(totalPriceTax)
        // 重新格式化
        totalMoney = this.priceFormat(totalMoney)
        totalTax = this.priceFormat(totalTax)
        totalPriceTax = this.priceFormat(totalPriceTax)
        // 赋值
        this.toChies(totalPriceTax)
        this.setDataModel(totalMoney, {field: "totalMoney"})
        this.setDataModel(totalTax, {field: "totalTax"})
        this.setDataModel(totalPriceTax, {field: "totalPriceTax"})
        this.setDataModel(totalPriceTaxStr, {field: "totalPriceTaxStr"})
      }
    }
  }
}
</script>