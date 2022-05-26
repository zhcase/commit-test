// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();

/**
 * 列表
 */
export function getList(data) {
    return request({
        method: 'get',
        url: '/personnel/asset/list',
        params: data
    });
}

/**
 * 交接
 */
export function editAll(data) {
    return request({
        method: 'post',
        url: '/personnel/asset/handover',
        data: data
    });
}
