<template>
  <el-dialog
    :visible.sync="show"
    width="800px !important"
    append-to-body
    class='preview-wrap'
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div v-if="view.fileType == 'PDF'">
      <iframe id='previewPdf' :src="view.path" height="560" width="100%"></iframe>
    </div>
    <div v-else>
      <el-image :src="view.path" :preview-src-list="[view.path]"></el-image>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 这是预览组件
 * 
 * 可以预览2种：图片与PDF
 * 
 * 图片预览直接就是el-image自带的功能
 * 
 */
export default {
  name: "invoicePreview",
  props: ["preview"],
  data () {
    return {
      view: null,
      show: false
    }
  },
  watch: {
    preview: {
      handler: function (view) {
        this.view = view
        this.show = !!this.view?.path
      },
      deep: true,
      immediate: true
    }
  },
}
</script>