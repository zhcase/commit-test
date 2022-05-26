/**
 * 这个mixins 是给template/items/下面的组件使用的,
 * 主要作用：获取回填发票的初始化数据、编写格式化工具、多项新增与删除。用于编辑、展示。
 * 
 * 注意：
 *  1、引入mixins的命名冲突问题。不可以在组件中声明mixin中定义的 方法与变量名称
 *  2、组件必须在methods中定义一个setInitData()方法，用来接收处理 inject的数据
 *  3、assinDefaultValue() 是一个动态表单的初始化方法
 */

import { priceFormat, delcommafy, formateDate } from "@/utils/format"
import { deepClone } from "@/utils/index"
import {BasicForm} from "@/components/Form/index"
import config from "@/views/invoice/config";

export default {
  // 监听templates/的模板方法传递过来的detailData()函数，返回一个对象
  inject: ["detailData", "actionStatus"],
  components: {BasicForm2: BasicForm},  
  computed: {
    // 将provider - inject 的注入对象变成响应式的
    itemData () {
      return this.detailData()
    },
    disabled () {
      return this.actionStatus() == 'detail'
    }
  },
  data () {
    return {
      // 表单工具方法
      priceFormat,
      delcommafy,
      deepClone,
      // 表单label样式
      labelWidth: 79,
      formClass: "invoice-form",
    }
  },
  watch: {
    // 监听数据变化赋值
    itemData (obj) {
      this.setInitData(obj)
      console.log("原子组件Watch到的数据：", obj)
    },
  },
  created () {
    console.log("原子组件created到的数据：", this.itemData)
    this.setInitData(this.itemData)
  },
  methods: {
    /**
     * 动态表单的 初始化赋值方法
     * 解决：动态组件的初始与响应值不是统一使用formModel赋值，初始化需要使用defaultValue赋值
     * @param {Array} baseForm 表单配置项
     * @param {Object} data 初始化数据源
     * @param {Array} keys 需要初始化的key
     * @returns baseForm 返回的表单配置项属性里面多一个defaultValue的值
     */
    assinDefaultValue (baseForm = [], data = {}, keys = []) {
      baseForm = baseForm.map((item, index) => {
        if (item.field == keys[index]) {
          let value = data[item.field]
          item.defaultValue = value??""
          if (item.field == "invoiceType") {
            item.defaultValue = config.TEMPLATE[value]?.label;
          }
          // 这个this.disabled状态赋值true跟false, 渲染到动态组件成了字符串，使用null 代替false
          if (this.disabled) {
            item.disabled = this.disabled
            // 详情只能看，所以更换组件为Text
            item.component = "Text"
            if (item.append) {
              item.defaultValue = (item.defaultValue || "0") + item.append
            }
            // 日期组件字段包含Date
            if (item.field.indexOf("Date") != -1) {
              item.defaultValue = formateDate(value, "yyyy-MM-dd")
            }
            // 详情的label前面还要有冒号”：“
            let { label, style, componentProps } = item || {}
            item.label = label.indexOf(":") != -1 ? label : label + ":"
            style = style??{}
            item.style = Object.assign({}, style, {
              width: "auto",
            })
            componentProps = componentProps??{}
            item.componentProps = Object.assign({}, componentProps, {
              marginLeft: "10px",
              color: "#333",
              fontSize: "16px"
            })
          } else {
            item.disabled = null
            // 编辑时，需要将更换Text的组件换回输入选择等组件
            item.component = "Input"
            // 日期组件字段包含Date
            if (item.field.indexOf("Date") != -1) {
              item.component = "DatePicker"
            }
            // 时间组件字段包含Time
            if (item.field.indexOf("Time") != -1) {
              item.component = "OtherTimePicker"
            }
            // 发票类型Select， 但是需要禁用不能变化
            if (item.field == "invoiceType") {
              item.component = "Select"
            }
            // 价税合计(大写) 不变，还是Text
            if (item.field == "totalPriceTaxStr") {
              item.component = "Text"
            }
            // 这些字段无论是否禁用都不能修改
            let disabledStr = [
              "invoiceType",
              "ticketRate", 
              "ticketTax", 
              "ticketNoTaxPrice", 
              "airportRate", 
              "airportTax", 
              "airportNoTaxPrice",
              "fuelRate",
              "fuelTax",
              "fuelNoTaxPrice",
            ]
            if (disabledStr.includes(item.field)) {
              item.disabled = true
            }
            let style = item.style??{}
            item.style = Object.assign({}, style, {
              fontSize: "16px",
              width: "100%",
            })
            let label = item.label??""
            label = label.replace(":", "")
            item.label = label
          }
        }
        return item
      })
      console.log("组件列表：", baseForm)
      return baseForm
    },
    /**
     * 
     */
    totalChange (options = {}) {
      this.$emit("change", options)
    },
    // items/ 文件下的原子组件 金额格式化方法
    formatPrice (value) {
      let format = value??0
      if (format) {
        format = delcommafy(format)
        format = Number.parseFloat(format)
        format = priceFormat(format, 2)
      } else {
        format = ''
      }
      return `${format}`
    },
    initSku () {
      let basicForm = this.deepClone(this.basicForm)
      let formModel = this.deepClone(this.formModel)
      let baseFormList = [{ formModel, basicForm }]
      this.$set(this, "baseFormList", baseFormList)
    },
    // items/ 文件下的原子组件 格式化后给对应的formModel项赋值
    setDataModel (value, item, baseFormList) {
      let { field, index } = item || {}
      if (field) {
        if (baseFormList) {
          this.baseFormList[index].formModel[field] = `${value}`
        } else {
          this.formModel[field] = `${value}`
        }
      }
    },
    addNewSku () {
      let basicForm = this.deepClone(this.basicForm)
      let formModel = this.deepClone(this.formModel)
      let baseFormList = this.deepClone(this.baseFormList)
      let index = baseFormList.length
      basicForm = basicForm.map(item => {
        item.defaultValue = ""
        item.index = index
        return item
      })
      let temp = { formModel, basicForm }
      baseFormList.push(temp)
      // this.baseFormList = baseFormList
      this.$set(this, "baseFormList", baseFormList)
    },
    deleteSku(item, index) {
      if (this.baseFormList.length > 1) {
        this.baseFormList.splice(index, 1)
        this.$emit('deleteSku', index)
      }
    },
    onBlurFormatNumber (value, item, baseFormList) {
      let format = value
      format = this.delcommafy(format)
      format = isNaN(format) ? 0 : format
      this.setDataModel(format, item, baseFormList)
    },
    // blur失去焦点时，返回金额格式
    onBlurFormatPrice (value, item, baseFormList) {
      // value = value.toString().replace(/\,/g,'')
      // // 校验是否金额格式
      // if(!/^(([1-9]\d*)|\d)(\.\d+)?$/.test(value)){
      //   return false;
      // }
      let format = value
      if (format) {
        format = this.formatPrice(format)
        this.setDataModel(format, item, baseFormList)
        console.log("金额格式化:", format, item)
      }
      return format
    },
    onFocusFormatPrice(value, item, baseFormList) {
      let format = value
      if (format) {
        format = this.delcommafy(format)
        this.setDataModel(format, item, baseFormList)
        console.log("金额格式化:", format, item)
      }
      return format
    },
    // items/ 文件下的原子组件 卡号格式化方法
    formatCard (value, item) {
      let format = value
      if (format) {
        format = this.clearLineCard(format)
        format = this.addLineCard(format)
        this.setDataModel(format, item)
      }
      console.log("卡号格式化:", format, item)
      return format
    },
    // items/ 文件下的原子组件 卡号格式化前，添加卡号之间的"-"的方法
    addLineCard (value) {
      if (value) {
        value = value.replace(/ /g,'').replace(/(\d{4})/g, '$1 ')
      }
      return value
    },
    // items/ 文件下的原子组件 卡号格式化前，清除卡号之间的"-"的方法
    clearLineCard (value) {
      if (value) {
        value = value.split(" ").join("")
      }
      return value
    },
    toChies (amount) { //形参
      // 汉字的数字
      const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      // 基本单位
      const cnIntRadice = ["", "拾", "佰", "仟"];
      // 对应整数部分扩展单位
      const cnIntUnits = ["", "万", "亿", "兆"];
      // 对应小数部分单位
      const cnDecUnits = ["角", "分"];
      // 整数金额时后面跟的字符
      const cnInteger = "整";
      // 整型完以后的单位
      const cnIntLast = "元";
      // 最大处理的数字
      const maxNum = 9999999999999999.99;
      // 金额整数部分
      let integerNum;
      // 金额小数部分
      let decimalNum;
      // 输出的中文金额字符串
      let chineseStr = "";
      // 分离金额后用的数组，预定义
      let parts;
      if (amount === "") {
          return "";
      }
      amount = amount + ""
      amount = parseFloat(amount.toString().replace(/\,/g,'')).toFixed(2);
      if (amount >= maxNum) {
          // 超出最大处理数字
          return "";
      }
      if (amount === 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
      }
      // 转换为字符串
      amount = amount.toString();
      if (amount.indexOf(".") === -1) {
          integerNum = amount;

          decimalNum = "";
      } else {
          parts = amount.split(".");
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
      }
      // 获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
          let zeroCount = 0;
          const IntLen = integerNum.length;
          for (let i = 0; i < IntLen; i++) {
              const n = integerNum.substr(i, 1);
              const p = IntLen - i - 1;
              const q = p / 4;
              const m = p % 4;
              if (n === "0") {
                  zeroCount++;
              } else {
                  if (zeroCount > 0) {
                      chineseStr += cnNums[0];
                  }
                  // 归零
                  zeroCount = 0;
                  //alert(cnNums[parseInt(n)])
                  chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
              }
              if (m === 0 && zeroCount < 4) {
                  chineseStr += cnIntUnits[q];
              }
          }
          chineseStr += cnIntLast;
      }
      // 小数部分
      if (decimalNum !== "") {
          const decLen = decimalNum.length;
          for (let i = 0; i < decLen; i++) {
              const n = decimalNum.substr(i, 1);
              // if (n !== "0") {
                  chineseStr += cnNums[Number(n)] + cnDecUnits[i];
              // }
          }
      }
      if (chineseStr === "") {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum === "") {
          chineseStr += cnInteger;
      }
      return chineseStr;
    },
    // 校验是否金额
    checkNum(rule, value, callback) {
      if (value != "") {
        value = value.toString().replace(/\,/g, "");
        if (!/^(([1-9]\d*)|\d|\,)(\.\d+)?$/.test(value)) {
          return callback(new Error("输入需为数字"));
        } else {
          return callback();
        }
      }
    }
  }
}