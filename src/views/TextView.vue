<template>
    <div class="h-[94vh] w-[22rem] transition-all duration-300 ease-in-out shadow bg-white rounded-2xl">
<button @click="controlSend()">
    
    2323
</button>
    

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

// ______________________表格数据处理_______________________

const controlSend = (() => {

 

    const data = {
        feed_flag: 1,
        feed_pump_now_set_speed: 300,
        //0是手动
        /* 全速补料V
         * 1. 补料速度
         * 2. 发酵时间-触发时间点
         */
        /* 线性补料
         * 1. 补料速度
         * 2. 溶氧上限-到了上限开始补料
         * 3. 溶氧下限-到了下限开始停止补料
         */
        /* 占空比补料-不做
         * 1. 补料速度
         * 2. 检测周期
         * 3. 补料量
         * 4. 溶氧
         */
        // defoam_pump_now_set_speed: 1,
        
    }
    
    DeviceManage.deviceList[0].deviceSocket.send(JSON.stringify(data));
    
    
    
})
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