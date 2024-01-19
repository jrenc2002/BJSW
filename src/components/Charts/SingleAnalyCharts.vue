<template>
  <div :id="props.id" ref="chartDiv" :style="{ width: '98%', height: '98%' }"></div>
</template>
<script lang="ts" name="checkReport" setup>
import {defineProps, onMounted, ref, onUnmounted, watch} from 'vue';
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import {ECharts, EChartsOption, init} from 'echarts';
import {useChartsData} from "@/store/ChartsData";
import {useAppGlobal} from "@/store/AppGlobal";
// todo 曲线刷新功能，为了保证内存只有监听到路由为曲线对比时才会定时渲染；
const debug = true;

const AppGlobal = useAppGlobal();
const ChartsData= useChartsData()
const props = defineProps<{
  id: any ,
  data:any
}>();
let chartEch: ECharts | null = null;
const rootRef = ref();
const chartDiv = ref<HTMLElement | null>(null);

const updateChart = () => {
    
    if (!chartDiv.value || !chartEch) return;
    const dataSeries = ChartsData.dataSeries
    const dataLegend = ChartsData.dataLegend

    // 获取当前的选项
    const currentOption = chartEch.getOption();
    let currentDataZoom;
    // 检查返回的结果是否是 undefined
    if (currentOption) {
         currentDataZoom = currentOption.dataZoom;
    }
    if (debug){
        console.log('【曲线对比】曲线数据项-下游',dataSeries)
        console.log('【曲线对比】曲线数据类型-下游',dataLegend)
    }
    
    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            },
            formatter: function (params) {
                let result = '时间: ';
                if (params.length > 0) {
                    let date = new Date(params[0].axisValue);
                    result += `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}<br>`;
                }
                params.forEach(param => {
                    result += `${param.seriesName}: ${param.value[1].toFixed(2)}<br>`;
                });
                return result;
            }
        },
        
        xAxis: {
            type: 'time',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            min: 0,
            axisLabel: {
                formatter: '{value}'
            }
        },
        legend: {
            data: dataLegend,
            type: 'scroll',
            left:'5%',
            width : '70%'
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
        series: dataSeries
    };
    
    
    chartEch.setOption(option, true);
    // 恢复保存的缩放比例
    if (currentOption) {
        chartEch.setOption({ dataZoom: currentDataZoom });
    }
    chartEch.resize();
};

watch(() => AppGlobal.isDrawerState, (newData, oldValue) => {
    setTimeout(() => {
    updateChart();
}, 100);

})
watch(() => ChartsData.dataSeries, () => {
    setTimeout(() => {
        updateChart();
    }, 400);
}, {deep: true});
watch(() => ChartsData.dataLegend, () => {
    setTimeout(() => {
        updateChart();
    }, 400);
}, {deep: true});
/* ——————————————————————————生命周期配置—————————————————————————— */
onMounted(() => {
  // 这里是由于图表渲染快于父元素导致图表比例溢出，做的一个延缓操作
    setTimeout(() => {
        if (chartDiv.value) {
            chartEch = init(chartDiv.value);
            window.addEventListener('resize', () => {
                if (chartEch) {
                    chartEch.resize();
                }
            });
            
            updateChart();
        }
    }, 100); // 延迟 500 毫秒
});
onUnmounted(() => {
    if (chartEch) {
        chartEch.dispose();
        chartEch = null;
    }
    window.removeEventListener('resize', updateChart);
});

</script>
<style lang="scss" scoped></style>
