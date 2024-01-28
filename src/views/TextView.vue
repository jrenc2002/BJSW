<template>
    <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  bg-white rounded-2xl border shadow">
        <div class="w-full h-[6%] flex items-center justify-start text-[1.4rem] my-2 ml-4">
            测试设置
        </div>
        <div class="w-full   h-[30%] flex items-center justify-start text-[1.4rem] my-2 ml-4 border-b">
            <div class="w-1/2 flex justify-center items-center relative">
                <button>
                    <span class="text" @click="initValue()">初始化设置</span>
                </button>
                
            </div>
            <div class="w-[40%] flex bg-gray-200 h-full justify-start flex-col items-start relative overflow-y-auto">
                向下位机发送初始化的值，用于测试。
                <div>Temp_KP: 500, </div>
                <div>Temp_KI: 5, </div>
                <div>Temp_KD: 1, </div>
                <div>DO_KP: 80, </div>
                <div>DO_KI: 0.5, </div>
                <div>DO_KD: 0, </div>
                <div>acid_KP: 10, </div>
                <div>acid_KI: 0.02, </div>
                <div>acid_KD: 0, </div>
                <div>lye_KP: 10, </div>
                <div>lye_KI: 0.02, </div>
                <div>lye_KD: 0, </div>
                <div>motor_speed_u_limit: 1000, </div>
                <div>motor_speed_l_limit: 300, </div>
                <div>zero_point_value: 0.057787, </div>
                <div>saturation_value: 19.5, </div>
                <div>acidPumpSpeed: 0.000147, </div>
                <div>lyePumpSpeed: 0.000147, </div>
                <div>feedPumpSpeed: 0.000147, </div>
                <div>feed0PumpSpeed: 0.000147, </div>
            </div>
            
        </div>
        <div class="w-full   h-[30%] flex items-center justify-start text-[1.4rem] my-2 ml-4 border-b">
            <div class="w-1/2 flex justify-center items-center relative">
                <div class="m-5">
                    <div class="input-container">
                        <input placeholder="发送键名" class="input-field" type="text" v-model="name">
                        <label for="input-field" class="input-label">发送键名</label>
                        <span class="input-highlight"></span>
                    </div>
                    <div class="input-container">
                        <input placeholder="发送键值" class="input-field" type="number" v-model="data">
                        <label for="input-field" class="input-label">发送键值</label>
                        <span class="input-highlight"></span>
                    </div>
                </div>

                <button>
                    <span class="text" @click="paramSend(name,AppGlobal.pageChance,data)">发送数值</span>
                </button>
            </div>
            
            <div class="w-[40%] flex bg-gray-200 h-full justify-start flex-col items-start relative overflow-y-auto">
                向下位机发送自定义的值，用于测试。

            </div>
    
        </div>
    
        <div class="w-full   h-[30%] flex items-center justify-start text-[1.4rem] my-2 ml-4 " >
            <div class="w-1/2 flex justify-center items-center relative">
     
                <div>
                    <span class="text" >读取下位机发来的数据</span>
                </div>
            </div>
        
            <div class="w-[40%] flex bg-gray-200 h-full justify-start flex-col items-start relative overflow-y-auto">
               下位机数据设置
                <div class="bg-white">
                    DeviceManage.deviceList[AppGlobal.pageChance].nowData
                    {{DeviceManage.deviceList[AppGlobal.pageChance]?.nowData}}
                </div>
                <div class="bg-green-50">
                    DeviceManage.deviceList[AppGlobal.pageChance].deviceSet
                    {{DeviceManage.deviceList[AppGlobal.pageChance]?.deviceSet}}
                </div>
            </div>
    
        </div>

    </div>


</template>

<script lang='ts' setup>

// ______________________导入模块_______________________
import {computed, Ref, ref, watch, onUnmounted, onMounted, reactive} from 'vue'
import PopupManger from "@/components/PopupManger.vue";
import {usePopupMangerState} from "@/store/PopupMangerState";
import {PopupType} from "@/store/PopupMangerState";
import {sendData} from '@/api/index.js'
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'

const DeviceManage = useDeviceManage();
const PopupMangerState = usePopupMangerState()
const AppGlobal = useAppGlobal();
const data = ref(0)
const name=ref('')
// ______________________表格数据处理_______________________


function initValue(index) {
    const data = {
        Temp_KP: 500,
        Temp_KI: 5,
        Temp_KD: 1,
        DO_KP: 80,
        DO_KI: 0.5,
        DO_KD: 0,
        acid_KP: 10,
        acid_KI: 0.02,
        acid_KD: 0,
        lye_KP: 10,
        lye_KI: 0.02,
        lye_KD: 0,
        motor_speed_u_limit: 1000,
        motor_speed_l_limit: 300,
        zero_point_value: 0.057787,
        saturation_value: 19.5,
        acidPumpSpeed: 0.000147,
        lyePumpSpeed: 0.000147,
        feedPumpSpeed: 0.000147,
        feed0PumpSpeed: 0.000147,
        
        
        
    }
    sendData(index, data)
}
const paramSend = ((name, index, content) => {
    // 使用方括号来设置动态属性名
    const data = {
        [name]: content
    };
    sendData(index, data);
    
});
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

button {
  align-items: center;
  background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 18px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  transition: all .3s;
}

button:active,
button:hover {
  outline: 0;
}

button span {
  background-color: rgb(5, 6, 45);
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

button:hover span {
  background: none;
}

button:active {
  transform: scale(0.9);
}
/* Input container */
.input-container {
  position: relative;
  margin: 20px;
}

/* Input field */
.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  background-color: transparent;
}

/* Input label */
.input-label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  color: rgba(204, 204, 204, 0);
  pointer-events: none;
  transition: all 0.3s ease;
}

/* Input highlight */
.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #007bff;
  transition: all 0.3s ease;
}

/* Input field:focus styles */
.input-field:focus + .input-label {
  top: -20px;
  font-size: 12px;
  color: #007bff;
}

.input-field:focus + .input-label + .input-highlight {
  width: 100%;
}

</style>
