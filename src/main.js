/*
 * @Author: zeHua
 * @Date: 2021-07-01 19:23:23
 * @LastEditors: liu
 * @LastEditTime: 2022-05-17 16:15:49
 * @FilePath: /yd-admin/src/main.js
 */
import './public-path'
import Vue from 'vue'
import RopeUi from 'rope-ui'
import '@/assets/styles/globalSty.scss'
import '@/assets/styles/msgSuccess.scss'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// import '@/assets/iconfont/iconfont.css'
// import "../theme/index.css"
// import "@/assets/scss/index.scss"
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
// import VueRouter from 'vue-router'
import {
  setToken
} from '@/utils/auth'
import {
  setbaseUrl,
  setEnv,
  setRequest
} from "@/utils/baseUrl"
import {
  hrefDown
} from "@/utils/index"
import {
  formateDate
} from 'wintao-utils';
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import {
  handleTree
} from '@/utils/ruoyi'
console.log(formateDate("2021-10-14T11:09:47.000+0800", 'yyyy-MM-dd HH:mm:ss'));
Vue.prototype.handleTree = handleTree
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}
Vue.use(ElementUI)

Vue.use(RopeUi);

// 微服务
let routes = null
let instance = null

function render(props = {}) {
  console.log(props);
  let {
    props: propsData,
    container
  } = props;
  let {
    token,
    env,
    baseUrls,
    proxyRouter,
    Utils,
    Components,
    Apis
  } = propsData || {}
  // Vue.use(commonCom)

  // 全量挂载主应用 组件 
  Vue.use(Components)

  // 挂载主应用 apis和utils方法到this下  
  Vue.prototype.commonApis = Apis
  Vue.prototype.commonUtils = Utils

  // 请求方式
  // setRequest(request)
  // 主应用token
  setToken(token);
  // 主应用的环境变量
  setEnv(env)
  // 主应用的请求根地址root
  setbaseUrl(baseUrls)
  // 路由的proxy的状态对象，用于处理子应用触发主应用路由跳转
  Vue.prototype.proxyRouter = proxyRouter
  Vue.prototype.hrefDown = hrefDown
  instance = new Vue({
    router,
    store,
    // el: '#micro-app-child',
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#micro-app-child') : '#micro-app-child');

}


export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  console.log('卸载咯')
  // instance.$el.innerHTML = ''
  // instance = null
  // router = null
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明

Vue.config.productionTip = false
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
// new Vue({
//   el: '#child',
//   router,
//   store,
//   render: h => h(App)
// })