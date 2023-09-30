<template>
  <div :id="props.id" ref="rootRef" :style="{ width: '98%', height: '98%' }"></div>
</template>
<script lang="ts" name="checkReport" setup>
import {defineProps, onMounted, ref} from 'vue';
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import {ECharts, EChartsOption, init} from 'echarts';

const props = defineProps<{
  id: any ,
  data:any
}>();

const rootRef = ref();

const line = () => {
  const charEle = document.getElementById(props.id) as HTMLElement;
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },

    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      min: -500,
      max: 500,
      axisLabel: {
        formatter: '{value} °C'
      }

    },
    legend: {
      data: ['Fake Data', '2 Data', '1 Data']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 70,
        end: 100
      },
      {
        start: 70,
        end: 100,
        showDataShadow: 'auto'
      },
      {
        show: true,
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: [0],
        startValue: -100,
        endValue: 100
      }
    ],
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        magicType: { type: ['line', 'bar'] },
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        smooth: true,//是否平衡显示
        symbol: 'none',//是否显示点
        // areaStyle: {},//是否显示面积
        data: props.data[0]
      },
      {
        name: '2 Data',
        type: 'line',
        smooth: true,//是否平衡显示
        symbol: 'none',//是否显示点
        // areaStyle: {},//是否显示面积
        data: props.data[1]
      },
      {
        name: '1 Data',
        type: 'line',
        smooth: true,//是否平衡显示
        symbol: 'none',//是否显示点
        // areaStyle: {},//是否显示面积
        data: props.data[2]
      },
    ]
  };

  charEch.setOption(option);
  // 监听窗口变化 - 只刷新最后一个图表
  window.onresize = () => {
    charEch.resize();
  };

  // 监听窗口变化 - 多个图表同时刷新
  window.addEventListener('resize', () => {
    charEch.resize();
  });
};

/* ——————————————————————————生命周期配置—————————————————————————— */
onMounted(() => {
  // 这里是由于图表渲染快于父元素导致图表比例溢出，做的一个延缓操作
  setTimeout(() => {
    line();
  }, 1500);
});


</script>
<style lang="scss" scoped></style>
