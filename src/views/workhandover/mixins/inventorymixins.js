// 数据接口
import {getList} from "@/api/workhandover/inventory";

/**
 * 物品清单
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
                    label: "物品名称",
                    value: "goodsName"
                },
                {
                    label: "数量",
                    value: "goodsNumber",
                },
                {
                    label: "状态",
                    value: "goodsState",
                    formatter: (val, cloumns, scoped, index) => {
                        switch (val) {
                            case '0':
                                return '未交接';
                            case '1' :
                                return '交接中';
                            case '2' :
                                return '待确认';
                            case '3' :
                                return '交接完成';
                        }
                    }
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