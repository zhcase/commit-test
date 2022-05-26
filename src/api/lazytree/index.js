// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();



/**
 * 获取基础Tree结构
 * @returns 
 */
export function getBasicTree(data) {
  return request({
    url: '/system/tree/list',
    method: 'post',
    data: data
  })
}
/**
 *  懒加载下级人员
 * @param {} params id 加载id  tyoe类型 1为在职
 * @returns 
 */
export function loadTreeDom(params) {
  let data={
    ids:params.id,
    personType:params.type,
    otherParam:params.otherParam,
  }
  return request({
    url: '/system/tree/lazyByParam',
    method: 'post',
    data: data
  })
}

/**
 * 查询人员信息
 * @param {} params id 加载id  tyoe类型 1为在职
 * @returns 
 */
 export function getFindStaffs(params) {
  let data={
    ids:params.id,
    personType:params.type,
    otherParam:params.otherParam,
  }
  return request({
    url: '/system/tree/findStaffs',
    method: 'post',
    data: data
  })
}

/**
 * 查询节点下面人员数量
 * @param {} params id 加载id  tyoe类型 1为在职
 * @returns 
 */
 export function getDomPeopleNumber(params) {
  let data={
    orgId:params.id,
    personType:params.type,
  }
  return request({
    url: `/system/tree/findStaffSum`,
    method: 'post',
    data: data
  })
}
