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
              <div class="w-[4rem] h-full  bg-[#DAF0E4]  hover:bg-[#C3DBCE] rounded-md flex items-center justify-center mx-2">
                <button
                    class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center">
                  确定
                </button>
              </div>
              <input class="w-[10rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2"/>

            </div>
          </div>
          <div class="w-full  mt-1 h-[4rem] relative flex items-center justify-center ">
            <div class="w-full  mt-1 h-[2rem] relative flex items-center justify-center gap-2.5">
              <div
                  class="w-[4rem]  h-full text-center text-black text font-normal font-['Inter']  flex items-center justify-center">
                饱和校准
              </div>
              <div class="w-[4rem] h-full  bg-[#DAF0E4] hover:bg-[#C3DBCE] rounded-md flex items-center justify-center mx-2">
                <button
                    class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center">
                  确定
                </button>
              </div>
              <input class="w-[10rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2"/>

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
              <div class="w-[4rem] h-full  bg-[#DAF0E4] hover:bg-[#C3DBCE] rounded-md flex items-center justify-center mx-2">
                <button
                    class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center">
                  确定
                </button>
              </div>
              <div class="w-[10rem] h-full bg-white gap-2 flex">
                <input class="w-[4.75rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2" placeholder="PH1"/>
                <input class="w-[4.75rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2" placeholder="PH2"/>
              </div>


            </div>
          </div>
          <div class="w-full  mt-1 h-[4rem] relative flex items-center justify-center ">
            <div class="w-full  mt-1 h-[2rem] relative flex items-center justify-center gap-2.5">
              <div
                  class="w-[4rem]  h-full text-center text-black text font-normal font-['Inter']  flex items-center justify-center">
                单点校准
              </div>
              <div class="w-[4rem] h-full  bg-[#DAF0E4] hover:bg-[#C3DBCE] rounded-md flex items-center justify-center mx-2">
                <button
                    class="w-full h-full  text-center text-black text-base font-normal font-['Inter'] leading-none flex items-center justify-center">
                  确定
                </button>
              </div>
              <input class="w-[10rem] h-full bg-white rounded-[5px] border border-zinc-400 pl-2" placeholder="PH"/>

            </div>
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
            <button :class="[!calibrationPump.acidPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']" @click="calibrationPump.acidPumpKind=!calibrationPump.acidPumpKind"
                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm">
              <div v-if="!calibrationPump.acidPumpKind"
                   class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                定体积
              </div>
              <div v-if="calibrationPump.acidPumpKind"
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
              碱泵
            </div>

            <button :class="[!calibrationPump.lyePumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']" @click="calibrationPump.lyePumpKind=!calibrationPump.lyePumpKind"
                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm">
              <div v-if="!calibrationPump.lyePumpKind"
                   class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                定体积
              </div>
              <div v-if="calibrationPump.lyePumpKind"
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
              补料泵
            </div>
            <button :class="[!calibrationPump.feedPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']" @click="calibrationPump.feedPumpKind=!calibrationPump.feedPumpKind"
                    class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm">
              <div v-if="!calibrationPump.feedPumpKind"
                   class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                定体积
              </div>
              <div v-if="calibrationPump.feedPumpKind"
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
            <button :class="[!calibrationPump.defoamerPumpKind?'bg-[#DAF0E4] hover:bg-[#C3DBCE]':'bg-[#FAF3B7]']" @click="calibrationPump.defoamerPumpKind=!calibrationPump.defoamerPumpKind"
                class="w-[74px] h-full  relative flex items-center justify-center  rounded-[5px] shadow backdrop-blur-sm">
              <div v-if="!calibrationPump.defoamerPumpKind"
                  class="w-[51px] h-4  relative text-center text-green-700 text-[13px] font-normal font-['Inter'] leading-none">
                定体积
              </div>
              <div v-if="calibrationPump.defoamerPumpKind"
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

</template>

<script setup>
import {usePopupMangerState} from "@/store/PopupMangerState";
import {reactive, ref} from "vue";

const PopupManger = usePopupMangerState()
const calibrationPump=reactive({
  acidPumpKind:false,
  lyePumpKind:false,
  feedPumpKind:false,
  defoamerPumpKind:false

})


</script>