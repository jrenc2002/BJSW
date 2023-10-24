<template>


    <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
        <transition name="fade">
            <div
                    v-show="ProcessPopupMangerState.isShowPop"
                    class="rounded-2xl absolute bg-white bg-opacity-50 h-[calc(100%-2rem)] w-[calc(100%-2rem)]  z-30 backdrop-blur-sm items-center justify-center flex"
            >
                <ProcessPopupManger :popcontent="PopupType[ProcessPopupMangerState.popupContent]"
                                    class="w-full h-full "></ProcessPopupManger>
            </div>
        </transition>

        <!--    标题-->
        <div class="h-[6%] self-stretch justify-center items-center gap-4 inline-flex ">
            <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">分罐流程
            </div>
        </div>
        <!--    内容-->
        <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow  flex  ">
            <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
                <!--左侧控制栏-->
                <div class="h-full w-[20%] overflow-hidden p-1 flex-col gap-2.5 relative flex  items-end">
                    <!--溶氧栏-->

                    <div
                            class="card min-w-[10vw]  bg-base-100 shadow-lg  border border-zinc-100 cursor-pointer top-[6vh] absolute "
                            @click="popProcessManager('溶氧')">
                        <div
                                class="w-full h-[2.5rem] mb-2 font-black  bg-[#FAD6DA] flex items-center justify-center rounded-t-2xl ">

                            <div class="w-full text-center relative">
                                溶氧
                            </div>

                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-start  gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">设定值:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.DoData.SetData }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-start gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.DoData.MeasureData }}
                </span>
                            </div>

                            <div class="w-full  flex h-[3vh] flex items-center justify-start gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">溶氧上限:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                {{ DataManger.DoData.DOUpperLimit }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-start gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">溶氧下限:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                {{ DataManger.DoData.DOLowerLimit }}
                </span>

                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-start gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">关联转速:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                开启
                </span>

                            </div>

                        </div>
                    </div>
                    <!--转速栏-->
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border cursor-pointer border-zinc-100  top-[29vh] absolute  "
                         @click="popProcessManager('转速')">
                        <div
                                class="w-full h-[2.5rem]   mb-2 font-black  bg-[#E1EEFF] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative">
                                转速
                            </div>

                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">设定转速:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                                  {{ DataManger.RPMData.SetSpeed }}
                                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">实时转速:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.RPMData.NowSpeed }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">转速上限:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.RPMData.RPMUpperLimit }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">转速下限:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.RPMData.RPMLowerLimit }}
                </span>
                            </div>

                        </div>
                    </div>
                    <!--PH-->
                    <div
                            class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100  cursor-pointer top-[49vh] absolute "
                            @click="popProcessManager('PH值')">
                        <div
                                class="w-full h-[2.5rem]   mb-2 font-black  bg-[#FCF8DA] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative">
                                PH值
                            </div>

                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">设定值:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.PHData.SetData }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                   {{ DataManger.PHData.MeasureData }}
                </span>
                            </div>

                        </div>
                    </div>
                    <!--温度-->
                    <div
                            class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 cursor-pointer top-[65vh] absolute "
                            @click="popProcessManager('温度')">
                        <div
                                class="w-full h-[2.5rem]   mb-2 font-black  bg-[#D9F0E4] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative">
                                温度
                            </div>

                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">设定值:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                 {{ DataManger.TemperatureData.SetData }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2  ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.TemperatureData.MeasureData }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">加热功率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.TemperatureData.HeatingPower }}
                </span>
                            </div>

                        </div>
                    </div>
                </div>
                <!--中间图片-->
                <div class="h-full flex items-center justify-center">
                    <img class="h-[60vh]" mode="heightFix" src="@/assets/image/JarImage.png">
                </div>
                <!--右侧控制栏-->
                <div class="h-full w-[20%]  p-1 flex-col gap-2.5 relative flex  items-start">
                    <!--酸泵-->
                    <transition name="fade">
                        <div v-if="stateManger.AcidPump" class=" w-[10rem] p-3 flex-col flex justify-start items-center
           bg-base-100 shadow-lg min-h-[6rem] rounded-xl  border border-[#874C53] top-[4vh] absolute left-[-12rem]  ">
                            <div>
                                <label class="block text font-medium leading-4 text-gray-900 mt-2">补料速度</label>
                                <div class="mt-2">
                                    <input v-model="stateManger.AcidPumpSpeed"
                                           class="block w-full pl-2 rounded-md border-[#AEAEAE] border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[6vh] absolute ">
                        <div class="w-full h-[3rem] mb-2   bg-[#FAD6DA] flex items-center justify-center rounded-t-2xl ">

                            <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                                    <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                                </div>
                                <div :class="[stateManger.AcidPump?'text-white bg-[#E1A1A9]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                                     @click="stateManger.AcidPump=!stateManger.AcidPump">
                                    酸泵
                                </div>
                                <div :class="[stateManger.AddAcid?'text-white bg-[#E1A1A9]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                                     @click="handleHandControl('acid')">
                                    加酸
                                </div>
                            </div>

                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">实时速率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.acidPumpData.RealTimeRate }}
                </span>
                            </div>

                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.acidPumpData.FeedAmount }}
                </span>
                            </div>
                        </div>
                    </div>
                    <!--碱泵-->
                    <transition name="fade">
                        <div v-if="stateManger.LyePump" class=" w-[10rem] p-3 flex-col flex justify-start items-center
           bg-base-100 shadow-lg min-h-[6rem] rounded-xl  border border-[#A7C2E4] top-[21vh] absolute left-[-12rem]  ">

                            <div>
                                <label class="block text font-medium leading-4 text-gray-900 mt-2">补料速度</label>
                                <div class="mt-2">
                                    <input v-model="stateManger.LyePumpSpeed"
                                           class="block w-full pl-2 rounded-md border-[#AEAEAE] border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                        </div>
                    </transition>
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[21vh] absolute ">
                        <div class="w-full h-[3rem]   mb-2   bg-[#E1EEFF] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                                    <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                                </div>

                                <div :class="[stateManger.LyePump?'text-white bg-[#A8C2E4]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                                     @click="stateManger.LyePump=!stateManger.LyePump">
                                    碱泵
                                </div>
                                <div :class="[stateManger.AddLye?'text-white bg-[#A8C2E4]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-2 cursor-pointer "
                                     @click="handleHandControl('lye')">
                                    加碱
                                </div>
                            </div>

                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">实时速率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.lyePumpData.SetData }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.lyePumpData.MeasureData }}
                </span>
                            </div>

                        </div>
                    </div>
        
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[36vh] absolute ">

                        <div class="w-full h-[3rem]   mb-2   bg-[#FCF8DA] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                                    <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                                </div>

                                <div :class="[stateManger.DefoamerPump?'text-white bg-[#E4DDA4]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                                     @click="popProcessManager('消泡泵')">
                                    消泡泵
                                </div>
                                <div :class="[stateManger.Defoamer?'text-white bg-[#E4DDA4]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-2 cursor-pointer "
                                     @click="handleHandControl('defoamer')">
                                    消泡
                                </div>
                            </div>

                        </div>


                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">设定速率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.defoamerPumpData.SetData }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.defoamerPumpData.MeasureData }}
                </span>
                            </div>
                        </div>
                    </div>
                    <!--补料泵-->
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[51vh] absolute ">
                        <div class="w-full h-[3rem]   mb-2   bg-[#D9F0E4] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                                    <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                                </div>

                                <div :class="[stateManger.FeedPump?'text-white bg-[#9AD1B5]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                                     @click="popProcessManager('补料泵')">
                                    补料泵
                                </div>
                                <div :class="[stateManger.AddFeed?'text-white bg-[#9AD1B5]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-2 cursor-pointer "
                                     @click="stateManger.AddFeed=!stateManger.AddFeed">
                                    补料
                                </div>
                            </div>

                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">实时速率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.feedPumpData.SetData }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ DataManger.feedPumpData.MeasureData }}
                </span>
                            </div>

                        </div>
                    </div>
                    <button class="w-[10rem] h-[4rem] text-lg relative bg-[#4EA67D] rounded-xl text-white hover:bg-[#327E5B]  top-[67vh]"
                            @click="popProcessManager('开始发酵')">
                        开始发酵
                    </button>
                    <div class="w-[21rem] h-[4rem]  right-[11rem] relative  rounded-xl text-black flex    top-[68vh]">
                        <button :class="!isAll?'bg-white hover:bg-neutral-50':'bg-[#4EA67D] hover:bg-[#327E5B] text-white'"
                                class=" swap w-[10rem] h-[4rem] mr-4 text-lg  relative  border-2 border-[#327E5B] rounded-xl text-black  flex items-center justify-center "
                                >
                            <label class="swap swap-rotate w-full h-full">
                                <input v-model="isAll" type="checkbox" @click.stop="controlSend('begin_running',AppGlobal.pageChance,isAll)"/>
                                <div class="swap-on">开始运行中</div>
                                <div class="swap-off">一键开始</div>
                            </label>
                        </button>
                        <button class="w-[10rem] h-[4rem]  text-lg  relative bg-[#E0E0E0] rounded-xl text-black hover:bg-[#CBCBCB]  "
                                @click="controlSend('end_running',AppGlobal.pageChance,1)">
                            结束发酵
                        </button>


                    </div>


                </div>
            </div>

        </div>


    </div>


</template>

<script setup>
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {PopupType} from "@/store/ProcessPopupMangerState";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import ProcessPopupManger from "@/components/ProcessPopupManger.vue";
import {sendData} from "@/api";
import {useAppGlobal} from "@/store/AppGlobal";
import {useDeviceManage} from "@/store/DeviceManage";
import {toNumber} from "xe-utils";

const AppGlobal = useAppGlobal()
const DeviceManage = useDeviceManage();
const DataManger = reactive({
    DoData: {
        SetData: 0,
        MeasureData: 0,
        DOUpperLimit: 0,
        DOLowerLimit: 0
    },
    RPMData: {
        SetSpeed:0,
        NowSpeed: 0,
        RPMUpperLimit: 0,
        RPMLowerLimit: 120,
    },
    PHData: {
        SetData: 0,
        MeasureData: 0,
    },
    TemperatureData: {
        SetData: 0,
        MeasureData: 0,
        HeatingPower: 0,
        CondensateStatus: '关闭',
    },
    acidPumpData: {
        RealTimeRate: 0,
        FeedAmount: 0,
    },
    lyePumpData: {
        SetData: 0,
        MeasureData: 0,
    },
    defoamerPumpData: {
        SetData: 0,
        MeasureData: 0,
    },
    feedPumpData: {
        SetData: 0,
        MeasureData: 0,
    },

})
const isAll = ref(false);
watch(() => isAll.value, () => {
    console.log(isAll.value)
}, {deep: true});
watch(() => DeviceManage.deviceList[AppGlobal.pageChance].nowData, () => {
    initDataManger()
}, {deep: true});


const initDataManger = () => {
    if (!DeviceManage.deviceList || !Array.isArray(DeviceManage.deviceList)) {
        console.error("DeviceManage.deviceList未定义或不是数组。");
        return;
    }

    // 检查索引是否有效
    if (typeof AppGlobal.pageChance !== 'number' || AppGlobal.pageChance < 0 || AppGlobal.pageChance >= DeviceManage.deviceList.length) {
        console.error("AppGlobal.pageChance is an invalid index.");
        return;
    }
    const currentDeviceData = DeviceManage.deviceList[AppGlobal.pageChance].nowData;
    if (!currentDeviceData) {
        console.error("当前设备没有定义nowData。");
        return;
    }
    function formatData(value) {
        return typeof value === "number" ? value.toFixed(2) : value;
    }

    let currentDevice = DeviceManage.deviceList[AppGlobal.pageChance].nowData;

    DataManger.DoData.SetData = formatData(currentDevice.target_DO);
    DataManger.DoData.MeasureData = formatData(currentDevice.timing_DO);
    DataManger.DoData.DOUpperLimit = formatData(currentDevice.DO_upper_limit);
    DataManger.DoData.DOLowerLimit = formatData(currentDevice.DO_lower_limit);
    DataManger.RPMData.RPMUpperLimit = currentDevice.motor_speed_u_limit;
    DataManger.RPMData.RPMLowerLimit = currentDevice.motor_speed_l_limit;
    DataManger.RPMData.NowSpeed= currentDevice.timing_motor_speed;
    DataManger.RPMData.SetSpeed= currentDevice.target_motor_speed;
    DataManger.PHData.SetData = formatData(currentDevice.target_PH);
    DataManger.PHData.MeasureData = formatData(currentDevice.timing_PH);
    DataManger.TemperatureData.SetData = formatData(currentDevice.target_temp);
    DataManger.TemperatureData.MeasureData = formatData(currentDevice.timing_temp);
    DataManger.TemperatureData.HeatingPower = formatData(currentDevice.heatpower);
    DataManger.TemperatureData.CondensateStatus = currentDevice.water_flag === 0 ? '关闭' : '开启';
    DataManger.acidPumpData.RealTimeRate = formatData(currentDevice.acid_pump_now_speed);
    DataManger.acidPumpData.FeedAmount = formatData(currentDevice.acid_pump_now_ml);
    DataManger.lyePumpData.SetData = formatData(currentDevice.lye_pump_now_speed);
    DataManger.lyePumpData.MeasureData = formatData(Number(currentDevice.lye_pump_now_ml));
    DataManger.defoamerPumpData.SetData = formatData(Number(currentDevice.defoam_pump_now_speed));
    DataManger.defoamerPumpData.MeasureData = formatData(Number(currentDevice.defoam_pump_now_speed));
    DataManger.feedPumpData.SetData = formatData(currentDevice.feed_pump_now_speed);
    DataManger.feedPumpData.MeasureData = formatData(Number(currentDevice.feed_pump_now_ml));


}
let lastClickTime = 0;
const controlSend = ((name, index, content) => {
    const debounceTime = 300; // 300ms
    const currentTime = new Date().getTime();
    
    if (currentTime - lastClickTime < debounceTime) {
        return; // If the function was called recently, do nothing
    }
    
    lastClickTime = currentTime; // Update the last clicked time
    
    if (name === 'begin_running') {

        if (isAll.value) {
            // 四个同时开启运行
            const data = {
                PH_flag: 0,
                DO_flag: 0,
                temp_flag: 0,
                start_flag:0
            }
        
            sendData(index, data);
        } else {
            // 四个同时开启运行
            const data = {
                PH_flag: 1,
                DO_flag: 1,
                temp_flag: 1,
                start_flag:1
            }
            sendData(index, data);
        }

    } else if (name === 'end_running') {
        // TODO: 关闭运行时应该用什么逻辑
        const data = {
            PH_flag: 0,
            DO_flag: 0,
            temp_flag: 0,
            start_flag:0
        }
    
        sendData(index, data);
    }
    else if (name === 'acid_pump_set') {
        const data = {
            acid_pump_now_set_speed: toNumber(content)
        }

        console.log(data)
        sendData(index, data);
    }
    else if (name === 'lye_pump_set') {
        const data = {
            lye_pump_now_set_speed: toNumber(content)
        }

        console.log(data)
        sendData(index, data);
    }

})
const ProcessPopupMangerState = useProcessPopupMangerState()
// 弹窗管理
const popProcessManager = (val) => {
    if ( val === '消泡泵') {
        stateManger.DefoamerPump = !stateManger.DefoamerPump;
    }
    if (val === '补料泵') {
        stateManger.FeedPump = !stateManger.FeedPump;
    }
    console.log(name_translation[val], val, 'val______')
    ProcessPopupMangerState.updateIsShowPop(true)
    ProcessPopupMangerState.updatePopupContent(name_translation[val])
}
watch(() => ProcessPopupMangerState.isShowPop, (newValue, oldValue) => {

    if (newValue == false && oldValue == true) {
        stateManger.FeedPump = false
        stateManger.DefoamerPump = false
    }
});
// 当按下键盘时的处理函数，ESC关闭弹窗
const handleKeydownEsc = (event) => {
    if (event.keyCode === 27) { // 27 是 esc 键的 keyCode

        // 在此处执行你想要的操作
        ProcessPopupMangerState.updateIsShowPop(false)
        stateManger.FeedPump = false
        stateManger.DefoamerPump = false
    }
};
const name_translation = {
    '温度': 'Temperature',
    'PH值': 'PHValue',
    '转速': 'RPM',
    '溶氧': 'DissolvedOxygen',
    '补料泵': 'FeedPump',
    '消泡泵': 'DefoamerPump',
    '开始发酵': 'BeginFermentation',
}
const stateManger = reactive({
    AcidPump: false,
    AddAcid: false,
    LyePump: false,
    AddLye: false,
    DefoamerPump: false,
    Defoamer: false,
    FeedPump: false,
    AddFeed: false,
    AcidPumpSpeed: 0,
    LyePumpSpeed: 0,
    DefoamerPumpSpeed: 0,
})

const handleHandControl = ((content) => {

    if (content == 'lye') {
        if (stateManger.LyePumpSpeed !== 0&&stateManger.LyePumpSpeed!=undefined&&stateManger.LyePumpSpeed!=null) {
            if (!stateManger.AddLye) {

                controlSend('lye_pump_set',AppGlobal.pageChance,stateManger.LyePumpSpeed)
                stateManger.AddLye = !stateManger.AddLye

            }
            else {
                stateManger.LyePumpSpeed = 0
                stateManger.AddLye = !stateManger.AddLye
                controlSend('lye_pump_set',AppGlobal.pageChance,stateManger.LyePumpSpeed)

            }
        } else {
            stateManger.LyePump = !stateManger.LyePump
        }
    }
    else  if (content == 'acid') {
        if (stateManger.AcidPumpSpeed !== 0&&stateManger.AcidPumpSpeed!=undefined&&stateManger.AcidPumpSpeed!=null) {
            
            if (!stateManger.AddAcid) {
                
                controlSend('acid_pump_set',AppGlobal.pageChance,stateManger.AcidPumpSpeed)
                stateManger.AddAcid = !stateManger.AddAcid

            }
            else {
                stateManger.AcidPumpSpeed = 0
                stateManger.AddAcid = !stateManger.AddAcid
                controlSend('acid_pump_set',AppGlobal.pageChance,stateManger.LyePumpSpeed)

            }
            
        } else {
            stateManger.AcidPump = !stateManger.AcidPump
     
        }
    }

})

onMounted(() => {
    window.addEventListener('keydown', handleKeydownEsc);
    initDataManger()

})
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydownEsc);
});
</script>

<style lang="scss" scoped>

.fade-enter-from {
  transform-origin: right center;
  transform: scale(0.5);
  opacity: 0;
}

.fade-leave-to {
  transform-origin: right center;
  transform: scale(0.5);
  opacity: 0;
}
</style>
