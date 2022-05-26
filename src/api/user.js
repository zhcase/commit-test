/*
 * @Author: zeHua
 * @Date: 2021-06-30 09:40:25
 * @LastEditors: liu
 * @LastEditTime: 2022-05-17 16:13:34
 * @FilePath: /yd-admin/src/api/user.js
 */
// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


export function getTreeList() {
  let data = {
    treeType: 1,
  }
  return request({
    url: '/system/organization/lazytreeselect',
    method: 'post',
    data
  })
}

export function getUserTree(orgId) {
  return request({
    url: 'http://192.168.10.19:8080/system/organization/findStaff/' + orgId,
    method: 'get'
  })
}


export function download(orgId) {
  let data = {
    range: orgId
  }
  return request({
    url: 'http://192.168.10.10:8081/base/staffAgreement/chunkDownload',
    method: 'post',
    responseType: 'blob',
    data
    // headers: {
    //   'data-type': 'Buffer',
    //   'Content-Type': 'multipart/form-data'
    // }

  })
}


export function listBudget(query) {
  return request({
    url: 'http://192.168.10.13:8084/project/budget/list?projectManageId=9527',
    method: 'get',
    params: query
  })
}