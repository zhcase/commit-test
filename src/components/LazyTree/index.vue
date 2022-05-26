<!--
 * @Author: zeHua
 * @Date: 2021-12-23 14:14:54
 * @LastEditors: zeHua
 * @LastEditTime: 2022-01-17 13:37:33
 * @FilePath: /ZNYW/vue/src/components/LazyTree/index.vue
  业务组件懒加载tree
-->

<template>
  <div>
    <!--  -->
    <tree-select
      :data="treeData"
      :props="treeProps"
      ref="lazyTree"
      filterSelectKey="staffId"
      @remove-tag="removeTag"
      :placeholder="placeholder"
      :filterable="filterable"
      :width="width"
      @clearTreeValue="clearTreeValue"
      node-key="id"
      @handleCheckDom="getTreeValue"
      @getTreeValue="getCheckedValue"
      :multiple="multiple"
      :collapseTags="collapseTags"
      :lazy="true"
      :defaultCheckedKeys="defaultCheckedKeys"
      :load="treeLoadNode"
      :format="['id', 'parentId']"
      :disabled="disabled"
      v-if="treeData[0]"
    ></tree-select>
  </div>
</template>
<script>
import { TreeSelect } from "@/components/Tree/index";
import {
  getBasicTree,
  loadTreeDom,
  getFindStaffs,
  getDomPeopleNumber,
} from "@/api/lazytree/index.js";
export default {
  name: "LazyTree",
  components: {
    TreeSelect,
  },
  props: {
    //多选表单样式
    collapseTags:{
      type:Boolean,
      default:()=>{
        return false;
      }
    },
    //其他请求参数
    param: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // 是否需要搜索
    filterable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    //类型 1为在职
    type: {
      type: Number,
      default: () => {
        return 1;
      },
    },
    //类型 9工作交接
    jobType: {
      type: Number,
      default: () => {
        return 1;
      },
    },
    //提示内容
    placeholder: {
      type: String,
      default: () => {
        return "请选择";
      },
    },
    // 宽度
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    // 默认值
    defaultCheckedKeys: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      treeData: [],
      staffIds:[],//人员Id
      parentIds: {}, // 存储父容器下面的员工Id key-value的形式
      checkedData: "",
      tempCheckedKeys:[], //增量后的节点id
      orgids:[],// 组织id
      treeProps: {
        label: "label",
        value: "staffId",
        children: "children",
        isLeaf: "leafFlag",
      },
    };
  },
  created() {
    console.log("--------creaete-----------");
  },
  mounted() {
    this.initBasicTree();
  },
  methods: {
    // 清空所有值
    clearTreeValue() {
      this.parentIds = {};
      this.$emit('clearTreeValue')
    },
    //   获取人员接口
    getCheckedValue(val) {
      // this.checkedData = val;
      // let temp = JSON.parse(JSON.stringify(val));
      // if(this.multiple){
      //   for(let i = 0; i < temp.length; i++){
      //     temp[i] -= otherConst.STAFF_ID_INCREMENT;
      //   }
      // }else{
      //   temp -= otherConst.STAFF_ID_INCREMENT;
      // }
      console.log(this.$refs.lazyTree.treeValue,"////////////////treeValue 138")
      console.log(this.$refs.lazyTree.treeOptionsArray,"///////////this.$refs.lazyTree.treeOptionsArray 138")
      // let tempDatas = [];
      // if(this.$refs.lazyTree.treeValue && this.$refs.lazyTree.treeValue.length != 0){
      //   if(this.multiple){ //多选
      //     tempDatas = this.staffIds;
      //   }else if(this.$refs.lazyTree.treeOptionsArray.length > 0){ //单选并选了值
      //     tempDatas = this.$refs.lazyTree.treeOptionsArray[0].staffId;
      //   }
      // }
      this.$emit("getTreeValue", val);
    },
    // 移除输入框的东西
    removeTag(val) {
        console.log(val);
      let parentId = []; //子节点 有些没有最后节点的id
      for (let item in this.parentIds) {
        let removeIndexs = this.parentIds[item].indexOf(val);
        let stateDom = this.$refs.lazyTree.method.getNode(item);
        // console.log(removeIndexs);
        if (Number(removeIndexs) > -1) {
          // console.log(this.parentIds[item]);
          this.parentIds[item].splice(removeIndexs, 1);
          // console.log(this.parentIds[item]);
          this.$nextTick(() => {
            // console.log(this.parentIds[item]);
          });
        }

        // if (stateDom) {
        //   stateDom.indeterminate = true;
        //   stateDom.checked = false;
        // }

        //    console.log(stateDom);
        //    if()
        // stateDom.indeterminate = true;
        // console.log(this);
      }

      this.treeCheckStatus();

      //   if (!val) {
      //     //    this.$refs.lazyTree.method.setCheckedKeys(this.)
      //     this.$refs.lazyTree.method.setCheckedKeys(
      //       this.$refs.lazyTree.method.treeValue
      //     );
      //   }
      //   for (let i = 0; i < this.parentIds.length; i++) {
      //     console.log(this.parentIds[i]);
      //   }
      // console.log(this);
    },
    /**
     * 监听选中与取消勾选
     */
    getTreeValue(val) {
      // alert(1)
      // 如果是默认选中的值
      if (val === "default") {
        for (let item of this.$refs.lazyTree.treeOptionsArray) {
          for (let indexs of item.parentIds.split(",")) {
            if (!this.parentIds[indexs]) {
              this.parentIds[indexs] = [];
            }
            if (this.parentIds[indexs].indexOf(item.id) === -1) {
              this.parentIds[indexs].push(item.id);
            }
          }
        }
        this.treeCheckStatus();
        return;
        // for(){

        // }
      }

      //   循环 选中 吧人员删除出来做选中处理
      for (let item of this.$refs.lazyTree.method.getCheckedNodes()) {

       if(!item.staffId){

           this.orgids.push(item.id);// 存储组织id

       }
       }
      //   if (this.$refs.lazyTree.method.getCheckedKeys()[0]) {
      getFindStaffs({
        id:this.orgids.join(','),
        type: this.type,
        otherParam: this.param,
      }).then((res) => {
        let ids = [];
        let existingIds=[];// 已存在的id 做过滤用
        this.parentIds = {};
        this.$refs.lazyTree.treeOptionsArray = [];
        this.$refs.lazyTree.treeValue = [];
        this.$refs.lazyTree.treeOptionsArray = [
          ...this.$refs.lazyTree.treeOptionsArray,
          ...res.data,
        ];
        for(let i=0;i<this.$refs.lazyTree.treeOptionsArray.length;i++){
          existingIds.push(this.$refs.lazyTree.treeOptionsArray[i].staffId);

        }
        // this.staffIds=existingIds.join(','); // 赋值选中人员Id 集合
        //   选中的节点
        let checkUser = this.$refs.lazyTree.method.getCheckedNodes();
        //   循环 选中 吧人员删除出来做选中处理
        for (let item of checkUser) {


          if(existingIds.indexOf(item.staffId)===-1){
          if (item.staffId) {
            console.log("--------------240 lazy 赋值")
            this.$refs.lazyTree.treeValue.push(item.staffId);
            this.$refs.lazyTree.treeOptionsArray.push(item);
          }
        }
        }
        this.staffIds = [];

        //   循环选中的人员信息
        for (let item of this.$refs.lazyTree.treeOptionsArray) {
          // console.log(item.parentIds);

          this.staffIds.push(item.staffId)
          if (item.parentIds) {
            for (let id of item.parentIds.split(",")) {
              if (!this.parentIds[id]) {
                this.parentIds[id] = [];
              }
              if (this.parentIds[id].indexOf(item.id) === -1) {
                this.parentIds[id].push(item.id);
              }
            }
          }
          this.$nextTick(() => {
            let stateDom = this.$refs.lazyTree.method.getNode(item.parentId);
            //   if (stateDom) {
            //     stateDom.indeterminate = true;
            //   }
          });
          if (this.$refs.lazyTree.treeValue.indexOf(item.staffId) < 0) {
            ids.push(item.staffId);
          }
        }
        // console.log(ids);
        // console.log(this.parentIds);
        console.log("------------273 lazy 赋值")
        this.$refs.lazyTree.treeValue = [
          ...this.$refs.lazyTree.treeValue,
          ...ids,
        ];

        console.log(this.$refs.lazyTree.treeOptionsArray);
        //    this.$refs.lazyTree.method.setCheckedKeys(ids)
      });
      //   }
    },
    // 全选勾选半勾选状态判断
    treeCheckStatus(id) {
      this.$nextTick(() => {
        for (let items in this.parentIds) {
          // if (Number(items) === id) {
          let stateDom = this.$refs.lazyTree.method.getNode(Number(items));
          this.$nextTick(() => {
            if (this.parentIds[items].length === 0) {
              if (stateDom) {
                stateDom.indeterminate = false;
                stateDom.checked = false;
              }
            }
          });

          if (stateDom) {
            if (stateDom.data.children) {
              // 修改本身节点的状态
              if (this.parentIds[items].length === 0) {
                stateDom.indeterminate = false;
                stateDom.checked = false;
              }

              if (this.parentIds[items].length < stateDom.data.number) {
                stateDom.indeterminate = true;
                stateDom.checked = false;
              }
              if (this.parentIds[items].length === stateDom.data.number) {
                stateDom.indeterminate = false;
                stateDom.checked = true;
              }
              //   循环修改子节点的状态
              for (let item of stateDom.data.children) {
                if (this.parentIds[item.id]) {
                  // if (item.number === 0 || this.parentIds[item.id].length === 0) {
                  //   return;
                  // }

                  if (item.number === this.parentIds[item.id].length) {
                    let dom = this.$refs.lazyTree.method.getNode(item.id);
                    if(dom){
                    dom.indeterminate = false;
                    dom.checked = true;
                    }
                  }
                  if (this.parentIds[item.id].length < item.number) {
                    let dom = this.$refs.lazyTree.method.getNode(item.id);
                    if(dom){
                    dom.indeterminate = true;
                    dom.checked = false;
                    }
                  }
                }
              }
            }
          }
        }
      });
    },
    //   懒加载TreeLoad
    treeLoadNode(node, resolve) {
      if (node.level === 0) {
        // getDomPeopleNumber({ type: this.type, id: 0 }).then((res) => {
        //   if (res.data && res.data.length > 0) {
        //     for (let i = 0; i < res.data.length; i++) {
        //       node.data[i].number = res.data[i];
        //     }
        //   }
        // });
      }
      if (node.level > 0 && !node.data.isUserLeaf) {
        //   一次性加载基本的Tree
        // getDomPeopleNumber({ type: this.type, id: node.data.id }).then(
        //   (res) => {
        //     if (res.data && res.data.length > 0) {
        //       for (let i = 0; i < res.data.length; i++) {
        //         node.data.children[i].number = res.data[i];
        //         // if (res.data[i] === 0) {
        //         //   this.$set(node.data.children[i], "leafFlag", true);
        //         // } else {
        //         //   this.$set(node.data.children[i], "leafFlag", false);
        //         // }
        //       }
        //     }
        //     setTimeout(() => {
        //       this.treeCheckStatus(node.data.id);
        //     }, 150);
        //   }
        // );
        return resolve(node.data.children);
      }

      //如果 不是第一级 并且下面如果还有用户
      if (node.level !== 0 && node.data.number>0) {
        loadTreeDom({
          id: node.data.id,
          type: this.jobType,
          otherParam: this.param,
        }).then((res) => {
          let redata = [];
          for (let item of res.data) {
            // 重新构建一下属性
            redata.push({
              isUserLeaf: true,
              ...item,
              userId: item.id,
              isUser: true,
            });
          }
          setTimeout(() => {
            this.treeCheckStatus(node.data.id);
          }, 150);
          return resolve(redata);
        });
      }
      return resolve([]);
    },
    /**
     * 初始化Tree 获取Tree
     */
    initBasicTree() {
      // this.tempCheckedKeys = JSON.parse(JSON.stringify(this.defaultCheckedKeys));
      // for(let i = 0; i < this.tempCheckedKeys.length; i++){
      //   this.tempCheckedKeys[i] += otherConst.STAFF_ID_INCREMENT; //这里
      // }
      // console.log(this.tempCheckedKeys,"///////////this.tempCheckedKeys 392s")
      getBasicTree({
        ids: this.defaultCheckedKeys.join(","),
        personType: this.type,
        otherParam: this.param,
      }).then((res) => {
        this.treeData = res.data;
        this.$nextTick(()=>{
          console.log(this.treeData)
          this.$emit("renderOver"); //组件渲染完毕暴露渲染完毕的方法
        })
        // 修改tree属性的选择
        setTimeout(() => {
          // console.log(this.$refs.lazyTree.treeValue);
          // this.$refs.lazyTree.treeValue=Number(this.$refs.lazyTree.treeValue.join(','))
        }, 3000);
      });
    },
  },
};
</script>
