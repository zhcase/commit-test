<!--
 * @Author: zeHua
 * @Date: 2021-09-17 09:39:39
 * @LastEditors: zeHua
 * @LastEditTime: 2022-01-10 14:33:56
 * @FilePath: /ZNYW/vue/src/components/Tree/components/TreeSelect.vue
-->
<template>
  <div class="tree-select">
    <el-select
      v-model="treeValue"
      :multiple="multiple"
      :collapse-tags="collapseTags"
      :disabled="disabled"
      @clear="handleSelectClear"
      :clearable="true"
      ref='treeSelect'
      default-expand-all
      :style="{ width: width }"
      @remove-tag="selectRemoveTag"
      :placeholder="placeholder"
      :popper-append-to-body="true"
    >
      <div class="tree-select__search" v-if="filterable">
        <el-input
          v-model="filterText"
          placeholder="请输入关键字进行过滤"
          clearable
          size="small"
        ></el-input>
      </div>

      <el-option v-model="treeDataValue" class="tree-select__options">
        <div v-show="data[0]">
          <el-tree
            v-on="$listeners"
            v-bind="$attrs"
            :lazy="lazy"
            :node-key="nodeKey"
            :filter-node-method="filterNode"
            :data="treeData"
            :default-checked-keys="defaultCheckedKeys"
            :props="props"
            @node-click="handleNodeClick"
            :show-checkbox="multiple"
            ref="tree"
            @check="getHalfCheckedNodes"
          >
          </el-tree>
        </div>
      </el-option>

      <el-option
        v-for="(item, index) of treeOptionsArray"
        :key="index"
        v-show="false"
        :value="item[props.value]"
        :label="item[props.label]"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { handleTree } from "../utils.js";
export default {
  name: "basicTree",
  data() {
    return {
      method: null,
      filterText: "",
      treeValue: [], // tree选中的value 值
      treeData: [], //构建 tree的数组
      treeDataValue: "", // 暂时未用
      treeOptionsArray: [], // 生成虚拟options 对应select 做展示]
      ids: [], //懒加载选择的id
    };
  },
  props: {
    // 是否有清空按钮
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 输入框展示形式 展示true 为整体+x  false 单个
    collapseTags: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    //是否显示过滤
    filterable: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    nodeKey: {
      type: String,
    },

    filterSelectKey: {
      //只选中所需要的
      type: String,
    },
    placeholder: {
      type: String,
      default: () => {
        return "请选择";
      },
    },
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    props: {
      type: Object,
    },
    refs: {
      required: false,
      type: String,
    },
    data: {
      // 构建 Tree 数据
      type: Array,
      default: () => {
        return [];
      },
    },
    multiple: {
      //是否开启多选
      type: Boolean,
      default: () => {
        return false;
      },
    },
    defaultCheckedKeys: {
      //默认选中的值
      type: Array,
    },
    format: {
      type: Array,
    },
    lazy: {
      //是否是懒加载
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  watch: {
    treeValue: {
      handler(val) {
        this.getPropsTreeKeys();
      },
    },
    filterText(val) {
      console.log(val);
      console.log(this.$refs.tree);
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.method = this.$refs.tree;
    this.handleFormat();
    // setTimeout(() => {

    // }, 500);
  },
  methods: {
    // 搜索内容
    filterNode(value, data) {
      console.log(data);
      if (!value) return true;
      return data[this.props.label].indexOf(value) !== -1;
    },
    // 清空TreeValue的值
    clearTreeValue() {
      this.treeValue = [];
      this.handleSelectClear();
    },
    /**
     * 判断是否select清空 清空时 同时清空Tree的value
     */
    handleSelectClear() {
      this.$emit("clearTreeValue");
      if (!this.treeValue) {
        this.$refs.tree.setCheckedKeys([]);
        // if(this.multiple){

        // }else{
        //    this.$refs.tree.setCheckedKeys("")
        // }
        return;
      }
      console.log(this.treeValue);
      this.$refs.tree.setCheckedKeys(this.treeValue);
    },
    /**
     * 判断是否要格式化Tree
     */
    handleFormat() {
      //如果是懒加载
      if (this.lazy && this.defaultCheckedKeys && this.defaultCheckedKeys[0]) {
        let deepArray = JSON.parse(JSON.stringify(this.defaultCheckedKeys));
        for (let item of this.data) {
          if (this.defaultCheckedKeys.indexOf(item[this.props.value]) > -1) {
            this.treeOptionsArray.push(item);
          }
        }
        if (!this.multiple) {
          this.treeValue = Number(this.defaultCheckedKeys.join(","));
        } else {
          this.treeValue = this.defaultCheckedKeys;
        }
      }

      if (this.format) {
        if (this.lazy) {
          this.treeData = this.handleTree(this.data, ...this.format);
        } else {
          this.treeData = handleTree(this.data, ...this.format);
        }
      } else {
        this.treeData = this.data;
      }

      // 模拟树形结构  初始化默认选中 选中对象
      this.$nextTick(() => {
        this.$emit("renderOver"); //组件渲染完毕暴露渲染完毕的方法
        setTimeout(() => {
          // console.log(this.treeData);
        }, 3000);
        let TreeCheckoutObj = {
          checkedKeys: this.$refs.tree.getCheckedKeys(),
          checkedNodes: this.$refs.tree.getCheckedNodes(),
        };
        //判断是否多选 多选走多选的逻辑
        if (this.multiple) {
          this.getHalfCheckedNodes("", TreeCheckoutObj);
        } else {
          for (let i = 0; i < TreeCheckoutObj.checkedNodes.length; i++) {
            // if (
            //   TreeCheckoutObj.checkedNodes[i][this.props.value] ===
            //   TreeCheckoutObj.checkedKeys[0]
            // ) {
            //   this.handleNodeClick(TreeCheckoutObj.checkedNodes[i]);
            // }
            if (
              TreeCheckoutObj.checkedNodes[i][this.props.value] ===
              this.defaultCheckedKeys[0]
            ) {
              this.handleNodeClick(TreeCheckoutObj.checkedNodes[i]);
            }
          }
        }
      });
    },
    /**
     * 多选的时候移除的时候同步treeselect
     * @param val 移除的id
     */
    selectRemoveTag(val) {
      // console.log(this.treeValue);
      this.$refs.tree.setCheckedKeys(this.treeValue);
      this.$emit("remove-tag", val);
    },
    /**
     * checkbox 勾选值
     * @param val 当前勾选的值
     * @param  data 当前选中的Key 与选中的节点 吧
     */
    getHalfCheckedNodes(val, data) {
      if (!this.lazy) {
        this.treeOptionsArray = [];
      }
      //判断是否多选 赋值v-model类型
      if (this.multiple) {
        if (!this.lazy) {
          this.treeValue = [];
        }
      } else {
        this.treeValue = "";
      }

      this.ids = [];
      let checkedNodes = data.checkedNodes.filter((item) => {
        if (item[this.props.value]) {
          this.ids.push(item[this.nodeKey]);

          this.ids = [...new Set(this.ids)];
          return item;
        }
      });
      if (!this.lazy) {
        this.treeOptionsArray = data.checkedNodes;
      }

      this.$nextTick(() => {
        if (this.multiple) {
          // 是否是懒加载
          if (this.lazy) {
            // console.log(this.ids);
            // if (!this.multiple) {
            // console.log(this.ids);
            // this.treeValue = this.ids;
            // }
          } else {
            this.treeValue = data.checkedKeys;
          }
        } else {
          this.treeValue = data.checkedKeys.join();
        }
        // 判断是否是初始化的
        if (val) {
          this.$emit("handleCheckDom");
        } else {
          this.$emit("handleCheckDom", "default");
        }
      });
    },
    /**
     * 当不是多选的时候 点击的时候赋值
     * @param 当选的值
     */
    handleNodeClick(data) {
      // 判断过滤 只能选中的值
      if (this.filterSelectKey) {
        if (this.filterSelectKey[0] === "!") {
          if (
            data[this.filterSelectKey.substring(1, this.filterSelectKey.length)]
          ) {
            return;
          }
        } else {
          if (!data[this.filterSelectKey]) {
            return;
          }
        }
      }
      if (!this.multiple) {
        this.treeOptionsArray = [];
        this.treeOptionsArray.push(data);
        this.treeValue = data[this.props.value];
        this.$refs.treeSelect.blur();
      }
    },
    /**
     * 传出Tree的值
     *
     */
    getPropsTreeKeys() {
      this.$emit("getTreeValue", this.treeValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-select {
  &__search {
    width: 98%;
    margin: 0 auto;
  }
  &__options {
    height: auto;
    background-color: #fff;
  }
  &__options:hover {
    background-color: #fff;
  }
}
</style>
