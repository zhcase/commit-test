// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();

/**
 * 流程列表
 */
export function getList(data) {
    return request({
        method: 'get',
        url: '/personnel/apply/list',
        params: data
    });
}

/**
 * 废弃
 */
export function abandon(data) {
    return request({
        method: 'delete',
        url: '/personnel/apply/' + data,
    });
}

/**
 * 交接
 */
export function editAll(data) {
    return request({
        method: 'post',
        url: '/personnel/apply/handover',
        data: data
    });
}
