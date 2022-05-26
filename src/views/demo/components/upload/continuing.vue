<!--
 * @Author: zeHua
 * @Date: 2021-10-14 13:58:39
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-19 18:14:34
 * @FilePath: /yd-admin/src/views/demo/components/upload/continuing.vue
-->
<template>
  <div class="download-process">
    <!-- <el-button type="primary" @click="handleClicklDownload(1)" v-if="btnStatus"
      >  </el-button
    >
    
    <el-button type="primary" @click="handleClicklStop" v-if="!btnStatus"
      >暂停</el-button
    > -->
    <el-progress :percentage="percentage" style="width:300px"></el-progress>
    <span>
      <el-button
        type="primary"
        icon=" el-icon-video-play 
        
"
        @click="handleClicklDownload(1)"
        v-if="btnStatus"
        circle
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-video-pause"
        circle
        @click="handleClicklStop"
        v-if="!btnStatus"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-circle-close
"
        circle
      ></el-button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      downloadStatus: 1,
      percentage: 0, //进度条
      totalNum: 0,
      btnStatus: true,
      totalBlob: [],
      downloadProcess: [0, 512000], // 文件当前下载进度
    };
  },
  props: {
    api: {
      type: Function,
    },
  },
  methods: {
    handleClicklStop() {
      //   this.downloadStatus = 1;
      this.downloadStatus = 0;
      this.btnStatus = true;
    },
    /**
     * 点击下载
     * @param args 返回如果是1的话 是点击按钮事件 一定执行下载任务 downloadStatus 是用来作是否暂停下载的
     */
    async handleClicklDownload(args) {
      // 如果是1的话是点击按钮事件
      if (args) {
        this.btnStatus = false; //隐藏点击按钮
        this.downloadStatus = 1; // 下载状态调整
      }
      // 暂停下载 请求终止
      if (!this.downloadStatus) {
        this.downloadStatus = !this.downloadStatus;
        return;
      }

      // 用当前进度获取下次文件流
      let result = await this.api(this.downloadProcess.join("-"));
      //   console.log(result);
      let fileName = result.headers["content-disposition"].substring(
        result.headers["content-disposition"].indexOf("filename=") + 9,
        result.headers["content-disposition"].length
      );
      // 获取当前达到的进度
      this.downloadProcess[0] = Number(result.headers["content-upper"]);
      // 获取到下次的文件位置  如果大于文件大小就取文件最大的值
      this.downloadProcess[1] =
        Number(result.headers["content-upper"]) + 512000 >
        Number(result.headers["file-size"])
          ? Number(result.headers["file-size"])
          : Number(result.headers["content-upper"]) + 512000;
      //获取总数据大小
      this.totalNum = Number(result.headers["file-size"]);
      //   console.log(this.downloadProcess);
      // 进度条百分比 保留2位小数
      this.percentage = Number(
        ((this.downloadProcess[0] / this.totalNum) * 100).toFixed(2)
      );

      //   如果文件是结尾的话 下载文件
      if (
        this.downloadProcess[0] == Number(this.totalNum) ||
        this.downloadProcess[0] > Number(this.totalNum)
      ) {
        this.totalBlob.push(result.data);
        let target = "_self";
        this.percentage = 100;
        this.donwloadFile();
      } else {
        // console.log(result.data);
        this.totalBlob.push(result.data);
        this.handleClicklDownload();
      }
      //   console.log(blob);
    },
    /**
     * 下载整个文件
     */
    donwloadFile() {
      let blob = new Blob(this.totalBlob, {
        type: "application/zip",
      });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.target = target;
      a.style.display = "none";
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.download-process {
  width: 60%;

  display: flex;
}
</style>
