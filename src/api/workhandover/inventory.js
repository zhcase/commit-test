// import {getRequest} from "@/utils/baseUrl"
// const request=getRequest();

/**
 * 物品清单
 */
export function getList(data) {
    return request({
        method: 'get',
        url: '/personnel/manage/list',
        params: data
    });
}

/**
 * 交接
 */
export function editAll(data) {
    return request({
        method: 'put',
        url: '/personnel/manage/editAll',
        data: data
    });
}

/**
 * 确认、拒绝 接收物品
 */
export function con(data) {
    return request({
        method: 'put',
        url: '/personnel/manage/con',
        data: data
    });
}
