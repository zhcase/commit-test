<template>
  <div class="basic-form">
    <div class="title">
      <h1>可验证表单</h1>
    </div>
    <el-card class="box-card" shadow="never">
      <BasicForm
        :schema="basicForm"
        :span="8"
        :formModel.sync="formModel"
        ref="form"
      >
        <template #form1>
          <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input v-model="formModel.email"></el-input>
          </el-form-item>
        </template>
      </BasicForm>
    </el-card>
    <el-button type="primary" @click="handleSubmit">12323</el-button>
  </div>
</template>

<script>
import BasicForm from "@/components/Form/components/BasicForm.vue";
export default {
  components: {
    BasicForm,
  },
  data() {
    return {
      formModel: {},
      email: "",
      activeNames: "1",
      basicForm: [
        {
          field: "field1",
          label: "字段1",
          component: "Input",
          placeholder: "字段1",
          rules: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          ],
        },
        {
          slot: "form1",
        },
        {
          field: "field2",
          label: "带后缀",
          component: "Input",
          placeholder: "字段2",
          suffix: "天",
          componentProps: {
            onChange: (e) => {
              // console.log(e);
              // return "hello";
              if (e) {
                let t = e.replace(/^1[3456789]\d{9}$/, "");
                return t;
              }
              // return e.replace(/[^\d]/g, "");
              // if (Number(e) > 3) {
              //   return e;
              // } else {
              //   // return "hello world";
              // }
              // console.log(e);
            },
          },
        },
        {
          field: "field2",
          label: "字段3",
          component: "DatePicker",
          placeholder: "请选择",
        },
        {
          field: "field4",
          label: "字段4",
          component: "Select",
          placeholder: "请选择",
          clearable: true,
          componentProps: {
            options: [
              {
                label: "hello",
                value: 1,
              },
              {
                label: "hello2",
                value: 2,
              },
            ],
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

          component: "Slider",
        },
        {
          field: "field10",
          label: "字段7",
          component: "Rate",
        },
      ],
    };
  },
  methods: {
    handleSubmit(val) {
      let result = this.$refs.form.handleSubmit();
      console.log(result);
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-form {
  .title {
    background-color: #fff;
    padding: 20px;
  }
  .box-card {
    margin-top: 20px;
  }
}
</style>
