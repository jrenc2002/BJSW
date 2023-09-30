<template>


  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
    <transition name="fade">
      <div
          v-show="ProcessPopupMangerState.isShowPop"
          class="rounded-2xl absolute bg-white bg-opacity-50 h-[calc(100%-2rem)] w-[calc(100%-2rem)]  z-30 backdrop-blur-sm items-center justify-center flex"
      >
        <ProcessPopupManger :popcontent="PopupType[ProcessPopupMangerState.popupContent]" class="w-full h-full "></ProcessPopupManger>
      </div>
    </transition>

    <!--    标题-->
    <div class="h-[6%] self-stretch justify-center items-center gap-4 inline-flex ">
      <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">分罐流程</div>
    </div>
    <!--    内容-->
    <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow  flex  ">
      <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
        <!--左侧控制栏-->
        <div class="h-full w-[20%] overflow-hidden p-1 flex-col gap-2.5 relative flex  items-end">
          <!--溶氧栏-->

          <div class="card min-w-[10vw]  bg-base-100 shadow-lg  border border-zinc-100 cursor-pointer top-[2vh] absolute "
               @click="popProcessManager('溶氧')">
            <div
                class="w-full h-[2.5rem] mb-2 font-black  bg-[#FAD6DA] flex items-center justify-center rounded-t-2xl ">

              <div class="w-full text-center relative">
                溶氧
              </div>

            </div>
            <div class="mx-6 my-3  mt-0 flex-col  ">
              <div class="w-full  flex h-[3vh] flex items-center justify-center  gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative ">设定值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">转速上限:</div>
                <span class="countdown relative">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">转速下限:</div>
                <span class="countdown relative">
                  <span style="--value:53;"></span>
                </span>

              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">溶氧上限:</div>
                <span class="countdown relative">
                    <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">溶氧下限:</div>
                <span class="countdown relative">
                  <span style="--value:53;"></span>
                </span>

              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">转速关联状态:</div>
                <span class="countdown relative">
                    <span style="--value:53;"></span>
                </span>

              </div>
            </div>
          </div>
          <!--转速栏-->
          <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 cursor-pointer top-[33vh] absolute  "
               @click="popProcessManager('转速')">
            <div
                class="w-full h-[2.5rem]   mb-2 font-black  bg-[#E1EEFF] flex items-center justify-center rounded-t-2xl ">
              <div class="w-full text-center relative">
                转速
              </div>

            </div>
            <div class="mx-6 my-3  mt-0 flex-col  ">
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative ">设定值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>

            </div>
          </div>
          <!--PH-->
          <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100  cursor-pointer top-[49vh] absolute "
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
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>

            </div>
          </div>
          <!--温度-->
          <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 cursor-pointer top-[65vh] absolute "
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
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2  ">
                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">加热功率:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">冷凝水状态:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
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
        <div class="h-full w-[20%] overflow-hidden p-1 flex-col gap-2.5 relative flex  items-start">
          <!--酸泵-->
          <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[6vh] absolute ">
            <div class="w-full h-[3rem] mb-2   bg-[#FAD6DA] flex items-center justify-center rounded-t-2xl ">
              <!--TODO 把hover关了，要不他关闭后hover还开着。-->

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
                     @click="stateManger.AddAcid=!stateManger.AddAcid">
                  加酸
                </div>
              </div>

            </div>
            <div class="mx-6 my-3  mt-0 flex-col  ">
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative ">实时速率:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
            </div>
          </div>
          <!--碱泵-->
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
                     @click="stateManger.AddLye=!stateManger.AddLye">
                  加碱
                </div>
              </div>

            </div>
            <div class="mx-6 my-3  mt-0 flex-col  ">
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative ">设定值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>

            </div>
          </div>
          <!--消泡泵-->
          <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[36vh] absolute ">

            <div class="w-full h-[3rem]   mb-2   bg-[#FCF8DA] flex items-center justify-center rounded-t-2xl ">
              <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                  <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>

                <div :class="[stateManger.DefoamerPump?'text-white bg-[#E4DDA4]':'bg-white']"
                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                     @click="stateManger.DefoamerPump=!stateManger.DefoamerPump">
                  消泡泵
                </div>
                <div :class="[stateManger.Defoamer?'text-white bg-[#E4DDA4]':'bg-white']"
                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-2 cursor-pointer "
                     @click="stateManger.Defoamer=!stateManger.Defoamer">
                  消泡
                </div>
              </div>

            </div>


            <div class="mx-6 my-3  mt-0 flex-col  ">
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative ">设定值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
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
                <div class=" min-w-[7rem] mr-1 text-left relative ">设定值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>
              <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                <div class=" min-w-[7rem] mr-1 text-left relative">测量值:</div>
                <span class="countdown relative ">
                  <span style="--value:53;"></span>
                </span>
              </div>

            </div>
          </div>
          <button
              class="w-[10rem] h-[4rem] text-lg top-[4rem] relative bg-[#4EA67D] rounded-xl text-white hover:bg-[#327E5B] absolute top-[67vh]">
            开始发酵
          </button>
          <button
              class="w-[10rem] h-[4rem] text-lg top-[5rem] relative bg-[#E0E0E0] rounded-xl text-black hover:bg-[#CBCBCB] absolute top-[68vh]">
            结束发酵
          </button>

        </div>
      </div>

    </div>


  </div>


</template>

<script setup>
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {PopupType} from "@/store/PopupMangerState";
import {onMounted, onUnmounted, reactive} from "vue";
import ProcessPopupManger from "@/components/ProcessPopupManger.vue";

const ProcessPopupMangerState = useProcessPopupMangerState()
// 弹窗管理
const popProcessManager = (val) => {
  if (val === '补料泵') {
    stateManger.FeedPump = !stateManger.FeedPump;
  }
  ProcessPopupMangerState.updateIsShowPop(true)
  ProcessPopupMangerState.updatePopupContent(name_translation[val])
  console.log(ProcessPopupMangerState.isShowPop)
  console.log(ProcessPopupMangerState.popupContent)
}
// 当按下键盘时的处理函数，ESC关闭弹窗
const handleKeydownEsc = (event) => {
  if (event.keyCode === 27) { // 27 是 esc 键的 keyCode
    console.log('ESC key was pressed!');
    // 在此处执行你想要的操作
    ProcessPopupMangerState.updateIsShowPop(false)
    stateManger.FeedPump = false
  }
};
const name_translation = {
  '温度': 'Temperature',
  'PH值': 'PHValue',
  '溶氧': 'DissolvedOxygen',
  '转速': 'RPM',
  '补料泵': 'FeedPump',
}
const stateManger = reactive({
  AcidPump: false,
  AddAcid: false,
  LyePump: false,
  AddLye: false,
  DefoamerPump: false,
  Defoamer: false,
  FeedPump: false,
  AddFeed: false
})


onMounted(() => {
  window.addEventListener('keydown', handleKeydownEsc);

})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydownEsc);
});
</script>

