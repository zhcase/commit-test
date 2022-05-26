<template>
  <div class="app-container">
    <basic-table-2
      ref="invoiceTable"
      :registerTable="table"
      :formSchema="schemas"
      :basicTableOptions="options"
      @resetForm="resetForm"
      @selection-change="getSelectTableData"
      :row-class-name="tableRowClassName"
    >
      <template #toolbarLeft>
        <el-button size="mini" icon="el-icon-plus" type="primary" @click="addBtnInvoice">新增</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger" :disabled="selection.length == 0" @click="batchDeleteInvoice">删除</el-button>
      </template>

      <template #selectionSlot>
        <el-table-column
          type="selection"
          fixed="left"
          width="55">
        </el-table-column>
      </template>

      <template #status>
        <el-table-column align="center" label="状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '0'">未提报销</span>
            <span v-else type="info">已提报销</span>
          </template>
        </el-table-column>
      </template>

      <!--列表操作按钮插槽-->
      <template #action>
        <el-table-column align="center" label="操作" fixed="right" width="360">
          <template slot-scope="scope">
            <el-button v-show="scope.row.status == '0'" icon="el-icon-edit" size="mini" type="text" @click="clickHandle('edit', scope.row)">修改</el-button>
            <el-button size="mini" type="text"  icon="el-icon-view" @click="clickHandle('detail', scope.row)">详情</el-button>
            <el-button size="mini" type="text" icon="el-icon-delete" @click="clickHandle('delete', scope.row)">删除</el-button>
            <el-button size="mini" type="text" icon="el-icon-download" @click="clickHandle('download', scope.row)">发票下载</el-button>
            <el-button size="mini" type="text" icon="el-icon-view" @click="clickHandle('preview', scope.row)">
              <span>发票预览</span>
              <!-- 发票预览蒙版 -->
              <el-image
                v-if="scope.row.sysAttachment.fileType !== 'PDF'"
                class="invoice-action_image"
                :src="imageBase + scope.row.sysAttachment.filePath" 
                :preview-src-list="[imageBase + scope.row.sysAttachment.filePath]"
              ></el-image>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </basic-table-2>

    <!-- 上传发票第一步：选择发票类型与上传图片 -->
    <select-invoice :selectInvoice="selectInvoice" :actionStatus="actionStatus" @confirm="confirmHandle" @cancel="cancelHandle"></select-invoice>
    
    <!-- 上传发票第二步：录入发票的内容。可以保存、编辑、展示 -->
    <invoice-detail 
      :selectInvoice="selectInvoice" 
      :detailInvoice="detailInvoice" 
      :actionStatus="actionStatus" 
      @reselect="reselectHandle"  
      @confirm="confirmDetailHandle" 
      @cancel="cancelDetailHandle"
      @deleteSku="deleteSku"
    ></invoice-detail>
    
    <!-- 预览发票组件：发票图片与PDF -->
    <Preview :preview="preview" />
  </div>
</template>

<script>
// 页面表单的基本数据
import mixinsInvoiceTable from "@/views/invoice/mixins/mixins-invoice-table"
// 选择发票类型组件
import SelectInvoice from "@/views/invoice/components/SelectInvoice.vue"
import InvoiceDetail from "@/views/invoice/components/InvoiceDetail.vue"
import basicTable2 from "@/components/Table/components/index.vue"
import Preview from "@/views/invoice/components/Preview"
// 发票相关接口
import { deleteInvoice, getInvoice, addInvoice, modifyInvoice, invoiceRecognition, checkInvoiceNumExist } from "@/api/invoice/index"
import {deepClone} from "@/utils/index"
// root地址
import {getBaseUrl} from "@/utils/baseUrl"

import config from "@/views/invoice/config";

let imageBase = getBaseUrl()?.system

export default {
  name: "invoiceManage",
  mixins: [mixinsInvoiceTable], // 页面表单的基本数据 在这里
  components: {SelectInvoice, InvoiceDetail, basicTable2, Preview},
  data() {
    return {
      imageBase,
      selectInvoice: {
        open: false,
        invoiceType: "",
        attList: null
      },
      detailInvoice: {
        open: false,
        data: null
      },
      preview: {
        path: null,
        fileType: null
      },
      selection: [],
      actionStatus: "", // 当前操作状态 add新增 edit编辑 detail查看详情
      actionData: null
    }
  },
  methods: {
    
    resetForm(){},
    // 多选功能
    getSelectTableData(rows) {
      this.selection = rows
    },
    // 批量删除发票
    batchDeleteInvoice () {
      if (this.selection.length == 0) {
        return this.$message.warning("请选择需要删除的发票")
      }
      console.log("批量选择的数据：", this.selection)
      this.deleteInvoiceHandle(this.selection)
    },
    deleteInvoiceHandle (rows = []) {
      this.$confirm('此操作将删除该发票, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let types = rows.map(item => item.invoiceType)
          let ids = rows.map(item => item.invoiceId)
          let res = await deleteInvoice({invoiceType: types.join(","), invoiceIds: ids.join(",")})
          this.$message.success('删除成功!');
          this.$refs.invoiceTable.handleRefresh()
        }).catch(() => {
          this.$message.info('已取消删除!');         
        });
    },
    // 新增一个发票起点按钮
    addBtnInvoice () {
      this.selectInvoice = {
        open: true,
        invoiceType: "",
        attList: null
      }
      this.actionStatus = "add"
    },
    // 取消选择 清空选择、详情、预览这三个组件的数据
    cancelHandle () {
      this.selectInvoice = {
        open: false,
        invoiceType: "",
        attList: null
      }
      this.detailInvoice = {
        open: false,
        data: null
      }
      this.preview = {
        path: null,
        fileType: null
      }
      this.actionStatus = ""
      this.actionData = null
      console.log("取消选择发票类型")
    },
    // 取消填写详情， 清空详情组件的数据
    cancelDetailHandle () {
      this.detailInvoice = {
        open: false,
        data: null
      }
      console.log("取消填写发票")
    },
    // 发票识别
    async invoiceRecognition (params) {
      let {invoiceType, invoiceFile} = params || {}
      // 二手车发票识别api没有权限，跳过发票识别
      if (invoiceType == "7") return {}
      // if (invoiceType == "7") {
      let formData = new FormData()
      formData.append("invoiceType", invoiceType)
      formData.append("invoiceFile", invoiceFile)
      let res = await invoiceRecognition(formData)
      return res?.data || {}
    },
    /**
     * 第一步 选择发票类型与上传发票图片或PDF
     * @param {Object} form 选择的类型与发票对象
     * 
     * 做了以下动作：
     * 关闭选择发票类型SelectInvoice组件 -> 识别发票 -> 打开发票详情组件 -> 将选择的数据用detail字段传递给发票详情组件
     */
    async confirmHandle (form = {}) {
      //发票类型invoiceType，上传的文件invoiceFile，预览地址preview，发票识别接口返回的数据data
      let {invoiceType, attList, invoiceFile} = form
      let params = { invoiceType, invoiceFile }
      let recog = await this.invoiceRecognition(params)
      // 提示错误不走下一步
      let err = recog
      if(typeof recog != 'object') {
        this._timer = setTimeout(() => {
          this.$message.error(err)
          clearTimeout(this._timer)
        }, 80)
        recog = {}
      }
      if (recog?.code && typeof recog.data == 'object') {
        if (recog?.code != 200) {
          let err = recog.msg
          this._timer = setTimeout(() => {
            this.$message.error(err)
            clearTimeout(this._timer)
          }, 80)
        }
        recog = recog.data
      }
      this.selectInvoice = { open: false, invoiceType, invoiceFile, attList }
      let data = recog??{}
      data.invoiceType = invoiceType
      this.detailInvoice = { open: true, data}
      // 判断发票号码是否已经重复了  数据标识 0:无相同发票 1:有相同发票
      let { invoiceCode, invoiceNum } = data || {}
      let excludTypes = ["8", "9"]
      let checkExludes = excludTypes.includes(invoiceType)
      if ((checkExludes && invoiceNum) || (invoiceCode && invoiceNum)) {
        let existParams = {
          invoiceCode: invoiceCode,
          invoiceNum: invoiceNum
        }
        // 飞机票与火车票没有发票代码，所以只需要一个参数 发票号码 invoiceNum， 删除 发票代码 invoiceCode
        if (checkExludes) {
          delete existParams.invoiceCode
        }
        try {
          let { code, data, msg} = await checkInvoiceNumExist(existParams) || {}
          if (code == 200 && data == 1) {
            return this.$message.error("当前发票已存在，请修改后再提交！")
          }
        } catch (e) {
          console.log("检查发票存在接口调用失败：", e)
          return this.$message.error("检查发票存在失败，请稍后再试！")
        }
      }
      // if (invoiceCode && invoiceNum) {
      //   let { code, data, msg} = await checkInvoiceNumExist({invoiceCode, invoiceNum}) || {}
      //   if (code == 200 && data == 1) {
      //     this.$message.error("当前发票已存在，请修改后再提交！")
      //   }
      // }
      console.log("选择发票类型：", form)
    },
    // 第二步 发票详情 - 重新选择发票。将选择的数据回头执行第一步。保持逻辑顺序单项流动
    reselectHandle (form = {}) {
      this.confirmHandle(form)
    },
    /**
     * 第二步 填写完成详情后调用新增/修改发票接口
     * @param {Object} form 报错的入参
     * 
     */
    async confirmDetailHandle (data) {
      if (config.INVOICESTRARR.includes(data.invoiceType)) {
        data.invoiceType = config.INVOICESTR[data.invoiceType]
      }
      // 因为详情只包含了输入值，发票图片是SelectInvoice组件的数据，所以在提交前把发票图片传上去
      let { attList } = this.selectInvoice
      let { fileId, filePath: attachmentUrl } = attList || {}
      let params = Object.assign({}, data, {
        fileId,
        attachmentUrl,
        sysAttachment: attList
      })
      if (this.actionStatus === "edit") {
        this.updateInvoiceHandle(params)
      } else {
        // 新增 - 保存前校验发票是否重复，关键标识是：发票代码 invoiceCode 发票号码 invoiceNum
        let excludTypes = ["8", "9"]
        let checkExludes = excludTypes.includes(params.invoiceType)
        if ((checkExludes && params.invoiceNum) || (params.invoiceCode && params.invoiceNum)) {
        let existParams = {
          invoiceCode: params.invoiceCode,
          invoiceNum: params.invoiceNum
        }
        // 飞机票与火车票没有发票代码，所以只需要一个参数 发票号码 invoiceNum， 删除 发票代码 invoiceCode
        if (checkExludes) {
          delete existParams.invoiceCode
        }
        try {
          let { code, data, msg} = await checkInvoiceNumExist(existParams) || {}
          if (code == 200 && data == 1) {
            return this.$message.error("当前发票已存在，请修改后再提交！")
          }
        } catch (e) {
          console.log("检查发票存在接口调用失败：", e)
          return this.$message.error("检查发票存在失败，请稍后再试！")
        }
      }
        this.addInvoiceHandle(params)
      }
      this.detailInvoice = { open: false, data}
      this.cancelHandle()
    },
    async addInvoiceHandle (form) {
      let {code} = await addInvoice(form)
      if (code == 200) {
        this.$message.success("新增发票成功！")
        this.$refs.invoiceTable.handleRefresh()
      }
      console.log("填写完成发票的详情。", form)
    },
    async updateInvoiceHandle (form) {
      let actionData = deepClone(this.actionData)
      // 这些字段不能直接赋值，因为里面包含了Id等需要更新的标识
      let keys = [
        "invoiceManageItemInfoList",
        "invoiceManageAirInfoList",
        "invoiceManageVehicleInfo"
      ]
      for(let key in form) {
        let value = form[key]
        if (keys.includes(key)) {
          // 数组合并去重
          if (Array.isArray(value)) {
            let actionDataArray = actionData[key]??[]
            value.forEach((item, index) => {
              let actionObject = actionDataArray[index]??{}
              actionDataArray[index] = Object.assign({},actionObject, item)
            })
          } else {
            let actionDataObject = actionData[key]??{}
            actionData[key] = Object.assign({}, actionDataObject, value)
          }
        } else {
          actionData[key] = value
        }
      }
      let {code} = await modifyInvoice(actionData)
      if (code == 200) {
        this.$message.success("更新发票成功！")
        this.$refs.invoiceTable.handleRefresh()
      }
      this.actionData = null
    },
    
    /**
     * 发票管理列表的操作功能集合
     * @param {String} action 操作类型：modify编辑、detail查看详情、delete删除、download下载、preview预览
     * @param {Object} row 操作行数据
     */
    async clickHandle (action, row) {
      let {invoiceType, invoiceId, sysAttachment} = row || {}
      let { filePath, realName, fileType } = sysAttachment || {}
      if (action == "edit" || action == "detail") {
        let data = null
        // 修复bug，修改后就不读缓存的详情数据了，避免修改后未更新
        // if (this.actionData && this.actionData.invoiceId == invoiceId) {
        //   data = this.actionData
        // } else {
        //   let res = await getInvoice({invoiceId, invoiceType})
        //   data = res.data
        //   this.actionData = data
        // }
        let res = await getInvoice({invoiceId, invoiceType})
        data = res.data
        this.actionData = data
        this.actionStatus = action
        this.selectInvoice = { open: false, invoiceType, invoiceFile: null, attList: sysAttachment }

        // 这里先给data赋值null，再赋值，是为了避免同一条数据切换编辑、详情时数据无变化无法触发组件render，
        // 同时保证子组件的inject监听到数据的变化
        this.detailInvoice = { open: true, data: null}
        this._timer = setTimeout(() => {
          clearTimeout(this._timer)
          this.detailInvoice = { open: true, data}
        }, 80)

        console.log("获取到编辑数据：", data)
        console.log("当前的操作状态：", this.actionStatus)
        return
      }
      if (action == "delete") {
        this.deleteInvoiceHandle([{invoiceType, invoiceId}])
        return
      }
      if (action == "download") {
        let imageBase = getBaseUrl()?.system
        if (!filePath) {
          return this.$message.info("没有可以下载的链接")
        }
        this.hrefDown(imageBase + filePath, realName)
        return
      }
      if (action == "preview") {
        // this.$message.success("preview 点击预览")
        if (fileType == "PDF") {
          this.preview = {
            path: imageBase + filePath,
            fileType: fileType
          }
        }
        return
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (row.remindFlag && row.status == '0') {
        return 'remind-flag-row';
      }
      return '';
    },
    deleteSku (index) {
      console.log("触发删除sku:", index)
      let actionData = this.actionData ? deepClone(this.actionData) : null
      if (index > -1 && actionData) {
        let { invoiceManageItemInfoList, invoiceManageAirInfoList } = actionData || {}
        if (invoiceManageItemInfoList && invoiceManageItemInfoList.length >= index) {
          invoiceManageItemInfoList.splice(index, 1)
          actionData.invoiceManageItemInfoList = invoiceManageItemInfoList
        }
        if (invoiceManageAirInfoList && invoiceManageAirInfoList.length >= index) {
          invoiceManageAirInfoList.splice(index, 1)
          actionData.invoiceManageAirInfoList = invoiceManageAirInfoList
        }
        this.actionData = actionData
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/views/invoice/templates/index.scss";
</style>
<style lang="scss">
.el-table .remind-flag-row {
  background-color: #f9e0e0;
}
</style>