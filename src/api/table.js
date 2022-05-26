// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}


export function listMaintain(query) {
  return request({
    url: 'http://192.168.177.219:8083/vehicle/maintain/list',
    method: 'get',
    params: query
  })
}