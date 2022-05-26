<template>
  <div class="app-aside__logo" :class="{ collapse: collapse }" @click="goHome">
    <div class="logo">
      <img v-if="logo" :src="logo" />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import logo from '@/assets/images/logo.png'
import router from '@/router'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: defaultSettings.title,
      logo: logo,
    }
  },
  methods: {
    goHome() {
      router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.app-aside__logo {
  padding-left: 10px;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  background: $--menu-background-color;
  overflow: hidden;
  .logo {
    width: 32px;
    height: 32px;
  }

  .title {
    margin-left: 8px;
    font-size: 16px;
    font-weight: 700;
    color: $--color-white;
    transition: all .5s;
  }

  &.collapse {
    .title {
      display: none;
    }
  }
}
</style>
