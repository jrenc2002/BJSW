<template>
    <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
        <div class="h-[6%] self-stretch justify-center items-center gap-4 inline-flex ">
            <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">批次校准
            </div>
        </div>
        <!--    内容-->
        <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow  flex items-center justify-center  ">
            <div class="relative top-[-2.5rem]">
                
                <div class="w-[25rem] h-[23rem] relative bg-white bg-opacity-80 border overflow-hidden border-gray-100 rounded-xl shadow m-3">
                    
                    <div class="w-full h-[4rem] left-0 top-0 relative bg-yellow-100 bg-opacity-60
        flex items-start justify-center ">
                        <div
                                class="w-full h-full flex ml-5 items-center justify-start  text-center text-black text-xl  font-['Inter'] leading-none gap-2">
                            传感器校准
                            <button class="bg-white p-1 border-gray-300 border text-sm hover:bg-gray-100"
                                    @click="SensorCalibrateReset()">校准重置
                            </button>
                        </div>
                    
                    </div>
                    <div class="w-full h-[10rem]    relative flex-col flex justify-start items-center ">
                        <div
                                class="w-full flex items-center justify-center h-[3rem]  relative text-center text-black text-xl font-normal font-['Inter'] leading-none">
                            溶氧校准
                        </div>
                        <div class="w-full  mt-1 h-[3rem]  relative flex items-center justify-center ">
                            <div class="w-full  mt-1 h-[2rem] relative flex items-center justify-center gap-2.5">
                                <div
                                        class="w-[4rem]  h-full text-center text-black text font-normal font-['Inter']  flex items-center justify-center">
                                    零点校准
                                </div>
                                <div
                                        class="w-[4rem] h-full  bg-[#DAF0E4]  hover:bg-[#C3DBCE] rounded-md flex items-center justify-center mx-2">
                                    <button
                                            v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData == null || DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag == 0"
                                            class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                                            @click.stop="DoCalibrate('zeroBegin')">
                                        开始
                                    </button>
                                    <button
                                            v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData !== null && DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag == 1"
                                            class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                                            @click.stop="DoCalibrate('zeroEnd')">
                                        锁定
                                    </button>
                                </div>
                                <div class="w-[10rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2 flex  items-center">
                                    {{
                                        DeviceManage.deviceList[AppGlobal.pageChance].nowData == null || DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag == 1 ? (DeviceManage.deviceList[AppGlobal.pageChance].nowData == null ? 0 : DeviceManage.deviceList[AppGlobal.pageChance].nowData.timing_DO) : DeviceManage.deviceList[AppGlobal.pageChance].nowData.zero_point_value
                                    }}
                                
                                </div>
                            
                            </div>
                        </div>
                        <div class="w-full  mt-1 h-[4rem] relative flex items-center justify-center ">
                            <div class="w-full  mt-1 h-[2rem] relative flex items-center justify-center gap-2.5">
                                <div
                                        class="w-[4rem]  h-full text-center text-black text font-normal font-['Inter']  flex items-center justify-center">
                                    饱和校准
                                </div>
                                <div
                                        class="w-[4rem] h-full  bg-[#DAF0E4]  hover:bg-[#C3DBCE] rounded-md flex items-center justify-center mx-2">
                                    <button
                                            v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData == null || DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_saturation_calibration_flag == 0"
                                            class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                                            @click.stop="DoCalibrate('saturationBegin')">
                                        开始
                                    </button>
                                    <button
                                            v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData !== null && DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_saturation_calibration_flag == 1"
                                            class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                                            @click.stop="DoCalibrate('saturationEnd')">
                                        锁定
                                    </button>
                                </div>
                                <div class="w-[10rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2 items-center flex">
                                    {{
                                        DeviceManage.deviceList[AppGlobal.pageChance].nowData == null || DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_saturation_calibration_flag == 1 ? (DeviceManage.deviceList[AppGlobal.pageChance].nowData == null ? 0 : DeviceManage.deviceList[AppGlobal.pageChance].nowData.timing_DO) : DeviceManage.deviceList[AppGlobal.pageChance].nowData.saturation_value
                                    }}
                                
                                
                                </div>
                            
                            </div>
                        </div>
                    
                    </div>
                    <div class="w-full h-[10rem]    relative flex-col flex justify-start items-center ">
                        <div
                                class="w-full flex items-center justify-center h-[3rem]  relative text-center text-black text-xl font-normal font-['Inter'] leading-none">
                            PH校准
                        </div>
                        <div class="w-full  mt-1 h-[3rem]  relative flex items-center justify-center ">
                            <div class="w-full  mt-1 h-[2rem] relative flex items-center justify-center gap-2.5">
                                <div
                                        class="w-[4rem]  h-full text-center text-black text font-normal font-['Inter']  flex items-center justify-center">
                                    两点校准
                                </div>
                                <div
                                        class="w-[4rem] h-full  bg-[#DAF0E4] hover:bg-[#C3DBCE] rounded-md flex items-center justify-center mx-2">
                                    <button
                                            v-if="!currentNowDataZero||(currentNowDataZero&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status==0)"
                                            class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                                            @click.stop="PHCalibrate('phBegin')">
                                        开始
                                    </button>
                                    <button
                                            v-if="currentNowDataZero&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status ==2"
                                            class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                                            @click.stop="PHCalibrate('phContinue')">
                                        继续
                                    </button>
                                    <button
                                            v-if="currentNowDataZero&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 4"
                                            class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                                            @click.stop="PHCalibrate('phFinish')">
                                        完成
                                    </button>
                                    <button
                                            v-if="currentNowDataZero&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 1"
                                            class="w-full h-full  text-center text-black text-sm font-normal font-['Inter'] leading-none flex items-center justify-center"
                                    >
                                        酸校准中
                                    </button>
                                    <button
                                            v-if="currentNowDataZero&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 3"
                                            class="w-full h-full  text-center text-black text-sm font-normal font-['Inter'] leading-none flex items-center justify-center"
                                    >
                                        碱校准中
                                    </button>
                                </div>
                                <div class="w-[10rem] h-full bg-white gap-2 flex">
                                    <div class="w-[4.75rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2 flex items-center">
                                        酸校准
                                    </div>
                                    <div class="w-[4.75rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2 flex items-center">
                                        碱校准
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    
                    </div>
                </div>
            </div>
            <div class="relative top-[-2.5rem]">
                <div
                        class="w-[35rem] h-[10rem] relative bg-white overflow-hidden bg-opacity-80 border border-gray-100 rounded-xl shadow m-3">
                    <div class="w-[100%] h-[3rem]  flex items-center    bg-indigo-50">
                        <div class="text-black text-xl  font-normal font-['Inter'] ml-5">
                            消息指示
                        </div>
                    </div>
                    <div class="h-[7rem]  mx-5">
                        <div class="h-[3rem] flex items-center  text-xl">
                            正在进行:<span class="text-indigo-600 font-semibold">{{ message.proceed }}</span>
                        </div>
                        
                        <div class="h-[4rem] mt-1  text-xl text-orange-500 font-semibold">
                            {{ message.content }}
                        </div>
                    
                    </div>
                </div>
                <!--蠕动泵标定-->
                <div
                        class="w-[35rem] h-[20rem] relative bg-white overflow-hidden bg-opacity-80 border border-gray-100 rounded-xl shadow m-3">
                    <div class="w-full h-[4rem] left-0 top-0 relative bg-blue-50">
                        <div
                                class="w-full h-full ml-5 relative flex items-center justify-start text-black text-xl font-normal font-['Inter'] leading-none  gap-2">
                            蠕动泵标定
                            <button class="bg-white p-1 border-gray-300 border text-sm hover:bg-gray-100"
                                    @click="PumpCalibrateReset">校准重置
                            </button>
                        </div>
                    </div>
                    <div class="w-full h-[4rem] relative  flex items-center justify-center ">
                        <div class="w-full h-[2rem] relative  flex items-center justify-center gap-2">
                            <div
                                    class="w-[63px] h-full  relative flex items-center justify-center text-black text-base font-normal font-['Inter'] leading-none">
                                酸泵
                            </div>
                            <!--是否开始-->
                            <button
                                    v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag==0)"
                                    :class="[!CalibrationPumpSet.acidPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                                    @click="CalibrationPumpSet.acidPumpKind=!CalibrationPumpSet.acidPumpKind;CalibrationPumpSet.acidTime=null;CalibrationPumpSet.acidVolume=null;">
                                <div v-if="!CalibrationPumpSet.acidPumpKind"
                                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                                    定体积
                                </div>
                                <div v-if="CalibrationPumpSet.acidPumpKind"
                                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                                    定时间
                                </div>
                            
                            </button>
                            <button
                                    v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag==1"
                                    :class="[!CalibrationPumpSet.acidPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                            >
                                <div v-if="!CalibrationPumpSet.acidPumpKind"
                                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                                    定体积
                                </div>
                                <div v-if="CalibrationPumpSet.acidPumpKind"
                                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                                    定时间
                                </div>
                            
                            </button>
                            <!--体积输入框-定体积-->
                            <input v-if="!CalibrationPumpSet.acidPumpKind"
                                   v-model="CalibrationPumpSet.acidVolume"
                                   class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   placeholder="体积/ml"/>
                            
                            <!--体积输入框-定时间-->
                            <input v-if="(CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData==null)||(CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null
              &&CalibrationPumpSet.isAcidFinish==false)"
                                   v-model="CalibrationPumpSet.acidVolume"
                                   class="input input-bordered w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   disabled placeholder="体积/ml"/>
                            <input
                                    v-if="(CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&CalibrationPumpSet.isAcidFinish==true)"
                                    v-model="CalibrationPumpSet.acidVolume"
                                    class="  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                    placeholder="体积/ml"/>
                            
                            <!--对号-->
                            <div v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag ==0)
              &&CalibrationPumpSet.isAcidFinish==false"
                                 class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                 @click="AcidPumpCalibrate('Begin')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <div
                                    v-if="(CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag ==1)"
                                    class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                    @click="AcidPumpCalibrate('Next')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <!--完成命令-在定体积完成时Flag=1，定时间为Flag=0-->
                            <div v-if="(!CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag ==1)
              ||(CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag ==0&&CalibrationPumpSet.isAcidFinish==true)"
                                 class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                 @click="AcidPumpCalibrate('Finish')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            
                            <!--时间输入框-->
                            <input v-if="CalibrationPumpSet.acidPumpKind"
                                   v-model="CalibrationPumpSet.acidTime"
                                   class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   placeholder="时间/s"/>
                            <input v-if="!CalibrationPumpSet.acidPumpKind"
                                   v-model="CalibrationPumpSet.acidTime"
                                   class="input input-bordered  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   disabled placeholder="时间/s"/>
                            <div
                                    class="w-[6rem] h-full  flex items-center relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                            >{{
                                    DeviceManage.deviceList[AppGlobal.pageChance] != null && DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed == 0 ? '标定结果' : DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed
                                }}
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-[4rem] relative  flex items-center justify-center ">
                        <div class="w-full h-[2rem] relative  flex items-center justify-center gap-2">
                            <div
                                    class="w-[63px] h-full  relative flex items-center justify-center text-black text-base font-normal font-['Inter'] leading-none">
                                碱泵
                            </div>
                            <!--是否开始-->
                            <button
                                    v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag==0)"
                                    :class="[!CalibrationPumpSet.lyePumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                                    @click="CalibrationPumpSet.lyePumpKind=!CalibrationPumpSet.lyePumpKind;CalibrationPumpSet.lyeTime=null;CalibrationPumpSet.lyeVolume=null;">
                                <div v-if="!CalibrationPumpSet.lyePumpKind"
                                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                                    定体积
                                </div>
                                <div v-if="CalibrationPumpSet.lyePumpKind"
                                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                                    定时间
                                </div>
                            
                            </button>
                            <button
                                    v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag==1"
                                    :class="[!CalibrationPumpSet.lyePumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                            >
                                <div v-if="!CalibrationPumpSet.lyePumpKind"
                                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                                    定体积
                                </div>
                                <div v-if="CalibrationPumpSet.lyePumpKind"
                                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                                    定时间
                                </div>
                            
                            </button>
                            <!--体积输入框-定体积-->
                            <input v-if="!CalibrationPumpSet.lyePumpKind"
                                   v-model="CalibrationPumpSet.lyeVolume"
                                   class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   placeholder="体积/ml"/>
                            
                            <!--体积输入框-定时间-->
                            <input v-if="(CalibrationPumpSet.lyePumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData==null)||(CalibrationPumpSet.lyePumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null
              &&CalibrationPumpSet.isLyeFinish==false)"
                                   v-model="CalibrationPumpSet.lyeVolume"
                                   class="input input-bordered w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   disabled placeholder="体积/ml"/>
                            <input
                                    v-if="(CalibrationPumpSet.lyePumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&CalibrationPumpSet.isLyeFinish==true)"
                                    v-model="CalibrationPumpSet.lyeVolume"
                                    class="  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                    placeholder="体积/ml"/>
                            
                            <!--对号-->
                            <div v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag ==0)
              &&CalibrationPumpSet.isLyeFinish==false"
                                 class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                 @click="LyePumpCalibrate('Begin')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <div
                                    v-if="(CalibrationPumpSet.lyePumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag ==1)"
                                    class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                    @click="LyePumpCalibrate('Next')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <!--完成命令-在定体积完成时Flag=1，定时间为Flag=0-->
                            <div v-if="(!CalibrationPumpSet.lyePumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag ==1)
              ||(CalibrationPumpSet.lyePumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag ==0&&CalibrationPumpSet.isLyeFinish==true)"
                                 class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                 @click="LyePumpCalibrate('Finish')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            
                            <!--时间输入框-->
                            <input v-if="CalibrationPumpSet.lyePumpKind"
                                   v-model="CalibrationPumpSet.lyeTime"
                                   class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   placeholder="时间/s"/>
                            <input v-if="!CalibrationPumpSet.lyePumpKind"
                                   v-model="CalibrationPumpSet.lyeTime"
                                   class="input input-bordered  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   disabled placeholder="时间/s"/>
                            <div
                                    class="w-[6rem] h-full  flex items-center relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                            >{{
                                    DeviceManage.deviceList[AppGlobal.pageChance] != null && DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed == 0 ? '标定结果' : DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed
                                }}
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-[4rem] relative  flex items-center justify-center ">
                        <div class="w-full h-[2rem] relative  flex items-center justify-center gap-2">
                            <div
                                    class="w-[63px] h-full  relative flex items-center justify-center text-black text-base font-normal font-['Inter'] leading-none">
                                补料泵1
                            </div>
                            <!--是否开始-->
                            <button
                                    v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag==0)"
                                    :class="[!CalibrationPumpSet.defoamerPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                                    @click="CalibrationPumpSet.defoamerPumpKind=!CalibrationPumpSet.defoamerPumpKind;CalibrationPumpSet.defoamerTime=null;CalibrationPumpSet.defoamerVolume=null;">
                                <div v-if="!CalibrationPumpSet.defoamerPumpKind"
                                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                                    定体积
                                </div>
                                <div v-if="CalibrationPumpSet.defoamerPumpKind"
                                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                                    定时间
                                </div>
                            
                            </button>
                            <button
                                    v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag==1"
                                    :class="[!CalibrationPumpSet.defoamerPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                            >
                                <div v-if="!CalibrationPumpSet.defoamerPumpKind"
                                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                                    定体积
                                </div>
                                <div v-if="CalibrationPumpSet.defoamerPumpKind"
                                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                                    定时间
                                </div>
                            
                            </button>
                            <!--体积输入框-定体积-->
                            <input v-if="!CalibrationPumpSet.defoamerPumpKind"
                                   v-model="CalibrationPumpSet.defoamerVolume"
                                   class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   placeholder="体积/ml"/>
                            
                            <!--体积输入框-定时间-->
                            <input v-if="(CalibrationPumpSet.defoamerPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData==null)||(CalibrationPumpSet.defoamerPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null
              &&CalibrationPumpSet.isDefoamerFinish==false)"
                                   v-model="CalibrationPumpSet.defoamerVolume"
                                   class="input input-bordered w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   disabled placeholder="体积/ml"/>
                            <input
                                    v-if="(CalibrationPumpSet.defoamerPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&CalibrationPumpSet.isDefoamerFinish==true)"
                                    v-model="CalibrationPumpSet.defoamerVolume"
                                    class="  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                    placeholder="体积/ml"/>
                            
                            <!--对号-->
                            <div v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag ==0)
              &&CalibrationPumpSet.isDefoamerFinish==false"
                                 class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                 @click="DefoamPumpCalibrate('Begin')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <div
                                    v-if="(CalibrationPumpSet.defoamerPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag ==1)"
                                    class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                    @click="DefoamPumpCalibrate('Next')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <!--完成命令-在定体积完成时Flag=1，定时间为Flag=0-->
                            <div v-if="(!CalibrationPumpSet.defoamerPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag ==1)
              ||(CalibrationPumpSet.defoamerPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag ==0&&CalibrationPumpSet.isDefoamerFinish==true)"
                                 class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                 @click="DefoamPumpCalibrate('Finish')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            
                            <!--时间输入框-->
                            <input v-if="CalibrationPumpSet.defoamerPumpKind"
                                   v-model="CalibrationPumpSet.defoamerTime"
                                   class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   placeholder="时间/s"/>
                            <input v-if="!CalibrationPumpSet.defoamerPumpKind"
                                   v-model="CalibrationPumpSet.defoamerTime"
                                   class="input input-bordered  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   disabled placeholder="时间/s"/>
                            <div
                                    class="w-[6rem] h-full  flex items-center relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                            >{{
                                    DeviceManage.deviceList[AppGlobal.pageChance] != null && DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed == 0 ? '标定结果' : DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed
                                }}
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-[4rem] relative  flex items-center justify-center ">
                        <div class="w-full h-[2rem] relative  flex items-center justify-center gap-2">
                            <div
                                    class="w-[63px] h-full  relative flex items-center justify-center text-black text-base font-normal font-['Inter'] leading-none">
                                补料泵2
                            </div>
                            <!--是否开始-->
                            <button
                                    v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag==0)"
                                    :class="[!CalibrationPumpSet.feedPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                                    @click="CalibrationPumpSet.feedPumpKind=!CalibrationPumpSet.feedPumpKind;CalibrationPumpSet.feedTime=null;CalibrationPumpSet.feedVolume=null;">
                                <div v-if="!CalibrationPumpSet.feedPumpKind"
                                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                                    定体积
                                </div>
                                <div v-if="CalibrationPumpSet.feedPumpKind"
                                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                                    定时间
                                </div>
                            
                            </button>
                            <button
                                    v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag==1"
                                    :class="[!CalibrationPumpSet.feedPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                            >
                                <div v-if="!CalibrationPumpSet.feedPumpKind"
                                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                                    定体积
                                </div>
                                <div v-if="CalibrationPumpSet.feedPumpKind"
                                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                                    定时间
                                </div>
                            
                            </button>
                            <!--体积输入框-定体积-->
                            <input v-if="!CalibrationPumpSet.feedPumpKind"
                                   v-model="CalibrationPumpSet.feedVolume"
                                   class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   placeholder="体积/ml"/>
                            
                            <!--体积输入框-定时间-->
                            <input v-if="(CalibrationPumpSet.feedPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData==null)||(CalibrationPumpSet.feedPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null
              &&CalibrationPumpSet.isFeedFinish==false)"
                                   v-model="CalibrationPumpSet.feedVolume"
                                   class="input input-bordered w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   disabled placeholder="体积/ml"/>
                            <input
                                    v-if="(CalibrationPumpSet.feedPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&CalibrationPumpSet.isFeedFinish==true)"
                                    v-model="CalibrationPumpSet.feedVolume"
                                    class="  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                    placeholder="体积/ml"/>
                            
                            <!--对号-->
                            <div v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag ==0)
              &&CalibrationPumpSet.isFeedFinish==false"
                                 class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                 @click="FeedPumpCalibrate('Begin')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <div
                                    v-if="(CalibrationPumpSet.feedPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag ==1)"
                                    class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                    @click="FeedPumpCalibrate('Next')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <!--完成命令-在定体积完成时Flag=1，定时间为Flag=0-->
                            <div v-if="(!CalibrationPumpSet.feedPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag ==1)
              ||(CalibrationPumpSet.feedPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag ==0&&CalibrationPumpSet.isFeedFinish==true)"
                                 class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer"
                                 @click="FeedPumpCalibrate('Finish')">
                                <svg fill="none" height="30" viewBox="0 0 50 30" width="50"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            
                            <!--时间输入框-->
                            <input v-if="CalibrationPumpSet.feedPumpKind"
                                   v-model="CalibrationPumpSet.feedTime"
                                   class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   placeholder="时间/s"/>
                            <input v-if="!CalibrationPumpSet.feedPumpKind"
                                   v-model="CalibrationPumpSet.feedTime"
                                   class="input input-bordered  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                                   disabled placeholder="时间/s"/>
                            <div
                                    class="w-[6rem] h-full  flex items-center relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                            >{{
                                    DeviceManage.deviceList[AppGlobal.pageChance] != null && DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed == 0 ? '标定结果' : DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed
                                }}
                            </div>
                        </div>
                    </div>
                
                </div>
            
            </div>
        
        
        </div>
    
    </div>

</template>

<script setup>
import {computed, reactive, ref, watch} from "vue";
import {useDeviceManage} from "@/store/DeviceManage";
import {useAppGlobal} from '@/store/AppGlobal'
import {sendData} from '@/api/index.js'

import Swal from 'sweetalert2';

const AppGlobal = useAppGlobal();
const DeviceManage = useDeviceManage();

watch(() => DeviceManage.deviceList[AppGlobal.pageChance].nowData, () => {
    console.log(DeviceManage.deviceList[AppGlobal.pageChance].nowData)
    // console.log(!DeviceManage?.deviceList?.[AppGlobal?.pageChance]?.nowData, DeviceManage.deviceList[AppGlobal.pageChance].nowData != null, '4-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 4, '3-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 3, '2-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 2, '1-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 1, '0-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 0)
    console.log(DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag)
}, {deep: true});


const CalibrationPumpSet = reactive({
    acidPumpKind: false,
    acidVolume: null,
    acidTime: null,
    lyePumpKind: false,
    lyeVolume: null,
    lyeTime: null,
    feedPumpKind: false,
    feedVolume: null,
    feedTime: null,
    defoamerPumpKind: false,
    defoamerVolume: null,
    defoamerTime: null,
    isAcidFinish: false,//查看是否为第三阶段
    isLyeFinish: false,
    isFeedFinish: false,
    isDefoamerFinish: false,
    
})

const message = ref({
    proceed: '无',
    content: '尚未进行校准'
})
// 发送前处理数据
const SendToHandle = (() => {
    if (DeviceManage &&
        DeviceManage.deviceList &&
        AppGlobal &&
        AppGlobal.pageChance != null &&
        DeviceManage.deviceList[AppGlobal.pageChance] &&
        DeviceManage.deviceList[AppGlobal.pageChance].nowData) {
        const data = {
            zero_point_value: DeviceManage.deviceList[AppGlobal.pageChance].nowData.zero_point_value,
            DO_zero_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag,
            saturation_value: DeviceManage.deviceList[AppGlobal.pageChance].nowData.saturation_value,
            DO_saturation_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_saturation_calibration_flag,
            PH_calibration_progress: DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_progress,
            feed_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag,
            feed0_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag,
            lye_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag,
            acid_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag,
            acidPumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed,
            lyePumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed,
            feedPumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed,
            feed0PumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed,
        }
        sendData(AppGlobal.pageChance, data);
        
        
    } else {
        message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
    }
    
})

const DoCalibrate = ((data) => {
    if (data === 'zeroBegin') {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData
        ) {
            if (DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag == 1) {
                //重置信息
                message.value.proceed = 'DO零点校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '重复零点检测';  // 使用 message.value 来访问或修改 ref 的值
            } else {
                DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag = 1;
                SendToHandle();
                //重置信息
                message.value.proceed = 'DO零点校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '请数据稳定后点击锁定完成校准';  // 使用 message.value 来访问或修改 ref 的值
            }
        } else {
            //重置信息
            message.value.proceed = 'DO零点校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'zeroEnd') {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag = 0;
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.zero_point_value = DeviceManage.deviceList[AppGlobal.pageChance].nowData.timing_DO;
            SendToHandle();
            //重置信息
            message.value.proceed = 'DO零点校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = 'DO零点校准完成';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            //重置信息
            message.value.proceed = 'DO零点校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'saturationBegin') {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_saturation_calibration_flag = 1;
            SendToHandle();
            //重置信息
            message.value.proceed = 'DO饱和校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '请数据稳定后点击锁定完成校准';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            //重置信息
            message.value.proceed = 'DO饱和校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
        
    } else if (data === 'saturationEnd') {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_saturation_calibration_flag = 0;
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.saturation_value = DeviceManage.deviceList[AppGlobal.pageChance].nowData.timing_DO;
            SendToHandle();
            
            //重置信息
            message.value.proceed = 'DO饱和校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = 'DO零点校准完成';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            //重置信息
            message.value.proceed = 'DO饱和校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
    
})

const PHCalibrate = ((data) => {
    if (data === 'phBegin') {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData
        ) {
            watch(() => DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status, (value, oldValue) => {
                if (oldValue == 0 && value == 1) {
                    message.value.content = '开始酸液校准';  // 使用 message.value 来访问或修改 ref 的值
                }
                if (oldValue == 1 && value == 2) {
                    message.value.content = '酸液校准完成,点击继续开始校准碱液';  // 使用 message.value 来访问或修改 ref 的值
                }
                if (oldValue == 2 && value == 3) {
                    message.value.content = '碱液校准中';  // 使用 message.value 来访问或修改 ref 的值
                }
                if (oldValue == 3 && value == 4) {
                    message.value.content = '碱液校准完成';  // 使用 message.value 来访问或修改 ref 的值
                }
                
            });
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_progress = 1;
            SendToHandle();
            //重置信息
            message.value.proceed = 'PH校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '开始进行酸液校准';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            //重置信息
            message.value.proceed = 'PH校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'phContinue') {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_progress = 2;
            SendToHandle();
            message.value.content = '继续碱液校准';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'phFinish') {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_progress = 0;
            SendToHandle();
            message.value.proceed = '无';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '尚未进行校准';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
})

const AcidPumpCalibrate = ((data) => {
    // 定体积
    if (data === 'Begin' && CalibrationPumpSet.acidPumpKind === false) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag = 1;
            SendToHandle();
            //重置信息
            message.value.proceed = '酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '开始进行酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            //重置信息
            message.value.proceed = '酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Finish' && CalibrationPumpSet.acidPumpKind === false) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag = 0;
            SendToHandle();
    
            if (DeviceManage.deviceList[AppGlobal.pageChance].nowData?.acid_pump_step_count === undefined || DeviceManage.deviceList[AppGlobal.pageChance].nowData?.acid_pump_step_count == 0) {
                message.value.content = '补料泵1校准失败，下位机返回电机步数为' + DeviceManage.deviceList[AppGlobal.pageChance].nowData?.acid_pump_step_count;  // 使用 message.value 来访问或修改 ref 的值
            } else {
                let SpeedValue = CalibrationPumpSet.acidVolume / DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_step_count;
                DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed = parseFloat(SpeedValue.toFixed(2));
                console.log('酸泵速度', DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed)
        
                if (DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed == 0) {
                    message.value.content = '酸泵校准完成，泵速约等于0';  // 使用 message.value 来访问或修改 ref 的值
                } else {
                    message.value.content = '酸泵校准完成，泵速已保存';  // 使用 message.value 来访问或修改 ref 的值
                }
            }

            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
    // 定时间
    else if (data === 'Begin' && CalibrationPumpSet.acidPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            if (CalibrationPumpSet.acidTime === null) {
                message.value.proceed = '酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '请输入时间!';  // 使用 message.value 来访问或修改 ref 的值
            } else {
                DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag = 1;
                SendToHandle();
                
                message.value.proceed = '酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '开始进行酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
                
                stopCountDown = countDown(CalibrationPumpSet.acidTime);
            }
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Next' && CalibrationPumpSet.acidPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag = 0;
            SendToHandle();
            CalibrationPumpSet.isAcidFinish = true
            message.value.content = '请输入体积';  // 使用 message.value 来访问或修改 ref 的值
            // 在需要的时候停止倒计时
            if (stopCountDown) {
                stopCountDown();  // 停止倒计时
            }
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Finish' && CalibrationPumpSet.acidPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            
            let SpeedValue = CalibrationPumpSet.acidVolume / DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_step_count;
            console.log(SpeedValue, 'SpeedValue', CalibrationPumpSet.acidVolume, DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_step_count)
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed = parseFloat(SpeedValue.toFixed(2));
            
            if (DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed == 0) {
                message.value.content = '酸泵校准完成，泵速约等于0';  // 使用 message.value 来访问或修改 ref 的值
            } else {
                message.value.content = '酸泵校准完成，泵速已保存';  // 使用 message.value 来访问或修改 ref 的值
            }
            
            CalibrationPumpSet.isAcidFinish = false
            
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
})

const LyePumpCalibrate = ((data) => {
    // 定体积
    if (data === 'Begin' && CalibrationPumpSet.lyePumpKind === false) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag = 1;
            SendToHandle();
            //重置信息
            message.value.proceed = '碱泵校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '开始进行碱泵校准';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            //重置信息
            message.value.proceed = '碱泵校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Finish' && CalibrationPumpSet.lyePumpKind === false) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag = 0;
            SendToHandle();
            if (DeviceManage.deviceList[AppGlobal.pageChance].nowData?.lye_pump_step_count === undefined || DeviceManage.deviceList[AppGlobal.pageChance].nowData?.lye_pump_step_count == 0) {
                message.value.content = '补料泵1校准失败，下位机返回电机步数为' + DeviceManage.deviceList[AppGlobal.pageChance].nowData?.lye_pump_step_count;  // 使用 message.value 来访问或修改 ref 的值
            } else {
                let SpeedValue = CalibrationPumpSet.lyeVolume / DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_step_count;
                DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed = parseFloat(SpeedValue.toFixed(2));
                console.log('碱泵速度', DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed)
    
                if (DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed == 0) {
                    message.value.content = '碱泵校准完成，泵速约等于0';  // 使用 message.value 来访问或修改 ref 的值
                } else {
                    message.value.content = '碱泵校准完成，泵速已保存';  // 使用 message.value 来访问或修改 ref 的值
                }
            }
  
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
    // 定时间
    else if (data === 'Begin' && CalibrationPumpSet.lyePumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            if (CalibrationPumpSet.lyeTime === null) {
                message.value.proceed = '碱泵校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '请输入时间!';  // 使用 message.value 来访问或修改 ref 的值
            } else {
                DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag = 1;
                SendToHandle();
                
                message.value.proceed = '碱泵校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '开始进行碱泵校准';  // 使用 message.value 来访问或修改 ref 的值
                
                stopCountDown = countDown(CalibrationPumpSet.lyeTime);
            }
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Next' && CalibrationPumpSet.lyePumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag = 0;
            SendToHandle();
            CalibrationPumpSet.isLyeFinish = true
            message.value.content = '请输入体积';  // 使用 message.value 来访问或修改 ref 的值
            // 在需要的时候停止倒计时
            if (stopCountDown) {
                stopCountDown();  // 停止倒计时
            }
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Finish' && CalibrationPumpSet.lyePumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            if (DeviceManage.deviceList[AppGlobal.pageChance].nowData?.lye_pump_step_count === undefined || DeviceManage.deviceList[AppGlobal.pageChance].nowData?.lye_pump_step_count == 0) {
                message.value.content = '碱泵校准失败，下位机返回电机步数为' + DeviceManage.deviceList[AppGlobal.pageChance].nowData?.lye_pump_step_count;  // 使用 message.value 来访问或修改 ref 的值
            } else {
                let SpeedValue = CalibrationPumpSet.lyeVolume / DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_step_count;
                DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed = parseFloat(SpeedValue.toFixed(2));
                console.log('碱泵速度', DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed)
                if (DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed == 0) {
                    message.value.content = '碱泵校准完成，泵速约等于0';  // 使用 message.value 来访问或修改 ref 的值
                } else {
                    message.value.content = '碱泵校准完成，泵速已保存';  // 使用 message.value 来访问或修改 ref 的值
                }
                CalibrationPumpSet.isLyeFinish = false
            }
            
            
            // 在需要的时候停止倒计时
            if (stopCountDown) {
                stopCountDown();  // 停止倒计时
            }
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
})
const FeedPumpCalibrate = ((data) => {
    // 定体积
    if (data === 'Begin' && CalibrationPumpSet.feedPumpKind === false) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag = 1;
            SendToHandle();
            //重置信息
            message.value.proceed = '补料泵2校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '开始进行补料泵2校准';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            //重置信息
            message.value.proceed = '补料泵2校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Finish' && CalibrationPumpSet.feedPumpKind === false) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag = 0;
            SendToHandle();
            
            
            if (DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed_pump_step_count === undefined || DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed_pump_step_count == 0) {
                message.value.content = '补料泵1校准失败，下位机返回电机步数为' + DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed_pump_step_count;  // 使用 message.value 来访问或修改 ref 的值
            } else {
                let SpeedValue = CalibrationPumpSet.feedVolume / DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_step_count;
                DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed = parseFloat(SpeedValue.toFixed(2));
                console.log('补料泵2速度', DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed)
                
                
                if (DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed == 0) {
                    message.value.content = '补料泵2校准完成，泵速约等于0';  // 使用 message.value 来访问或修改 ref 的值
                } else {
                    message.value.content = '补料泵2校准完成，泵速已保存';  // 使用 message.value 来访问或修改 ref 的值
                }
            }
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
    // 定时间
    else if (data === 'Begin' && CalibrationPumpSet.feedPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            if (CalibrationPumpSet.feedTime === null) {
                message.value.proceed = '补料泵2校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '请输入时间!';  // 使用 message.value 来访问或修改 ref 的值
            } else {
                DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag = 1;
                SendToHandle();
                
                message.value.proceed = '补料泵2校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '开始进行补料泵2校准';  // 使用 message.value 来访问或修改 ref 的值
                
                stopCountDown = countDown(CalibrationPumpSet.feedTime);
            }
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Next' && CalibrationPumpSet.feedPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag = 0;
            SendToHandle();
            CalibrationPumpSet.isFeedFinish = true
            message.value.content = '请输入体积';  // 使用 message.value 来访问或修改 ref 的值
            // 在需要的时候停止倒计时
            if (stopCountDown) {
                stopCountDown();  // 停止倒计时
            }
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Finish' && CalibrationPumpSet.feedPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            if (DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed_pump_step_count === undefined || DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed_pump_step_count == 0) {
                message.value.content = '补料泵1校准失败，下位机返回电机步数为' + DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed_pump_step_count;  // 使用 message.value 来访问或修改 ref 的值
            } else {
                let SpeedValue = CalibrationPumpSet.feedVolume / DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_step_count;
                DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed = parseFloat(SpeedValue.toFixed(2));
                
                if (DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed == 0) {
                    message.value.content = '补料泵2校准完成，泵速约等于0';  // 使用 message.value 来访问或修改 ref 的值
                } else {
                    message.value.content = '补料泵2校准完成，泵速已保存';  // 使用 message.value 来访问或修改 ref 的值
                }
            }
            CalibrationPumpSet.isFeedFinish = false
            
            // 在需要的时候停止倒计时
            if (stopCountDown) {
                stopCountDown();  // 停止倒计时
            }
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
})
const DefoamPumpCalibrate = ((data) => {
    // 定体积
    if (data === 'Begin' && CalibrationPumpSet.defoamerPumpKind === false) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag = 1;
            SendToHandle();
            //重置信息
            message.value.proceed = '补料泵1校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '开始进行补料泵1校准';  // 使用 message.value 来访问或修改 ref 的值
            
        } else {
            //重置信息
            message.value.proceed = '补料泵1校准';  // 使用 message.value 来访问或修改 ref 的值
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Finish' && CalibrationPumpSet.defoamerPumpKind === false) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag = 0;
            SendToHandle();
            if (DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed0_pump_step_count === undefined || DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed0_pump_step_count == 0) {
                message.value.content = '补料泵1校准失败，下位机返回电机步数为' + DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed0_pump_step_count;  // 使用 message.value 来访问或修改 ref 的值
            } else {
                let SpeedValue = CalibrationPumpSet.defoamerVolume / DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_step_count;
                DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed = parseFloat(SpeedValue.toFixed(2));
                console.log('补料泵1速度', DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed)
                
                if (DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed == 0) {
                    message.value.content = '补料泵1校准完成，泵速约等于0';  // 使用 message.value 来访问或修改 ref 的值
                } else {
                    message.value.content = '补料泵1校准完成，泵速已保存';  // 使用 message.value 来访问或修改 ref 的值
                }
                
            }
            
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
    // 定时间
    else if (data === 'Begin' && CalibrationPumpSet.defoamerPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            if (CalibrationPumpSet.defoamerTime === null) {
                message.value.proceed = '补料泵1校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '请输入时间!';  // 使用 message.value 来访问或修改 ref 的值
            } else {
                DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag = 1;
                SendToHandle();
                
                message.value.proceed = '补料泵1校准';  // 使用 message.value 来访问或修改 ref 的值
                message.value.content = '开始进行补料泵1校准';  // 使用 message.value 来访问或修改 ref 的值
                
                stopCountDown = countDown(CalibrationPumpSet.defoamerTime);
            }
            
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Next' && CalibrationPumpSet.defoamerPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            
            DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag = 0;
            SendToHandle();
            CalibrationPumpSet.isDefoamerFinish = true
            message.value.content = '请输入体积';  // 使用 message.value 来访问或修改 ref 的值
            // 在需要的时候停止倒计时
            if (stopCountDown) {
                stopCountDown();  // 停止倒计时
            }
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    } else if (data === 'Finish' && CalibrationPumpSet.defoamerPumpKind === true) {
        if (
            DeviceManage &&
            DeviceManage.deviceList &&
            AppGlobal &&
            AppGlobal.pageChance != null &&
            DeviceManage.deviceList[AppGlobal.pageChance] &&
            DeviceManage.deviceList[AppGlobal.pageChance].nowData &&
            DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
        ) {
            if (DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed0_pump_step_count === undefined || DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed0_pump_step_count == 0) {
                message.value.content = '补料泵1校准失败，下位机返回电机步数为' + DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed0_pump_step_count;  // 使用 message.value 来访问或修改 ref 的值
            } else {
                let SpeedValue = CalibrationPumpSet.defoamerVolume / DeviceManage.deviceList[AppGlobal.pageChance].nowData?.feed0_pump_step_count;
                DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed = parseFloat(SpeedValue.toFixed(2));
                
            }
            
            if (DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed == 0) {
                message.value.content = '补料泵1校准完成，泵速约等于0';  // 使用 message.value 来访问或修改 ref 的值
            } else {
                message.value.content = '补料泵1校准完成，泵速已保存';  // 使用 message.value 来访问或修改 ref 的值
            }
            CalibrationPumpSet.isDefoamerFinish = false
            
            // 在需要的时候停止倒计时
            if (stopCountDown) {
                stopCountDown();  // 停止倒计时
            }
        } else {
            message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
        }
    }
})


// ————————————————————————————————工具————————————————————————————————
// 倒计时
let stopCountDown;
const countDown = (time) => {
    let timer = setInterval(() => {
        time--;
        message.value.content = `正在进行时间校准    还剩${time}秒`;  // 注意: 使用反引号来做字符串插值
        if (time <= 0) {
            clearInterval(timer);
            timer = null;
            console.log('酸泵标志位-___________', DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag)
            if (message.value.proceed === '酸泵校准') {
                AcidPumpCalibrate('Next');
            }
            if (message.value.proceed === '碱泵校准') {
                LyePumpCalibrate('Next');
            }
            if (message.value.proceed === '补料泵1校准') {
                DefoamPumpCalibrate('Next');
            }
            if (message.value.proceed === '补料泵2校准') {
                FeedPumpCalibrate('Next');
            }
        }
    }, 1000);
    
    // 返回一个关闭函数
    return () => {
        clearInterval(timer);
        timer = null;
    };
}

const currentNowDataZero = computed(() => {
    return DeviceManage?.deviceList?.[AppGlobal?.pageChance]?.nowData;
});

// 传感器校准重置
const SensorCalibrateReset = (() => {
    Swal.fire({
        icon: 'question', // 由于是确认操作，使用 'question' 图标
        title: '确认重置传感器校准参数吗?', // 设置标题
        showCancelButton: true, // 显示取消按钮
        confirmButtonColor: '#3085d6', // 确认按钮颜色
        cancelButtonColor: '#d33', // 取消按钮颜色
        confirmButtonText: '确认', // 确认按钮文本
        cancelButtonText: '取消' // 取消按钮文本
    }).then((result) => {
        if (result.value) {
            // 用户点击了确认按钮
            const data = {
                zero_point_value: DeviceManage.deviceList[AppGlobal.pageChance].nowData.zero_point_value,
                DO_zero_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag,
                saturation_value: DeviceManage.deviceList[AppGlobal.pageChance].nowData.saturation_value,
                DO_saturation_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_saturation_calibration_flag,
                PH_calibration_progress: DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_progress,
                feed_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag,
                feed0_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag,
                lye_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag,
                acid_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag,
                acidPumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed,
                lyePumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed,
                feedPumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed,
                feed0PumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed,
            }
            sendData(AppGlobal.pageChance, data);
        }
    });
    
})

// 蠕动泵标准重置
const PumpCalibrateReset = (() => {
    Swal.fire({
        icon: 'question', // 由于是确认操作，使用 'question' 图标
        title: '确认重置蠕动泵校准参数吗?', // 设置标题
        showCancelButton: true, // 显示取消按钮
        confirmButtonColor: '#3085d6', // 确认按钮颜色
        cancelButtonColor: '#d33', // 取消按钮颜色
        confirmButtonText: '确认', // 确认按钮文本
        cancelButtonText: '取消' // 取消按钮文本
    }).then((result) => {
        if (result.value) {
            // 用户点击了确认按钮
            const data = {
                zero_point_value: DeviceManage.deviceList[AppGlobal.pageChance].nowData.zero_point_value,
                DO_zero_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag,
                saturation_value: DeviceManage.deviceList[AppGlobal.pageChance].nowData.saturation_value,
                DO_saturation_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_saturation_calibration_flag,
                PH_calibration_progress: DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_progress,
                feed_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed_pump_calibration_flag,
                feed0_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.feed0_pump_calibration_flag,
                lye_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag,
                acid_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag,
                acidPumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed,
                lyePumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.lyePumpSpeed,
                feedPumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.feedPumpSpeed,
                feed0PumpSpeed: DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.defoamerPumpSpeed,
            }
            sendData(AppGlobal.pageChance, data);
        }
    });
    
})

</script>
