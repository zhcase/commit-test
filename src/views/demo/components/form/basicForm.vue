<template>
  <div class="basic-form">
    <div class="title">
      <h1>基础表单</h1>
    </div>
    <el-card class="box-card" shadow="never">
      <BasicForm
        :schema="basicForm"
        @handleSubmit="handleSubmit"
        :span="8"
        ref="form"
        :formModel.sync="formModel"
        :schemaAttr.sync="schemaAttr"
      >
        <template #tree>
          <el-form-item>
            <tree-select style="width:250px"> </tree-select>
          </el-form-item>
        </template>
        <!-- <template #footer>
          <el-button type="primary" @click="handleSubmitClick">提交</el-button>
        </template> -->
      </BasicForm>
    </el-card>

    <el-button type="primary" @click="handleClick">重置属性</el-button>
  </div>
</template>

<script>
import BasicForm from "@/components/Form/components/BasicForm.vue";
import { getList } from "@/api/table";
import { TreeSelect } from "@/components/Tree/index.js";

export default {
  components: {
    BasicForm,
    TreeSelect,
  },
  data() {
    return {
      formModel: {
        field6: 2,
        field1: 22,
      },
      schemaAttr: [],
      activeNames: "1",
      formsss: {},
      num: "",
      basicForm: [
        {
          field: "field1",
          colProps: {
            // span: 12,
            // formSpan: 18,
          },

          label: "字段1",
          // style: {
          //   width: "100px",
          // },
          componentProps: {
            onChange: (e) => {
              console.log(e);
              // console.log(1232);
              // if (e) {
              //   this.basicForm[4].componentProps.options = [
              //     { pageviews: 1, id: 2 },
              //   ];
              // }
            },
          },
          component: "Input",
          placeholder: "字段1",
        },
        {
          field: "field22",
          component: "Text",
          content: "2323",
          componentProps: {
            fontSize: "24px",
          },
        },

        {
          field: "field2",
          label: "带后缀",
          inputRulesType: "number",
          component: "Input",
          placeholder: "字段2",
          suffix: "天",
        },

        {
          field: "field3",
          label: "字段3",
          isHidden: true,
          component: "DatePicker",
          style: {
            width: "200px",
          },
          placeholder: "请选择",

          type: "date",
        },
        {
          field: "field4",
          label: "字段4",
          component: "Select",
          placeholder: "请选择",
          clearable: true,

          defaultValue: 4,
          componentProps: {
            // api: getList(1),
            // apiFormat: 'data.items',
            optionsFormat: { label: "id", value: "pageviews" },
            options: [{ pageviews: 4, id: 4 }],
            // options: [
            //   {
            //     label: "hello",
            //     value: 1,
            //   },
            //   {
            //     label: "hello2",
            //     value: 2,
            //   },
            // ],
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          field: "field5",
          label: "字段5",
          component: "Checkbox",
          componentProps: {
            options: [
              {
                label: "选项1",
                value: 1,
              },
              {
                label: "选项2",
                value: 2,
              },
            ],
          },
        },
        {
          field: "field6",
          label: "字段6",
          component: "Radio",
          componentProps: {
            onChange: (e) => {
              if (e === 1) {
                this.$nextTick(() => {
                  this.$set(this.formModel, "field22", "hellowolrd");
                });
              }
            },
            options: [
              {
                label: "选项1",
                value: 1,
              },
              {
                label: "选项2",
                value: 2,
              },
            ],
          },
        },
        {
          field: "field7",
          label: "字段7",
          component: "Switch",
        },
        {
          field: "field8",
          label: "字段8",
          component: "RadioButton",
          componentProps: {
            options: [
              {
                label: "选项1",
                value: 1,
              },
              {
                label: "选项2",
                value: 2,
              },
            ],
          },
        },
        {
          field: "field9",
          label: "字段7",
          // marks: {
          //   0: "0°C",
          //   8: "8°C",
          //   37: "37°C",
          //   50: {
          //     style: {
          //       color: "#1989FA",
          //     },
          //     label: this.$createElement("strong", "50%"),
          //   },
          // },
          component: "Slider",
        },
        {
          field: "field10",
          label: "字段7",
          component: "Rate",
        },
        {
          field: "field11",
          label: "字段11",
          component: "TreeSelect",
        },
        {
          slot: "tree",
        },
      ],
    };
  },
  created() {
    setTimeout(() => {
      console.log(this.schemaAttr);
      // this.schemaAttr["field3"].isHidden = true;
      this.$set(this.basicForm[3], "isHidden", false);
    }, 3000);
    this.$nextTick(() => {
      this.$refs.form.handleSubmit();
      // this.formModel.field1 = 'hello1232';
      // this.formModel.field22 = 'hello';
    });
  },
  mounted() {},
  methods: {
    handleSubmitClick() {
      console.log();
    },
    handleClick(e) {
      this.$refs.form.handleInitSchema();
      this.basicForm = this.schemaAttr;
      console.log(this.formModel);
    },
    handleSubmit(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.file1 {
  border: 1px solid red;
}
.basic-form {
  overflow: hidden;
  .title {
    background-color: #fff;
    padding: 20px;
  }
  .box-card {
    margin-top: 20px;
  }
}
</style>
