<template>
    <div :id="props.id" ref="chartDiv" :style="{ width: '98%', height: '98%' }"></div>
</template>
<script lang="ts" name="checkReport" setup>
import {defineProps, onMounted, onUnmounted, ref, watch} from 'vue';
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import {ECharts, EChartsOption, init} from 'echarts';
import {useChartsData} from "@/store/ChartsData";
import {useAppGlobal} from "@/store/AppGlobal";
import {useRoute} from "vue-router";

const debug = true;

const AppGlobal = useAppGlobal();
const ChartsData = useChartsData()
const props = defineProps<{
    id: any,
    data: any
}>();
let chartEch: ECharts | null = null;
const rootRef = ref();
const chartDiv = ref<HTMLElement | null>(null);

const updateChart = async () => {
    
    if (!chartDiv.value || !chartEch) return;
    const dataSeries = await kValue(ChartsData.dataSeries)
    const dataLegend = ChartsData.dataLegend
    
    // 获取当前的选项
    const currentOption = chartEch.getOption();
    let currentDataZoom;
    // 检查返回的结果是否是 undefined
    if (currentOption) {
        currentDataZoom = currentOption.dataZoom;
    }
    if (debug) {
        console.log('【曲线对比】曲线数据项-下游', dataSeries)
        console.log('【曲线对比】曲线数据类型-下游', dataLegend)
    }
    // 数据k值处理，将dataSeries
    
    
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
                const unit = {
                    '温度': '℃',
                    '酸泵补料量': ' ml',
                    '碱泵补料量': ' ml',
                    '转速': ' r/min',
                    '补料二补料量': ' ml',
                    '补料一补料量': ' ml',
                    'PH': ' ',
                    '溶氧': ' %',
                    '补料二流速': ' ml/h',
                    '补料一流速': ' ml/h',
                }
                const chartScale = {
                    '溶氧': AppGlobal.chartScale.do_k,
                    'PH': AppGlobal.chartScale.ph_k,
                    '温度': AppGlobal.chartScale.temp_k,
                    '转速': AppGlobal.chartScale.rpm_k,
                    '酸泵补料量': AppGlobal.chartScale.acid_ml_k,
                    '碱泵补料量': AppGlobal.chartScale.lye_ml_k,
                    '补料一补料量': AppGlobal.chartScale.feed0_ml_k,
                    '补料二补料量': AppGlobal.chartScale.feed_ml_k,
                    '补料一流速': AppGlobal.chartScale.feed0_ml_h_k,
                    '补料二流速': AppGlobal.chartScale.feed_ml_h_k,
                }
                params.forEach((param, index) => {
                    // 帮我分割出-字符串
                    const str = param.seriesName.split('-')
                    if (chartScale[str[1]] !== 0) {
                        result += `${param.seriesName}: ${(param.value[1] * chartScale[str[1]])?.toFixed(2)}${unit[str[1]]} <br>`;
                        
                    } else {
                        result += `${param.seriesName}: ${(param.value[1])?.toFixed(2)}${unit[str[1]]} <br>`;
                        
                    }
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
            left: '5%',
            width: '70%'
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
        series: dataSeries
        
    };
    
    
    chartEch.setOption(option, true);
    // 恢复保存的缩放比例
    if (currentOption) {
        chartEch.setOption({dataZoom: currentDataZoom});
    }
    chartEch.resize();
};

watch(() => AppGlobal.isDrawerState, (newData, oldValue) => {
    setTimeout(() => {
        updateChart();
    }, 300);
    
})


const route = useRoute();
const updateTimer = ref<any>(null);

// 创建定时器的函数
function startTimer() {
    updateTimer.value = setInterval(async () => {
        // 这里放置定时器的逻辑
        if (ChartsData.dataSeries.length > 0) {
            if (chartEch !== null) {
                if (debug) {
                    console.log('【曲线更新】曲线数据项-下游', ChartsData.dataSeries);
                }
                const dataSeries = await kValue(ChartsData.dataSeries)
                chartEch.setOption({
                    series: dataSeries
                });
            }
        }
    }, AppGlobal.BeatTimer);
}

// 曲线k值函数,将曲线数据除k值
const kValue = (dataSeries: any) => {
    const chartScale = {
        '溶氧': AppGlobal.chartScale.do_k,
        'PH': AppGlobal.chartScale.ph_k,
        '温度': AppGlobal.chartScale.temp_k,
        '转速': AppGlobal.chartScale.rpm_k,
        '酸泵补料量': AppGlobal.chartScale.acid_ml_k,
        '碱泵补料量': AppGlobal.chartScale.lye_ml_k,
        '补料一补料量': AppGlobal.chartScale.feed0_ml_k,
        '补料二补料量': AppGlobal.chartScale.feed_ml_k,
        '补料一流速': AppGlobal.chartScale.feed0_ml_h_k,
        '补料二流速': AppGlobal.chartScale.feed_ml_h_k,
    }
    dataSeries.forEach((item: any) => {
        item.data.forEach((itemData: any) => {
            if (chartScale[item.name.split('-')[1]] !== 0) {
                itemData[1] = itemData[1] / chartScale[item.name.split('-')[1]]
            }
            
        })
    })
    return dataSeries
}


// 销毁定时器的函数
const stopTimer = () => {
    if (updateTimer.value) {
        clearInterval(updateTimer.value);
        updateTimer.value = null;
    }
};
watch(route, (to, from) => {
    // 当路由发生变化时执行的操作
    if (to.path === '/curvecompare') {
        // 当进入目标路由时执行的操作
        startTimer();
        setTimeout(() => {
            updateChart();
        }, 100);
    } else {
        // 当离开目标路由时执行的操作
        stopTimer()
    }
});


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
    
            startTimer();
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
