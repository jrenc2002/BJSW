<template>
  <div class="h-[94vh] transition-all duration-300 ease-in-out shadow bg-white rounded-2xl" :class="[AppGlobal.isDrawerState? 'w-[calc(94vw-15rem)]':'w-[94vw]']">

    <!--    标题-->
    <div class="h-[4%] self-stretch justify-start items-center  inline-flex mt-3  w-full ">
      <div class="w-[calc(10rem)] text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">酸泵控制</div>
      <div class="w-[calc(100%-10rem)] relative justify-end flex mr-3 ">

        <div class="bg-[#F5F5F5] right-0 relative w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer" @click="closePop">
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
        <div class=" w-full h-full ">
          <div class=" box-border overflow-x-hidden w-full h-full flex">

            <div class="float-left h-[100%] bg-[#E8F6ED] shadow border rounded-2xl z-20">
              <div class=" mt-3 w-[10rem]">
                <table class=" py-4 ">
                  <tr>
                    <th class="flex items-center justify-center gap-2   ">

                    </th>
                  </tr>
                </table>
              </div>
              <div
                  ref="firstColLayer"
                  class="w-full overflow-hidden "
              >
                <table class="mb-4 shadow  bg-[#E8F6ED] py-4">
                  <tr v-for="(col, index) in firstCol" :key="index" class=" w-full  ">
                    <td class="w-full  flex justify-center items-center   ">
                      <div >
                        {{ col }}

                      </div>

                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="right-div ">
              <!--窗口-->
              <div ref="firstRowLayer" :class="[AppGlobal.isDrawerState? 'w-[calc(82vw-15rem)]':'w-[82vw]']"
                   class="right-div1 bg-[#F1F1F1] mt-3 ">
                <table :style="{ width: `max(${(firstRow.length + 1) * 8.2}rem, 100%)` }" class=" flex items-start self-start ">
                  <tr>
                    <th v-for="(row, index) in firstRow" :key="index" class="first-row-style w-[8.2rem]  ">{{
                        row
                      }}
                    </th>
                  </tr>
                </table>
              </div>
              <div
                  ref="tableContainer" :class="[AppGlobal.isDrawerState? 'w-[calc(82vw-15rem)]':'w-[82vw]']"
                  class="right-div2 flex items-start self-start"
                  @scroll="tableScroll()"
              >
                <table  :style="{ width: `max(${(firstRow.length + 1) * 8.2}rem, 100%)` }" class="flex items-start  ">
                  <div class="flex-col justify-center items-center">


                    <tr v-for="(body,index) in tableBodyRows" class="flex justify-center items-center" :key="index">
                      <template v-for="(col, i) in tableBodyCols" :key="col.props + i">
                        <td v-if="index==0" class="w-[8.2rem] text-center border-r border-b flex justify-center items-center text-center ">
                          <details class="dropdown ">
                            <summary v-if="body[col.props]==0" class="m-1 btn w-[7rem] ">停止</summary>
                            <summary v-if="body[col.props]==1"
                                     class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3]">自动
                            </summary>
                            <summary v-if="body[col.props]==2"
                                     class="m-1 btn w-[7rem]  text-[#776B00] bg-[#FAF3B7] hover:bg-[#E5E0AA]">顺控
                            </summary>

                            <ul class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-box w-[7rem] broder">
                              <li class="text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded" @click="col.props=0"><a>停止</a>
                              </li>
                              <li class="text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2 rounded"
                                  @click="col.props=1"><a>自动</a></li>
                              <li class="text-[#776B00] bg-[#FAF3B7] hover:bg-[#E5E0AA] mt-2 rounded"
                                  @click="col.props=2"><a>顺控</a></li>
                            </ul>
                          </details>
                        </td>

                        <td v-if="index!=0"
                            class="w-[8.2rem] text-center border-r border-b hover:bg-[#FAFAFA] flex justify-center items-center text-center">
                          {{ body[col.props] }}
                        </td>
                      </template>


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
watch(() => DeviceManage.deviceList, () => {
  console.log(DeviceManage.deviceList)
  initTableData()
}, {deep: true});


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

    initheaderData.push({title: device.name, props: 'F' + (device.id + 1)});
  });

  headerData.length = 0;  // 清空原始数据
  initheaderData.forEach(item => headerData.push(item));  // 添加新的数据

  const deviceProperties = [
    {name: '状态', prop: 'feed_flag'},
    {name: '功能关联', prop: 'feed_DO_connect_flag'},  // 这里选择了补料关联氧含量标志位，因为它看起来是一个功能关联标志
    {name: '补料模式', prop: 'feed_motor_flag'},  // 补料模式可能关联到补料泵开启标志位，但并不确定
    {name: '补料周期', prop: 'feed_speed'},  // 假设周期代表补料速率
    {name: '周期开度', prop: 'feed_ml'},  // 这里选择了补料泵目前补料量作为周期开度的可能匹配项
    {name: '补料速度', prop: 'feed_speed'}
  ]




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

        return;
      }
      console.log(!DeviceManage.deviceList[index], !DeviceManage.deviceList[index].nowdata, DeviceManage.deviceList[index], index)

      if (!DeviceManage.deviceList[index] || !DeviceManage.deviceList[index].nowdata) {
        console.error(`Error: Missing data for device at index ${index}.`);
        return;
      }  else if (deviceProp.prop == "alarm_h_limit") {
        tableItem[header.props] = DeviceManage.deviceList[index].batch_name;
      } else if (deviceProp.prop == "alarm_l_limit") {
        tableItem[header.props] = 241;
      } else if (deviceProp.prop == "control_dead") {
        tableItem[header.props] = 241;
      } else if (deviceProp.prop == "control_cycle") {
        tableItem[header.props] = 241;
      } else if (deviceProp.prop == "cycle_open") {
        tableItem[header.props] = 241;
      } else if (deviceProp.prop == "temp_flag") {
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

    resultItems.push(tableItem);
    return tableItem;
  });
  console.log(resultItems)
  tableData.length = 0;  // 清空原始数据
  resultItems.forEach(item => tableData.push(item));  // 添加新的数据

}



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


// ______________________表格数据变量_______________________

const headerData: HeaderItem[] = reactive([
  {title: '姓名', props: 'name'},


  // 你可以按需增加其他列
]);


const tableData: any = reactive([
  {name: '状态', F1: 1, F2: 1, F3: 2, F4: 1, F5: 0, F6: 1, F7: 2, F8: 1},
  {name: '测量值', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '设定值', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '控制周期', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '周期开度', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '比例P', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '积分I', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '微分D', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '控制死区', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '报警上限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '报警下限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
]);


const props = {
  headerData: headerData,
  tableData: tableData
};


// ______________________功能函数_______________________
const closePop = () => {
  PopupMangerState.updateIsShowPop(false)
}

const tableContainer: Ref<HTMLDivElement | null> = ref(null);
const firstRowLayer: Ref<HTMLDivElement | null> = ref(null);
const firstColLayer: Ref<HTMLDivElement | null> = ref(null);

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
// 弹窗管理
const popManager = (val: any) => {
  if (val != '运行状态' && val != '运行时间' && val != '发酵批号') {
    PopupMangerState.updateIsShowPop(true)
    PopupMangerState.updatePopupContent(name_translation[val])
    console.log(PopupMangerState.isShowPop)
    console.log(PopupMangerState.popupContent)
  }
}
// ______________________生命周期_______________________

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