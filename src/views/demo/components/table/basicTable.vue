<template>
  <div>
    <basic-table
      :registerTable="table"
      :data="dataList"
      title="基础示例"
    >
    </basic-table>
  </div>
</template>

<script>
import { BasicTable } from "@/components/Table/index";
import { listMaintain }  from '@/api/table.js'
export default {
  name: "Basic",
  components:{
    BasicTable
  },
  data() {
    return {
      dataList: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",

          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",

          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",

          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],

      // table 索引
      table: [
        {
          label: "日期",
          value: "date",
        },
        {
          label: "姓名",
          value: "name",
        },
        {
          label: "地址",
          value: "address",
        },
      ],
    };
  },
  mounted(){
    listMaintain().then(res=>{
      console.log(res);
    })
  }
};
</script>