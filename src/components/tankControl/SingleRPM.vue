<template>
    <div :class="[AppGlobal.isDrawerState? 'w-[calc(86vw-15rem)]':'w-[86vw]']"
            class="h-[80vh] border   transition-all duration-300 ease-in-out shadow bg-white rounded-2xl">
        
        <!--    标题-->
        <div class="h-[3rem] self-stretch justify-start items-center  inline-flex mt-3  w-full ">
            <div class="w-[calc(10rem)] m-auto text-xl leading-10 text-zinc-900 text-2xl font-medium p-2 leading-loose left-4 relative">
                转速控制
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
                                            <div class=" box-border overflow-x-hidden w-full  flex">
                                                <!--原表格left-->
                                                <div class=" float-left  shadow  border-radius z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="mb-4   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>状态</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>实时转速</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>设定转速</div>
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

                                                                            <Menu as="div" class="dropdown relative inline-block">
                                                                                <div>
                                                                                    <MenuButton
                                                                                            class="inline-flex w-[7rem] justify-center gap-x-1.5">
                                                                                        <summary
                                                                                                v-if="DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.timing_motor_speed >0"
                                                                                                class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-md">
                                                                                            开启
                                                                                        </summary>
                                                                                        <summary v-else
                                                                                                 class="m-1 btn w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-md">
                                                                                            停止
                                                                                        </summary>
                                                                                    </MenuButton>
                                                                                </div>
                                                                                <MenuItems
                                                                                        class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-md w-[7rem] border absolute origin-top-left left-0 mt-2">
                                                                                    <MenuItem v-slot="{ active }">
                                                                                        <button @click="rpmConfirm('on')" :class="[active ? 'bg-[#E0E0E0] text-[#000000]' : 'text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2]', 'block px-4 py-2 text-sm rounded']">
                                                                                            停止
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                    <MenuItem v-slot="{ active }">
                                                                                        <button @click="rpmConfirm('off')" :class="[active ? 'bg-[#BAE7C7] text-[#256637]' : 'text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2', 'block px-4 py-2 text-sm rounded mt-2']">
                                                                                            开启
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                </MenuItems>
                                                                            </Menu>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                       {{DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.timing_motor_speed!==undefined?DeviceManage.deviceList[AppGlobal.pageChance].nowData.timing_motor_speed+' r/min':'0'}}
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r rounded-br-2xl  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model.lazy="localCache.setNum.target_motor_speed"
                                                                                   @blur="paramSend('target_motor_speed',AppGlobal.pageChance,localCache.setNum.target_motor_speed)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="请填设定值"
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
                            <div class="relative  shadow w-[19rem]      m-2 rounded-2xl  justify-start items-center  border border-gray-300">
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
                                                                    <div>转速报警上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>转速报警下限</div>
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
                                                    
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" v-model.lazy="localCache.alarmNum.rpmMaxWarn"
                                                                                   @blur="DeviceManage.deviceList[AppGlobal].deviceSet.rpmMaxWarn=localCache.alarmNum.rpmMaxWarn"
                                                                                   placeholder="请输报警上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr class="flex justify-center items-center">
                                                                    <td class=" text-center  border-b border-r  rounded-br-2xl hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" v-model.lazy="localCache.alarmNum.rpmMinWarn"
                                                                                   @blur="DeviceManage.deviceList[AppGlobal].deviceSet.rpmMaxWarn=localCache.alarmNum.rpmMinWarn"
                                                                                   placeholder="请输报警下限"
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
                        <div class="relative w-[22rem]   h-[calc(100%-1rem)]     flex-col flex justify-start items-center">
                        
                            <!--控制参数-->
                            <div class="relative  shadow w-[19rem]      m-2 rounded-2xl  justify-start items-center  border border-gray-300">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium">
                                    <div class="ml-4">
                                        关联控制参数
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
                                                                    <div>溶氧上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>溶氧下限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>转速上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>转速下限</div>
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
                                                                            <input id="name" v-model.lazy="localCache.controlNum.DO_dead_zone"
                                                                                   @blur="paramSend('DO_area_limit',AppGlobal.pageChance,localCache.controlNum.DO_dead_zone);"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="请填控制死区"
                                                                                   step="0.01"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]   m-2 text-center bg-inherit"
                                                                                   name="name"  v-model.lazy="localCache.controlNum.DO_upper_limit"
                                                                                  placeholder="请填溶氧上限" disabled
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]   m-2 text-center bg-inherit"
                                                                                   name="name"   v-model.lazy="localCache.controlNum.DO_lower_limit"
                                                                                  placeholder="请填溶氧下限" disabled
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"   v-model.lazy="localCache.controlNum.motor_speed_u_limit"
                                                                                   @blur="paramSend('motor_speed_u_limit',AppGlobal.pageChance,localCache.controlNum.motor_speed_u_limit)"
                                                                                   placeholder="请填转速上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-br-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" v-model.lazy="localCache.controlNum.motor_speed_l_limit"
                                                                                   @blur="paramSend('motor_speed_l_limit',AppGlobal.pageChance,localCache.controlNum.motor_speed_l_limit)"
                                                                                   placeholder="请填转速下限"
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
                        <div class=" relative w-[24rem]   h-[calc(100%-1rem)]   mx-2    flex-col flex justify-start items-center">
                            <div class="relative  shadow  h-[100%] overflow-y-auto  m-2 rounded-2xl flex-col flex justify-start items-center border border-gray-300">
                                <div class="w-full h-14 rounded-t-2xl flex justify-center items-center text-lg font-medium">分段转速设置</div>
                                <div class="h-[calc(100%-3.5rem)] w-[24rem] justify-start items-center flex-col flex">
                                    <div class="w-[calc(100%-0.5rem)] h-[85%] absolute">
                                        <button class="flex m-2 w-[96%]  text-sm hover:bg-green-50 border-2 p-4 border-[#83BA9B] rounded-lg   justify-center items-center"
                                                type="button" @click="updateTotalSegmentTime()">
                                            <div class="w-1/5 text-center "> 序号</div>
                        
                                            <div class="w-1/5 text-center ">设定值</div>
                        
                                            <div class="w-1/5 text-center ">设定时间</div>
                                            <div class="w-1/5 text-center ">已分配</div>
                        
                                            <div class="w-1/5 text-center ">删除</div>
                                        </button>
                                        <form @submit.prevent="submitForm">
                                            <div v-for="(item, index) in formData.items" :key="item.id"
                                                 class="flex m-2 border-2 p-4 border-[#83BA9B] rounded-lg   justify-center items-center flex  ">
                                                <input v-model="item.id" @blur="updateForm()" class="w-1/5 text-center  border" placeholder="序号" type="text">
                                                <input v-model="item.setValue" @blur="updateForm()" class="w-1/5 text-center border-y border-r" type="number"  placeholder="r">
                                                <input v-model="item.segmentTime" @blur="updateForm()" class="w-1/5 text-center border-y border-r" type="number" placeholder="h">
                            
                                                <div  class=" text-center bg-gray-100 border-y border-r w-1/5" disabled>{{item.totalSegmentTime}}h</div>
                                                <button class=" text-center w-1/5" type="button " @click="removeItem(index)">删除
                                                </button>
                                            </div>
                                        </form>
                                        <button class="flex ml-2 w-[96%] hover:bg-green-50 border-2 p-4 border-[#83BA9B] rounded-lg justify-center items-center"
                                                type="button"
                                                @click="addItem">
                                            <svg fill="none" height="20" viewBox="0 0 21 20" width="21"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.5 9V0H9.5V9H0.5V11H9.5V20H11.5V11H20.5V9H11.5Z" fill="#83BA9B"/>
                                            </svg>
                                        </button>
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

<script lang='js' setup>

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
    setNum:{
        target_motor_speed:null,
        target_DO:null,
    },
    alarmNum:{
        rpmMaxWarn:null,
        rpmMinWarn:null,
    },
    controlNum:{
        DO_dead_zone: null,
        motor_speed_u_limit:null,
        motor_speed_l_limit:null,
        DO_upper_limit: null,
        DO_lower_limit: null,
    }
    
});



// 数据同步 监听device
watch(() => DeviceManage.deviceList[AppGlobal.pageChance]?.nowData, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        updateCache();
    }
})
// updateCache函数
const updateCache = () => {
    localCache.value.setNum.target_motor_speed = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.target_motor_speed
    localCache.value.setNum.target_DO = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.target_DO
    
    localCache.value.alarmNum.rpmMaxWarn = DeviceManage.deviceList[AppGlobal.pageChance]?.deviceSet?.rpmMaxWarn
    localCache.value.alarmNum.rpmMinWarn = DeviceManage.deviceList[AppGlobal.pageChance]?.deviceSet?.rpmMinWarn
    
    localCache.value.controlNum.DO_dead_zone = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_area_limit
    localCache.value.controlNum.motor_speed_u_limit = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.motor_speed_u_limit
    localCache.value.controlNum.motor_speed_l_limit = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.motor_speed_l_limit
    
    localCache.value.controlNum.DO_upper_limit = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.target_DO+ DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_area_limit
    localCache.value.controlNum.DO_lower_limit =returnZero( DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.target_DO- DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_area_limit)
    
    
}

const returnZero = (num) => {
    if (num < 0) {
        return 0
    } else {
        return num
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
    updateCache();
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
const rpmConfirm = (status) => {
    if (status === 'on') {
        if (localCache.value.setNum.target_motor_speed === 0) {
            Swal.fire({
                icon: 'error', // 由于是确认操作，使用 'question' 图标
                title: '请先设置转速不为0', // 设置标题
                showCancelButton: false, // 显示取消按钮
                confirmButtonColor: '#3085d6', // 确认按钮颜色
                confirmButtonText: '确认', // 确认按钮文本
            })
        }
        else {
            paramSend('target_motor_speed',AppGlobal.pageChance,localCache.value.setNum.target_motor_speed)
        }
        
        
        
    } else if (status === 'off') {
        Swal.fire({
            icon: 'question', // 由于是确认操作，使用 'question' 图标
            title: '确认关闭电机吗?', // 设置标题
            showCancelButton: true, // 显示取消按钮
            confirmButtonColor: '#3085d6', // 确认按钮颜色
            cancelButtonColor: '#d33', // 取消按钮颜色
            confirmButtonText: '确认', // 确认按钮文本
            cancelButtonText: '取消' // 取消按钮文本
        }).then((result) => {
            if (result.value) {
                // 用户点击了确认按钮
                paramSend('target_motor_speed', AppGlobal.pageChance, 0)
            }
        });
    }
    
    
}
// 顺控
const formData = reactive({
    items: [
    
    ]
});

const addItem = () => {
    const nextId = formData.items.length + 1;
    
    formData.items.push( { id: nextId, setValue: null, segmentTime: null, totalSegmentTime: null });
    updateTotalSegmentTime();
};

const removeItem = (index) => {
    formData.items.splice(index, 1);
    updateTotalSegmentTime();
};
const updateTotalSegmentTime = () => {
    // 重新排序 id
    formData.items.forEach((item, index) => {
        item.id = index + 1;
    });
    
    // 计算 totalSegmentTime
    formData.items.forEach((item, index) => {
        let total = 0;
        for (let i = 0; i < index+1; i++) {
            
            total += formData.items[i].segmentTime;
        }
        item.totalSegmentTime = total;
    });
};
const updateForm= () => {
    updateTotalSegmentTime();
    submitForm();
};
const submitForm = () => {
    // 本地缓存提交全局
    DeviceManage.deviceList[AppGlobal.pageChance].SequenceControl.RPM = formData.items

};
/* ______________________静态接口_____________________________ */


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
