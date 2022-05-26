<template>
  <div style="height: 800px">
    <basic-table
        :registerTable="table"
        ref="otherBusinessTable"
        :formSchema="schemas"
        @selection-change="getSelectTableData"
        :basicTableOptions="options"
    >
      <template #toolbarLeft>
        <el-button type="success" :disabled="multiple" size="mini" @click="connectFun(undefined)"
                   icon="el-icon-s-unfold">交接
        </el-button>
      </template>
      <template #selectionSlot>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
      </template>

      <!--列表操作按钮插槽-->
      <template #action>
        <el-table-column align="center" label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-check" @click="connectFun(scope.row)"
                       type="text">
              交接
            </el-button>
          </template>
        </el-table-column>
      </template>
    </basic-table>
    <el-dialog title="交接" :visible.sync="open" width="600px" append-to-body :destroy-on-close="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="交接人" prop="handoverStaffId">
          <el-input v-show="false" v-model="form.handoverStaffId"></el-input>
          <TreeSelectLay :jobType=9 @getTreeValue="handleNodeClick"></TreeSelectLay>
        </el-form-item>
        <el-form-item label="交接日期" prop="handoverDate">
          <el-date-picker
              style="width: 100%;"
              v-model="form.handoverDate"
              type="date" value-format="yyyy-MM-dd"
              placeholder="选择日期" size="small" :editable="false">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import basicTable from "@/components/Table/components/index.vue"
// 页面表单的基本数据
import mixinTableData from "@/views/workhandover/mixins/otherBusinessmixins.js"
import TreeSelectLay from "@/components/LazyTree/index.vue";

// 数据接口
import {editAll} from "@/api/workhandover/otherBusiness";

export default {
  name: "otherBusiness",
  mixins: [mixinTableData], // 页面表单的基本数据 在这里
  components: {
    basicTable, TreeSelectLay
  },
  data() {
    return {
      businessList: [],
      selection: [],
      // 是否显示弹出层
      open: false,
      // 非多个禁用
      multiple: true,
      form: {
        handoverStaffId: null,
        handoverDate: null
      },
      // 表单校验
      rules: {
        handoverStaffId: [
          {required: true, message: "交接人必填", trigger: "blur"},
        ],
        handoverDate: {required: true, message: "交接日期必填", trigger: "blur"},
      }
    };
  },
    props:{
    tabValue:{
      type:String,
    }
  },
  watch:{
    tabValue:{
      handler(val){
        if(this.$refs.otherBusinessTable){
          this.$refs.otherBusinessTable.methods.doLayout();
        }
      },
     deep:true
    }
  },
  methods: {
    handleNodeClick(v) {
      this.form.handoverStaffId = v;
    },
    // 多选功能
    getSelectTableData(rows) {
      this.selection = rows;
      this.businessList = [];
      rows.map(item => {
        this.businessList.push({
          "id": item.id,    //主键id
          "type": item.type   //类型
        })
      });
      this.multiple = !this.selection.length
    },
    //交接
    connectFun(v) {
      if (v !== undefined) {
        this.businessList = [];
        this.businessList.push({
          "id": v.id,    //主键id
          "type": v.type   //类型
        })
      }
      this.open = true;
    },
    // 表单重置
    reset() {
      this.form = {
        handoverStaffId: null,
        handoverDate: null
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        console.log(this.ids)
        if (valid) {
          let data =
              {
                "params": {
                  "handoverStaffId": this.form.handoverStaffId.toString(),   //交接人
                  "handoverDate": this.form.handoverDate,  //交接时间
                  "businessList": this.businessList
                }
              }
          editAll(data).then(response => {
            this.$message({
              message: '成功',
              type: 'success'
            });
            this.$refs.otherBusinessTable.handleRefresh()
            this.reset();
            this.open = false;
          });
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    }
  },
};
</script>
<style scoped>
/deep/ .el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}
</style>