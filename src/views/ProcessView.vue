<template>
  <div class=" rounded-2xl bg-white w-[98%] h-[97%] shadow items-center justify-center flex">

    <div class="rounded-2xl bg-white w-[100%] h-[100%]  bottom-0  shadow p-4 ">
      <AnalyCharts id="2" ref="Vibrationchartid" :data="data"
                   class=" h-[15vh] relative left-0 "
      ></AnalyCharts>
    </div>
  </div>

</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import {computed, onMounted, onUnmounted, ref} from "vue";
import AnalyCharts from "@/components/AnalyCharts.vue";

const Vibrationchartid = ref<any>(null);
/* ——————————————————————————声明echart—————————————————————————— */
let Vibrationchart;
let Temperaturechart;
var option;


onUnmounted(() => {
  echarts.dispose;
});

/* ——————————————————————————时间数据配置—————————————————————————— */
// 时间单位
let oneDay = 24 * 3600 * 1000;
// 初始时间原点
let base1 = +new Date();
let base2 = +new Date();
let base3 = +new Date();
// data数据
let data1 = [[base1, Math.random() * 300]];
for (let i = 1; i < 100; i++) {
  let now = new Date((base1 += oneDay));
  data1.push([+now, Math.round((Math.random() - 0.5) * 20 + data1[i - 1][1])]);
}
// data2数据
let data2 = [[base2, Math.random() * 300]];
for (let i = 1; i < 100; i++) {
  let now = new Date((base2 += oneDay));
  data2.push([+now, Math.round((Math.random() - 0.5) * 20 + data2[i - 1][1])]);
}
let data3 = [[base3, Math.random() * 300]];
for (let i = 1; i < 100; i++) {
  let now = new Date((base3 += oneDay));
  data3.push([+now, Math.round((Math.random() - 0.5) * 20 + data3[i - 1][1])]);
}
let data=[data1,data2,data3]


/* ——————————————————————————echarts配置—————————————————————————— */
function initChart() {

  // 把配置和数据放这里
  Vibrationchart.setOption({
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },

    grid: {
      x: 0,
      y: 0,
      x2: 0,
      y2: 0,
      width: "100%",
      hight: "100%",
      borderWidth: 1,
    },

    xAxis: {
      type: 'time',
      boundaryGap: false //就是会不会只能在线上
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 70,
        end: 100
      },
      {
        start: 70,
        end: 100
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        smooth: false,//是否平衡显示
        symbol: 'none',//是否显示点
        // areaStyle: {},//是否显示面积
        data: data
      },

    ]
  });

  // 把配置和数据放这里
  Temperaturechart.setOption({
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    grid: {
      x: 0,
      y: 0,
      x2: 0,
      y2: 0,
      width: "100%",
      hight: "100%",
      borderWidth: 1,
    },

    xAxis: {
      type: 'time',

      boundaryGap: false //就是会不会只能在线上
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 70,
        end: 100
      },
      {
        start: 70,
        end: 100
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        smooth: false,//是否平衡显示
        symbol: 'none',//是否显示点
        // areaStyle: {},//是否显示面积
        data: data
      },

    ]
  });
  window.onresize = function () {
    //自适应大小
    Vibrationchart.resize();
    Temperaturechart.resize();
  };
}

/* ——————————————————————————定时器时间函数配置—————————————————————————— */


</script>
<style>

</style>