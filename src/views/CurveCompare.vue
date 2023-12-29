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
                        <SingleAnalyCharts  id="1" ref="SingleTank" :data="data"
                                           class=" w-full relative left-0 "
                        ></SingleAnalyCharts>
   
                    </div>
                
                
                </div>
            
            </div>
        
        
        </div>
    </div>

</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from "vue";
import SingleAnalyCharts from "@/components/Charts/SingleAnalyCharts.vue";
import {useDeviceManage} from '@/store/DeviceManage'
import {useChartsData} from "@/store/ChartsData";
import {useAppGlobal} from "@/store/AppGlobal";
// TODO:完善曲线功能
// TODO:单罐曲线:左边选择各个罐，组件数据传入子组件，子组件上面选择各项参数
// TODO:单参数曲线:左边选择各个参数，组件数据传入子组件，子组件上面选择各项罐
const DeviceManage = useDeviceManage()
const ChartsData= useChartsData()
const SingleTank = ref<any>(null);
const AppGlobal = useAppGlobal();

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
    data1.push([+now, Math.round((Math.random() - 0.5) * 20 + data1[i - 1][1]),1]);
}
// data2数据
let data2 = [[base2, Math.random() * 300]];
for (let i = 1; i < 100; i++) {
    let now = new Date((base2 += oneDay));
    data2.push([+now, Math.round((Math.random() - 0.5) * 20 + data2[i - 1][1]),3]);
}
let data3 = [[base3, Math.random() * 300]];
for (let i = 1; i < 100; i++) {
    let now = new Date((base3 += oneDay));
    data3.push([+now, Math.round((Math.random() - 0.5) * 20 + data3[i - 1][1]),2]);
}
let data = [data1, data2, data3]


/* ——————————————————————————定时器时间函数配置—————————————————————————— */

/* ——————————————————————————数据更新—————————————————————————— */
watch(() => ChartsData.paramSelected, () => {
    updateChartData()
}, {deep: true});
watch(() => ChartsData.deviceSelected, () => {
    updateChartData()
}, {deep: true});


function updateChartData() {
    let series = [];
    ChartsData.deviceSelected.forEach((device, deviceIndex) => {
        if (device.selected) {
            // 如果设备被选中，则遍历所有参数
            ChartsData.paramSelected.forEach((param, paramIndex) => {
                if (param.selected) {
                    // 生成参数对应的数据，输入设备索引和参数索引获取相应的值，获取五万条数据
                    let ChartsData;
                    window.Electron.ipcRenderer.invoke('get-recent-fermentation-data',device.deviceNum,param.fieldName,10000).then(
                        (res) => {
                            if (res) { // 确保res是有效的
                                // gridOptions.data = res;
                                console.log(res);
                                
                                //
                                // // 如果参数也被选中，生成对应的系列
                                // series.push({
                                //     name: device.name + ' - ' + param.name, // 系列名称为“设备名称 - 参数名称”
                                //     type: 'line',
                                //     smooth: true,
                                //     symbol: 'none',
                                //     data:ChartsData  // 这里根据设备和参数索引从 allData 获取数据
                                // });
                            } else {
                                console.error('请求批次内容数据没请求到.');
                            }
                        }
                    ).catch((error) => {
                        console.error('请求批次内容数据没请求到,报错为:', error);
                    });
                    
                    
        
                }
            });
        }
    });
    
    return series;
    
    
}



/* ——————————————————————————设备选择器—————————————————————————— */

function initToDeviceSelect() {
    
    ChartsData.deviceSelected = DeviceManage.deviceList.map(device => ({
        name: device.name,
        deviceNum: device.deviceNum,
        selected: false
    }));
}

watch(() => DeviceManage.deviceList, () => {
    initToDeviceSelect()
}, {deep: true});

/* ——————————————————————————生命周期—————————————————————————— */
onMounted(() => {
    initToDeviceSelect()
})
</script>
<style>

</style>
