<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
    <div class="h-[6%] self-stretch justify-center items-center gap-4 inline-flex ">
      <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">批次校准</div>
    </div>
    <!--    内容-->
    <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow  flex items-center justify-center  ">

      <!--传感器校准-->
      <div
          class="w-[25rem] h-[26rem] relative bg-white bg-opacity-80 border overflow-hidden border-gray-100 rounded-xl shadow m-3">
        <!--传感器校准字体-->
        <div class="w-full h-[4rem] left-0 top-0 relative bg-yellow-100 bg-opacity-60
        flex items-start justify-center ">
          <div
              class="w-full h-full flex ml-5 items-center justify-start  text-center text-black text-xl  font-['Inter'] leading-none">
            传感器校准
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
                    v-if="!currentNowDataPH||(currentNowDataPH&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status==0)"
                    class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                    @click.stop="PHCalibrate('phBegin')">
                  开始
                </button>
                <button
                    v-if="currentNowDataPH&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status ==2"
                    class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                    @click.stop="PHCalibrate('phContinue')">
                  继续
                </button>
                <button
                    v-if="currentNowDataPH&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 4"
                    class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center"
                    @click.stop="PHCalibrate('phFinish')">
                  完成
                </button>
                <button
                    v-if="currentNowDataPH&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 1"
                    class="w-full h-full  text-center text-black text-sm font-normal font-['Inter'] leading-none flex items-center justify-center"
                >
                  酸校准中
                </button>
                <button
                    v-if="currentNowDataPH&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!=null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 3"
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
                class="w-full h-full ml-5 relative flex items-center justify-start text-black text-xl font-normal font-['Inter'] leading-none">
              蠕动泵标定
            </div>
          </div>
          <div class="w-full h-[4rem] relative  flex items-center justify-center ">
            <div class="w-full h-[2rem] relative  flex items-center justify-center gap-2">
              <div
                  class="w-[63px] h-full  relative flex items-center justify-center text-black text-base font-normal font-['Inter'] leading-none">
                酸泵
              </div>
              <button :class="[!CalibrationPumpSet.acidPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                      class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                      @click="CalibrationPumpSet.acidPumpKind=!CalibrationPumpSet.acidPumpKind">
                <div v-if="!CalibrationPumpSet.acidPumpKind"
                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                  定体积
                </div>
                <div v-if="CalibrationPumpSet.acidPumpKind"
                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                  定时间
                </div>

              </button>
              <!--定体积-->
              <input v-if="!CalibrationPumpSet.acidPumpKind"  class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     v-model="CalibrationPumpSet.acidVolume" placeholder="体积"/>

              <!--定时间-->
              <input  v-if="(CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData==null)||(!CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag ==0)"  class="input input-bordered w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                      v-model="CalibrationPumpSet.acidVolume" placeholder="体积" disabled/>
              <input  v-if="(CalibrationPumpSet.acidPumpKind&&DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag ==1)"  class="  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                        placeholder="体积"/>
              <div v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData==null||(DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag ==0)" @click="AcidPumpCalibrate('Begin')" class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer">
                <svg fill="none" height="30" viewBox="0 0 50 30" width="50" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z" fill="white"/>
                </svg>
              </div>
              <div v-if="DeviceManage.deviceList[AppGlobal.pageChance].nowData!==null&&DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag ==1"
                   @click="AcidPumpCalibrate('Finish')" class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer">
                <svg fill="none" height="30" viewBox="0 0 50 30" width="50" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z" fill="white"/>
                </svg>
              </div>
              <input v-if="CalibrationPumpSet.acidPumpKind" class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="时间"/>
              <input v-if="!CalibrationPumpSet.acidPumpKind" class="input input-bordered  w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     disabled  placeholder="时间"/>
              <div class="w-[6rem] h-full  flex items-center relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     >{{DeviceManage.deviceList[AppGlobal.pageChance]!=null&& DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed==0?'标定结果':DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed }}</div>
            </div>
          </div>
          <div class="w-full h-[4rem] relative  flex items-center justify-center ">
            <div class="w-full h-[2rem] relative  flex items-center justify-center gap-2">
              <div
                  class="w-[63px] h-full  relative flex items-center justify-center text-black text-base font-normal font-['Inter'] leading-none">
                碱泵
              </div>

              <button :class="[!CalibrationPumpSet.lyePumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                      class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                      @click="CalibrationPumpSet.lyePumpKind=!CalibrationPumpSet.lyePumpKind">
                <div v-if="!CalibrationPumpSet.lyePumpKind"
                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                  定体积
                </div>
                <div v-if="CalibrationPumpSet.lyePumpKind"
                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                  定时间
                </div>

              </button>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="体积"/>

              <div @click.stop="AcidPumpCalibrate('Begin')" class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer">
                <svg fill="none" height="30" viewBox="0 0 50 30" width="50" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z" fill="white"/>
                </svg>
              </div>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="时间"/>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="标定结果"/>
            </div>
          </div>
          <div class="w-full h-[4rem] relative  flex items-center justify-center ">
            <div class="w-full h-[2rem] relative  flex items-center justify-center gap-2">
              <div
                  class="w-[63px] h-full  relative flex items-center justify-center text-black text-base font-normal font-['Inter'] leading-none">
                补料泵
              </div>
              <button :class="[!CalibrationPumpSet.feedPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                      class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                      @click="CalibrationPumpSet.feedPumpKind=!CalibrationPumpSet.feedPumpKind">
                <div v-if="!CalibrationPumpSet.feedPumpKind"
                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                  定体积
                </div>
                <div v-if="CalibrationPumpSet.feedPumpKind"
                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                  定时间
                </div>

              </button>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="体积"/>

              <div class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px] hover:bg-[#668F78] cursor-pointer">
                <svg fill="none" height="30" viewBox="0 0 50 30" width="50" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z" fill="white"/>
                </svg>
              </div>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="时间"/>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="标定结果"/>
            </div>
          </div>
          <div class="w-full h-[4rem] relative  flex items-center justify-center ">
            <div class="w-full h-[2rem] relative  flex items-center justify-center gap-2">
              <div
                  class="w-[63px] h-full  relative flex items-center justify-center text-black text-base font-normal font-['Inter'] leading-none">
                消泡泵
              </div>
              <button :class="[!CalibrationPumpSet.defoamerPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']"
                      class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm"
                      @click="CalibrationPumpSet.defoamerPumpKind=!CalibrationPumpSet.defoamerPumpKind">
                <div v-if="!CalibrationPumpSet.defoamerPumpKind"
                     class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                  定体积
                </div>
                <div v-if="CalibrationPumpSet.defoamerPumpKind"
                     class="w-[51px] h-4  relative text-center text-[#8A8343] text-[13px] font-normal font-['Inter'] leading-none">
                  定时间
                </div>

              </button>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="体积"/>

              <div class="w-[3rem] h-full  relative bg-[#83BA9B] rounded-[18px]  hover:bg-[#668F78] cursor-pointer">
                <svg fill="none" height="30" viewBox="0 0 50 30" width="50" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 21L17 14.4203L17.9427 13.3865L23 18.9318L32.0573 9L33 10.0338L23 21Z" fill="white"/>
                </svg>
              </div>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="时间"/>
              <input class="w-[6rem] h-full  relative bg-white bg-opacity-80 rounded-[5px] border border-zinc-400 pl-2"
                     placeholder="标定结果"/>
            </div>
          </div>
        </div>

      </div>


    </div>

  </div>

</template>

<script setup>
import {usePopupMangerState} from "@/store/PopupMangerState";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useDeviceManage} from "@/store/DeviceManage";
import {useAppGlobal} from '@/store/AppGlobal'
import {sendData} from '@/api/index.js'

const AppGlobal = useAppGlobal();
const DeviceManage = useDeviceManage();

watch(() => DeviceManage.deviceList[AppGlobal.pageChance].nowData, () => {
  console.log(DeviceManage.deviceList[AppGlobal.pageChance].nowData)
  console.log(!DeviceManage?.deviceList?.[AppGlobal?.pageChance]?.nowData, DeviceManage.deviceList[AppGlobal.pageChance].nowData != null, '4-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 4, '3-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 3, '2-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 2, '1-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 1, '0-', DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_status == 0)
  console.log(DeviceManage.deviceList[AppGlobal.pageChance].nowData.DO_zero_calibration_flag)
}, {deep: true});


const CalibrationPumpSet = reactive({
  acidPumpKind: false,
  acidVolume:null,
  acidTime:null,
  lyePumpKind: false,
  lyeVolume:null,
  lyeTime:null,
  feedPumpKind: false,
  feedVolume:null,
  feedTime:null,
  defoamerPumpKind: false,
  defoamerVolume:null,
  defoamerTime:null
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
      defoam_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.defoam_pump_calibration_flag,
      lye_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.lye_pump_calibration_flag,
      acid_pump_calibration_flag: DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag,
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
  if (data === 'Begin'&&CalibrationPumpSet.acidPumpKind===false) {
    if (
        DeviceManage &&
        DeviceManage.deviceList &&
        AppGlobal &&
        AppGlobal.pageChance != null &&
        DeviceManage.deviceList[AppGlobal.pageChance] &&
        DeviceManage.deviceList[AppGlobal.pageChance].nowData&&
        DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
    ) {

      DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_calibration_flag = 1;
      SendToHandle();
      //重置信息
      message.value.proceed = '酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
      message.value.content = '开始进行酸泵校准,确定前请输入体积';  // 使用 message.value 来访问或修改 ref 的值

    } else {
      //重置信息
      message.value.proceed = '酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
      message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
    }
  }
  else if (data === 'Finish'&&CalibrationPumpSet.acidPumpKind===false) {
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
      let Speedvalue = DeviceManage.deviceList[AppGlobal.pageChance].nowData.acid_pump_step_count / CalibrationPumpSet.acidVolume;
      DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.acidPumpSpeed = parseFloat(Speedvalue.toFixed(2));
      message.value.content = '碱液校准完成';  // 使用 message.value 来访问或修改 ref 的值

    } else {
      message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
    }
  }
  // 定时间
  else if (data === 'Begin'&&CalibrationPumpSet.acidPumpKind===true) {
    if (
        DeviceManage &&
        DeviceManage.deviceList &&
        AppGlobal &&
        AppGlobal.pageChance != null &&
        DeviceManage.deviceList[AppGlobal.pageChance] &&
        DeviceManage.deviceList[AppGlobal.pageChance].nowData&&
        DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
    ) {
      if (CalibrationPumpSet.acidTime===null){
        message.value.proceed = '酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
        message.value.content = '请输入时间!';  // 使用 message.value 来访问或修改 ref 的值
      }
      else{
        DeviceManage.deviceList[AppGlobal.pageChance].nowData.PH_calibration_progress = 0;
        SendToHandle();

        message.value.proceed = '酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
        message.value.content = '开始进行酸泵校准';  // 使用 message.value 来访问或修改 ref 的值
        countDown(CalibrationPumpSet.acidTime);
      }

    } else {
      message.value.content = '数据检收异常，可能是设备未连接';  // 使用 message.value 来访问或修改 ref 的值
    }
  }
  else if (data === 'Finish'&&CalibrationPumpSet.acidPumpKind===true) {
    if (
        DeviceManage &&
        DeviceManage.deviceList &&
        AppGlobal &&
        AppGlobal.pageChance != null &&
        DeviceManage.deviceList[AppGlobal.pageChance] &&
        DeviceManage.deviceList[AppGlobal.pageChance].nowData&&
        DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
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


// ————————————————————————————————错误控制————————————————————————————————
const currentNowDataZero = computed(() => {
  return DeviceManage?.deviceList?.[AppGlobal?.pageChance]?.nowData;
});


// ————————————————————————————————工具————————————————————————————————
// 倒计时
const countDown = ((time) => {
  let timer = setInterval(() => {
    time--;
    message.value.content += '\n'+time;  // 使用 message.value 来访问或修改 ref 的值
    if (time <= 0) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000)
})

</script>