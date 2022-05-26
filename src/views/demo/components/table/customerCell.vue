<template>
  <div class="app-container">
    <BasicTable :registerTable="table1" :basicTableOptions="options">
      <template #action>
        <el-table-column align="center" label="操作" fixed="right">
          <template>
            <el-button type="text" icon="el-icon-edit">修改</el-button>
            <el-button type="text" icon="el-icon-delete">删除</el-button>
            <el-button type="text" icon="el-icon-plus">添加</el-button>
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { BasicTable } from "@/components/Table/index";
export default {
  components: {
    BasicTable,
  },
  data() {
    return {
      options: {
        api: getList, // 调用接口地址
        apiFormat: "data.items",
        paginationFormat: "data.total",
      },
      // table 索引
      table1: [
        {
          label: "id",
          value: "id",
          width: 200,
        },
        {
          label: "管理员账号1",
          value: "author",
          "show-overflow-tooltip": true,
          width: 200,
        },
        {
          label: "title",
          value: "title",
          "show-overflow-tooltip": true,
          width: 200,
        },

        {
          label: "用户状态",
          value: "status",
          options: [
            {
              label: "删除",
              value: "deleted",
            },
            { label: "发表", value: "published" },
          ],
        },
        {
          label: "操作",
          slot: "action",
          fixed: "right",
        },
      ],
    };
  },
};
</script>

<style scoped>
.app-container {
  height: 600px;
}
</style>