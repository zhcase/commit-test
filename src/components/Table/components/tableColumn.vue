<!--
 * @Author: zeHua
 * @Date: 2021-08-23 14:22:12
 * @LastEditors: zeHua
 * @LastEditTime: 2021-11-01 19:42:55
 * @FilePath: /yd-admin/src/components/Table/components/tableColumn.vue
-->
<template>
  <el-table-column
    :prop="item.value"
    header-align="center"
    align="center"
    class="table-hover"
    v-bind="item"
  >
    <!-- 递归合并table 头 -->
    <template v-if="item.children">
      <template v-for="(item, index) of item.children">
        <TableColumn
          :item="item"
          :key="index"
          @handleTableCellEdit="handleTableCellEdit"
          @updateTableData="updateTableDataChildren"
        ></TableColumn>
      </template>
    </template>
    <!-- {item.attr} -->
    <template slot-scope="scope" slot-scoe>
      <!-- {{ formmater(item.formater) }} -->
      <!-- 直接展示 -->
      <template v-if="!item.options">
        <el-input
          size="mini"
          @blur="tableInputBlur(scope.$index, scope.row, scope)"
          v-if="
            scope.row[scope.$index] &&
            scope.row[scope.$index][scope.column.property]
          "
          v-model="scope.row[item.value]"
          class="edit-input"
        ></el-input>
        <!-- 判断是否需要格式化  -->
        <!-- 需要 -->
        <template v-if="item.formatter">
          <span :style="item.style"  v-if="
            !(scope.row[scope.$index] &&
            scope.row[scope.$index][scope.column.property])
          ">
            {{
              formatter(
                item.formatter,
                scope.row[scope.$index] &&
                  scope.row[scope.$index][scope.column.property]
                  ? ""
                  : scope.row[item.value],
                scope.row,
                scope,
                item.value,
                item
              )
            }}
          </span>
        </template>
        <!-- 不需要直接展示 -->
        <template v-else>
          <span :style="item.style"   >
            {{
              scope.row[scope.$index] &&
              scope.row[scope.$index][scope.column.property]
                ? ""
                : scope.row[item.value]
            }}
          </span>
        </template>
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          v-if="item.tips"
          :content="item.tips"
        >
          <span
            class="el-icon-warning"
            style="margin-left: 5px"
            slot="reference"
          ></span>
        </el-popover>

        <!-- </template> -->
        <!-- 修改按钮 -->
        <span
          class="edit el-icon-edit"
          v-if="computedIsShowEdit(item, scope)"
          @click="handleEdit(scope.$index, scope)"
        ></span>
        <!-- 取消按钮 -->
        <span
          class="edit cancel-btn el-icon-close"
          @click="handleCancelEdit($event, scope.$index, scope)"
          v-if="
            scope.row[scope.$index] &&
            scope.row[scope.$index][scope.column.property]
          "
        ></span>
        <!-- 确定按钮 -->
        <span
          class="edit cancel-btn el-icon-check"
          @mousedown.prevent="
            handleConfirm($event, scope.$index, scope, item.value)
          "
          v-if="
            scope.row[scope.$index] &&
            scope.row[scope.$index][scope.column.property]
          "
        ></span>
      </template>
      <!-- 条件展示 -->
      <!-- <template>
        <template v-if="item.type === 'radio'">
          <el-switch
            :value="handleFilterData(scope.row[item.value], item.options)"
            @change="handleSwitch(scope.row, item.value, item.options)"
          >
          </el-switch>
        </template>
        <template v-if="item.type !== 'radio' && item.options">
          {{ handleFilterData(scope.row[item.value], item.options) }}
        </template>
      </template> -->
      <template v-if="item.type !== 'radio' && item.options">
        {{ handleFilterData(scope.row[item.value], item.options) }}
      </template>
    </template>
    <!-- </template> -->
  </el-table-column>
</template>
<script>
export default {
  name: "TableColumn",
  data() {
    return {
      t: 0,
      isClickBtn: false, // 是否点击修改按钮
    };
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    //表单数据
    // tableData: {
    //   type: Array,
    //   default: [],
    // },
  },
  computed: {
    // 判断是否有修改索引值 如果有索引值优先 变成可编辑 否则 按照edite字段 来计算
    computedIsShowEdit() {
      return (item, scope) => {
        //如果存在用字段去 是否修改
        if (item.isEditIndex) {
          // 判断是否是不是这true 与false 字段
          if (
            scope.row[item.isEditIndex] === true ||
            scope.row[item.isEditIndex] === false
          ) {
            // 如果是直接返回
            return scope.row[item.isEditIndex];
          } else {
            // 否则 是字符串或者别的  看是否有edit 为true 优先数据字段然后再edit
            if (!scope.row[item.isEditIndex]) {
              if (item.edit) {
                return (
                  item.edit &&
                  !(
                    scope.row[scope.$index] &&
                    scope.row[scope.$index][scope.column.property]
                  )
                );
              }else{
                return false;
              }
            }
          }
        } else {
          return (
            item.edit &&
            !(
              scope.row[scope.$index] &&
              scope.row[scope.$index][scope.column.property]
            )
          );
        }
        return false;
      };
    },
    /**
     * 格式化数据
     * @param fn 传递函数
     * @param args 传递的值
     */
    // formatter() {
    //   return async (fn, args) => {
    //     if (typeof fn === 'function') {
    //       let result = fn(args);
    //       this.$nextTick(() => {
    //         setTimeout(() => {
    //           console.log(result);
    //           return result;
    //         }, 5000);
    //       });
    //     }
    //   };
    // },
    /**
     * 过滤返回选中数据
     */
    handleFilterData() {
      return (index, data) => {
        let result = data.filter((item) => {
          return item.value === index;
        });
        if (result && result[0]) {
          return result[0].label;
        }
        return;
      };
    },
  },
  watch: {},

  methods: {
    // 递归触发更新table
    updateTableDataChildren() {
      this.$emit("updateTableData");
    },
    /**
     * 格式化数据
     * @param fn 传递函数
     * @param args 传递的值
     */
    // formatter(fn, args, cloumns, scoped, index, item) {
    //   cloumns[index] = cloumns[index];
    //   if (typeof fn === "function") {
    //     if (
    //       scoped.row[scoped.$index] &&
    //       scoped.row[scoped.$index][scoped.column.property]
    //     ) {
    //       return cloumns[index];
    //     } else {
    //       if (fn(args, cloumns, scoped, index)) {
    //         if (scoped.row.isTableColumnEdit) {
    //           return cloumns[index];
    //         }
    //         cloumns[index] = fn(args, cloumns, scoped, index);
    //         return cloumns[index];
    //       }
    //     }
    //   }
    // },
    // 上面这个formatter方法不知道是什么意思，也不知道是什么情况。执行错误
    // 暂时用下面方法处理formatter 直接执行自定义formatter
    formatter(fn, args, cloumns, scoped, index, item) {
      cloumns[index] = cloumns[index];
      if (typeof fn === "function") {
        if (
          scoped.row[scoped.$index] &&
          scoped.row[scoped.$index][scoped.column.property]
        ) {
          return cloumns[index];
        } else {
          let result= fn(args, cloumns, scoped, index);
          if (result) {
            if (scoped.row.isTableColumnEdit) {
              return cloumns[index];
            }
            // cloumns[index] = result;
            return result;
          }
        }
      }
    },
    /**
     * 点击修改单元格
     * @param index 索引
     * @param scoped 整行数据
     */
    handleEdit(index, scoped) {
      scoped.row[index] = {};
      scoped.row[index][scoped.column.property] = true;
      scoped.row[index].content = scoped.row[scoped.column.property];
      this.$emit("updateTableData");
    },
    /**
     * @description 监听输入框是否失去焦点
     * @param index 索引
     * @param row  行的数据
     * @param scoped table 属性值
     */
    tableInputBlur(index, row, scoped) {
      let params = {
        scoped,
        index,
      };
      if (this.isClickBtn) {
        this.isClickBtn = false;
        return;
      }
      this.handleCancelEdit("", index, scoped);

      //         scoped.row[index][scoped.column.property] = false;
      // scoped.row[scoped.column.property] = scoped.row[index].content;

      // scoped.row[index][scoped.column.label] = false;
      // setTimeout(() => {
      //   this.handleCancelEdit("", index, scoped);
      //   return;
      // });
      // this.$emit("handleTableCellEdit", params);
      // // scoped.row[scoped.column.property] = scoped.row[index].content;

      // this.$emit("updateTableData");
    },
    handleTableCellEdit(params) {
      this.$emit("handleTableCellEdit", params);
    },
    /**
     * 修改确认
     * @param e 默认事件
     * @param index 索引
     * @param scoped 整行数据
     */
    handleConfirm(event, index, scoped, indexs) {
      // console.log(event);
      event.preventDefault();
      let params = {
        scoped,
        index,
      };
      this.$emit("handleTableCellEdit", params);
      scoped.row[indexs] = scoped.row[indexs];
      scoped.row[index][scoped.column.property] = false;
      scoped.row.isTableColumnEdit = true;
      this.$emit("updateTableData");
      this.isClickBtn = true;
      return;
    },
    /**
     * @description 取消输入框
     * @param e 默认事件
     * @param index 索引
     * @param scoped 整行数据
     */
    handleCancelEdit(e, index, scoped) {
      scoped.row[index][scoped.column.property] = false;
      scoped.row[scoped.column.property] = scoped.row[index].content;
      return;
      this.$emit("updateTableData");
    },
    /**
     * @description 取消输入框
     * @param e 默认事件
     * @param index 索引
     * @param scoped 整行数据
     */
    handleCancelEdit(e, index, scoped) {
      scoped.row[index][scoped.column.property] = false;
      scoped.row[scoped.column.property] = scoped.row[index].content;
      this.$emit("updateTableData");
    },
  },
};
</script>

<style lang="scss" scoped>
td:hover {
  .el-icon-edit {
    display: inline-block !important;
  }
}
.el-icon-edit {
  position: absolute;
  right: 20px;
  top: 45%;
  display: none !important;
}
.edit {
  text-align: right;
  cursor: pointer;

  padding-left: 10px;
  display: inline-block;
}
.edit-input {
  width: 60%;
}
</style>
