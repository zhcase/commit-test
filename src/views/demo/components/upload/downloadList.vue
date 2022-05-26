<!--
 * @Author: zeHua
 * @Date: 2021-10-19 17:35:26
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-19 17:46:11
 * @FilePath: /yd-admin/src/views/demo/components/upload/downloadList.vue
-->
<template>
  <div class="continuing">
    <continuing :api="downloadApi" />
  </div>
</template>

<script>
import continuing from "./continuing.vue";
import { download } from "@/api/user.js";

export default {
  components: {
    continuing,
  },
  data() {
    return {
      downloadApi: "",
    };
  },
  created() {
    this.downloadApi = download;
  },
};
</script>
