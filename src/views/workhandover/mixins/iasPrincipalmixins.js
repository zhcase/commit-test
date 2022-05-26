// 数据接口
import {getList} from "@/api/workhandover/iasPrincipal";

/**
 * 我作为负责人
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
                    field: "responsibleType",
                    label: "直属负责人类型",
                    component: "Select",
                    placeholder: "请选择直属负责人类型",
                    clearable: true,
                    multiple: true,
                    componentProps: {
                        options: [
                            {label: "直属领导", value: "454"},
                            {label: "人事直属负责人", value: "455"},
                            {label: "行政直属负责人", value: "456"},
                            {label: "财务直属负责人", value: "457"},
                            {label: "其它类型直属负责人", value: "0"}
                        ],
                        optionsFormat: {label: 'label', value: 'value'}
                    },
                },
                {
                    label: "所属组织",
                    field: "test",
                    slot: "orgTree"
                }
            ],
            // 表格数据
            table: [
                {
                    slot: "selectionSlot"
                },
                {
                    label: "员工姓名",
                    value: "staffName"
                },
                {
                    label: "员工工号",
                    value: "staffNo",
                },
                {
                    label: "所属组织",
                    value: "orgNames",
                },
                {
                    label: "所属职务",
                    value: "positionName",
                },
                {
                    label: "所属岗位",
                    value: "postName",
                },
                {
                    label: "联系电话",
                    value: "staffPhone",
                },
                {
                    label: "直属负责人类型",
                    value: "responsibleType",
                    formatter: (val, cloumns, scoped, index) => {
                        switch (val) {
                            case "454":
                                return "直属领导";
                            case "455":
                                return "人事直属负责人";
                            case "456":
                                return "财务直属负责人";
                            case "457":
                                return "行政直属负责人";
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