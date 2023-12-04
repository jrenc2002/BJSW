<!-- 这个是参数分析的图表，他需要选择批次，在选择完批次后可以获取其数据，选择批次使用下拉框 -->

<template>

    <div ref="chartDiv" :style="{ width: '98%', height: '98%' }"></div>

</template>

<script lang="ts" setup>
import {defineProps, onMounted, onUnmounted, ref, watch} from 'vue';
import {ECharts, EChartsOption, init} from 'echarts';
import {usePopupMangerState} from "@/store/PopupMangerState";

const props = defineProps<{ id: string }>();
const chartDiv = ref<HTMLElement | null>(null);
let chartEch: ECharts | null = null;
let data = ref();
let alarmLimit = ref(0);
let standardValue = ref(0);
const PopupMangerState = usePopupMangerState()

const updateChart = () => {
    
    if (!chartDiv.value || !chartEch) return;
    data.value = PopupMangerState.GraphData
    
    
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
            min: 0,
            max: PopupMangerState.kind === '温度' ? 100 : 20,
            axisLabel: {
                formatter: PopupMangerState.kind === '温度' ? '{value} °C' : '{value} mm/s'
            }
            
        },
        legend: {
            data: [PopupMangerState.kind]
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
                magicType: {type: ['line', 'bar']},
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                type: 'line',
                smooth: true,
                symbol: 'none',
                markLine: {
                    data: [{
                        yAxis: alarmLimit.value,
                        name: '报警上限',
                        label: {
                            formatter: '报警上限'
                        },
                        lineStyle: {
                            color: 'red',
                            type: 'dashed'
                        }
                    }]
                }
            },
            {
                type: 'line',
                smooth: true,
                symbol: 'none',
                markLine: {
                    data: [{
                        yAxis: standardValue.value,
                        name: '标准值',
                        label: {
                            formatter: '标准值'
                        },
                        lineStyle: {
                            color: 'blue',
                            type: 'solid'
                        }
                    }]
                }
            },
            {
                name: PopupMangerState.kind,
                type: 'line',
                smooth: true,//是否平衡显示
                symbol: 'none',//是否显示点
                // areaStyle: {},//是否显示面积
                data: data.value
            }
        ]
    };
    
    chartEch.setOption(option);
    chartEch.resize();
};


watch(() => PopupMangerState.setData.TempAlarm, (newData) => {
    if (PopupMangerState.kind === '温度') {
        alarmLimit.value = newData
        updateChart();
    }
    
})
watch(() => PopupMangerState.setData.VibrationAlarm, (newData) => {
    if (PopupMangerState.kind === '振动') {
        alarmLimit.value = newData
        updateChart();
    }
})
watch(() => PopupMangerState.setData.Standard, (newData) => {
    standardValue.value = newData
    updateChart();
})

watch(() => PopupMangerState.selectTabs, (newData) => {
    setTimeout(() => {
        updateChart();
    }, 500);
    
})
watch(() => PopupMangerState.isShowPop, (newData, oldValue) => {
    if (oldValue === false && newData === true) {
        
        setTimeout(() => {
            updateChart();
        }, 500);
    }
    
})
onMounted(() => {
    
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
    }, 500); // 延迟 500 毫秒
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
