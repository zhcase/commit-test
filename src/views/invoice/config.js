/**
 * 这个配置项是作为发票管理的常量命名的
 * 因为有很多种发票类型需要在select、模板中使用
 * 现在统一在此定义
 * 
 * INVOICETYPE ： 发票的所有类型 与传递给后台识别的value
 * 
 * TEMPLATE ： 发票详情组件加载不同的templates模板
 * 
 */

export default {
  // select options
  INVOICETYPE: [
    { label: "增值税专用发票", value: "0"},
    { label: "增值税电子专用发票", value: "1"},
    { label: "机动车销售统一发票", value: "2"},
    { label: "增值税普通发票", value: "3"},
    { label: "增值税电子普通发票", value: "4"},
    { label: "增值税普通发票（卷票）", value: "5"},
    { label: "增值税电子普通发票（通行费）", value: "6"},
    { label: "二手车销售统一发票", value: "7"},
    { label: "航空运输电子客票行程单", value: "8"},
    { label: "火车票", value: "9"},
  ],
  // 用于动态加载对应的发票模板
  TEMPLATE: {
    "0": {
      name: "VATspecial",
      label: "增值税专用发票",
    },
    "1": {
      name: "VATElectronicspecial",
      label: "增值税电子专用发票",
    },
    "2": {
      name: "MotorVehicleSales",
      label: "机动车销售统一发票",
    },
    "3": {
      name: "VATspecial",
      label: "增值税普通发票",
    },
    "4": {
      name: "VATspecial",
      label: "增值税电子普通发票",
    },
    "5": {
      name: "VATOrdinary76mm",
      label: "增值税普通发票（卷票）",
    },
    "6": {
      name: "VATElectronicToll",
      label: "增值税电子普通发票（通行费）",
    },
    "7": {
      name: "UniformUsedCar",
      label: "二手车销售统一发票",
    },
    "8": {
      name: "AirTransportElectronic",
      label: "航空运输电子客票行程单",
    },
    "9": {
      name: "TrainTickets",
      label: "火车票",
    },
  },
  INVOICESTRARR: [
    "增值税专用发票",
    "增值税电子专用发票",
    "机动车销售统一发票",
    "增值税普通发票",
    "增值税电子普通发票",
    "增值税普通发票（卷票）",
    "增值税电子普通发票（通行费）",
    "二手车销售统一发票",
    "航空运输电子客票行程单",
    "火车票",
  ],
  INVOICESTR: {
    "增值税专用发票": "0",
    "增值税电子专用发票": "1",
    "机动车销售统一发票": "2",
    "增值税普通发票": "3",
    "增值税电子普通发票": "4",
    "增值税普通发票（卷票）": "5",
    "增值税电子普通发票（通行费）": "6",
    "二手车销售统一发票": "7",
    "航空运输电子客票行程单": "8",
    "火车票": "9",
  }
}