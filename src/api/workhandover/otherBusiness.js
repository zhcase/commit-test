// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();

/**
 * 列表
 */
export function getList(data) {
    return request({
        method: 'get',
        url: '/personnel/business/list',
        params: data
    });
}

/**
 * 交接
 */
export function editAll(data) {
    return request({
        method: 'put',
        url: '/personnel/business/editAll',
        data: data
    });
}
