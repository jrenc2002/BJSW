<template>
    <div :class="[AppGlobal.isDrawerState? 'w-[calc(94vw-15rem)]':'w-[94vw]']"
         class="h-[94vh] transition-all duration-300 ease-in-out shadow bg-white rounded-2xl">
        
        <!--    标题-->
        <div class="h-[6%] self-stretch justify-start items-center  inline-flex mt-3  w-full ">
            <div class="w-[30rem] text-xl  leading-10 text-zinc-900 text-2xl font-semibold leading-loose left-10 relative">
                {{ getDeviceName(props.name) }}
            </div>
            <div class="w-[calc(100%-10rem)] relative justify-end flex mr-3 ">
                
                <div
                        class="bg-[#F5F5F5] right-0 relative w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer"
                        @click="$emit('update:switch', false)">
                    <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                              fill="#19161D"/>
                    </svg>
                </div>
            </div>
        </div>
        <!--    表格栏-->
        <div class="  w-[100%] h-[94%]  bottom-0   items-center justify-center flex  ">
            <div :id="1" ref="chartDiv" :style="{ width: '98%', height: '98%' }"></div>
        
        </div>
    
    
    </div>


</template>

<script lang='ts' setup>

// ______________________导入模块_______________________
import {usePopupMangerState} from "@/store/PopupMangerState";
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
import {defineProps, onMounted, ref, onUnmounted, watch,defineEmits} from 'vue';
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import {ECharts, EChartsOption, init} from 'echarts';
import {useChartsData} from "@/store/ChartsData";

const ChartsData= useChartsData()
let chartEch: ECharts | null = null;
const rootRef = ref();
const chartDiv = ref<HTMLElement | null>(null);

const props = defineProps({
    switch: Boolean,
    data: Object,
    name: String,
})
const switchEmit = defineEmits(['update:switch']);
const DeviceManage = useDeviceManage();
const PopupMangerState = usePopupMangerState()
const AppGlobal = useAppGlobal();
import {useRoute} from "vue-router";
// ______________________表格数据处理_______________________
const route = useRoute();

// todo 批次数据
//  没有刷新名称罐号

// 当按下键盘时的处理函数，ESC关闭弹窗
const handleKeydown = (event) => {
    if (event.keyCode === 27) { // 27 是 esc 键的 keyCode
        switchEmit('update:switch', !props.switch);
    }
};

// ______________________生命周期_______________________

// 当组件挂载时添加事件监听器
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    
});

// 当组件卸载时移除事件监听器
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});


const tableDataSeries=ref();
const tableDatadLegend=ref(
    ['实时溶氧','实时PH','实时温度','实时转速','酸泵补料量','碱泵补料量','补料泵一补料量','补料泵二补料量','实时泵一速度','实时泵二速度']
);

const updateChart = async () => {
    
    if (!chartDiv.value || !chartEch) return;
    const dataSeries = await kValue(tableDataSeries.value)
    const dataLegend = tableDatadLegend.value
    
    // 获取当前的选项
    const currentOption = chartEch.getOption();
    let currentDataZoom;
    // 检查返回的结果是否是 undefined
    if (currentOption) {
        currentDataZoom = currentOption.dataZoom;
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
                    if (chartScale[param.seriesName]!==0){
                       result += `${param.seriesName}: ${(param.value[1] * chartScale[param.seriesName]*chartScale[param.seriesName])?.toFixed(2)}${unit[param.seriesName]} <br>`;
    
                    }
                    else {
                        result += `${param.seriesName}: ${(param.value[1])?.toFixed(2)}${unit[param.seriesName]} <br>`;
    
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
            width: '70%',
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
watch(route, (to, from) => {
    // 当路由发生变化时执行的操作
    if (to.path === '/historicaldata'||to.path === '/candata') {
        // 当进入目标路由时执行的操作
        setTimeout(() => {
            updateChart();
        }, 500);
    }
});
watch(() => AppGlobal.isDrawerState, (newData, oldValue) => {
    setTimeout(() => {
        updateChart();
    }, 300);
})
watch(() => props.switch, (newData, oldValue) => {
    setTimeout(() => {
        updateChart();
    }, 500);
})
watch(() => props.data, (newData, oldValue) => {
    
    tableDataSeries.value = [
        {
            name: "溶氧",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(), // 将时间字符串转换为时间戳
                item.timing_DO // 假设这是需要的数据值
            ])
        },
        {
            name: "PH",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(),
                item.timing_PH
            ])
        },
        {
            name: "温度",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(),
                item.timing_temp
            ])
        },
        {
            name: "转速",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(),
                item.timing_motor_speed
            ])
        },
        {
            name: "酸泵补料量",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(), // 同样，将时间字符串转
                item.acid_ml
            ])
        },
        
        {
            name: "碱泵补料量",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(),
                item.lye_ml
            ])
        },
        {
            name: "补料一补料量",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(),
                item.clean_ml
            ])
        },
        {
            name: "补料二补料量",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(),
                item.feed_ml
            ])
        },
        {
            name: "补料一流速",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(),
                item.defoamerPumpSpeed
            ])
        },
        {
            name: "补料二流速",
            type: "line",
            smooth: true,
            symbol: "none",
            data: props.data?.map(item => [
                new Date(item.absolute_time).getTime(),
                item.feedPumpSpeed
            ])
        }
    ];
    setTimeout(() => {
        updateChart();
    }, 500);
})
const kValue = (dataSeries:any) => {
    const chartScale={
        '溶氧':AppGlobal.chartScale.do_k,
        'PH':AppGlobal.chartScale.ph_k,
        '温度':AppGlobal.chartScale.temp_k,
        '转速':AppGlobal.chartScale.rpm_k,
        '酸泵补料量':AppGlobal.chartScale.acid_ml_k,
        '碱泵补料量':AppGlobal.chartScale.lye_ml_k,
        '补料一补料量':AppGlobal.chartScale.feed0_ml_k,
        '补料二补料量':AppGlobal.chartScale.feed_ml_k,
        '补料一流速':AppGlobal.chartScale.feed0_ml_h_k,
        '补料二流速':AppGlobal.chartScale.feed_ml_h_k,
    }
    
    dataSeries?.forEach((item:any) => {
        item.data.forEach((itemData:any) => {
            if (chartScale[item.name]!==0){
                itemData[1] = itemData[1]/chartScale[item.name]
            }
        })
    })
    
    return dataSeries
}

// 我希望你给我写个函数根据罐号cannumber在DeviceManage.deviceList里面找到对应的相同deviceNum的name，没找到返回罐号
const getDeviceName = (cannumber) => {
    let deviceName = cannumber;
    DeviceManage.deviceList.forEach((device) => {
        if (device.deviceNum === cannumber) {
            deviceName = device.name;
        }
    });
    return deviceName;
};
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
<style lang="scss" scoped>


table {
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  border-spacing: 0;

}

//
th {
  //word-break: break-all;
  //word-wrap: break-word;
  //height: 40px;
  //width: 100px;
  //vertical-align: middle;
  //text-align: center;
  //border-left: 1px solid #999;
  //background: #d9d9d9;
  //box-sizing: border-box;
  height: 4.5rem;

}

td {
  //word-break: break-all;
  //word-wrap: break-word;
  //width: 100px;
  //text-align: center;
  //vertical-align: middle;
  //line-height: 30px;
  //border-left: 1px solid #999;
  //box-sizing: border-box;
  height: 4.5rem;
}

//
//tr {
//  border-top: 1px solid #999;
//  box-sizing: border-box;
//}


.right-div {
  float: left;
  width: calc(100vw - 100px);
  margin-left: -1px;
}

.right-div1 {
  overflow: hidden;

  .first-row-style {
    box-sizing: border-box;
  }
}

.right-div2 {
  overflow: auto;
}

.right-table2 {
  overflow: hidden;
}


.empty-content {
  width: 100%;
  overflow: auto;
}


</style>

