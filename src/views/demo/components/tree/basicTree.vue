<!--
 * @Author: zeHua
 * @Date: 2021-09-17 09:32:35
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-26 21:59:54
 * @FilePath: /yd-admin/src/views/demo/components/tree/basicTree.vue
-->
<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>默认展开</span>
        </div>
        <div class="text item">
          <basic-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="[2, 3]"
          ></basic-tree>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可勾选默认展开</span>
        </div>
        <div class="text item">
          <basic-tree
            :data="data"
            :default-checked-keys="[5]"
            default-expand-all
            ref="tree"
            show-checkbox
            :props="defaultProps"
            @check-change="handleCheckChange"
            node-key="id"
          ></basic-tree>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>懒加载</span>
        </div>
        <div class="text item">
          <!-- <basic-tree
            :props="prop"
            :load="loadNode"
            lazy
            show-checkbox
          ></basic-tree> -->
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可勾选默认展开1</span>
        </div>
        <div class="text item">
          <tree-select
            :data="data"
            width="100%"
            :props="defaultProps"
            ref="treeSelect"
            @check="handleCheck"
            :multiple="true"
            :default-checked-keys="[10, 8]"
            node-key="id"
          ></tree-select>
          <el-button type="primary" @click="handleClickClear"></el-button>
          <!-- <tree-select
            :data="TreeSelectData"
            show-checkbox
            @getTreeValue="getTreeValue"
            @node-expand="handleExpand"
            :props="defaultProps"
            ref="tree"
            :multiple="true"
            lazy
            :load="loadNode"
            node-key="orgId"
            :format="['orgId', 'superiorId']"
          ></tree-select> -->
        </div>
      </el-card>
    </el-col>
    <el-col :span="6" style="margin-top: 20px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可搜索Tree</span>
        </div>

        <div class="text item">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
          <basic-tree
            :data="TreeSelectData"
            :props="defaultProps"
            node-key="id"
            :filter-node-method="filterNode"
            ref="tree"
            :default-expanded-keys="[2, 3]"
          ></basic-tree>
        </div>
      </el-card>
    </el-col>
    <!-- <el-button type="primary" @click="handleClick">tree</el-button> -->
  </el-row>
</template>

<script>
import { BasicTree, TreeSelect } from "@/components/Tree/index.js";
import { getTreeList, getUserTree } from "@/api/user.js";
export default {
  name: "baseTree",
  components: {
    BasicTree,
    TreeSelect,
  },
  data() {
    return {
      method: null,
      node: [],
      filterText: "",
      resolve: null,
      isShow: false,
      fetchData: [],
      prop: {
        label: "label",
        children: "children",
      },
      TreeSelectData: [],
      defaultProps: {
        value: "id",
        label: "label",
        children: "children",
      },
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
    };
  },
  watch: {
    filterText(val) {
      console.log(this.$refs.tree.method);
      console.log(val);
      this.$refs.tree.method.filter(val);
    },
  },

  methods: {
    handleCheck(val, valArray) {
      console.log(val);
      console.log(valArray);
    },
    handleClickClear() {
      this.$refs.treeSelect.clearTreeValue();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleExpand(val) {
      console.log(val);
      if (val.children && val.children.length === 0) {
      }
      // console.log(this.node);
    },
    getTreeValue(val) {
      console.log(val);
    },
    handleClick() {
      console.log(this.$refs.tree.method.getCheckedNodes());
    },
    loadNode(node, resolve, data) {
      this.resolve = resolve;

      if (node.level > 0 && node.level < 4) {
        //默认展开的层级,需要默认几层就判断一下.
        return resolve(node.data.children); //核心是这里,每次展开的时候loadNode方法就会调用一次,只需要把node.data.[这里是默认的child字段]  加载到resolve方法里就可以了.就可以实现默认加载N级,之后再使用懒加载
      } else {
        if (
          node.data &&
          node.data.children &&
          node.data.children.length === 0
        ) {
          getUserTree(node.data.orgId).then((res) => {
            resolve(res.data);
          });
        } else {
          if (
            node.data &&
            node.data.children &&
            node.data.children.length > 0
          ) {
            console.log("hello world");

            return resolve(node.data.children);
          }
        }
      }

      // if (node.level > 1) return resolve([]);
      // setTimeout(() => {
      //   if (node.data.children) {
      //     node.data.children.isLeaf = false;
      //     resolve(node.data.children);
      //   } else {
      //     console.log(node.data.children);
      //     resolve([]);
      //   }
      // }, 500);
    },
  },
  created() {
    // getTreeList().then((res) => {
    //   this.TreeSelectData = res.data;
    // });
  },
  mounted() {
    // this.TreeSelectData=
    this.$nextTick(() => {
      this.isShow = true;
    });
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  .item {
    height: 400px;
  }
}
</style>
