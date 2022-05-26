<!--
 * @Author: zeHua
 * @Date: 2021-08-19 13:36:56
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-21 18:16:19
 * @FilePath: /yd-admin/src/views/demo/components/table/editCellTable.vue
-->
<template>
  <div class="app-container">
    <BasicTable
      :registerTable="table1"
      v-if="table1[0]"
      @handleTableCellEdit="handleEditChange"
      :basicTableData:async="tableDataList"
      :basicTableOptions="options"
      @queryBasicTable="handleQueryTable"
      title="可编辑单元格"
      :border="true"
    >
    </BasicTable>
  </div>
</template>

<script>
import { listBudget } from "@/api/user";
import { BasicTable } from "@/components/Table/index";
export default {
  components: {
    BasicTable,
  },
  data() {
    return {
      options: {
        api: listBudget, // 调用接口地址
        apiFormat: "rows",
        apiParams: { projectManageId: this.parentId },
        paginationFormat: "total",
      },
      tableDataList: [],
      monthIndexs: [
        //月份索引
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ],
      // table 索引
      table1: [
        {
          label: "年份",
          value: "budgetYear",
          edit: false,
          "show-overflow-tooltip": true,
        },
        {
          label: "金额",
          value: "budgetMonth",
          edit: false,
          "show-overflow-tooltip": true,
        },
        {
          label: "月份",
          children: [],
        },
      ],
    };
  },
  created() {
    console.log(this.$route);
    this.table1 = [
      {
        label: "1",
        value: "january",
        edit: true,
        "show-overflow-tooltip": true,

        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "2",
        value: "february",
        edit: true,
        "show-overflow-tooltip": true,
        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "3",
        value: "march",
        edit: true,
        "show-overflow-tooltip": true,
        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "4",
        value: "april",
        edit: true,
        "show-overflow-tooltip": true,
        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "5",
        value: "may",
        edit: true,
        "show-overflow-tooltip": true,
        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "6",
        value: "june",
        edit: true,
        "show-overflow-tooltip": true,
        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "7",
        value: "july",
        edit: true,
        "show-overflow-tooltip": true,
        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "8",
        value: "august",
        edit: true,
        "show-overflow-tooltip": true,

        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "9",
        value: "september",
        edit: true,
        "show-overflow-tooltip": true,

        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "10",
        value: "october",
        edit: true,
        "show-overflow-tooltip": true,

        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },

      {
        label: "11",
        value: "november",
        edit: true,
        "show-overflow-tooltip": true,

        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
      {
        label: "12",
        value: "december",
        edit: true,
        "show-overflow-tooltip": true,

        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },

      {
        label: "总计",
        value: "amountTotal",
        edit: true,
        "show-overflow-tooltip": true,
        width: 200,
        formatter: (e, cloumns, scope) => {
          return this.computedMonthSum(e, cloumns, scope);
        },
      },
    ];
  },
  mounted() {
    console.log(this.tableDataList);
  },
  methods: {
    /**
     * 计算值
     */
    computedMonthSum(e, cloumns, scope) {
      let t = 0;
      if (scope.$index % 2 == 0) {
        return e;
      } else {
        let data = this.tableDataList[scope.$index - 1];
        if (this.monthIndexs.indexOf(scope.column.property) === 2) {
          for (
            let i = this.monthIndexs.indexOf(scope.column.property);
            i > this.monthIndexs.indexOf(scope.column.property) - 2;
            i--
          ) {
            console.log(data[this.monthIndexs[i]]);
            // console.log(data[this.monthIndexs[i]]);
            t += data[this.monthIndexs[i - 1]];
          }
          console.log(t);
          return t;
          // return data[this.monthIndexs[0]] + data[this.monthIndexs[1]];
        } else {
          return e;
        }
      }
    },
    handleQueryTable(val, table) {
      console.log(val);
      console.log(table);
      this.tableDataList = table.rows;
    },
    handleEditChange(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.app-container {
  height: 600px;
}
</style>
