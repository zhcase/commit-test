// 数据接口
import {getList} from "@/api/workhandover/applyFlow";

/**
 * 我申请的流程
 * 配置项：
 *   1、搜索框配置项
 *   2、表格配置项
 *   3、数据请求的接口配置项
 */
export default {
    data() {
        return {
            // 自定义搜索框
            schemas: [
                {
                    field: "flowName",
                    component: "Input",
                    label: "流程名称",
                    clearable: true,
                    placeholder: "请输入流程名称",
                    maxLength: 100
                }
            ],
            // 表格数据
            table: [
                {
                    slot: "selectionSlot"
                },
                {
                    slot: "applyNumSlot"
                },
                {
                    label: "流程名称",
                    value: "flowName",
                },
                {
                    label: "当前审批人",
                    value: "currentUserId",
                },
                {
                    label: "审批节点",
                    value: "approverIds",
                },
                {
                    label: "创建时间",
                    value: "createTime",
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