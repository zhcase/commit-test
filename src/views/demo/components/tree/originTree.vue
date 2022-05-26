<!--
 * @Author: zeHua
 * @Date: 2021-12-17 00:02:32
 * @LastEditors: zeHua
 * @LastEditTime: 2021-12-17 00:02:32
 * @FilePath: /yd-admin/src/views/demo/components/tree/originTree.vue
-->
<template>
  <div class="">
    <el-card class="box-card" style="width: 500px">
      <el-input placeholder="搜索部门和人员" v-model="filterText"> </el-input>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="margin-top: 20px"
      >
        <el-breadcrumb-item
          v-for="item in breadcrumbArray"
          :key="item.id"
          @click.native="handleBreadClick(item)"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        style="margin-top: 20px"
        >全选</el-checkbox
      >
      <ul>
        <li
          v-for="item of treeList"
          :key="item.id"
          style="overflow: hidden; margin-top: 10px"
        >
          <div>
            <label>
              <el-checkbox
                v-model="item.isChecked"
                :load="indeterminateComputed(item)"
                :indeterminate="item.indeterminate"
                >{{ item.label }}</el-checkbox
              >
            </label>
            <el-button
              type="text"
              style="float: right; line-height: 0"
              v-if="item.children"
              @click="loadChildren(item.children, item)"
              >下级</el-button
            >
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
      checkAll: false,
      isIndeterminate: false,
      breadcrumbArray: [{ label: "首页" }], //面包屑数组
      treeList: [],
      data: [
        {
          id: 1,
          label: "一级 1",
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
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  mounted() {
    this.treeList = this.data;
  },

  methods: {
    //   是否勾选半状态
    indeterminateComputed(item) {
      if (!item.children) {
        return false;
      }
      let num = []; //勾选长度
      let indetArr = []; //半勾选长度
      for (let i = 0; i < item.children.length; i++) {
        //   如果有选中的
        if (item.children[i].isChecked) {
          num.push(item.children[i].id);
        }
        // 如果有半勾选的
        if (item.children[i].indeterminate) {
          indetArr.push(item.children[i].id);
        }
      }
      if (item.children.length === num.length) {
        item.isChecked = true;
        return;
      }

      if (num.length > 0 || indetArr.length > 0) {
        item.indeterminate = true;
      }
    },
    //   面包屑点击事件
    handleBreadClick(item) {
      //   console.log(this.data);
      if (!item.id) {
        this.treeList = this.data;
      } else {
        console.log(item);
      }
    },
    //   加载下一级
    loadChildren(val, item) {
      this.treeList = val;
      console.log(item);
      this.breadcrumbArray.push({ label: item.label, id: item.id });
      //   this.breadcrumbArray.push('')
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>