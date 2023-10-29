<template>
    <div class="h-[60vh] w-[80vh] transition-all duration-300 ease-in-out shadow bg-white rounded-2xl border-2  border-[#4EA67D] flex justify-start items-center">
       
        
        <div class="relative w-[calc(60%-2rem)] shadow  h-[calc(100%-2rem)]  m-4 rounded-2xl flex-col flex justify-start items-center">
            <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center" >补料方式</div>
            <!--全速补料-->
            <div class="w-[90%] h-24 mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
                <!--左边部分-->
                <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                    <div class="h-1/2  flex justify-center items-center">
                    全速补料
                    </div>
                      <div class="h-1/2 flex justify-center items-center ">
                        <div @click="postFeedSet(1)"   class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 ">
                            <svg   width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z" fill="white"/>
                            </svg>
                        </div>
                      </div>
                  </div>
                <!--右边部分-->
                <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
                    <div class="h-1/2  flex ">
                        <div class="w-24 justify-start items-center flex">
                        补料速度
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2 m-2" placeholder="补料速度" v-model="contentSet.FullSpeedFeed.feed_speed" />

                    </div>
                    <div class="h-1/2  flex ">
                        <div class="w-24 justify-start items-center flex">
                            发酵时间
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2  m-2"  placeholder="请填多少小时开始" v-model="contentSet.FullSpeedFeed.ferment_time" />

                    </div>
                </div>
            </div>
            <!--线性补料-->
            <div class="w-[90%] h-[7rem] mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]" >
                <!--左边部分-->
                <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                    <div class="h-1/2  flex justify-center items-center mt-1">
                        线性补料
                    </div>
                    <div class="h-1/2 flex justify-center items-center  ">
                        <div @click="postFeedSet(2)"   class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 ">
                            <svg   width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <!--右边部分-->
                <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
                    <div class="h-1/3  flex  ">
                        <div class="w-24 justify-start items-center flex">
                            补料速度
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2 m-2" placeholder="请填补料速度" v-model="contentSet.LinearFeed.feed_speed"/>
            
                    </div>
                    <div class="h-1/3  flex ">
                        <div class="w-24 justify-start items-center flex">
                            溶氧上限
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2  m-2"   placeholder="请填溶氧上限" v-model="contentSet.LinearFeed.oxygen_upper_limit"/>
            
                    </div>
                    <div class="h-1/3  flex ">
                        <div class="w-24 justify-start items-center flex">
                            溶氧下限
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2  m-2"  placeholder="请填溶氧下限" v-model="contentSet.LinearFeed.oxygen_lower_limit" />
    
                    </div>
                </div>
            </div>
            <!--占空比补料-->
            <div class="w-[90%] h-[10rem] mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]" >
                <!--左边部分-->
                <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                    <div class="h-1/2  flex justify-center items-center mt-2">
                        占空比补料
                    </div>
                    <div class="h-1/2 flex justify-center items-center ">
                        <div  @click="postFeedSet(3)"   class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 ">
                            <svg   width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <!--右边部分-->
                <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
                    <div class="h-1/4  flex  ">
                        <div class="w-24 justify-start items-center flex">
                            补料速度
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2 m-2"  placeholder="请填补料速度"  v-model="contentSet.DutyFeed.feed_speed" />
            
                    </div>
                    <div class="h-1/4  flex ">
                        <div class="w-24 justify-start items-center flex">
                            检测周期
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2  m-2"  placeholder="请填检测周期" v-model="contentSet.DutyFeed.detection_cycle" />
            
                    </div>
                    <div class="h-1/4  flex ">
                        <div class="w-24 justify-start items-center flex">
                            补料量
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2  m-2"  placeholder="请填补料量" v-model="contentSet.DutyFeed.feed_amount"  />
            
                    </div>
                    <div class="h-1/4  flex ">
                        <div class="w-24 justify-start items-center flex">
                            溶氧触发
                        </div>
                        <input type="text" name="name" id="name" class="block w-[80%]  border-b-2  m-2"  placeholder="请填溶氧值" v-model="contentSet.DutyFeed.oxygen_trigger" />
    
                    </div>
                </div>
            </div>
    
            <div class="bg-[#F5F5F5] right-[-17rem] absolute top-0 w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer"
                 @click="closePop">
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                          fill="#19161D"/>
                </svg>
            </div>
        </div>
<!--        <div class="relative w-[calc(40%-2rem)] shadow  h-[calc(100%-2rem)]  m-4 rounded-2xl flex-col justify-start items-center">-->
<!--            <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">显示</div>-->
<!--            <div class="h-10 w-[90%]  flex justify-center items-center">-->
<!--                <div class="w-24 justify-start items-center flex">-->
<!--                    溶氧值-->
<!--                </div>-->
<!--                <input type="text" name="name" id="name" class="block w-[80%]  border-b-2  m-2"  />-->
<!--       -->
<!--            </div>-->
<!--            <div class="h-10 w-[90%] flex justify-center items-center ">-->
<!--                <div class="w-24 justify-start items-center flex">-->
<!--                    发酵时间-->
<!--                </div>-->
<!--                <input type="text" name="name" id="name" class="block w-[80%]  border-b-2  m-2"  />-->
<!--    -->
<!--            </div>-->
<!--            <div class="h-10 w-[90%]  flex justify-center items-center">-->
<!--                <div class="w-24 justify-start items-center flex">-->
<!--                    转速-->
<!--                </div>-->
<!--                <div class="w-24 justify-start items-center flex">-->
<!--                    转速-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

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
const contentSet= ref({
    FullSpeedFeed:{
        feedSpeed:null,
        feedDate:null,
    },
    LinearFeed:{
        feedSpeed:null,
        DOTopLimit:null,
        DOBottomLimit:null
    },
    DutyFeed:{
        feedSpeed:null,
        checkCycle:null,
        feedQuantity:null,
        DO:null
    }
});


const postFeedSet=(flag)=>{
    if (flag===1){
        const { feedSpeed, feedDate } = contentSet.value.FullSpeedFeed;
        DeviceManage.deviceList[AppGlobal.pageChance].recordFeedMode.FullSpeed = {
            feedSpeed: feedSpeed !== null ? feedSpeed : 0,
            feedDate: feedDate !== null ? feedDate : 0
        };
    }else if (flag===2){
        const { feedSpeed, DOTopLimit, DOBottomLimit } = contentSet.value.LinearFeed;
        DeviceManage.deviceList[AppGlobal.pageChance].recordFeedMode.Line = {
            feedSpeed: feedSpeed !== null ? feedSpeed : 0,
            DOTopLimit: DOTopLimit !== null ? DOTopLimit : 0,
            DOBottomLimit: DOBottomLimit !== null ? DOBottomLimit : 0
        };
       }
    else if (flag===3){
        const { feedSpeed, checkCycle, feedQuantity, DO } = contentSet.value.DutyFeed;
        DeviceManage.deviceList[AppGlobal.pageChance].recordFeedMode.DutyCycle = {
            feedSpeed: feedSpeed !== null ? feedSpeed : 0,
            checkCycle: checkCycle !== null ? checkCycle : 0,
            feedQuantity: feedQuantity !== null ? feedQuantity : 0,
            DO: DO !== null ? DO : 0
        };
        
    }
}

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
            ProcessPopupMangerState.updateIsShowPop(false)
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