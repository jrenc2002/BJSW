<template>
  <div :class="[AppGlobal.isDrawerState? 'w-[calc(94vw-15rem)]':'w-[94vw]']"
       class="h-[94vh] transition-all duration-300 ease-in-out shadow bg-white rounded-2xl">

    <!--    标题-->
    <div class="h-[4%] self-stretch justify-start items-center  inline-flex mt-3  w-full ">
      <div class="w-[calc(10rem)] text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">
        PH控制
      </div>
      <div class="w-[calc(100%-10rem)] relative justify-end flex mr-3 ">

        <div
            class="bg-[#F5F5F5] right-0 relative w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer"
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
                      <div>
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
                <table :style="{ width: `max(${(firstRow.length + 1) * 8.2}rem, 100%)` }"
                       class=" flex items-start self-start ">

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
                <table :style="{ width: `max(${(firstRow.length + 1) * 8.2}rem, 100%)` }" class="flex items-start  ">
                  <div class="flex-col justify-center items-center">
                    <tr v-for="(body,index) in tableBodyRows" :key="index" class="flex justify-center items-center">
                      <template v-for="(col, i) in tableBodyCols" :key="col.props + i">
                        <td v-if="index==0"
                            class="w-[8.2rem] text-center border-r border-b flex justify-center items-center">
                          <details class="dropdown ">
                            <summary v-if="body[col.props]==0" class="m-1 btn w-[7rem] ">停止</summary>
                            <summary v-if="body[col.props]==1"
                                     class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3]">开启
                            </summary>


                            <ul class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-box w-[7rem] broder">
                              <li class="text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded"
                                  @click="controSend('PH_flag',i,0)"><a>停止</a>
                              </li>
                              <li class="text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2 rounded"
                                  @click="controSend('PH_flag',i,1)"><a>开启</a></li>

                            </ul>
                          </details>
                        </td>
                        <td v-else-if="index>=2&&index<=12"
                            class="w-[8.2rem] text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center"
                            @dblclick="inputVisible[i][index-2].control = !inputVisible[i][index-2].control">
                          <input
                              v-if="inputVisible[i][index-2].control&&DeviceManage.deviceList[i]?.deviceSet!==null"
                              v-model="inputVisible[i][index-2].cache"
                              :placeholder="placeholder[index-2]"
                              class="w-[8.2rem]  h-full text-center break-all whitespace-normal "
                              type="text"
                              @keyup.enter="keyupEnterInput(i,index-2)"
                          />

                          <span v-else
                                class="w-[8.2rem] leading-5 text-center whitespace-normal break-all flex justify-center items-center">
                    {{ body[col.props] }}</span>
                        </td>
                        <td v-else
                            class="w-[8.2rem] text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
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
  initTableData()
}, {deep: true});

interface InputVisible {
  id: number;
  control: boolean;
  cache: number | null;
}

type DeviceInput = InputVisible[];

const inputVisible = ref<DeviceInput[]>([]); // 用于追踪哪一行显示输入框

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
 
    inputVisible.value.push([])
  });

  headerData.length = 0;  // 清空原始数据
  initheaderData.forEach(item => headerData.push(item));  // 添加新的数据

  const deviceProperties = [
    {name: '状态', prop: 'PH_flag'}, // 0: 停止, 1: 自动
    {name: '测量值', prop: 'timing_PH'},
    {name: '设定值', prop: 'target_PH'},
    {name: '误差上限', prop: 'PH_upper_limit'},
    {name: '误差下限', prop: 'PH_lower_limit'},
    {name: '酸泵比例P', prop: 'acid_KP'},
    {name: '酸泵积分I', prop: 'acid_KI'},
    {name: '酸泵微分D', prop: 'acid_KD'},
    {name: '碱泵比例P', prop: 'lye_KP'},
    {name: '碱泵积分I', prop: 'lye_KI'},
    {name: '碱泵微分D', prop: 'lye_KD'},
    {name: '报警上限', prop: 'alarm_h_limit'}, //报警上限
    {name: '报警下限', prop: 'alarm_l_limit'}  //报警下限
  ]


  let resultItems: any[] = []; // 声明结果数组
  deviceProperties.map((deviceProp, deviceIndex) => {
    let tableItem = {
      name: deviceProp.name,
      prop: deviceProp.prop
    };
    initheaderData.forEach((header, index) => {
      if (index === 0) {
        return;
      }
      if (deviceIndex >= 2 && deviceIndex <= 12) {
        inputVisible.value[index - 1].push({id: deviceIndex, control: false, cache: null});


      }


      index--;

      if (DeviceManage.deviceList[index].nowData == null && deviceProp.prop != "alarm_h_limit" && deviceProp.prop != "alarm_l_limit") {
        tableItem[header.props] = 0;

        return;
      }

      // 报警上限
      if (deviceProp.prop == "alarm_h_limit") {
        if (DeviceManage.deviceList[index]?.deviceSet?.phMaxWarn !== null) {
          const phMaxWarn = DeviceManage.deviceList[index]?.deviceSet?.phMaxWarn ?? 0;
          tableItem[header.props] = phMaxWarn;
        } else {
          tableItem[header.props] = 0;
        }
      }
      // 报警下限
      else if (deviceProp.prop == "alarm_l_limit") {
        if (DeviceManage.deviceList[index]?.deviceSet?.phMinWarn !== null) {
          const phMinWarn = DeviceManage.deviceList[index]?.deviceSet?.phMinWarn ?? 0;
          tableItem[header.props] = phMinWarn;
        } else {
          tableItem[header.props] = 0;
        }
      }  else {
        try {
          const value = DeviceManage.deviceList[index].nowData![deviceProp.prop];
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

  tableData.length = 0;  // 清空原始数据
  resultItems.forEach(item => tableData.push(item));  // 添加新的数据

}
const keyupEnterInput = (deviceID: number, setIndex: number) => {

  inputVisible.value[deviceID][setIndex].control = false;

  if (setIndex == 0 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.target_PH = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 1 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.PH_upper_limit = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 2 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.PH_lower_limit = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 3 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.acid_KP = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 4 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.acid_KI = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 5 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.acid_KD = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 6 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.lye_KP = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 7 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.lye_KI = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 8 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
      DeviceManage.deviceList[deviceID]!.nowData!.lye_KD = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }

  if (setIndex == 9 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.deviceSet) {
      DeviceManage.deviceList[deviceID]!.deviceSet!. phMaxWarn= inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }
  if (setIndex == 10 && inputVisible.value[deviceID][setIndex].cache != null) {
    if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.deviceSet) {
      DeviceManage.deviceList[deviceID]!.deviceSet!.phMinWarn = inputVisible.value[deviceID][setIndex].cache || 0;
    }
  }



}

const placeholder = ref([
  "请输设定值",
  "请输误差上限",
  "请输误差下限",
  "请输酸泵P",
  "请输酸泵I",
  "请输酸泵D",
  "请输碱泵P",
  "请输碱泵I",
  "请输碱泵D",
  "请输报警上限",
  "请输报警下限",


])

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


const name_translation = {
  '运行状态': 'None',
  '运行时间': 'None',
  '发酵批号': 'None',
  '温度': 'Temperature',
  'PH值': 'PHValue',
  '溶氧': 'DissolvedOxygen',
  '转速': 'RPM',
  '酸泵': 'AcidPump',
  '碱泵': 'LyePump',
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