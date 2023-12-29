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
    
    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            },
            formatter:"{a}<br/>{b}：{c}"
        },
        
        xAxis: {
            type: 'time',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 500,
            axisLabel: {
                formatter: '{value}'
            }
        },
        legend: {
            data: ['设备A-温度','设备B-温度'],
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
        series: [
            {
                name: '设备A-温度',
                type: 'line',
                smooth: true,//是否平衡显示
                symbol: 'none',//是否显示点
                // areaStyle: {},//是否显示面积
                data: props.data[0]
            },
            {
                name: '设备B-温度',
                type: 'line',
                smooth: true,//是否平衡显示
                symbol: 'none',//是否显示点
                // areaStyle: {},//是否显示面积
                data: props.data[1]
            },
        
        ]
    };

    
    chartEch.setOption(option);
    chartEch.resize();
};

watch(() => AppGlobal.isDrawerState, (newData, oldValue) => {
    setTimeout(() => {
    updateChart();
}, 100);

})

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
