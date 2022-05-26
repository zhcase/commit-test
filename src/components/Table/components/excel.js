/*
 * @Author: zeHua
 * @Date: 2021-08-09 16:15:05
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-10 11:27:54
 * @FilePath: /yd-admin/src/components/Table/components/excel.js
 */
import XLSX from "xlsx"

/**
 *  @description table转换成本地excel 
 * @param  tableHeder table 头部 与索引
 * @param  tableData table 数据
 * @param  excelName excel 名称
 */
export function downloadExcel(tableHeder, tableData, excelName = 'excel') {
    let arr = []
    let indexs = []
    arr[0] = []
    for (let i = 0; i < tableHeder.length; i++) {
        if (!tableHeder[i].isHidden) {
            arr[0].push(tableHeder[i].label)
            indexs.push({
                value: tableHeder[i].value,
                options: tableHeder[i].options
            })
        }
    }
    for (let t = 0; t < tableData.length; t++) {
        arr[t + 1] = []
        for (let i = 0; i < indexs.length; i++) {
            if (indexs[i].options) {
                for (let o = 0; o < indexs[i].options.length; o++) {
                    if (
                        indexs[i].options[o].value ===
                        tableData[t][indexs[i].value]
                    ) {
                        arr[t + 1].push(indexs[i].options[o].label)
                    }
                }
            } else {
                if (tableData[t][indexs[i].value]) {
                    arr[t + 1].push(tableData[t][indexs[i].value])
                }
            }
        }
    }
    let wb = XLSX.utils.json_to_sheet(arr)
    let workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, wb, "第一页")
    XLSX.writeFile(workbook, `${excelName}.xlsx`)
}