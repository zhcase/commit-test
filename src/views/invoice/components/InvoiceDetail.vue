<template>
  <div>
    <el-dialog
      :visible.sync="open"
      width="1500px !important"
      append-to-body
      class='detail-invoice'
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template #title>
        <div class="detail-invoice-title">{{showTitle}}</div>
      </template>
      <div class="detail-content">
        <div class="detail-invoice-preview scroll-style" @click="reUploadImage">
          <div v-if="fileType == 'PDF'" class="detail-invoice-image  scroll-style">
            <iframe id='previewPdf' :src="imageBase + preview" height="512" width="100%"></iframe>
          </div>
          <div v-else class="detail-invoice-image  scroll-style">
            <el-image :src="imageBase + preview" class=""></el-image>
          </div>
          <div v-if="showPdfBtn" class="change-invoice" v-show="!disabled" @click="reUploadImage">
            <div>更换发票</div>
          </div>
        </div>
        <div class="detail-invoice-form">
          <component
            :is="invoiceTemplate" 
            :info="detailInvoice.data" 
            :actionStatus="actionStatus" 
            ref="template" 
            @submit="onSubmit" 
            @cancel="onCancel"
             @deleteSku="deleteSku"
          ></component>
        </div>
      </div>
    </el-dialog>
    <select-invoice :selectInvoice="reSelectInvoice" :actionStatus="actionStatus" @confirm="reConfirmHandle" @cancel="cancelHandle"></select-invoice>
  </div>
</template>

<script>

/**
 * 发票详情组件，有以下作用：
 * 1、将选择的发票类型转发给各个发票模板
 * 2、所有的发票填写、展示、修改都在这个组件里面。但是调用保存等接口需要emit给父组件处理
 * 3、这里只处理一些校验、格式化等中间逻辑
 * 4、点击发票直接更换发票与模板
 */

import config from "../config"
import SelectInvoice from "@/views/invoice/components/SelectInvoice"


// 各个发票的模板
import {
  VATspecial,
  VATElectronicspecial,
  MotorVehicleSales,
  VATOrdinary,
  VATElectronicOrdinary,
  VATOrdinary76mm,
  VATElectronicToll,
  UniformUsedCar,
  AirTransportElectronic,
  TrainTickets
} from "../templates/index"

import {getBaseUrl} from "@/utils/baseUrl"

let imageBase = getBaseUrl()?.system

export default {
  name: "DetailInvoice",
  props: ["selectInvoice", "detailInvoice", "actionStatus"],
  components: {
    SelectInvoice, 
    VATspecial,
    VATElectronicspecial,
    MotorVehicleSales,
    VATOrdinary,
    VATElectronicOrdinary,
    VATOrdinary76mm,
    VATElectronicToll,
    UniformUsedCar,
    AirTransportElectronic,
    TrainTickets
  },
  data () {
    return {
      open: false,
      options: config.INVOICETYPE,
      invoiceTemplate: null,
      preview: "",
      fileType: "",
      imageBase: imageBase,
      reSelectInvoice: {
        open: false,
        invoiceType: "",
        attList: null
      },
    }
  },
  computed: {
    showTitle () {
      return this.actionStatus =="edit" ? "修改" : this.actionStatus =="detail" ? "发票详情" : "新增"
    },
    showPdfBtn () {
      return this.fileType == 'PDF' && (this.actionStatus == 'add' || this.actionStatus == 'edit')
    }
  },
  watch: {
    detailInvoice: {
      handler: function (obj) {
        this.setDetail()
      },
      deep: true
    }
  },
  created () {
    this.setDetail()
  },
  methods: {
    // 选择发票组件传过来的参数，在这里处理
    setDetail () {
      let { invoiceType, attList } = this.selectInvoice || {}
      let { data, open } = this.detailInvoice || {}
      if (invoiceType) {
        let {name, label} = config.TEMPLATE[invoiceType]
        let files = attList ? attList : data.sysAttachment??{}
        let { fileType, filePath } = files
        this.invoiceTemplate = name
        this.preview = filePath
        this.fileType = fileType
      }
      this.open = open

      // 发票类型不一致提示
      if(data?.code && data?.code != '200'){
        let that = this
        setTimeout(() => {
          that.$message.error(data.msg)
        }, 300)
      }
      // 二手车发票提示。设置延时保证在dialog弹窗之后出现
      if (invoiceType == "7" && this.actionStatus == "add") {
        let that = this
        this._timer = setTimeout(() => {
          that.$message.warning("二手车销售统一发票类型的发票识别还未投入使用，请手动填写发票信息")
          clearTimeout(this._timer)
        }, 300)
      }
    },
    /**
     * 点击了发票模板的确认按钮，emit数据过来了
     * @param {Object} data 模板emit过来的数据对象，这些都是接口可直接使用的参数
     * 
     * 有这些作用：
     * 1、校验必填项。如果没填，滚动置顶，并且给出提示。填了直接过
     * 2、格式化数据，比如一些小写转大写啊什么的
     * 3、将处理好的数据emit给父组件，如果数据没处理好，在此该提示的提示，该报错的报错
     */
    onSubmit (data) {
      console.log("提交前获取描述数据：", data)
      // 校验
      let {checked, tip, status} = this.checkData(data)

      if (!checked) {
        this.$refs.template.scrollTop()
        return this.$message[status](tip)
      }
      this.$emit("confirm", data)
      // this.proxyRouter.push({
      //     path: "/personnel/staffInfo",
      //     query: {}
      // })
    },
    // 检查必填 填了没
    checkData (data) {
      let checked = true, tip, status = "success";

      let {invoiceDescribe} = data || {}
      if ( !invoiceDescribe ) {
        checked = false
        tip = "请填写发票描述"
        status = "error"
      }

      return {checked, tip, status}
    },
    // 点击图片重新上传，调用SelectInvoice组件方法
    reUploadImage () {
      if (this.actionStatus == "detail") return
      console.log("点击图片 重新选择发票类型 上传发票。")
      this.actionStatus = "edit"
      this.reSelectInvoice = {
        open: true,
        invoiceType: this.detailInvoice.data.invoiceType,
        attList: null
      }
    },
    reConfirmHandle (form) {
      this.reSelectInvoice.open = false
      this.$emit("reselect", form)
    },
    cancelHandle () {
      this.reSelectInvoice = {
        open: false,
        invoiceType: "",
        attList: null
      }
      console.log("取消选择发票类型")
    },
    onCancel () {
      this.$emit("cancel")
    },
    deleteSku (index) {
      this.$emit("deleteSku", index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>