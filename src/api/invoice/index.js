// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();
/**
 * 获取发票数据
 */
export function getInvoiceList(data) {
  return request({
    method: 'get',
    url: '/base/invoice/info/list',
    params: data
  });
}
/**
 * 发票识别
 */
 export function invoiceRecognition(data) {
  return request({
    method: 'POST',
    url: '/base/invoice/info/invoiceRecognition',
    data: data
  });
}

/**
 * 发票增删改查
 * invoiceId	发票id
 * invoiceType 0
 */

/**
 * 新增发票数据
 */
export function addInvoice(data) {
  return request({
    method: 'POST',
    url: '/base/invoice/info',
    data: data
  });
}

/**
 * 修改发票数据
 */
 export function modifyInvoice(data) {
  return request({
    method: 'PUT',
    url: '/base/invoice/info',
    data: data
  });
}

/**
 * 删除发票数据
 */
 export function deleteInvoice({invoiceIds, invoiceType}) {
  return request({
    method: 'DELETE',
    url: `/base/invoice/info/${invoiceIds}/${invoiceType}`,
    params: {}
  });
}

/**
 * 获取发票数据
 */
 export function getInvoice({invoiceId, invoiceType}) {
  return request({
    method: 'GET',
    url: `/base/invoice/info/${invoiceId}/${invoiceType}`,
    params: {}
  });
}

/**
 * 获取发票数据
 */
 export function checkInvoiceNumExist({invoiceCode, invoiceNum}) {
  return request({
    method: 'GET',
    url: `/base/invoice/info/checkInvoiceNumExist`,
    params: {invoiceCode, invoiceNum}
  });
}