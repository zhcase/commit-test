<template>
  <div class="app-container">
    <BasicTable
      :registerTable="table1"
      :basicTableOptions="options"
      :formSchema="schemas"
    >
      <template #form1>
        <el-form-item label="自定义">
          <el-input v-model="form1" />
        </el-form-item>
      </template>
      <!-- <template #form1>
        <el-form-item label="标题3">
          <el-input v-model="form1" />
        </el-form-item>
      </template>
      <template #toolbarLeft>
        <el-button size="mini" @click="handleEdit([tableData[1], tableData[2]])"
          >Edit</el-button
        >
      </template>
      <template #baseTable>
        <el-table-column align="center" label="操作" fixed="right">
          <template>
            <el-button type="text" icon="el-icon-edit">修改</el-button>
            <el-button type="text" icon="el-icon-delete">删除</el-button>
            <el-button type="text" icon="el-icon-plus">添加</el-button>
          </template>
        </el-table-column>
      </template> -->
      <!-- <template #action>
        <el-table-column align="center" label="操作" fixed="right">
          <template>
            <el-button type="text" icon="el-icon-edit">修改</el-button>
            <el-button type="text" icon="el-icon-delete">删除</el-button>
            <el-button type="text" icon="el-icon-plus">添加</el-button>
          </template>
        </el-table-column>
      </template> -->
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
      // list: null,
      form1: "",
      // listLoading: true,
      options: {
        api: getList, // 调用接口地址
        paginationProps: {},
        apiFormat: "data.items",
        paginationFormat: "data.total",
        // basicTableProps: {
        //   select: (e) => {
        //     console.log(e);
        //   },
        // },
      },
      // 头部表单配置生成
      schemas: [
        {
          field: "field",
          component: "Input",
          label: "字段1",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            placeholder: "自定义placeholder",
          },
        },
        // ],
        {
          slot: "form1",
          field: "field11",
        },
        {
          field: "field1",
          component: "Select",
          label: "字段1",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            placeholder: "自定义placeholder",
            options: [
              {
                value: "选项1",
                label: "黄金糕",
              },
              {
                value: "选项2",
                label: "双皮奶",
              },
            ],
          },
        },
        {
          field: "field2",
          component: "Input",
          label: "字段1",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            placeholder: "自定义placeholder",
          },
        },
        {
          field: "field3",
          component: "Input",
          label: "字段1",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            placeholder: "自定义placeholder",
            onChange: (e) => {
              console.log(e);
            },
          },
        },
      ],

      // table 索引
      table1: [
        {
          label: "id",
          value: "id",
          width: 200,
        },
        {
          label: "管理员账号",
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
          // options: [
          //   {
          //     label: false,
          //     value: 1,
          //   },
          //   { label: true, value: 0 },
          // ],
        },
        // {
        //   slot: "action",
        // },

        // {
        //   slot: "baseTable",
        //   attr: {
        //     fixed: "right",
        //   },
        // },
      ],
    };
  },
  methods: {
    // 重置自定义表单
    // resetForm() {
    //   this.form1 = "";
    // },
    // handleEdit(row) {
    //   console.log(this.$refs.table.$refs.multipleTable);
    //   console.log(this.$refs.table.$refs.multipleTable.setCurrentRow(row));
    // },
    // 改变表格switch
    // changeSwitch(val, cab) {
    //   console.log(val);
    //   cab(true);
    // },
    // 当分页改变的时候将会被触发
  },
};
</script>
