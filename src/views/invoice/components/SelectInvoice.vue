<template>
  <el-dialog
    :visible.sync="selectData.open"
    width="800px !important"
    append-to-body
    class='select-invoice'
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #title>
      <div class="select-invoice-title">新增发票</div>
    </template>
    <el-form ref="selectInvoiceForm" :model="selectData" label-width="150px">
      <el-form-item label="请选择发票类型:">
        <el-select v-model="selectData.invoiceType" placeholder="请选择发票类型" :disabled="actionStatus != 'add'">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传发票:">
        <el-upload
          ref="invoiceUpload"
          class="select-invoice-upload"
          :action="upload.action"
          :headers="upload.headers"
          :data="upload.data"
          :limit="upload.limit"
          :before-upload="handleBeforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-exceed="handleExceed"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png、pdf文件，每个文件且不超过5M，最多上传1个文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="checkAttList" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <Preview :preview="preview" />
  </el-dialog>
</template>

<script>

/**
 * 这个是选择发票类型与上传发票图片、PDF的功能组件
 * 
 * 有以下作用：
 *  1、选择发票类型
 *  2、上传发票
 *  3、预览发票
 *  4、删除发票重新上传
 * 
 *  点击确认按钮emit告诉父组件选择完成了,并将选择的发票类型与图片传给父组件，由父组件调度显示 进入发票详情
 */

import config from "../config"
import { getToken } from "@/utils/auth";
import {getBaseUrl} from "@/utils/baseUrl"
import Preview from "@/views/invoice/components/Preview"
import { deepClone } from "@/utils/index"

let imageBase = getBaseUrl()?.system
export default {
  name: "SelectInvoice",
  props: ["selectInvoice", "actionStatus"],
  components: {Preview},
  data () {
    return {
      selectData: {
        open: false
      },
      options: config.INVOICETYPE,
      upload: {
        action: imageBase + "/system/common/upload",
        headers: {
          Authorization: "Bearer " + getToken()
        },
        data: {
          bizType: "invoice_file"
        },
        accept: ["image/*", ".pdf"],
        limit: 1,
        preview: "",
        attList: null
      },
      preview: {
        path: null,
        fileType: null
      }
    }
  },
  watch: {
    selectInvoice: {
      handler: function (obj) {
        if (obj) {
          if (obj?.open) {
            console.log("打开发票上传，清除上传文件")
            this.$refs?.invoiceUpload?.clearFiles()
            this.upload.attList = null
          }
          this.selectData = obj
        }
      },
      deep: true,
      immediate: true
    },
  },
  computed: {
    checkAttList () {
      return (this.upload.attList??[]).length == 0
    }
  },
  methods: {
    onSubmit () {
      let { invoiceType } = this.selectData
      let { data } = this.upload
      let { file } = data

      if (!invoiceType) {
        return this.$message.error("请选择发票类型")
      }
      if (!file) {
        return this.$message.error("请上传发票图片/PDF")
      }
      // let params = {
      //   invoiceType: invoiceType, 
      //   invoiceFile: file,
      // }
      //  // 获取发票识别的发票详情，放入templateData，传递给父组件
      // let recog =  this.invoiceRecognition(params)
      let attlist = deepClone(this.upload.attList[0])
      let form = {
        open: false,
        invoiceType: invoiceType,
        invoiceFile: file,
        attList: attlist
      }
      this.upload.attList = null
      console.log("在组件select-invoice中提交", form)
      this.$emit("confirm", form)
    },
    // 发票识别
    // async invoiceRecognition (params) {
    //   let {invoiceType, invoiceFile} = params || {}
    //   let formData = new FormData()
    //   formData.append("invoiceType", invoiceType)
    //   formData.append("file", invoiceFile)
    //   let res = await invoiceRecognition(formData)
    //   return res?.data || {}
    // },
    onCancel () {
      this.$emit("cancel")
    },
    handleBeforeUpload (file) {
      let {type} = file
      let useType = ["image", "pdf"]
      if (!useType.some(t => type.indexOf(t) != -1)) {
        this.$message.error("只能上传jpg/png、pdf文件")
        return false
      }
      let uploadData = this.upload.data
      // 删除file文件保持唯一 避免file变成一个symbol对象，每次上传都创建一个file
      delete uploadData.file
      this.upload.data = Object.assign({}, uploadData, {
        file: file
      })
      console.log("在组件select-invoice中上传前", this.upload.data)
    },
    // 上传成功
    handleSuccess (response, file, fileList) {
      let  {attList, code, msg} = response || {}
      if (code == 200) {
        let {filePath} = attList[0]
        this.upload.preview = filePath
        this.upload.attList = attList
        console.log("在组件select-invoice中上传成功", response)
        console.log("在组件select-invoice中上传成功upload的数据：", attList)
      } else {
        this.upload.attList = []
        this.$message.error(`发票上传失败，请稍后再试！`)
        return false
      }
    },
    // 预览上传
    handlePreview (file) {
      console.log("在组件select-invoice中预览上传", file)
      let {response} = file || {}
      let  {attList, code, msg} = response || {}
      let {filePath, fileType} = attList[0]
      this.preview = {
        path: imageBase + filePath,
        fileType: fileType
      }
    },
    // 移除上传
    handleRemove (file, fileList) {
      this.preview = {
        path: null,
        fileType: null
      }
      this.upload.attList = null
      console.log("在组件select-invoice中移除上传的", file, fileList)
      // this.$message.success("移除上传文件成功")
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange (file, fileList) {
      console.log("在组件select-invoice中上传的变化", file, fileList)
    },
    // 文件超出个数限制时的钩子
    handleExceed (files, fileList) {
      this.$message.error("超过上传文件的限制，请删除文件后重新上传")
      console.log("在组件select-invoice中上传的文件超过限制", files, fileList)
    }
  }
}
</script>