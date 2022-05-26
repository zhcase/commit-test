<!--
 * @Author: zeHua
 * @Date: 2021-09-09 09:07:00
 * @LastEditors: zeHua
 * @LastEditTime: 2021-12-23 14:09:37
 * @FilePath: /ZNYW/vue/src/components/Form/components/BasicForm.vue
-->
<template>
  <div class="antd-form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :class="['rope-form', formClass]"
      :size="size"
      :label-width="labelWidth + 'px !important'"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <template v-for="(item, index) in schema">
        <!-- 判断是否 设置了表单单独的列 如果有的话 先使用单独的 否者使用统一的 -->
        <el-col
          :span="
            item.colProps && item.colProps.span ? item.colProps.span : span
          "
          :xs="24"
          :key="index"
          v-if="!item.isHidden"
          v-show="!item.isVisible"
        >
          <slot :name="item.slot" v-if="item.slot" :field="item.field"> </slot>
          <el-col
            :span="
              item.colProps && item.colProps.formSpan
                ? item.colProps.formSpan
                : 24
            "
            :xs="24"
          >
            <el-form-item
              :label="item.label"
              class="wintao-form-item"
              :prop="item.field"
              :style="item.colProps && item.colProps.style"
              v-if="!item.slot"
              :rules="
                item.isVisible
                  ? item.isVisible
                    ? undefined
                    : item.rules
                  : item.rules
              "
            >
              <div
                :style="{ display: item.suffix ? 'flex' : '' }"
                class="wintao-form-item__content-child"
              >
                <FormMap
                  :schema="item"
                  @keyup.enter.native="handleKeyEnter"
                  :style="{
                    width:
                      item.style && item.style.width
                        ? item.style.width
                        : '100%',
                  }"
                  ref="formData"
                  :value.sync="form[item.field]"
                />
                <span class="suffix" v-if="item.suffix">{{ item.suffix }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-col>
      </template>
    </el-form>
    <slot name="footer">
      <div class="antd-form__footer">
        <el-button icon="el-icon-refresh" size="mini" @click="reset('form')"
          >重置</el-button
        >
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleSubmit()"
          >搜索</el-button
        >
        <!-- <el-button @click="reset('form')" size="small">重 置</el-button>
        <el-button type="primary" @click="handleSubmit()" size="small"
          >查 询</el-button
        > -->
        <el-button
          type="text"
          @click="changeFormVisible"
          v-if="$refs.form && $refs.form.$children.length > 3"
          >{{ formVisible ? "展开" : "收起" }}
          <i
            :class="{
              'el-icon-arrow-down': formVisible,
              'el-icon-arrow-up': !formVisible,
            }"
          ></i
        ></el-button>
      </div>
    </slot>
  </div>
</template>
<script>
import FormMap from "./FormMap.vue";
import { formDataFormOptions } from "./formUtils.js";
export default {
  components: {
    FormMap,
  },

  data() {
    return {
      // form表单
      form: {},
      // 规则
      rules: {},
      //初始化数据备份
      initSchema: "",
      // 表单是否显示
      formVisible: false,
      //form参数
      params: {},
      methods: {},
      // 暴露出去的方法
    };
  },
  props: {
    schemaAttr: {
      type: Array | Object,
      default: () => {
        return {};
      },
    },
    span: {
      // form的宽度 最宽为24（100%）
      default: 8,
      type: Number,
    },
    formModel: {
      // 对应的form表单
      type: Object,
      default: () => {
        return {};
      },
    },
    size: {
      // 大小
      default: "small",
      type: String,
    },
    // 是否是以行的形式展示
    inline: {
      default: false,
      type: Boolean,
    },
    schema: {
      // 数据源
      default: () => {
        return [];
      },
      type: Array,
    },
    labelWidth: {
      // label 宽度
      type: Number,
      default: () => {
        return 150;
      },
    },
    formClass: {
      // form样式
      type: String,
      default: () => {
        return "";
      },
    }
  },

  // 监听form Model
  watch: {
    form: {
      handler(val) {
        this.$emit("update:formModel", val);
      },
      deep: true,
    },
    formModel: {
      handler(val, oldVal) {
        this.$nextTick(() => {
          this.$set(this, "form", val);
          // this.$emit('update:formModel', val);
        });
      },
      immediate: true,
      deep: true,
    },
    // 监听暴露出去的方法与修改
    schemaAttr: {
      handler(val, oldVal) {
        this.$emit("update:schemaAttr", val);
      },
      deep: true,
    },
  },
  methods: {
    /**
     * 添加搜索
     */
    handleKeyEnter() {
      // alert('搜索')
      this.$emit("handleKeyEnter");
    },
    /** */
    handleInitSchema() {
      console.log(this.schemaAttr);
      this.$emit("update:schemaAttr", JSON.parse(this.initSchema));
    },
    /** 重置 */
    reset() {
      this.form = {};
      this.refactoringSchema();
      this.refactorSchemaAttr();
      this.$emit("resetForm", this.form);
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
    /** 提交 */
    handleSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("handleSubmit", this.form);
        }
      });
    },
    /**
     * @description 获取数据
     */
    getFormData() {
      this.params = {};
      for (let i = 0; i < this.$refs.formData.length; i++) {
        this.params = { ...this.params, ...this.$refs.formData[i].form };
      }
      let slotArray = Object.keys(this.$slots);
      //循环所有slot key
      for (let i = 0; i < slotArray.length; i++) {
        if (this.$slots[slotArray[i]]) {
          for (let t = 0; t < this.$slots[slotArray[i]].length; t++) {
            if (this.$slots[slotArray[i]][t].componentOptions) {
              // 循环判断是否用children 还是外层的 如果有children 说明目前是table 外层套了children  看后期有时间做次修改!!!
              if (this.$slots[slotArray[i]][t].componentOptions.children) {
                if (
                  this.$slots[slotArray[i]][t].componentOptions.children[0] &&
                  this.$slots[slotArray[i]][t].componentOptions.children[0]
                    .data &&
                  this.$slots[slotArray[i]][t].componentOptions.children[0].data
                    .model
                ) {
                  this.params[
                    this.$slots[slotArray[i]][
                      t
                    ].componentOptions.children[0].data.model.expression
                  ] =
                    this.$slots[slotArray[i]][
                      t
                    ].componentOptions.children[0].data.model.value;
                }
              }
            } else {
              if (
                this.$slots[slotArray[i]][t].data &&
                this.$slots[slotArray[i]][t].data.model
              ) {
                this.params[
                  this.$slots[slotArray[i]][t].data.model.expression
                ] = this.$slots[slotArray[i]][t].data.model.value;
              }
            }
          }
        }
      }
      Object.keys(this.params).forEach((key) => {
        // 这里 obj[key] 便是对象的每一个的值
        if (!this.params[key]) {
          this.params[key] = "";
        }
      });
    },
    // 设置form表单的value
    formValue() {
      for (let i = 0; i < this.schema.length; i++) {
        this.$set(this.form, this.schema[i].field, this.schema[i].defaultValue);
      }
    },

    /**
     * @description 隐藏Form与显示Form 按钮
     */
    changeFormVisible() {
      this.formVisible = !this.formVisible;
      if (this.$refs.form) {
        if (this.formVisible) {
          for (let i = 3; i < this.$refs.form.$children.length; i++) {
            this.$refs.form.$children[i].$el.style = "display:none";
          }
        } else {
          for (let i = 3; i < this.$refs.form.$children.length; i++) {
            this.$refs.form.$children[i].$el.style = "display:block";
          }
        }
      }
    },
    /**
     * @description 格式化options 参数
     * @param value 参数
     */
    formateOptionsData(value) {
      //  如果 需要格式化参数
      // value.options = formDataFormOptions(value.options, value.optionsFormat);
      return value;
    },
    /**
     * @description 重构 如果有api 数据
     *
     */
    isApiData() {
      for (let i = 0; i < this.schema.length; i++) {
        if (
          this.schema[i].componentProps &&
          this.schema[i].componentProps.api
        ) {
          this.schema[i].componentProps.api.then((res) => {
            let apiformdata =
              this.schema[i].componentProps.apiFormat.split(".");
            for (let t = 0; t < apiformdata.length; t++) {
              res = res[apiformdata[t]];
            }
            this.schema[i].componentProps.options = res;
            if (this.schema[i].componentProps.optionsFormat) {
              this.schema[i].componentProps = this.formateOptionsData(
                this.schema[i].componentProps
              );
            }
          });
        }
        if (
          this.schema[i].componentProps &&
          this.schema[i].componentProps.optionsFormat
        ) {
          this.schema[i].componentProps = this.formateOptionsData(
            this.schema[i].componentProps
          );
        }
      }
    },
    /**
     * 自定义校正
     * @param val 自定义效验的name传入  数组或者字符串
     */

    validateField(val) {
      if (val instanceof Array) {
        for (let item of val) {
          this.$refs["form"].validateField(item);
        }
      } else {
        this.$refs["form"].validateField(val);
      }
    },

    test() {
      console.log("----test-----");
      this.$refs["form"].clearValidate();
    },
    clearValidate() {
      console.log("----test-----");
      this.$refs["form"].clearValidate();
    },

    /**
     *  重新构造schema数组 重置初始值 判断是否有默认值 如果有默认值将先赋值默认值
     *  @param refactorObject 重构的对象
     */
    refactoringSchema(refactorObject) {
      for (let i = 0; i < this.schema.length; i++) {
        if (this.schema[i].defaultValue) {
          this.$nextTick(() => {
            this.$set(
              this.form,
              this.schema[i].field,
              this.schema[i].defaultValue
            );
          });
        }
      }
    },
    // 重构方法暴露出去给予修改schema属性与方法
    refactorSchemaAttr() {
      this.initSchema = JSON.stringify(this.schema);
      for (let i = 0; i < this.schema.length; i++) {
        if (!this.schema[i].isHidden) {
          this.schema[i].isHidden = false;
          this.$set(this.schema[i], "isHidden", false);
        }
        if (this.schema[i].field) {
          this.schemaAttr[this.schema[i].field] = this.schema[i];
        }
        // this.initSchema[i] = {};
        // this.initSchema[i]["isHidden"] = this.schema[i].isHidden;
      }
    },
  },
  created() {
    this.refactorSchemaAttr();
    // 构造schema数组
    this.refactoringSchema(this.formModel);
    this.isApiData();
  },
  mounted() {
    this.formValue();
    this.methods = this.$refs.form;
  },
};
</script>
<style lang="scss" scoped>
.rope-form {
  overflow: hidden;
}
.el-col {
  padding-bottom: 0px;
}
.wintao-form-item__content-child {
  width: 100%;
}
.antd-form {
  overflow: hidden;
  .wintao-form-item {
    /deep/ .el-form-item__content {
      display: flex;
      align-items: center;
      min-height: 32px;
    }
  }
  .el-col {
    // height: 58px;
  }
  form {
    ::v-deep .el-form-item {
      /* display: flex; */
      /* overflow: hidden; */
      /* line-height: 30px; */
    }
    .suffix {
      padding: 0 5px;
    }
  }
  &__footer {
    /* height: 60px; */
    width: 100%;
    text-align: right;
  }
}
/* button color */
.el-button--cyan.is-active,
.el-button--cyan:active {
  background: #20b2aa;
  border-color: #20b2aa;
  color: #ffffff;
}

.el-button--cyan:focus,
.el-button--cyan:hover {
  background: #48d1cc;
  border-color: #48d1cc;
  color: #ffffff;
}

.el-button--cyan {
  background-color: #20b2aa;
  border-color: #20b2aa;
  color: #ffffff;
}

/* text color */
.text-navy {
  color: #1ab394;
}
</style>
