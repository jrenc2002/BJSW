<template>
    <div class="h-[90vh] border   transition-all duration-300 ease-in-out shadow bg-white rounded-2xl">
        
        <!--    标题-->
        <div class="h-[3rem] self-stretch justify-start items-center  inline-flex mt-3  w-full ">
            <div class="w-[calc(10rem)] m-auto text-xl leading-10 text-zinc-900 text-2xl font-medium p-2 leading-loose left-4 relative">
                PH值控制
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
        <div class="  w-[100%] h-[92%]     items-center justify-center  flex  ">
            <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
                <div class=" w-full h-[100%] ">
                    <div class=" box-border  w-full h-full flex" style="overflow: auto;">
                        
                        <!-- 新格式-->
                        <!--左侧列left-->
                        <div class="relative w-[20rem]  h-[calc(100%-1rem)]  flex-col flex justify-start items-center ">
                            <!--设置参数-->
                            <div class="relative  shadow w-[19rem] m-2 rounded-2xl  justify-start items-center border border-gray-300 ">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium ">
                                    <div class="ml-4 ">
                                        设置参数
                                    </div>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%] h-[calc(92%-3.5rem)]  top-0    justify-center flex mb-4  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)]   justify-center flex     ">
                                        <div class=" w-full h-[100%] ">
                                            <div class=" box-border overflow-x-hidden w-full  flex mb-1">
                                                <!--原表格left-->
                                                <div class=" float-left  shadow  border-radius z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="mb-4   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>状态</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>测量值</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>设定值</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start  ">
                                                            <div class="flex justify-center items-center">
                                                                <tr class=" justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r rounded-tr-2xl hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="h-full flex justify-center items-center  ">
                                                                            <Menu as="div"
                                                                                  class="dropdown relative inline-block">
                                                                                <div>
                                                                                    <MenuButton
                                                                                            class="inline-flex w-[7rem] justify-center gap-x-1.5">
                                                                                        <summary
                                                                                                v-if="localCache.setNum.PH_flag!==1"
                                                                                                class="m-1 btn w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-md">
                                                                                            停止
                                                                                        </summary>
                                                                                        <summary v-if="localCache.setNum.PH_flag===1"
                                                                                                 class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-md">
                                                                                            开启
                                                                                        </summary>
                                                                                    </MenuButton>
                                                                                </div>
                                                                                <MenuItems
                                                                                        class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-md w-[7rem] border absolute origin-top-left left-0 mt-2">
                                                                                    <MenuItem v-slot="{ active }">
                                                                                        <button @click="paramSend('PH_flag',AppGlobal.pageChance,1)" :class="[active ? 'bg-[#E0E0E0] text-[#000000]' : 'text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2]', 'block px-4 py-2 text-sm rounded']">
                                                                                            停止
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                    <MenuItem v-slot="{ active }">
                                                                                        <button @click="paramSend('PH_flag',AppGlobal.pageChance,0)" :class="[active ? 'bg-[#BAE7C7] text-[#256637]' : 'text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2', 'block px-4 py-2 text-sm rounded mt-2']">
                                                                                            开启
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                </MenuItems>
                                                                            </Menu>
                                                                        
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        {{DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.timing_PH!==undefined?DeviceManage.deviceData[AppGlobal.pageChance]?.nowData?.timing_PH:0}}
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r rounded-br-2xl  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.setNum.target_PH"
                                                                                   @blur="paramSend('target_PH',AppGlobal.pageChance,localCache.setNum.target_PH)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="PH设定值"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!--报警参数-->
                            <div class="relative  shadow w-[19rem]  mt-6    m-2 rounded-2xl  justify-start items-center  border border-gray-300">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium ">
                                    <div class="ml-4">
                                        报警参数
                                    </div>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%] h-[calc(100%-3.5rem)]  top-0  mb-4  justify-center flex  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)]   justify-center flex     ">
                                        <div class=" w-full h-[92%] ">
                                            <div class="  overflow-hidden w-full  flex">
                                                <!--原表格left-->
                                                <div class="float-left     rounded-l-2xl z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>PH报警上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>PH报警下限</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!--原表格right-->
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start w-[10rem]  rounded-r-2xl ">
                                                            <div class="flex-col justify-center items-center">
                                                                <tr class="flex justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r rounded-tr-2xl  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            
                                                                            <input id="name" v-model="localCache.alarmNum.alarm_h_limit"
                                                                                   @blur="DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.phMaxWarn=localCache.alarmNum.alarm_h_limit"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="报警上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr class="flex justify-center items-center">
                                                                    <td class=" text-center  border-b border-r  rounded-br-2xl hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.alarmNum.alarm_l_limit"
                                                                                   @blur="DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.phMinWarn=localCache.alarmNum.alarm_l_limit"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="报警下限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <!--中侧-->
                        <div class="relative w-[22rem]   h-[calc(100%-1rem)]     flex-col flex justify-start items-center">
                            <!--自动参数-酸泵-->
                            <div class="relative  shadow w-[19rem]      m-2 rounded-2xl  justify-start items-center  border border-gray-300">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium">
                                    <div class="ml-4">
                                        自动参数-
                                        <span class="font-bold underline-offset-2 decoration-solid underline  ">酸泵</span>设置
                                    </div>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%]   top-0    justify-center flex  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)] mb-5  justify-center flex     ">
                                        <div class=" w-full h-[92%] ">
                                            <div class=" box-border overflow-x-hidden w-full   flex">
                                                <!--原表格left-->
                                                <div class="float-left   shadow-radius border-radius  rounded-tl-2xl z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="mb-4   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>比例P</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>积分I</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>微分D</div>
                                                                </td>
                                    
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!--原表格right-->
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start w-[10rem]  ">
                                                            <div class="flex justify-center items-center">
                                                                <tr class=" justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-tr-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.acidNum.acid_KP"
                                                                                   @blur="paramSend('acid_KP',AppGlobal.pageChance,localCache.acidNum.acid_KP)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="酸泵比例P"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.acidNum.acid_KI"
                                                                                   @blur="paramSend('acid_KI',AppGlobal.pageChance,localCache.acidNum.acid_KI)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="酸泵积分I"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-br-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.acidNum.acid_KD"
                                                                                   @blur="paramSend('acid_KD',AppGlobal.pageChance,localCache.acidNum.acid_KD)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="酸泵微分D"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                        
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <!--自动参数-碱泵-->
                            <div class="relative  shadow w-[19rem] mt-6     m-2 rounded-2xl  justify-start items-center  border border-gray-300">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium">
                                    <div class="ml-4">
                                        自动参数-
                                        <span class="font-bold underline-offset-2 decoration-solid underline ">碱泵</span>设置
                                    </div>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%]   top-0    justify-center flex  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)] mb-5  justify-center flex     ">
                                        <div class=" w-full h-[92%] ">
                                            <div class=" box-border overflow-x-hidden w-full   flex">
                                                <!--原表格left-->
                                                <div class="float-left   shadow-radius border-radius  rounded-tl-2xl z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="mb-4   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>比例P</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>积分I</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>微分D</div>
                                                                </td>
                                                    
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!--原表格right-->
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start w-[10rem]  ">
                                                            <div class="flex justify-center items-center">
                                                                <tr class=" justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-tr-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.lyeNum.lye_KP"
                                                                                   @blur="paramSend('lye_KP',AppGlobal.pageChance,localCache.lyeNum.lye_KP)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="碱泵比例P"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.lyeNum.lye_KI"
                                                                                   @blur="paramSend('lye_KI',AppGlobal.pageChance,localCache.lyeNum.lye_KI)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="碱泵积分I"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-br-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.lyeNum.lye_KD"
                                                                                   @blur="paramSend('lye_KD',AppGlobal.pageChance,localCache.lyeNum.lye_KD)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="碱泵微分D"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                        
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <!--右侧-->
                        <div class="relative w-[20rem]   h-[calc(100%-1rem)]     flex-col flex justify-start items-center">
                            <!--控制参数-->
                            <div class="relative  shadow w-[19rem]      m-2 rounded-2xl  justify-start items-center  border border-gray-300">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium">
                                    <div class="ml-4">
                                        控制参数
                                    </div>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%]   top-0    justify-center flex  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)] mb-5  justify-center flex     ">
                                        <div class=" w-full h-[92%] ">
                                            <div class=" box-border overflow-x-hidden w-full   flex">
                                                <!--原表格left-->
                                                <div class="float-left   shadow-radius border-radius  rounded-tl-2xl z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="mb-4   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>控制死区</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>误差上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>误差下限</div>
                                                                </td>
                                        
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!--原表格right-->
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start w-[10rem]  ">
                                                            <div class="flex justify-center items-center">
                                                                <tr class=" justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-tr-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.controlNum.PH_dead_zone"
                                                                                   @blur="deadZoneControl()"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="请填控制死区"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.controlNum.PH_area_upper_limit"
                                                                                   @blur="paramSend('PH_area_upper_limit',AppGlobal.pageChance,localCache.controlNum.PH_area_upper_limit)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="误差上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.controlNum.PH_area_lower_limit"
                                                                                   @blur="paramSend('PH_area_lower_limit',AppGlobal.pageChance,localCache.controlNum.PH_area_lower_limit)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="误差下限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                            
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
    
                        </div>
                    </div>
                
                </div>
            
            </div>
        
        
        </div>
    
    
    </div>


</template>


<script lang='ts' setup>

// ______________________导入模块_______________________
import {computed, onMounted, onUnmounted, reactive, ref, Ref, watch} from 'vue'
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {sendData} from '@/api/index.js'
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import Swal from "sweetalert2";

const DeviceManage = useDeviceManage();
const ProcessPopupMangerState = useProcessPopupMangerState()
const AppGlobal = useAppGlobal();
// -------------数据缓冲-----------------
const localCache = ref({
    setNum: {
        target_PH: null,
        PH_flag: null,
    },
    controlNum: {
        PH_dead_zone:null,
        PH_area_upper_limit: null,
        PH_area_lower_limit: null,
    },
    alarmNum: {
        alarm_h_limit: null,
        alarm_l_limit: null,
    },
    acidNum: {
        acid_KP: null,
        acid_KI: null,
        acid_KD: null,
    },
    lyeNum: {
        lye_KP: null,
        lye_KI: null,
        lye_KD: null,
    },
    
})


const deadZoneControl=()=>{
    
    if (localCache.value.controlNum.PH_dead_zone!==null&&localCache.value.controlNum.PH_dead_zone!==undefined){
        if (localCache.value.setNum.target_PH!==null&&localCache.value.setNum.target_PH!==undefined){
            paramSend('PH_area_upper_limit',AppGlobal.pageChance,Number(localCache.value.setNum.target_PH)+Number(localCache.value.controlNum.PH_dead_zone))
            paramSend('PH_area_lower_limit',AppGlobal.pageChance,Number(localCache.value.setNum.target_PH)-Number(localCache.value.controlNum.PH_dead_zone))
        }else {
            Swal.fire({
                icon: 'error', // 由于是确认操作，使用 'question' 图标
                title: '请先设置目标溶氧值不为空', // 设置标题
                showCancelButton: false, // 显示取消按钮
                confirmButtonColor: '#3085d6', // 确认按钮颜色
                confirmButtonText: '确认', // 确认按钮文本
            })
        }
    }
    
}



// ______________________表格数据变量_______________________
const paramSend = ((name, index, content) => {
    // 使用方括号来设置动态属性名
    const data = {
        [name]: content
    };
    sendData(index, data);
    
});


// ______________________功能函数_______________________
const closePop = () => {
    ProcessPopupMangerState.updateIsShowPop(false)
}




// 当按下键盘时的处理函数，ESC关闭弹窗
const handleKeydown = (event) => {
    if (event.keyCode === 27) { // 27 是 esc 键的 keyCode
        
        // 在此处执行你想要的操作
        ProcessPopupMangerState.updateIsShowPop(false)
    }
};
// 弹窗管理

// ______________________生命周期_______________________

// 当组件挂载时添加事件监听器
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
//   循环
//   setInterval(() => {
//     // sendData(0)
//   }, 10000)
//     initTableData()
});

// 当组件卸载时移除事件监听器
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});


/* ______________________静态接口_____________________________ */
interface HeaderItem {
    title: string;
    props: string;
}


</script>
<style lang="scss" scoped>


table {
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  border-spacing: 0;

}

//
th {
  //word-break: break-all;
  //word-wrap: break-word;
  //height: 40px;
  //width: 100px;
  //vertical-align: middle;
  //text-align: center;
  //border-left: 1px solid #999;
  //background: #d9d9d9;
  //box-sizing: border-box;
  height: 4.5rem;

}

td {
  //word-break: break-all;
  //word-wrap: break-word;
  //width: 100px;
  //text-align: center;
  //vertical-align: middle;
  //line-height: 30px;
  //border-left: 1px solid #999;
  //box-sizing: border-box;
  height: 4.5rem;
}

//
//tr {
//  border-top: 1px solid #999;
//  box-sizing: border-box;
//}


.right-div {
  float: left;

  margin-left: -1px;
}

.right-div1 {
  overflow: hidden;

  .first-row-style {
    box-sizing: border-box;
  }
}

.right-div2 {
  overflow: auto;
}

.right-table2 {
  overflow: hidden;
}


.empty-content {
  width: 100%;
  overflow: auto;
}


</style>
