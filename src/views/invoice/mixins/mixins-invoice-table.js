import config from "../config";
// 数据接口
import { getInvoiceList } from "@/api/invoice/index"
import { priceFormat, formateDate } from "@/utils/format"

/**
 * 这个是发票管理页面的mixins 都是basic-table组件的配置项
 * 配置项：
 *   1、搜索框配置项
 *   2、表格配置项
 *   3、数据请求的接口配置项
 */
export default {
  data () {
    return {
      // 自定义搜索框
      schemas: [
        {
          field: "invoiceType",
          label: "发票类型",
          component: "Select",
          placeholder: "请选择发票类型",
          multiple: true,
          clearable:true,
          'collapse-tags': true,
          componentProps: {
            options: config.INVOICETYPE,
            optionsFormat:{label:'label',value:'value'}
          },
        },
        {
          field: "invoiceDescribe",
          component: "Input",
          label: "发票描述",
          clearable: true,
          componentProps:{
         
           
          },
          placeholder: "请输入发票描述",
          maxLength: 100
        },
        {
          field: "invoiceCode",
          component: "Input",
          label: "发票代码",
          clearable: true,
          placeholder: "请输入发票代码",
          maxLength: 100
        },
        {
          field: "invoiceNum",
          component: "Input",
          label: "发票号码",
          clearable: true,
          placeholder: "请输入发票号码",
          maxLength: 100
        },
        {
          field: 'invoiceDateArr',
          label: '开票日期',
          component: 'DatePicker',
          isRange:true,
          'range-separator':"至",
          'start-placeholder':"开始日期",
          'end-placeholder':"结束日期",
          'value-format':'yyyy-MM-dd',
          placeholder: '请选择日期范围',
        },
        {
          field: "status",
          component: "Select",
          label: "状态",
          placeholder: "请选择状态",
          clearable:true,
          componentProps: {
            options: [
              { label: "已提报销", value: "1"},
              { label: "未提报销", value: "0"},
            ],
            optionsFormat:{label:'label',value:'value'}
          }
        },
      ],
      // 表格数据
      table: [
        {
          slot: "selectionSlot"
        },
        {
          label: "发票类型",
          value: "invoiceType",
          "show-overflow-tooltip": true,
          formatter: (val, cloumns, scoped, index) => {
            let temp = config.TEMPLATE[val]
            return temp.label;
          }
        },
        {
          label: "发票描述",
          value: "invoiceDescribe",
          "show-overflow-tooltip": true,
        },
        {
          label: "含税金额",
          value: "totalPriceTax",
          "show-overflow-tooltip": true,
          formatter: (val, cloumns, scoped, index) => {
            // if (cloumns?.invoiceType == '5') {}
            // console.log("含税金额", cloumns, scoped, index);
            if(typeof val == 'number'){
              return priceFormat(val)
            }
            return val;
          }
        },
        {
          label: "不含税金额",
          value: "totalMoney",
          "show-overflow-tooltip": true,
          formatter: val => {
            if(typeof val == 'number'){
              return priceFormat(val)
            }
            return val;
          }
        },
        {
          label: "开票日期",
          value: "invoiceDate",
          "show-overflow-tooltip": true,
          formatter: val => {
            if(val){
              return formateDate(val, "yyyy-MM-dd")
            }
            return val;
          }
        },
        {
          slot: "status"
        },
        {
          slot: "action"
        }
      ],
      options: {
        api: getInvoiceList,//调用接口地址
        paginationProps: {},//分页
        apiFormat: "rows",//调用table的数据格式
        paginationFormat: "total"//调用table的数据格式总页数
      },
    }
  },
}