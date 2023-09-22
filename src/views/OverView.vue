<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
    <transition name="fade">
      <div
          v-show="PopupMangerState.isShowPop"
          class="rounded-2xl absolute bg-white bg-opacity-50 h-[calc(100%-2rem)] w-[calc(100%-2rem)]  z-30 backdrop-blur-sm items-center justify-center flex"
      >
        <PopupManger :popcontent="PopupType[PopupMangerState.popupContent]" class="w-full h-full "></PopupManger>
      </div>
    </transition>

    <!--    标题-->
    <div class="h-[6%] self-stretch justify-start items-center gap-4 inline-flex ">
      <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">数据总览</div>
    </div>
    <!--    表格栏-->
    <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow items-center justify-center flex  ">


      <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
        <div class=" w-full h-full ">
          <div class=" box-border overflow-x-hidden w-full h-full flex">
            <template v-if="props.tableData.length > 0">
              <div class="float-left h-[100%] bg-[#E8F6ED] shadow border rounded-2xl z-10">
                <div class=" mt-3 w-[10rem]">
                  <table class=" py-4 ">
                    <tr>
                      <th class="flex items-center justify-center gap-2   ">
                        <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 4H8V5H15V4Z" fill="#19161D"/>
                          <path d="M3 5.295L1.705 4L1 4.705L3 6.705L7 2.705L6.295 2L3 5.295Z" fill="#19161D"/>
                          <path d="M15 11H8V12H15V11Z" fill="#19161D"/>
                          <path d="M3 12.295L1.705 11L1 11.705L3 13.705L7 9.705L6.295 9L3 12.295Z" fill="#19161D"/>
                        </svg>
                        设置界面

                      </th>
                    </tr>
                  </table>
                </div>
                <div
                    ref="firstColLayer"
                    class="w-full overflow-hidden  "
                >
                  <table class="mb-4 shadow  bg-[#E8F6ED] py-4">
                    <tr v-for="(col, index) in firstCol" :key="index" class=" w-full  ">
                      <td class="w-full  flex justify-center items-center   ">
                        <div
                            :class="[col!='运行状态'&&col!='运行时间'&&col!='发酵批号' ? 'bg-white  rounded-[8px] shadow hover:bg-[#FAFAFA] cursor-pointer' : '','w-[90%] h-[90%] flex justify-center items-center ']"
                            @click="popManager(col)">
                          {{ col }}

                        </div>

                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="right-div ">
                <!--窗口-->

                <!-- todo DEBUG:其宽度非动态变化，所以在其宽度isshow变化的时候会产生内容展示不全的结果-->
                <div ref="firstRowLayer" :class="[AppGlobal.isDrawerState? 'w-[calc(94vw-15rem)]':'w-[94vw]']"
                     class="right-div1 bg-[#F1F1F1] mt-3">
                  <table :style="{ width: (firstRow.length+1 ) * 8.2+ 'rem' }" class=" flex items-start">
                    <tr>
                      <th v-for="(row, index) in firstRow" :key="index" class="first-row-style w-[8.2rem]  ">{{
                          row
                        }}
                      </th>
                    </tr>
                  </table>
                </div>
                <!-- todo DEBUG:其宽度非动态变化，所以在其宽度isshow变化的时候会产生内容展示不全的结果-->
                <div
                    id="targetDiv1"
                    ref="tableContainer"
                    class="right-div2"
                    @scroll="tableScroll()"

                >
                  <table :style="{ width: (firstRow.length +1 ) * 8.2 + 'rem' }" class="flex items-start ">
                    <div class="flex-col justify-center items-center">


                      <tr v-for="(body,index) in tableBodyRows" :key="index" class="flex justify-center items-center">



                        <template v-for="(col, i) in tableBodyCols" :key="col.props + i">
                          <td v-if="index==0" :class="[i==0?'border-l':'']"
                              class="w-[8.2rem] flex justify-center items-center text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer">
                            <details class="dropdown ">
                              <summary v-if="body[col.props]==0" class="m-1 btn w-[7rem] ">停止</summary>
                              <summary v-if="body[col.props]==1"
                                       class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3]">运行
                              </summary>
                            </details>
                          </td>

                          <td v-if="index!=0" :class="[i==0?'border-l':'']"
                              class="w-[8.2rem] text-center border-l border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                            {{ body[col.props] }}
                          </td>
                        </template>
                      </tr>
                    </div>
                  </table>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="empty-content">
                <table
                    :style="{ width: (headerData.length - 1) * 100 + 'px', height: '10rem', overflow: 'auto' }"
                >
                  <thead class="table-header">
                  <tr>
                    <th v-for="(item) in props.headerData" :key="item.title">{{ item.title }}</th>
                  </tr>
                  </thead>

                  <van-empty class="empty-res" description="空空如也！"/>
                </table>
              </div>
            </template>
          </div>
        </div>

      </div>
    </div>


  </div>


</template>

<script lang='ts' setup>
import {computed, Ref, ref, watch, onUnmounted, onMounted, reactive} from 'vue'
import PopupManger from "@/components/PopupManger.vue";
import {usePopupMangerState} from "@/store/PopupMangerState";
import {PopupType} from "@/store/PopupMangerState";
import {sendData} from '@/api/index.js'
import {useDeviceManage} from '@/store/DeviceManage'

const DeviceManage = useDeviceManage();
const PopupMangerState = usePopupMangerState()
import {useAppGlobal} from '@/store/AppGlobal'

const AppGlobal = useAppGlobal();

watch(() => DeviceManage.deviceList, () => {
  console.log(DeviceManage.deviceList)
  initTableData()
}, {deep: true});


const popManager = (val: any) => {
  if(val!='运行状态'&&val!='运行时间'&&val!='发酵批号'){
    PopupMangerState.updateIsShowPop(true)
  PopupMangerState.updatePopupContent(name_translation[val])
  console.log(PopupMangerState.isShowPop)
  console.log(PopupMangerState.popupContent)
      }

}
// 读取表格数据
const initTableData = () => {
  if (!DeviceManage || !Array.isArray(DeviceManage.deviceList)) {
    console.error("Error: DeviceManage.deviceList is not a valid array.");
    return;
  }

  let initheaderData: HeaderItem[] = [
    {title: '凑数的', props: 'name'}
  ];

  DeviceManage.deviceList.forEach(device => {
    if (typeof device.name !== 'string' || typeof device.id !== 'number') {
      console.error("Error: Invalid device entry found in DeviceManage.deviceList.");
      return;
    }

    initheaderData.push({title: device.name, props: 'F' + (device.id+1)});
  });

  headerData.length = 0;  // 清空原始数据
  initheaderData.forEach(item => headerData.push(item));  // 添加新的数据

  const deviceProperties = [
    {name: '运行状态', prop: 'start_flag'},
    {name: '运行时间', prop: 'running_time'},
    {name: '发酵批号', prop: 'batchnum'},
    {name: '温度', prop: 'timing_temp'},
    {name: 'PH值', prop: 'timing_PH'},
    {name: '溶氧', prop: 'timing_DO'},
    {name: '转速', prop: 'timing_motor_speed'},
    {name: '酸液泵', prop: 'acid_pump'},
    {name: '碱液泵', prop: 'lye_pump'},
    {name: '补料泵', prop: 'feed_pump'},
    {name: '消泡剂泵', prop: 'defoamer_pump'}
  ];

  let resultItems: any[] = []; // 声明结果数组
  deviceProperties.map(deviceProp => {
    let tableItem = {
      name: deviceProp.name,
      prop: deviceProp.prop
    };
    initheaderData.forEach((header, index) => {
      if (index == 0) {
        return;
      }
      index--;

       if (DeviceManage.deviceList[index].nowdata == null) {
         tableItem[header.props] = 0;

        return ;
      }
      console.log(!DeviceManage.deviceList[index] , !DeviceManage.deviceList[index].nowdata,DeviceManage.deviceList[index],index)

      if (!DeviceManage.deviceList[index] || !DeviceManage.deviceList[index].nowdata) {
        console.error(`Error: Missing data for device at index ${index}.`);
        return;
      } else if (deviceProp.prop == "running_time") {
        const diffMilliseconds = new Date().getTime() - DeviceManage.deviceList[index].start_time.getTime(); // 获取时间差（毫秒）
        const totalSeconds = Math.floor(diffMilliseconds / 1000); // 转换为秒
        const hours = Math.floor(totalSeconds / 3600); // 获取小时数
        const minutes = Math.floor((totalSeconds % 3600) / 60); // 获取剩余的分钟数
        tableItem[header.props] = `${hours}h${minutes}m`;
      } else if (deviceProp.prop == "batchnum") {
        tableItem[header.props] = DeviceManage.deviceList[index].batch_name;
      } else if(deviceProp.prop == "acid_pump"){
        tableItem[header.props] = 241;
      }else if(deviceProp.prop == "lye_pump"){
        tableItem[header.props] = 241;
      }else if(deviceProp.prop == "feed_pump"){
        tableItem[header.props] = 241;
      }else if(deviceProp.prop == "defoamer_pump"){
        tableItem[header.props] = 241;
      }
      else {
        try {
          const value = DeviceManage.deviceList[index].nowdata![deviceProp.prop];
          if (typeof value === 'number' && !Number.isInteger(value)) {
            tableItem[header.props] = parseFloat(value.toFixed(2));
          } else {
            tableItem[header.props] = value;
          }
        } catch (e) {
          console.error(`Error: The property ${deviceProp.prop} is missing or null for device at index ${index}.`);
          return;
        }
      }
    });
    console.log(tableItem, "--2222222222")
    resultItems.push(tableItem);
    return tableItem;
  });
  console.log(resultItems)
  tableData.length = 0;  // 清空原始数据
  resultItems.forEach(item => tableData.push(item));  // 添加新的数据

}


const headerData: HeaderItem[] = reactive([
  {title: '姓名', props: 'name'},


  // 你可以按需增加其他列
]);


const tableData: TableDataItem[] = reactive([
  {name: '运行状态', prop: "state", F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '运行时间', prop: "time", F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '发酵批号', prop: "batchnum", F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '温度', prop: "temperature", F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: 'PH值', prop: "phvalue", F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '溶氧', prop: "oxygen", F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '转速', prop: "rpm", F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '酸液泵', prop: "acidpump", F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '碱液泵', prop: "lyepump", F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '补料泵', prop: "feedpump", F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '消泡剂泵', prop: "defoamerpump", F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
]);


const props = {
  headerData: headerData,
  tableData: tableData
};


const tableContainer: Ref<HTMLDivElement | null> = ref(null);
const firstRowLayer: Ref<HTMLDivElement | null> = ref(null);
const firstColLayer: Ref<HTMLDivElement | null> = ref(null);


const firstCol = computed(() => props.tableData.map(p => {
  const pArr = Object.keys(p);
  return p[pArr[0]]
}))


const firstRow = computed(() => {
  const rows: string[] = [];
  props.headerData.forEach((f, i) => {
    if (i !== 0) {
      rows.push(f.title)
    }
  })
  return rows;
})


const tableBodyRows = computed(() => {
  let arr: { [key: string]: any }[] = [];
  props.tableData.forEach((f, index) => {

    let res: { [key: string]: any } = {};
    for (const key in f) {
      if (Object.prototype.hasOwnProperty.call(f, key)) {
        if (key !== props.headerData[0].title) {
          res[key] = f[key]
        }
      }
    }
    arr.push(res)
  })
  return arr
})

const tableBodyCols = computed(() => {
  let arr: { title: string, props: string }[] = []
  props.headerData.forEach((f, i) => {
    if (i !== 0) {
      arr.push(f)
    }
  })
  return arr;
})


const tableScroll = () => {
  firstRowLayer.value!.scrollLeft = tableContainer.value!.scrollLeft;
  firstColLayer.value!.scrollTop = tableContainer.value!.scrollTop;
}


// 当按下键盘时的处理函数，ESC关闭弹窗
const handleKeydown = (event) => {
  if (event.keyCode === 27) { // 27 是 esc 键的 keyCode
    console.log('ESC key was pressed!');
    // 在此处执行你想要的操作
    PopupMangerState.updateIsShowPop(false)
  }
};

// 当组件挂载时添加事件监听器
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
//   循环
//   setInterval(() => {
//     // sendData(0)
//   }, 10000)
  initTableData()
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

interface SetData {
  /*PH控制部分变量*/
  timing_PH: number;   //实时PH值
  acid_speed: number;  //酸泵实时送料速率
  lye_speed: number;   //碱泵实时送料速率
  target_PH: number;   //设定目标PH
  acid_KP: number;     //PID参数
  acid_KI: number;     //PID参数
  acid_KD: number;     //PID参数
  lye_KP: number;      //PID参数
  lye_KI: number;      //PID参数
  lye_KD: number;      //PID参数
  acid_ml: number;     //酸泵目前送料量
  lye_ml: number;      //碱泵目前送料量
  acid_handle_speed_set: number;   //酸泵手动送料速率设置
  lye_handle_speed_set: number;    //碱泵手动送料速率设置
  PH_flag: number;     //PH控制开启/停止标志位
  Ph_auto_handle: number;          //PH控制自动/手动控制标志位

  /*温控部分变量*/
  timing_temp: number;             //实时温度值
  heatpower: number;               //加热毯实时功率
  target_temp: number;             //设定目标温度值
  Temp_KP: number;                 //温控KP
  Temp_KI: number;                 //温控KI
  Temp_KD: number;                 //温控KD
  water_flag: number;              //冷凝水通断标志位
  temp_flag: number;               //温控开启/停止标志位
  cool_water_autoflag: number;     //冷凝水通断控制自动/手动标志位

  /*氧含量控制部分变量*/
  timing_DO: number;               //实时DO值
  oxy_ratio: number;               //氧气通度
  target_DO: number;               //设定目标DO值
  target_oxy_ratio: number;        //手动设定氧气通度
  DO_KP: number;                   //氧含量KP
  DO_KI: number;                   //氧含量KI
  DO_KD: number;                   //氧含量KD
  DO_flag: number;                 //氧含量控制开启标志位
  target_motor_speed: number;      //手动设定电机转速
  timing_motor_speed: number;      //电机实时转速
  motor_speed_l_limit: number;     //电机转速下限
  motor_speed_u_limit: number;     //电机转速上限
  motor_speed_autoflag: number;    //转速关联氧含量开启/关闭标志位
  oxy_flag: number;                //通氧关联氧含量开启/关闭标志位

  /*消泡控制部分*/
  clean_speed: number;             //消泡泵设定送料速率
  clean_ml: number;                //消泡泵目前送料量
  clean_single_time: number;       //消泡单次泵入时间
  clean_flag: number;              //消泡开启/停止标志位

  /*补料控制部分*/
  feed_speed: number;              //补料泵设定补料速率
  feed_ml: number;                 //补料泵目前补料量
  feed_DO_cu_limit: number;        //补料关联氧含量上限值
  feed_DO_cl_limit: number;        //补料关联氧含量下限值
  feed_DO_connect_flag: number;    //补料关联氧含量标志位
  feed_flag: number;               //补料开启/停止标志位
  feed_motor_connect_flag: number; //补料关联转速标志位
  feed_DO_motor_connect_flag: number; //补料双关联转速、氧含量标志位
  feed_motor_flag: number;         //补料泵开启标志位
  feed_motor_cu_limit: number;     //补料关联转速上限值
  feed_motor_cl_limit: number;     //补料关联转速下限值

  /*系统控制变量*/
  start_flag: number;              //发酵开始标志位
  year: number;                    //年
  mounth: number;                  //月
  day: number;                     //日
  hour: number;                    //时
  minute: number;                  //分
  second: number;                  //秒
  communicate_flag: number;        //通讯开始标志位
  decive_id: string;                   //罐号ID
}

interface Device {
  id: number;
  name: string;
  deviceNum: string;
  ip: string;
  port?: number; // 这意味着 port 是可选的
  state: boolean;
  nowdata: SetData | null;
  devicesocket: any;
}

interface TableDataItem {
  name: string;
  F1: number;
  F2: number;
  F3: number;
  F4: number;
  F5: number;
  F6: number;
  F7: number;
  F8: number;

  [key: string]: string | number;
}

const name_translation = {
  '运行状态': 'None',
  '运行时间': 'None',
  '发酵批号': 'None',
  '温度': 'Temperature',
  'PH值': 'PHValue',
  '溶氧': 'DissolvedOxygen',
  '转速': 'RPM',
  '酸液泵': 'AcidPump',
  '碱液泵': 'LyePump',
  '补料泵': 'FeedPump',
  '消泡剂泵': 'DefoamerPump'
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
  width: calc(100vw - 100px);
  margin-left: -1px;
}

.right-div1 {
  width: calc(100% - 10rem);
  overflow: hidden;

  .first-row-style {
    box-sizing: border-box;
  }
}

.right-div2 {
  width: calc(100% - 10rem);
  overflow: auto;
}

.right-table2 {
  overflow: hidden;
}


.empty-content {
  width: 100%;
  overflow: auto;
}


.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0;
}

</style>