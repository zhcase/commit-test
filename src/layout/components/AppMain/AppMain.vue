<template>
  <el-main class="scroll-bar">
    <transition name="fade-transform" mode="out-in">
      <router-view class="page-container" :key="key" />
    </transition>
  </el-main>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>