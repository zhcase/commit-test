/**
 * 这个mixins 是给template/下面的发票模板使用的,
 * 主要作用是：提供回填发票的初始化与提交功能的数据。用于编辑、展示。
 * 
 * 提供了5个方法：
 *  1、setTempData 初始化provider的值
 *  2、scrollTop 提供置顶功能
 *  3、createParams 创建提交参数
 *  4、formatParams 参数格式化
 *  5、onCancel 取消
 * 
 * 注意：
 *  1、引入mixins的命名冲突问题。不可以在组件中声明mixin中定义的 方法与变量名称
 */
 import { delcommafy } from "@/utils/format"
export default {
  props: ["info", "actionStatus"],
  provide () {
    return {
      detailData: () => this.detailData,
      actionStatus: () => this.actionStatus
    }
  },
  data() {
    return {
      // 表单工具方法
      delcommafy,
      detailData: {}
    };
  },
  computed: {
    disabled () {
      return this.actionStatus == 'detail'
    }
  },
  watch: {
    info: {
      handler: function (obj) {
        this.setTempData(obj);
      },
      deep: true,
    },
  },
  created() {
    this.setTempData(this.info);
  },
  methods: {
    setTempData(info) {
      console.log("加载模板数据：", info)
      this.detailData = info || {};
    },
    scrollTop () {
      this.$refs.topMark.scrollTo(0, 0)
    },
    onCancel () {
      console.log("点击取消") 
      this.$emit("cancel")
    },
    /**
     * 发票提交前创建入参对象
     * @param {Array} getModel 获取模板中原子组件的refs集合
     * @param {String} listKey 多项的入参字段
     * @param {String} ref 多项的refs
     * @returns 入参字段对象
     */
    createParams (getModel = [], listKey = "", ref = "") {
      let data = getModel.reduce((prev, curr) => {
        let ret = {}
        if (curr == ref) {
          let baseFormList = this.$refs[curr].baseFormList
          // 有时候识别出来的发票没有多项数据，提交时接口报错，所以需要创建一个空对象
          if ( Array.isArray(baseFormList) && baseFormList.length == 0) {
            ret[listKey] = [this.$refs[curr].formModel]
          } else {
            ret[listKey] = baseFormList.map(item => item.formModel)
          }
        } else {
          ret = {
            ...this.$refs[curr]?.formModel
          }
        }
        return Object.assign({}, prev, ret)
      }, {})
      return data
    },
    /**
     * 发票提交前的入参格式化方法，将金额的string -> number
     * @param {Array} keys 需要转换的字段组 
     * @param {Object} data 入参对象
     * @returns 入参对象
     */
    formatParams (keys = [], data = {}) {
      let data2Number = {}
      for (let key in data) {
        let value = data[key]
        if (Array.isArray(value)) {
          data2Number[key] = value

          data2Number[key] = data2Number[key].map(item => {
            let newItem = this.formatParams(keys, item)
            return newItem
          })
        } else if (keys.includes(key)) {
          data2Number[key] = this.delcommafy(value)
        } else {
          data2Number[key] = value
        }
      }
      return data2Number
    },
    deleteSku (index) {
      this.$emit("deleteSku", index)
    }
  }
}