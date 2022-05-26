// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();

// 查询组织信息列表
export function listOrganization(query) {
  return request({
    url: '/system/organization/list',
    method: 'get',
    params: query
  })
}

// 查询组织信息列表（带有节点）
export function getListTreeSelect(query) {
  return request({
    url: '/system/organization/treeselect',
    method: 'get',
    params: query
  })
}


// 查询当前用户数据权限过滤后的组织列表
export function dataScopeOrgList() {
  return request({
    url: '/system/organization/getDataScopeOrgs',
    method: 'get',
  })
}

// 查询树状结构数据
export function listOrganizationTree(query) {
  return request({
    url: '/system/organization/treeselect?status=0',
    method: 'get',
    params: query
  })
}

// 查询组织树状结构数据（带数据权限）
export function listOrganizationTreeLimit(query) {
  return request({
    url: '/system/organization/treeselectLimit',
    method: 'get',
    params: query
  })
}

// 获取组织及人员的树形结构数据
export function getOrgAndMember() {
  return request({
    url: '/system/organization/membertree',
    method: 'get'
  })
}

// 查询组织信息详细
export function getOrganization(orgId) {
  return request({
    url: '/system/organization/' + orgId,
    method: 'get'
  })
}

//查询当前组织对应的下级组织
export function getDownOrgInfo(orgId) {
  return request({
    url: '/system/organization/getDownOrgInfo/' + orgId,
    method: 'get'
  })
}

//查询当前组织下的崗位名称
export function getPostOptionByOrgId(orgId) {
  return request({
    url: '/system/organization/getPostOptionByOrgId/' + orgId,
    method: 'get'
  })
}


// 查询组织信息详细(详情页面)
export function getDetailProf(orgId) {
  return request({
    url: '/system/organization/detail/' + orgId,
    method: 'get'
  })
}

// 根据orgId查询所有父级节点名称字符串
export function getFullOrgNames(organizationIds) {
  return request({
    url: '/system/organization/fullNames/' + organizationIds,
    method: 'get'
  })
}

// 新增组织信息
export function addOrganization(data) {
  return request({
    url: '/system/organization',
    method: 'post',
    data: data
  })
}

// 修改组织信息
export function updateOrganization(data) {
  return request({
    url: '/system/organization',
    method: 'put',
    data: data
  })
}

// 删除组织信息
export function delOrganization(orgId) {
  return request({
    url: '/system/organization/' + orgId,
    method: 'delete'
  })
}

// 导出组织信息
export function exportOrganization(query) {
  return request({
    url: '/system/organization/export',
    method: 'get',
    params: query
  })
}
// 导出省市区信息
export function getProvince() {
  return request({
    url: '/base/provinces/info/list',
    method: 'get',
  })
}
// 查询详细
export function getName(profId) {
  return request({
    url: '/organization/name/' + profId,
    method: 'get'
  })
}
// 查询professional列表
export function listName(query) {
  return request({
    url: '/base/organization/name/list',
    method: 'get',
    params: query
  })
}
//查询省市区的省市区
export function provinceNameCode(query) {
  return request({
    url: '/base/provinces/info/provinceNameCode',
    method: 'get',
    params: query
  })
}

// 带数据权限查询组织信息列表(获取父组织下的所有子组织)
export function listOrganizationLimit() {
  return request({
    url: '/system/organization/listLimit',
    method: 'get',
  })
}

// 根据组织id查询员工
export function getLeafTree(orgId) {
  return request({
    url: '/system/organization/findStaff/' + orgId,
    method: 'get'
  })
}
// 根据组织id查询员工
export function getLazyFindStaffs(query) {
  // let data = { orgIds: orgId }
  return request({
    url: '/system/organization/lazyFindStaffs',
    method: 'post',
    data: query

  })
}

// 查询组织人员树
export function getLazyTreeSelect(data) {
  return request({
    url: '/system/organization/lazytreeselect',
    method: 'post',
    data: data
  })
}
// 查询组织人员树
export function getLazyTreeSelectByParams(data) {
  return request({
    url: '/system/organization/getLazyTreeByParams',
    method: 'post',
    data: data
  })
}


// 查询组织员工信息（懒加载）
export function lazyFindStaffs(data) {
  return request({
    url: '/system/organization/lazyFindStaffs',
    method: 'post',
    data: data
  })
}
// 查询组织员工信息（懒加载）
export function lazyFindStaffsByParams(data) {
  return request({
    url: '/system/organization/lazyFindStaffsByParams',
    method: 'post',
    data: data
  })
}

// 通过id查询员工信息
export function getStaffInfo(data) {
  return request({
    url: '/base/info/getStaffInfos',
    method: 'post',
    data: data
  })
}

//查询招聘角色以及过滤掉组织下无人员员组织树和已经委托的人不在委托
export function getLazyTreeSelectByRoleId(recruitId,flag) {
  return request({
    url: '/system/organization/lazytreeselectHasPeople/'+recruitId+'/'+flag,
    method: 'get',

  })
}

// 查询当前登录员工的父组织下所有的子组织中的员工信息
export function findParentOrgStaffs(){
  return request({
    url:'/system/organization/findParentOrgStaffs',
    method:'get'
  })
}

//获取当前组织下所有子级员工
export function getStaffInfoByOrgId(orgId){
  return request({
    url:'/system/organization/getStaffInfoByOrgId/' + orgId,
    method:'get'
  })
}
// 查询组织信息列表
export function getOrgTreePic(query) {
  return request({
    url: '/system/organization/getOrgTreePic',
    method: 'get',
    params: query
  })
}

// 查询最下级组织的人员
export function getLastOrgInfo(superiorId) {
  return request({
    url: '/base/info/getLastOrgInfo/'+superiorId,
    method: 'get',
  })
}

// 查询更改
export function editStaffByOrgId(superiorId) {
  return request({
    url: '/base/info/editStaffByOrgId/'+superiorId,
    method: 'put',
  })
}
