import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'Dashboard', icon: 'icon-dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', },
        component: () => import('@/views/dashboard/index'),
        meta: { title: '分析页' }
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/dashboard/monitor.vue'),
        meta: { title: '监控页' }
      },
      {
        path: 'workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/workplace.vue'),
        meta: { title: '工作台' }
      },
      {
        path: 'invoice',
        name: 'Invoice',
        component: () => import('@/views/invoice/invoice.vue'),
        meta: { title: '发票管理' }
      },
      {
        path: 'workHandover',
        name: 'workHandover',
        component: () => import('@/views/workhandover/workHandover.vue'),
        meta: { title: '工作交接' }
      },
      {
        path: 'demo',
        name: 'demo',
        component: () => import('@/views/demo/pages/index.vue'),
        meta: { title: '测试页' }
      },
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


let copyRoute = constantRoutes.slice()
// // 命名规则 micro-app 子应用组 、dailyOffice子应用项目名称
let key = "micro-app-dailyOffice"
let allChildAppRoute = JSON.parse(sessionStorage.getItem("allChildAppRoute"))
if (!allChildAppRoute) {
  allChildAppRoute = {}
}
allChildAppRoute[key] = copyRoute
sessionStorage.setItem("allChildAppRoute", JSON.stringify(allChildAppRoute))

const createRouter = () => new Router({
  // mode: 'history', // require service support
  base:'/app1',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
