<template>
    <div class="h-[80vh] border   transition-all duration-300 ease-in-out shadow bg-white rounded-2xl">
        
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
                                                                                    <MenuButton class="inline-flex w-[7rem] justify-center gap-x-1.5">
                                                                                        <summary v-if="DO_flag==0||DO_flag==null||DO_flag==undefined" class="m-1 btn w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-md">停止</summary>
                                                                                        <summary v-if="DO_flag==1" class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-md">开启</summary>
                                                                                    </MenuButton>
                                                                                </div>
                                                                                <MenuItems class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-md w-[7rem] border absolute origin-top-left left-0 mt-2">
                                                                                    <MenuItem v-slot="{ active }">
                                                                                        <button  :class="[active ? 'bg-[#E0E0E0] text-[#000000]' : 'text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2]', 'block px-4 py-2 text-sm rounded']">停止</button>
                                                                                    </MenuItem>
                                                                                    <MenuItem v-slot="{ active }">
                                                                                        <button  :class="[active ? 'bg-[#BAE7C7] text-[#256637]' : 'text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2', 'block px-4 py-2 text-sm rounded mt-2']">开启</button>
                                                                                    </MenuItem>
                                                                                </MenuItems>
                                                                            </Menu>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                       {{DeviceManage.deviceList[AppGlobal.selectedDeviceIndex]?.nowData.timing_motor_speed!==undefined?DeviceManage.deviceList[AppGlobal.selectedDeviceIndex].nowData.timing_motor_speed:0}}
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r rounded-br-2xl  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.controlNum.target_motor_speed"
                                                                                   @blur="controlSend('target_motor_speed',AppGlobal.pageChance,localCache.controlNum.target_motor_speed)"
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
                                                                    <div>溶氧报警上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>溶氧报警下限</div>
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
                                                                                   name="name" v-model="localCache.alarmNum.rpmMaxWarn"
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
                                                                                   name="name" v-model="localCache.alarmNum.rpmMinWarn"
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
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="请填控制死区"
                                                                                   required type="number"/>
<!--                                                                            todo 死区变量设置-->
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"  v-model="localCache.controlNum.DO_upper_limit"
                                                                                   @blur="controlSend('DO_upper_limit',AppGlobal.pageChance,localCache.controlNum.DO_upper_limit)"
                                                                                   placeholder="请填溶氧上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"   v-model="localCache.controlNum.DO_lower_limit"
                                                                                   @blur="controlSend('DO_lower_limit',AppGlobal.pageChance,localCache.controlNum.DO_lower_limit)"
                                                                                   placeholder="请填溶氧下限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"   v-model="localCache.controlNum.motor_speed_u_limit"
                                                                                   @blur="controlSend('motor_speed_u_limit',AppGlobal.pageChance,localCache.controlNum.motor_speed_u_limit)"
                                                                                   placeholder="请填转速上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-br-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" v-model="localCache.controlNum.motor_speed_l_limit"
                                                                                   @blur="controlSend('motor_speed_l_limit',AppGlobal.pageChance,localCache.controlNum.motor_speed_l_limit)"
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

const DeviceManage = useDeviceManage();
const ProcessPopupMangerState = useProcessPopupMangerState()
const AppGlobal = useAppGlobal();
// -------------数据缓冲-----------------
const localCache = ref({
    setNum:{
        target_motor_speed:null,
        
    },
    alarmNum:{
        rpmMaxWarn:null,
        rpmMinWarn:null,
    },
    controlNum:{
        motor_speed_u_limit:null,
        motor_speed_l_limit:null,
        DO_upper_limit: null,
        DO_lower_limit: null,
    }
    
});





// ______________________表格数据变量_______________________

const controlSend = ((name, index, content) => {
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
