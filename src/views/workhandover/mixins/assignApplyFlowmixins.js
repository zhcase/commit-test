// 数据接口
import {getList} from "@/api/workhandover/assignApplyFlow";

/**
 * 指定我为审批人流程
 * 配置项：
 *   1、搜索框配置项
 *   2、表格配置项
 *   3、数据请求的接口配置项
 */
export default {
    data() {
        return {
            // 表格数据
            table: [
                {
                    slot: "selectionSlot"
                },
                {
                    label: "流程名称",
                    value: "name",
                },
                {
                    slot: "action"
                }
            ],
            options: {
                api: getList,//调用接口地址
                paginationProps: {},//分页
                apiFormat: "rows",//调用table的数据格式
                paginationFormat: "total"//调用table的数据格式总页数
            },
        }
    },
}