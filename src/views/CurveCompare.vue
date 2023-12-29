<template>
    <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
        <div class="w-full h-[6%] flex items-center justify-start text-[2vh] my-2 ml-4">
            曲线对比
        </div>
        <div class="rounded-2xl  w-[100%] h-[93%]  bottom-0    ">
            <div class="h-[3rem] bg-[#DAF0E4] rounded-t-lg w-[20rem] pt-2 px-2 flex gap-2">
                <div :class="[ChartsData.chartSelected==1?'bg-[#DAF0E4] hover:bg-[#B8D1C3]':'bg-[#A8CDB8] ']"
                     class=" w-[10rem] h-full relative rounded-t-lg flex justify-center items-center cursor-pointer "
                     @click="ChartsData.chartSelected=0">
                    单罐曲线
                </div>
                <div :class="[ChartsData.chartSelected==0?'bg-[#DAF0E4] hover:bg-[#B8D1C3]':'bg-[#A8CDB8]']"
                     class=" w-[10rem] h-full relative rounded-t-lg flex justify-center items-center cursor-pointer "
                     @click="ChartsData.chartSelected=1">
                    单参数曲线
                </div>
            </div>
            <div class="bg-[#DAF0E4] h-[calc(100%-3rem)]">
                <div class="h-[100%]  bg-white border-8 border-[#A8CDB8] rounded-xl relative flex">
                    <div class="w-[10rem] h-full  border-r-2 border-[#EBEBEB] overflow-auto">
                        <template v-if="ChartsData.chartSelected==1">
                            <div v-for="item in ChartsData.deviceSelected" :key="item.name"
                                 class="w-full h-[10%]   flex justify-center items-center">
                                <div :class="[item.selected?'bg-[#DAF0E4] text-black':'text-gray-500']"
                                     class="w-full mx-4 rounded-xl text-center  h-14 flex items-center justify-center cursor-pointer"
                                     @click="item.selected=!item.selected">
                                    {{ item.name }}
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div v-for="item in ChartsData.paramSelected" :key="item.name"
                                 class="w-full h-[10%]  flex justify-center items-center">
                                <div :class="[item.selected?'bg-[#DAF0E4] text-black':'text-gray-500']"
                                     class="w-full mx-4 rounded-xl text-center  h-14 flex items-center justify-center cursor-pointer"
                                     @click="item.selected=!item.selected">
                                    {{ item.name }}
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="w-[10rem] h-full  border-r-2 border-[#EBEBEB] overflow-auto">
                        <template v-if="ChartsData.chartSelected==0">
                            <div v-for="item in ChartsData.deviceSelected" :key="item.name"
                                 class="w-full h-[10%]   flex justify-center items-center">
                                <div :class="[item.selected?'bg-[#DAF0E4] text-black':'text-gray-500']"
                                     class="w-full mx-4 rounded-xl text-center  h-14 flex items-center justify-center cursor-pointer"
                                     @click="item.selected=!item.selected">
                                    {{ item.name }}
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div v-for="item in ChartsData.paramSelected" :key="item.name"
                                 class="w-full h-[10%]  flex justify-center items-center">
                                <div :class="[item.selected?'bg-[#DAF0E4] text-black':'text-gray-500']"
                                     class="w-full mx-4 rounded-xl text-center  h-14 flex items-center justify-center cursor-pointer"
                                     @click="item.selected=!item.selected">
                                    {{ item.name }}
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="h-full w-[calc(100%-10rem)] flex justify-center items-center">
                        <!--单罐-->
                        <SingleAnalyCharts v-show="ChartsData.chartSelected==0" id="1" ref="SingleTank" :data="data"
                                           class=" w-full relative left-0 "
                        ></SingleAnalyCharts>
                        <!--单参数-->
                        <ParamAnalyCharts v-show="ChartsData.chartSelected==1" id="2" ref="SingleParam" :data="data"
                                          class=" w-full relative left-0 ">
                        </ParamAnalyCharts>
                    </div>
                
                
                </div>
            
            </div>
        
        
        </div>
    </div>

</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import {onMounted, onUnmounted, ref, watch} from "vue";
import SingleAnalyCharts from "@/components/Charts/SingleAnalyCharts.vue";
import ParamAnalyCharts from "@/components/Charts/ParamAnalyCharts.vue";
import {useDeviceManage} from '@/store/DeviceManage'
import {useChartsData} from "@/store/ChartsData";
// TODO:完善曲线功能
// TODO:单罐曲线:左边选择各个罐，组件数据传入子组件，子组件上面选择各项参数
// TODO:单参数曲线:左边选择各个参数，组件数据传入子组件，子组件上面选择各项罐
const DeviceManage = useDeviceManage()
const ChartsData= useChartsData()
const SingleTank = ref<any>(null);
const SingleParam = ref<any>(null);


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

/* ——————————————————————————参数选择器—————————————————————————— */
// paramSelected

/* ——————————————————————————设备选择器—————————————————————————— */

function initToDeviceSelect() {
    
    ChartsData.deviceSelected = DeviceManage.deviceList.map(device => ({
        name: device.name,
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
