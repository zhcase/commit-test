<template>
  <div class="app-container">
    <template slot="arr"> </template>
    <BasicForm :schema="schema" :inline="true" size="medium">
      <template slot="movie">
        <el-form-item label="活动名称">
          <el-input v-model="value3" placeholder=""></el-input>
        </el-form-item>
      </template>
    </BasicForm>
  </div>
</template>

<script>
import BasicForm from "@/components/Form/components/BasicForm.vue";
import { getList } from "@/api/table";

export default {
  components: {
    BasicForm,
  },
  data() {
    return {
      value3: "",
      schema: [
        {
          field: "name",
          component: "Input",
          label: "活动名称",
          defaultValue: "12232",
          placeholder: "请填写活动名称",
          rules: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          ],
          colProps: {
            span: 8,
          },
        },
        {
          field: "field2",
          component: "Select",
          label: "活动区域",
          placeholder: "请选择活动区域",
          colProps: {
            span: 8,
          },
          componentProps: {
            options: [
              {
                label: "区域一",
                value: "1",
              },
              {
                label: "区域二",
                value: "2",
              },
            ],
          },
        },

        {
          field: "field3",
          component: "DatePicker",
          label: "活动时间",
          width: "100%",
          colProps: {
            span: 8,
          },
          componentProps: {
            placeholder: "请填写活动名称",
          },
        },
        {
          field: "field22",
          slot: "movie",
          label: "活动区域",
        },
        {
          field: "field3",
          component: "Switch",
          label: "即时配送",
          colProps: {
            span: 8,
          },
          componentProps: {
            placeholder: "请填写活动名称",
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          field: "field4",
          component: "Checkbox",
          label: "活动时间",
          disabled: false,
          border: true,
          defaultValue: ["1"],
          max: 2,
          colProps: {
            span: 8,
          },
          componentProps: {
            placeholder: "请填写活动名称",
            options: [
              {
                label: "美食/餐厅线上活动",
                value: "1",
              },
              {
                label: "地推活动",
                value: "2",
              },
              {
                label: "线下主题活动",
                value: "3",
              },
              {
                label: "单纯品牌曝光",
                value: "4",
              },
            ],
          },
        },
        {
          field: "field3",
          component: "Radio",
          label: "特殊资源",
          colProps: {
            span: 8,
          },
          componentProps: {
            options: [
              {
                label: "线上品牌商赞助",
                value: "1",
              },
              {
                label: "线下场地免费",
                value: "2",
              },
            ],
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          field: "field10",
          component: "Input",
          label: "活动形式",
          type: "textarea",
          rows: 5,
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
          field: "field11",
          component: "InputNumber",
          label: "活动形式",
          defaultValue: 1,
          rows: 5,
          colProps: {
            span: 8,
          },
          componentProps: {
            onChange: (e) => {
              console.log(e);
            },
          },
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

