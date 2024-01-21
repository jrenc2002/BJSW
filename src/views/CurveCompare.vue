<template>
    <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
        <div class="w-full h-[6%] flex items-center justify-start text-[1.4rem] my-2 ml-4">
            曲线对比
        </div>
        <div class="rounded-2xl  w-[100%] h-[93%]  bottom-0    ">
            
            <div class="bg-[#DAF0E4] h-[calc(100%)]">
                <div class="h-[100%]  bg-white border-8 border-[#A8CDB8] rounded-xl relative flex">
                    <div class="w-[10rem] h-full  border-r-2 border-[#EBEBEB] overflow-auto">
                        
                        <div v-for="item in ChartsData.paramSelected" :key="item.name"
                             class="w-full h-[10%]   flex justify-center items-center">
                            <div :class="[item.selected?'bg-[#DAF0E4] text-black':'text-gray-500']"
                                 class="w-full mx-4 rounded-xl text-center  h-14 flex items-center justify-center cursor-pointer"
                                 @click="item.selected=!item.selected">
                                {{ item.name }}
                            </div>
                        </div>
                    
                    </div>
                    <div class="w-[10rem] h-full  border-r-2 border-[#EBEBEB] overflow-auto">
                        
                        <div v-for="item in ChartsData.deviceSelected" :key="item.name"
                             class="w-full h-[10%]   flex justify-center items-center">
                            <div :class="[item.selected?'bg-[#DAF0E4] text-black':'text-gray-500']"
                                 class="w-full mx-4 rounded-xl text-center  h-14 flex items-center justify-center cursor-pointer"
                                 @click="item.selected=!item.selected">
                                {{ item.name }}
                            </div>
                        </div>
                    
                    </div>
                    <div class="h-full w-[calc(100%-20rem)] flex justify-center items-center "
                    >
                        <!--单罐-->
                        <SingleAnalyCharts id="1" ref="SingleTank" :data="data"
                                           class=" w-full relative left-0 "
                        ></SingleAnalyCharts>
                    
                    </div>
                
                
                </div>
            
            </div>
        
        
        </div>
    </div>

</template>

<script lang="js" setup>
import {onMounted, ref, watch} from "vue";
import SingleAnalyCharts from "@/components/Charts/SingleAnalyCharts.vue";
import {useDeviceManage} from '@/store/DeviceManage'
import {useChartsData} from "@/store/ChartsData";
import {useAppGlobal} from "@/store/AppGlobal";
const DeviceManage = useDeviceManage()
const ChartsData = useChartsData()
const SingleTank = ref(null);
const AppGlobal = useAppGlobal();
const debug = false


/* ——————————————————————————定时器时间函数配置—————————————————————————— */

/* ——————————————————————————数据更新—————————————————————————— */
watch(() => ChartsData.paramSelected, () => {
    updateChartData()
}, {deep: true});
watch(() => ChartsData.deviceSelected, () => {
    
    updateChartData()
}, {deep: true});

function convertToEchartsData(resData, fieldName) {
    
    let echartsData = [];
    resData.forEach(item => {
        // 将时间字符串转换为Date对象，然后转换为时间戳
        let date = new Date(Number(item.absolute_time));
        let timestamp = date.getTime();
        
        // 将时间戳和lye_ml的值作为一个数组添加到echartsData中
        echartsData.push([timestamp, item[fieldName]]);
    });
    return echartsData;
}

function updateChartData() {
    let series = [];
    let legend = [];
    ChartsData.deviceSelected.forEach((device, deviceIndex) => {
        if (device.selected) {
            // 如果设备被选中，则遍历所有参数
            ChartsData.paramSelected.forEach((param, paramIndex) => {
                if (param.selected) {
                    
                    // 生成参数对应的数据，输入设备索引和参数索引获取相应的值，获取五万条数据
                    let ChartsData;
                    window.Electron.ipcRenderer.invoke('get-recent-fermentation-data', device.deviceNum, param.fieldName, 10000).then(
                        (res) => {
                            if (res) { // 确保res是有效的
                         
                                ChartsData = convertToEchartsData(res, param.fieldName);
                                // 如果参数也被选中，生成对应的系列
                                series.push({
                                    name: device.name + '-' + param.name, // 系列名称为“设备名称 - 参数名称”
                                    type: 'line',
                                    smooth: true,
                                    symbol: 'none',
                                    data: ChartsData  // 这里根据设备和参数索引从 allData 获取数据
                                });
                                legend.push(device.name + '-' + param.name);
                              
                            } else {
                                console.error('请求批次内容数据没请求到.');
                            }
                        }).catch((error) => {
                        console.error('请求批次内容数据没请求到,报错为:', error);
                    });
                    
                    
                }
            });
        }
    });
    ChartsData.dataSeries = series;
    ChartsData.dataLegend = legend;
    if (debug) {
        console.log('【曲线对比】曲线数据项-上游', ChartsData.dataSeries)
        console.log('【曲线对比】曲线数据类型-上游', ChartsData.dataLegend)
    }
    // 定时器，将DeviceManage.deviceList[AppGlobal.pageChance].nowdata的数据更新到ChartsData.dataSeries里
    setInterval(() => {
        if (ChartsData.dataSeries.length > 0) {
            updateRecentChartData();
        }
    }, AppGlobal.BeatTimer);
    return series;
}


function updateRecentChartData() {
    let series = ChartsData.dataSeries || [];
    let legend = ChartsData.dataLegend || [];
    ChartsData.deviceSelected.forEach((device) => {
        if (device.selected) {
            ChartsData.paramSelected.forEach((param) => {
                if (param.selected) {
                    window.Electron.ipcRenderer.invoke('get-recent-fermentation-data', device.deviceNum, param.fieldName, 10).then(
                        (res) => {
                        
                            if (res) {
                                let newData = convertToEchartsData(res, param.fieldName);
                                
                                // 寻找现有数据系列
                                let existingSeries = series.find(s => s.name === device.name + '-' + param.name);
                            
                          
                                if (existingSeries) {
                                 
                                    // 合并数据，并确保数据不超过10000条
                                    existingSeries.data = mergeChartData(existingSeries.data, newData);
                                }
                            } else {
                                console.error('请求批次内容数据没请求到.');
                            }
                        }).catch((error) => {
                        console.error('请求批次内容数据没请求到,报错为:', error);
                    });
                }
            });
        }
    });
    ChartsData.dataSeries = series;
    ChartsData.dataLegend = legend;
    console.log('【曲线更新】曲线数据项-上游', ChartsData.dataSeries)
    console.log('【曲线更新】曲线数据类型-上游', ChartsData.dataLegend)
    return series;
}

function mergeChartData(existingData, newData) {

    const maxSize = 10000;
    // 去除与最新10条数据重复的数据
    newData.forEach(itemB => {
        // 检查 existingData 数组的前 10 个元素是否包含 itemB 时间戳
        let exists = existingData.slice(0, 10).some(existingItem => existingItem[0] === itemB[0]);

        // 如果不存在，将 itemB 添加到 existingData 的开头
        if (!exists) {
            existingData.unshift(itemB);
        }
    });

    // 根据数据量调整数据
    if (existingData.length > maxSize) {
        // 如果数据超过10000条，则移除最早的数据以保持总量为10000
        return existingData.slice(0,maxSize);
    }
    
    return existingData;
}

/*
* 关于曲线的实时更新他有两种解决方法
* 1. 系统开销大较但简单
* 将读到的数据存入数据库，取数据从数据库中全部读取出来
* 2. 较为复杂
* 将读到的数据存入数据库，取数据用watch去socket里取
* 可能会造成数据不统一的问题？会吗，不会吧。那就这个。√
* 然后这个也是上下游，上游更新数据，下游更新图表。
* 3. 结合
* 读到的数据存入数据库，取数据从数据库取出100个然后
* */



function initToDeviceSelect() {
    
    ChartsData.deviceSelected = DeviceManage.deviceList.map(device => ({
        name: device.name,
        deviceNum: device.deviceNum,
        selected: false
    }));
}

watch(() => DeviceManage.deviceList.length, () => {
    initToDeviceSelect()
});


/* ——————————————————————————生命周期—————————————————————————— */
onMounted(() => {
    initToDeviceSelect()
})
</script>
<style>

</style>
