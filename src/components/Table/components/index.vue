<!--
 * @Author: zeHua
 * @Date: 2021-07-02 15:09:51
 * @LastEditors: zeHua
 * @LastEditTime: 2022-02-23 16:17:21
 * @FilePath: /cccc/rope-ui-npm/packages/Table/components/index.vue
-->
<template>
	<div class="base-table">
		<div v-if="formSchema.length > 0" class="base-table__form">
			<BasicForm
				ref="basicForm"
				:schema="formSchema"
				:label-width="130"
				:form-model="form"
				@handleKeyEnter="handleQuery(form)"
				@handleSubmit="handleQuery"
				@resetForm="handleFormReset"
			>
				<template v-for="item in formSchema" #[item.slot]>
					<template v-if="item.slot">
						<slot :name="item.slot"></slot>
					</template>
				</template>
			</BasicForm>
		</div>

		<div class="base-table-wrapper">
			<div class="base-table__toolbar">
				<span class="base-table__toolbar__title">
					<el-button
						v-if="isHiddenDownload"
						type="default"
						size="small"
						@click="handleDownload"
					>导出</el-button>
					<slot name="toolbarLeft"> {{title}}</slot>
				</span>
				<!-- 右侧 -->
				<div class="base-table__header__toolbar">
					<span>
						<el-tooltip content="刷新" placement="top">
							<i class="el-icon-refresh" @click="handleRefresh"></i>
						</el-tooltip>
					</span>
				</div>
			</div>
			<el-table
				id="table"
				ref="table"
				v-loading="tableLoading"
				:data="tableData"
				height="100%"
				v-bind="$attrs"
				class="base-table__tables"
				v-on="$listeners"
			>
				<template v-for="item of registerTable">
					<!-- 是否隐藏该列 -->
					<template v-if="!item.isHidden&&!item.slot">
						<el-table-column
							v-if="item.type === 'selection'"
							:key="item.value"
							type="selection"
							width="55"
						>
						</el-table-column>

						<template v-if="!item.slot">
							<tableColumn
								:key="item.value"
								:item="item"
								@handleTableCellEdit="handleTableCellEdit"
								@updateTableData="handleUpdateTableData"
							/>
						</template>
					</template>
					<template v-if="item.slot">
						<slot :name="item.slot"> </slot>
					</template>
				</template>
			</el-table>
			<slot name="tableFooter"></slot>
			<template v-if="basicTableOptions.paginationProps">
				<div class="base-table__pagination">
					<el-pagination
						background
						:current-page="paginationConfig.currentPage"
						:page-size="paginationConfig.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="paginationConfig.total || 0"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					>
					</el-pagination>
				</div>
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.base-table {
  display: flex;
  flex-direction: column;
  height: 100%;
  td:hover {
    .el-icon-edit {
      display: inline-block !important;
    }
  }
  .el-icon-edit {
    display: none !important;
    position: absolute;
    right: 20px;
    top: 45%;
  }
  .edit {
    display: inline-block;
    padding-left: 10px;
    cursor: pointer;
    text-align: right;
  }
  .edit-input {
    width: 60%;
  }
  &__form {
    /* overflow: hidden; */
    padding: 10px;
    height: auto;
    background-color: #fff;
    &__content {
      overflow: hidden;
      height: auto;
    }
    .base-table__form-actions {
      .content {
        float: right;
      }
      overflow: hidden;
      height: auto;
    }
  }
  &-wrapper {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    flex: 1;
    margin-top: 16px;
    padding: 10px;
    background-color: #fff;
  }
  &__header__toolbar {
    float: right;
    span {
      cursor: pointer;
      font-weight: 500;
      font-size: 20px;
    }
  }
  &__tables {
    margin-top: 10px;
  }
  &__pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>

<style lang="scss">
.base-table__tables {
  th {
    background-color: #fafafa;
    font-weight: 500;
    color: #000;
  }
  td {
    color: rgba(0, 0, 0, .85) !important;
  }
}
.el-table--border th:last-of-type {
  display: block !important;
}
</style>

<script>
// import { downloadExcel } from "./excel.js";
import { BasicForm } from "../../Form/index";
import tableColumn from "./tableColumn.vue";

export default {
	components: {
		BasicForm,
		tableColumn
	},
	props: {
		data: {
			type: Array
		},
		title: {
			type: String
		},
		// table 数据
		basicTableData: {
			type: Object,
			default: () => {
				return {};
			}
		},
		// table 索引与title
		registerTable: {
			required: true,
			type: Array,
			default: () => {
				return [];
			}
		},
		// table 配置
		basicTableOptions: {
			required: false,
			type: Object,
			default: () => {
				return {
					paginationConfig: {
						currentPage: 1,
						pageSize: 10,
						total: 0
					}
				};
			}
		},
		formSchema: {
			required: false,
			type: Array,
			default: () => {
				return [];
			}
		},
		isHiddenDownload: {
			// 是否显示隐藏下载按钮
			required: false,
			type: Boolean,
			default: () => {
				return false;
			}
		},
		input: ""
	},
	data() {
		return {
			form: {}, // form 表单
			formVisible: false, //
			tableData: [], // table的数据
			methods: "", // 暴露出去的table ref
			tableLoading: false, // 是否loading
			timer: "", // 标识
			// 分页
			paginationConfig: {
				currentPage: 1,
				pageSize: 10,
				total: 0
			}
		};
	},

	watch: {
		basicTableOptions(val) {
			console.log(val);
		}
	},
	created() {
	},
	mounted() {
		this.handleQuery();
		this.changeFormVisible();
		this.methods = this.$refs.table;
		// 监听屏幕大小变化
		this.loadTableLayout();
	},
	beforeDestroy() {
		document.removeEventListener("resize");
	},
	methods: {
		handleStopFoucs(e) {
			// e.preventDefault();
		},
		// 监听页面变化 重新布局table
		loadTableLayout() {
			const that = this;
			window.addEventListener("resize", function() {
				if (this.timer) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(() => {
					that.$nextTick(() => {
						console.log(that.$refs);

						that.$refs.table.doLayout();
					});
				}, 1000);
			});
		},
		/**
     * 修改确认
     */
		handleTableCellEdit(params) {
			this.$emit("handleTableCellEdit", params);
		},

		/**
     * 更新Table数据
     *
     */
		handleUpdateTableData() {
			this.tableData.splice(1, 0);
		},
		// 下载excel文档
		handleDownload() {
			// downloadExcel(this.registerTable, this.tableData);
		},
		formatJson(filterVal) {
			return this.tableData.map((v) =>
				filterVal.map((j) => {
					if (j === "timestamp") {
						return parseTime(v[j]);
					} else {
						return v[j];
					}
				})
			);
		},
		// 查询
		handleQuery(form = {}) {
			// table 滚动条滚动到顶部
			this.$refs.table.bodyWrapper.scrollTop = 0;
			// 启动loading
			this.tableLoading = true;
			const paramsObj = {
				pageSize: this.paginationConfig.pageSize, // 分页数量
				pageNum: this.paginationConfig.currentPage // 页数
			};
			const paramsForm = form;
			// 分页参数 表单参数 自定义参数结合
			let parmas = {
				...paramsObj,
				...paramsForm,
				...this.basicTableOptions.apiParams
			};
			parmas = this.formDataParams(parmas);
			// 判断是否是直接传入数据还是 调用api
			if (this.data) {
				this.tableData = this.data;
			} else {
				// 调用查询table接口
				this.basicTableOptions.api({ ...parmas }).then((res) => {
					if (!this.basicTableOptions.apiFormat) {
						console.error("缺少apiFormat");
						return;
					}
					let data = res;
					this.$emit("update:basicTableData", res); // 同步给与父组件table
					this.$emit("queryBasicTable", parmas, res); // 查询返回参数与返回的整个查询的结果
					this.paginationConfig.total = res;
					const formatdata = this.basicTableOptions.apiFormat.split("."); // table 数据格式
					const paginationFormat
            = this.basicTableOptions.paginationFormat.split("."); // 分页总数table 格式
					for (let i = 0; i < formatdata.length; i++) {
						data = data[formatdata[i]];
					}
					for (let i = 0; i < paginationFormat.length; i++) {
						this.paginationConfig.total
              = this.paginationConfig.total[paginationFormat[i]];
					}
					this.tableData = data;
					// 重置doLayout
					this.$refs.table.doLayout();
				});
			}
			this.tableLoading = false;
			// 添加查询反馈参数
			this.$emit("handleTableQuery", form);
		},
		// 重置
		handleFormReset(form) {
			this.$emit("resetForm", form);
			this.paginationConfig.currentPage = 1;
			this.paginationConfig.pageSize = 10;
			this.$nextTick(() => {
				this.handleQuery(form);
			});
		},
		/**
     * 改变Form 显示隐藏
     **/
		changeFormVisible() {
			this.formVisible = !this.formVisible;
			if (this.$refs.form) {
				if (this.formVisible) {
					for (let i = 3; i < this.$refs.form.$children.length; i++) {
						this.$refs.form.$children[i].$el.style = "display:none";
					}
				} else {
					for (let i = 3; i < this.$refs.form.$children.length; i++) {
						this.$refs.form.$children[i].$el.style = "display:block";
					}
				}
			}
		},
		// 刷新
		handleRefresh() {
			this.handleQuery(this.$refs.basicForm && this.$refs.basicForm.form);
			this.$emit("getTableData");
		},
		// 每页 ${val} 条
		handleSizeChange(val) {
			this.paginationConfig.pageSize = val;
			this.paginationConfig.currentPage = 1;
			this.handleQuery(this.$refs.basicForm.form);
			this.paginationConfig.pageSize;
			/**
       * 分页注释改版
       */
			// this.$emit("changePagination", this.paginationConfig);
		},

		// 当前页: ${val}
		handleCurrentChange(val) {
			this.paginationConfig.currentPage = val;
			this.handleQuery(this.$refs.basicForm.form);
			/**
       * 分页注释改版
       */
			// this.$emit("changePagination", this.paginationConfig);
		},
		/**
     * @param row 行数据
     * @param index 索引
     * @param arr 数组
     */
		handleSwitch(row, index, arr) {
			this.$emit("changeSwitch", row, (res) => {
				if (res) {
					for (let i = 0; i < arr.length; i++) {
						if (row[index] !== arr[i].value) {
							setTimeout(() => {
								row[index] = arr[i].value;
							});
						}
					}
				}
			});
		},
		// 清空table
		clearSelection() {
			this.$refs.table.clearSelection();
		},
		// 选中table
		toggleRowSelection(rows) {
			if (rows) {
				rows.forEach((row) => {
					this.$refs.table.toggleRowSelection(this.tableData[row]);
				});
			}
		},
		// utils 参数 临时放置！！！！ 后期 移utils
		formDataParams(obj) {
			const params = {};
			for (const key in obj) {
				if (typeof obj[key] !== "number") {
					if (obj[key]) {
						params[key] = String(obj[key]).replace(/(^\s*)|(\s*$)/g, "");
					} else {
						params[key] = "";
					}
				} else {
					if (obj[key]) {
						params[key] = obj[key];
					}
				}
			}
			return params;
		}
	}
};
</script>