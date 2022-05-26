// 数据接口
import {getList} from "@/api/workhandover/otherBusiness";

/**
 * 其他业务负责人
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
                    field: "content",
                    component: "Input",
                    label: "业务内容",
                    clearable: true,
                    placeholder: "请输入业务内容",
                    maxLength: 100
                }
            ],
            // 表格数据
            table: [
                {
                    slot: "selectionSlot"
                },
                {
                    label: "业务内容",
                    value: "content"
                },
                {
                    label: "负责内容",
                    value: "code",
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