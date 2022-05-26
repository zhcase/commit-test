/*
 * @Author: zeHua
 * @Date: 2021-06-29 21:48:16
 * @LastEditors: zeHua
 * @LastEditTime: 2021-12-09 11:38:30
 * @FilePath: /yd-npm-components/rope-ui/packages/Table/index.js
 */
import BasicTable from './components/index.vue'
BasicTable.install = function (Vue) {
    Vue.component('BasicTable', BasicTable)
}
BasicTable.name='BasicTable'
export {
    BasicTable
}