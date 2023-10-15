<template>
    <div class="h-[50vh] w-[40vh] transition-all duration-300 ease-in-out shadow bg-white rounded-2xl border-2  border-[#4EA67D]">

        <!--    标题-->
        <div class="h-[4%] self-stretch justify-start items-center  inline-flex mt-4 px-2   w-full ">
            <div class="w-[calc(10rem)] text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">
                发酵设置
            </div>
            <div class="w-[calc(100%-10rem)] relative justify-end flex mr-3 ">

                <div class="bg-[#F5F5F5] right-0 relative w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer"
                     @click="closePop">
                    <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                              fill="#19161D"/>
                    </svg>
                </div>
            </div>
        </div>
        <!--    表格栏-->
        <div class="  w-[100%] h-[92%]  bottom-0   items-center justify-center flex  ">

            <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
                <div class=" w-full h-full  ">
                    <div
                            class="rounded-md mx-2 mt-1 px-3 h-[35%]  pt-1 shadow ring-1 border ring-inset ring-gray-300 focus-within:ring-6 focus-within:ring-indigo-600">
                        <label class="block text-xl font-medium text-gray-900 h-[40%]  flex items-center"
                               for="name">发酵批次</label>
                        <input id="name" class="h-[50%] block w-full rounded-md border p-3 text-gray-900  placeholder:text-gray-400 focus:border-[#4EA67D]
        hover:border-[#4EA67D] xl:text-xl xl:leading-6" name="name" placeholder="(必填)请输入发酵批次" v-model="batch_name" type="text"/>
                    </div>
                    <div
                            class="rounded-md mx-2 mt-4 px-3 h-[35%]  pt-1 shadow ring-1 border ring-inset ring-gray-300 focus-within:ring-6 focus-within:ring-indigo-600">
                        <label class="block text-xl font-medium text-gray-900 h-[40%]  flex items-center"
                               for="name">发酵周期</label>
                        <input id="name" class="h-[50%] block w-full rounded-md border p-3 text-gray-900  placeholder:text-gray-400 focus:border-[#4EA67D]
        hover:border-[#4EA67D] xl:text-xl xl:leading-6" name="name" placeholder="(可选)请输入预定发酵周期" v-model="batch_cycle" type="text"/>
                    </div>
                    <div class=" mx-2 mt-4 px-3 h-[15%]  pt-1 flex items-center justify-center ">
                        <button
                                className="mt-4 block h-[3rem] w-[60%] rounded-md hover:bg-[#327E5B]  bg-[#4EA67D] py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit" @click="controlSend('beginFerment',AppGlobal.pageChance)"
                        >
                            开始发酵
                        </button>
                    </div>

                </div>

            </div>


        </div>


    </div>


</template>

<script lang='ts' setup>

// ______________________导入模块_______________________
import {computed, Ref, ref, watch, onUnmounted, onMounted, reactive} from 'vue'
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {sendData} from '@/api/index.js'
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
import {toNumber} from "xe-utils";

const DeviceManage = useDeviceManage();
const ProcessPopupMangerState = useProcessPopupMangerState()
const AppGlobal = useAppGlobal();

// ______________________表单_______________________
const batch_name = ref(null);
const batch_cycle = ref(null);





const controlSend = ((name, index) => {
    if (name == 'beginFerment') {
        if (batch_name.value!==null&&batch_name.value!==''&&batch_name.value!==undefined){
            DeviceManage.deviceList[index].batch_name=batch_name.value;
            if (batch_cycle.value!==null&&batch_cycle.value!==''&&batch_cycle.value!==undefined){
                DeviceManage.deviceList[index].batch_cycle=toNumber(batch_cycle.value);
            }
            const data = {
                start_flag: 1,
                
            }
            sendData(index, data);
        }
     
        
   
    }


})


// ______________________功能函数_______________________
const closePop = () => {
    ProcessPopupMangerState.updateIsShowPop(false)
}



// ______________________生命周期_______________________


</script>
<style lang="scss" scoped>


</style>