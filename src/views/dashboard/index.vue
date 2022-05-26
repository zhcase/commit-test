<!--
 * @Author: zeHua
 * @Date: 2021-07-02 13:43:42
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-27 16:47:31
 * @FilePath: /yd-admin/src/views/dashboard/index.vue
-->
<template>
  <div class="page-dashboard">
    <el-row>
      <el-col
        :span="5"
        v-for="(o, index) in 4"
        :key="o"
        :offset="index > 0 ? 1 : 1"
      >
        <el-card>
          <div class="vantd-card">
            <!-- 标题 -->
            <div class="vantd-card-title">
              <span>总销售额 </span>
              <el-tooltip content="指标说明" placement="top">
                <i
                  class="el-icon-warning-outline"
                  style="float:right; color: rgba(0, 0, 0, 0.45);"
                ></i>
              </el-tooltip>
            </div>
            <!-- 数量 -->
            <div class="vantd-card-num">¥ 126,560</div>
            <div class="vantd-card-content"></div>
            <div class="vantd-card-footer">日销售额￥12,423</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import defaultSettings from '@/settings';
import { Chart } from '@antv/g2';

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
    };
  },
  mounted() {
    // const chart = new Chart({
    //   container: 'container',
    //   width: 300,
    //   height: 300,
    // });
    // chart.data(this.data);
    // // Step 3: 创建图形语法，绘制柱状图
    // chart.interval().position('genre*sold');
    // // Step 4: 渲染图表
    // chart.render();
  },
};
</script>

<style lang="scss">
.vantd-card {
  .vantd-card-title {
    height: auto;
    overflow: hidden;
    span {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      float: left;
    }
    i {
      float: right;
    }
  }
  &-num {
    height: 38px;
    margin-top: 4px;
    margin-bottom: 0;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    font-size: 30px;
    line-height: 38px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  &-content {
    height: 46px;
  }
  &-footer {
    font-size: 14px;
    line-height: 22px;
    margin-top: 8px;
    padding-top: 9px;
    border-top: 1px solid #f0f0f0;
  }
}
/* .page-dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .temp-block {
    .slogan {
      font-size: 24px;
    }
  }
} */
</style>
