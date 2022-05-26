<template>
  <div class="app-container">
    <BasicTable
      :registerTable="table1"
      :basicTableOptions="options"
      @selection-change="handleSelect"
      :formSchema="schemas"
      ref="table"
      @changeSwitch="changeSwitch"
    >
      <!-- <template #selection>
        <el-table-column type="selection" width="55"> </el-table-column>
      </template> -->
      <template #form1>
        <el-form-item label="自定义">
          <tree-select
            :data="data"
            width="100%"
            :props="defaultProps"
            :multiple="true"
            ref="treeSelect"
            :default-checked-keys="[5]"
            node-key="id"
          ></tree-select>
        </el-form-item>
      </template>
      <template #toolbarLeft>
        <el-button size="mini" @click="handleEdit()">添加</el-button>
        <!-- <el-button size="mini" @click="handleEdit([tableData[1], tableData[2]])"
          >删除</el-button
        > -->
      </template>
      <!-- <template #form1>
        <el-form-item label="标题3">
          <el-input v-model="form1" />
        </el-form-item>
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
import { BasicTree, TreeSelect } from "@/components/Tree/index.js";

export default {
  components: {
    BasicTable,
    TreeSelect,
  },
  data() {
    return {
      // list: null,
      form1: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
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
          placeholder: "自定义placeholder",
          colProps: {
            span: 8,
          },
          componentProps: {},
        },
        // ],
        {
          slot: "form1",
        },
        {
          field: "field1",
          component: "Select",
          label: "字段2",
          placeholder: "自定义placeholder",
          colProps: {
            span: 8,
          },
          componentProps: {
            // api: getList,
            apiFormat: "data.items",
            optionsFormat: {
              label: "id",
              value: "pageviews",
            },
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

          placeholder: "自定义placeholder",

          colProps: {
            span: 8,
          },
          componentProps: {},
        },
        {
          field: "field13",
          component: "TimePicker",
          label: "字段1",
          "picker-options": {
            selectableRange: "18:30:00 - 20:30:00",
          },
          defaultValue: new Date(2016, 9, 10, 18, 40),
          placeholder: "123",
          colProps: {
            span: 8,
          },
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          field: "field3",
          component: "Input",
          label: "字段1",
          placeholder: "自定义placeholder",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
      ],

      // table 索引
      table1: [
        {
          type: "selection",
          width: 50,
        },
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
        {
          type: "radio",
          label: "是否",
          options: [
            {
              label: "删除",
              value: "deleted",
            },
            { label: "发表", value: "published" },
          ],
        },

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
    handleSelect(val) {
      console.log(val);
    },
    //   switch
    changeSwitch(val, cb) {
      console.log(val);
      cb(true);
    },
    // 重置自定义表单
    // resetForm() {
    //   this.form1 = "";
    // },
    handleEdit(row) {
      console.log(this.$refs.table);
      console.log(this.$refs.table.toggleRowSelection([1, 2]));
      // console.log(this.$refs.table.$refs.multipleTable.setCurrentRow(row));
    },
    // 改变表格switch
    // changeSwitch(val, cab) {
    //   console.log(val);
    //   cab(true);
    // },
    // 当分页改变的时候将会被触发
  },
};
</script>

<style scoped>
.app-container {
  height: 600px;
}
</style>
