<template>
  <el-container :class="classObj">
    <!-- <sidebar/>
    <el-container direction="vertical">
      <navbar />
    </el-container> -->
          <app-main />

  </el-container>
</template>

<script>

import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        'sidebar--opened': this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100%;
  }
  .el-main {
    height: 100%;
    // background-color: $--background-color-base;
    background-color: #fff;
  }
</style>
