<template>
  <div style="height: 800px">
    <basic-table
        :registerTable="table"
        ref="inventoryTable"
        @selection-change="getSelectTableData"
        :basicTableOptions="options"
    >
      <template #toolbarLeft>
        <el-button type="success" :disabled="wjj" size="mini"
                   @click="connectFun(undefined)"
                   icon="el-icon-s-unfold">交接
        </el-button>
        <el-button type="warning" size="mini" :disabled="ysGoodsState" @click="receive(undefined,3)"
                   icon="el-icon-check">
          确认接收
        </el-button>
        <el-button type="danger" size="mini" :disabled="ysGoodsState" @click="receive(undefined,0)"
                   icon="el-icon-close">
          拒绝接收
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
            <el-button size="mini" icon="el-icon-s-unfold" v-if="scope.row.goodsState==0" @click="connectFun(scope.row)"
                       type="text">交接
            </el-button>
            <el-button size="mini" icon="el-icon-check" @click="receive(scope.row,3)" v-if="scope.row.goodsState==2"
                       type="text">
              确认接收
            </el-button>
            <el-button size="mini" icon="el-icon-close" v-if="scope.row.goodsState==2" @click="receive(scope.row,0)"
                       type="text">拒绝接收
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
import TreeSelectLay from "@/components/LazyTree/index.vue";
// 页面表单的基本数据
import mixinTableData from "@/views/workhandover/mixins/inventorymixins.js"
// 数据接口
import {editAll, con} from "@/api/workhandover/inventory";

export default {
  name: "inventory",
  mixins: [mixinTableData], // 页面表单的基本数据 在这里
  components: {
    basicTable, TreeSelectLay
  },
  data() {
    return {
      wjj: true,
      ysGoodsState: true,
      goodsState: null,
      selection: [],
      // 是否显示弹出层
      open: false,
      // 非多个禁用
      multiple: true,
      ids: [],
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
  props: {
    tabValue: {
      type: String,
    }
  },
  watch: {
    tabValue: {
      handler(val) {
        if (this.$refs.inventoryTable) {
          this.$refs.inventoryTable.methods.doLayout();
        }
      },
      deep: true
    }
  },
  methods: {
    handleNodeClick(v) {
      this.form.handoverStaffId = v;
    },
    isAllEqual(array) {
      if (array.length > 0) {
        return !array.some(function (value, index) {
          return value !== array[0];
        });
      } else {
        return true;
      }
    },
    // 多选功能
    getSelectTableData(rows) {
      this.ids = [];
      this.selection = rows;
      console.log(this.selection)
      if (this.selection.length === 0) {
        this.wjj = true;
        this.ysGoodsState = true;
        return;
      }
      let array = [];
      rows.map(item => {
        array.push(item.goodsState);
        this.ids.push(item.goodsId.toString());
      });
      //判断按钮显示状态
      let flag = this.isAllEqual(array);
      this.wjj = true;
      this.ysGoodsState = true;
      if (flag && array.indexOf('0') != -1) {
        this.ysGoodsState = true;
        this.wjj = false;
      }else if (flag && array.indexOf('2') != -1){
        this.ysGoodsState = false;
        this.wjj = true;
      }
    },
    //交接
    connectFun(v) {
      if (v !== undefined) {
        this.ids = [];
        this.ids.push(v.goodsId.toString());
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
    /**
     * 接收
     */
    receive(row, c) {
      let ids = [];
      if (row === undefined) {
        ids = this.ids;
      } else {
        ids.push(row.goodsId.toString());
      }
      let data = {
        "goodsState": c,
        "params": {
          "idList": ids
        }
      }
      con(data).then(response => {
        this.$message({
          message: '成功',
          type: 'success'
        });
        this.reset();
        this.$refs.inventoryTable.handleRefresh()
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            "handoverStaffId": this.form.handoverStaffId,
            "handoverDate": this.form.handoverDate,
            "params": {
              "idList": this.ids
            }
          };
          editAll(data).then(response => {
            this.$message({
              message: '成功',
              type: 'success'
            });
            this.open = false;
            this.$refs.inventoryTable.handleRefresh()
            this.reset();
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