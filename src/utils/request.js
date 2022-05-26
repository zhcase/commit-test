// import axios from 'axios'
// import { Notification, MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// import errorCode from '@/utils/errorCode'
// import { stringtrim } from '@/utils/stringtrim'
// import {getBaseUrl} from "@/utils/baseUrl"
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// const processConfig=this.ENV; //环境变量
// 请求后台模块路径映射
// let baseUrls = null
// {
//   // 'stage-api':  processConfig.VUE_APP_BASE_URL_STAGE,
//   // 'system':     processConfig.VUE_APP_BASE_URL_SYSTEM,
//   // 'base':       processConfig.VUE_APP_BASE_URL_BASE,
//   // 'personnel':  processConfig.VUE_APP_BASE_URL_PERSONNEL,
//   // 'vehicle':    processConfig.VUE_APP_BASE_URL_VEHICLE,
//   // 'activiti':   processConfig.VUE_APP_BASE_URL_ACTIVITI,
//   // 'tool':       processConfig.VUE_APP_BASE_URL_TOOL,
//   // 'project':    processConfig.VUE_APP_BASE_URL_PROJECT,
//   'stage-api':  'http://192.168.177.101:8080',
//   'system':     'http://192.168.177.101:8080',
//   'base':       'http://192.168.177.101:8081',
//   'personnel':  'http://192.168.177.101:8082',
//   'vehicle':    'http://192.168.177.101:8083',
//   'activiti':   'http://192.168.177.101:8080',
//   'tool':       'http://192.168.177.101:8080',
//   'project':    'http://192.168.177.101:8084',
//   // 'stage-api': 'https://admin.api.wintaotel.com.cn',
//   // 'system': 'https://admin.api.wintaotel.com.cn',
//   // 'base': 'https://base.api.wintaotel.com.cn',
//   // 'personnel': 'https://personnel.api.wintaotel.com.cn',
//   // 'vehicle': 'https://vehicle.api.wintaotel.com.cn',
//   // 'activiti': 'https://admin.api.wintaotel.com.cn',
//   // 'tool': 'https://admin.api.wintaotel.com.cn',
//   // 'project': 'https://project.api.wintaotel.com.cn',

// }

// // 创建axios实例
// const service = axios.create({

//   // 超时
//   timeout: 30000
// })
// // request拦截器
// service.interceptors.request.use(config => {
//   let baseUrls = getBaseUrl()
//   let requestUrl = config.url.split('/')
//   let arr = requestUrl[1]
//   if (baseUrls.hasOwnProperty(arr)) {
//     config.url = baseUrls[arr] + config.url
//   }

//   // 是否需要设置 token
//   const isToken = (config.headers || {}).isToken === false
//   if (getToken() && !isToken) {
//     config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//   }
//   //将post和put的data数据进行前后去空格处理
//   stringtrim(config.method,config.data)
//   return config
// }, error => {
//   Promise.reject(error)
// })

// // 响应拦截器
// service.interceptors.response.use(res => {
//     if(res.config.url.endsWith('project/resume/deploy/api/getRecruitWebCustomFormList')){ //外部链接获取数据的请求（自定义处理无需拦截）
//       return res.data
//     }
//   // 未设置状态码则默认成功状态
//   const code = res.data.code || 200
//   // 获取错误信息
//   const msg = errorCode[code] || res.data.msg || errorCode['default']
//   if (code === 200) { // AjaxResult.success
//     return res.data
//   } else if (code === 203) { // AjaxResult.error
//     Message({
//       message: msg,
//       type: 'error',
//       duration: 2 * 1000
//     })
//     return Promise.reject('error')
//   } else if (code === 401) {
//     MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
//       confirmButtonText: '重新登录',
//       cancelButtonText: '取消',
//       type: 'warning'
//     }
//     ).then(() => {
//       store.dispatch('LogOut').then(() => {
//         location.href = '/index'
//       })
//     })
//   } else {
//     Notification.error({
//       title: msg
//     })
//     return Promise.reject('error')
//   }
// },
//   error => {
//     console.log('err' + error)
//     let { message } = error
//     if (message == "Network Error") {
//       message = "后端接口连接异常"
//     }
//     else if (message.includes("timeout")) {
//       message = "系统接口请求超时"
//     }
//     else if (message.includes("Request failed with status code")) {
//       message = "系统接口" + message.substr(message.length - 3) + "异常"
//     }
//     Message({
//       message: message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service
