// 数据接口
import {getList} from "@/api/workhandover/assetAdmin";

/**
 * 资产管理
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
                    label: "资产类型",
                    value: "assetType",
                    formatter: (val, cloumns, scoped, index) => {
                        switch (val) {
                            case "No.1":
                                return "设备仪表类";
                            case "No.2":
                                return "办公类";
                            case "No.3":
                                return "宿舍类";
                            case "No.4":
                                return "工具类";
                            case "No.5":
                                return "运输设备";
                        }
                    }
                },
                {
                    label: "资产名称",
                    value: "assetName",
                },
                {
                    label: "资产编号",
                    value: "assetCode",
                },
                {
                    label: "所属组织",
                    value: "orgName",
                },
                {
                    label: "购入日期",
                    value: "buyDate",
                },
                {
                    label: "状态",
                    value: "assetStatus",
                    formatter: (val, cloumns, scoped, index) => {
                        switch (val) {
                            case 1:
                                return "正常";
                            case 2:
                                return "损坏";
                            case 3:
                                return "报废";
                        }
                    }
                },
                {
                    label: "数量",
                    value: "assetNumber",
                },
                {
                    label: "单价",
                    value: "assetPrice",
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