<template>
    <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
        <transition name="fade">
            <div
                    v-show="PopupMangerState.isShowPop"
                    class="rounded-2xl absolute bg-white bg-opacity-50 h-[calc(100%-2rem)] w-[calc(100%-2rem)]  z-30 backdrop-blur-sm items-center justify-center flex"
            >
                <PopupManger :popcontent="PopupType[PopupMangerState.popupContent]"
                             class="w-full h-full "></PopupManger>
            </div>
        </transition>
        
        <!--    标题-->
        <div class="h-[6%] self-stretch justify-center items-center gap-4 inline-flex ">
            <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">数据总览
            </div>
        </div>
        <!--    表格栏-->
        <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow  flex  ">
            
            
            <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
                <div class=" w-full h-full ">
                    <div class="  overflow-x-hidden w-full h-full flex">
                        <template v-if="props.tableData.length > 0">
                            <div class="float-left h-[100%] bg-[#E8F6ED] shadow border rounded-2xl z-10">
                                <div class=" mt-3 w-[10rem]">
                                    <table class=" py-4 ">
                                        <tr>
                                            <th class="flex items-center justify-center gap-2   ">
                                                <svg fill="none" height="16" viewBox="0 0 16 16" width="16"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15 4H8V5H15V4Z" fill="#19161D"/>
                                                    <path d="M3 5.295L1.705 4L1 4.705L3 6.705L7 2.705L6.295 2L3 5.295Z"
                                                          fill="#19161D"/>
                                                    <path d="M15 11H8V12H15V11Z" fill="#19161D"/>
                                                    <path d="M3 12.295L1.705 11L1 11.705L3 13.705L7 9.705L6.295 9L3 12.295Z"
                                                          fill="#19161D"/>
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
                                    <table class="mb-4 shadow  bg-[#E8F6ED] py-4 ">
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
                                
                                <div ref="firstRowLayer"
                                     :class="[AppGlobal.isDrawerState? 'w-[calc(82vw-15rem)]':'w-[82vw]']"
                                     class="right-div1 bg-[#F1F1F1] mt-3 ">
                                    <table :style="{ width: `max(${(firstRow.length + 1) * 8.2}rem, 100%)` }"
                                           class=" flex items-start self-start ">
                                        <tr>
                                            <th v-for="(row, index) in firstRow" :key="index"
                                                class="first-row-style w-[8.2rem]  ">{{
                                                    row
                                                }}
                                            </th>
                                        </tr>
                                    </table>
                                
                                
                                </div>
                                
                                <div
                                        ref="tableContainer"
                                        :class="[AppGlobal.isDrawerState? 'w-[calc(82vw-15rem)]':'w-[82vw]']"
                                        class="right-div2 flex items-start self-start"
                                        @scroll="tableScroll()"
                                >
                                    <table :style="{ width: `max(${(firstRow.length + 1) * 8.2}rem, 100%)` }"
                                           class="flex items-start  ">
                                        <div class="flex-col justify-center items-center">
                                            <tr v-for="(body,index) in tableBodyRows" :key="index"
                                                class="flex justify-center items-center">
                                                
                                                <template v-for="(col, i) in tableBodyCols" :key="col.props + i">
                                                    <td v-if="index==0"
                                                        class="w-[8.2rem] flex justify-center items-center text-center  border-b border-r   cursor-pointer">
                                               
                                                        <Menu as="div" class="dropdown relative inline-block">
                                                            <div>
                                                                <MenuButton class="inline-flex w-[7rem] justify-center gap-x-1.5">
                                                          
                                                                    <summary v-if="body[col.props]===1"
                                                                             class="m-1 btn w-[7rem] text-[#0E699C] bg-[#7DBCF6] hover:bg-[#7DBCF6]">
                                                                        已连接
                                                                    </summary>
                                                                    <summary v-else-if="body[col.props]===2"
                                                                             class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#BAE7C7]">
                                                                        运行中
                                                                    </summary>
                                                                    <summary v-else-if="body[col.props]===3"
                                                                             class="m-1 btn w-[7rem] text-[#E21212] bg-[#FAB7B7] hover:bg-[#FAB7B7]">
                                                                        报警
                                                                    </summary>
                                                                    <summary v-else
                                                                             class="m-1 btn w-[7rem] hover:bg-[#FAFAFA]">未连接
                                                                    </summary>
                                                                </MenuButton>
                                                            </div>
        
                                                     
                                                        </Menu>
                                                    </td>
                                                    <td v-else-if="index==2"
                                                        class="w-[8.2rem] text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center"
                                                        @dblclick="inputVisible[i].status = !inputVisible[i].status">
                                                        <input
                                                                v-if="inputVisible[i].status"
                                                                v-model="DeviceManage.deviceList[i].batch_name"
                                                                class="w-[8.2rem]  h-full text-center break-all whitespace-normal "
                                                                placeholder="输入发酵批号"
                                                                type="text"
                                                                @blur="inputVisible[i].status = false"
                                                                
                                                        />
                                                        
                                                        <span v-else
                                                              class="w-[8.2rem] leading-5 text-center whitespace-normal break-all flex justify-center items-center">
                                {{ body[col.props] }}</span>
                                                    </td>
                                                    
                                                    <td v-else
                                                        class="w-[8.2rem] leading-4 text-center border-b border-r hover:bg-[#FAFAFA] cursor-pointer whitespace-normal break-all flex justify-center items-center">
                                                        
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

// ______________________导入模块_______________________
import {computed, onMounted, onUnmounted, reactive, ref, Ref, watch} from 'vue'
import PopupManger from "@/components/PopupManger.vue";
import {PopupType, usePopupMangerState} from "@/store/PopupMangerState";
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
const debug=true
const DeviceManage = useDeviceManage();
const PopupMangerState = usePopupMangerState()
const AppGlobal = useAppGlobal();

// todo 统一单位

// ______________________表格数据处理_______________________
watch(() => DeviceManage.deviceList, () => {
    
    initTableData()
}, {deep: true});
const inputVisible = ref<InputVisible[]>([]); // 用于追踪哪一行显示输入框
interface InputVisible {
    id: number;
    status: boolean;
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
        initheaderData.push({title: device.name, props: 'F' + (device.id + 1)});
        inputVisible.value.push({id: device.id, status: false});
    });
    
    headerData.length = 0;  // 清空原始数据
    initheaderData.forEach(item => headerData.push(item));  // 添加新的数据
    
    const deviceProperties = [
        {name: '运行状态', prop: 'start_flag'},
        {name: '运行时间', prop: 'running_time'},
        {name: '发酵批号', prop: 'batchnum'},
        {name: '转速', prop: 'timing_motor_speed'},
        {name: '温度', prop: 'timing_temp'},
        {name: 'PH值', prop: 'timing_PH'},
        {name: '溶氧', prop: 'timing_DO'},
        {name: '酸泵', prop: 'acid_pump'},
        {name: '碱泵', prop: 'lye_pump'},
        {name: '补料泵1', prop: 'defoamer_pump'},
        {name: '补料泵2', prop: 'feed_pump'}
    ];
    
    let resultItems: any[] = []; // 声明结果数组
    
    deviceProperties.map(deviceProp => {
        let tableItem = {
            name: deviceProp.name,
            prop: deviceProp.prop
        };
        initheaderData.forEach((header, index) => {
            // 跳过第一行，第一行可以忽略
            if (index == 0) {
                return;
            }
            index--;
            // 在设备未连接的时候做数据处理
            if (DeviceManage.deviceList[index].nowData == null) {
                tableItem[header.props] = `--`;
                
                return;
            }
            // 如果连接上来，开始进行数据处理
            if (!DeviceManage.deviceList[index] || !DeviceManage.deviceList[index].nowData) {
                console.error(`Error: Missing data for device at index ${index}.`);
                return;
            }
            // 运行时间的处理
            else if (deviceProp.prop == "running_time") {
                // 检验start_time是否存在
                if (debug){
                    console.log(DeviceManage.deviceList[index].start_time)
                }
                if (DeviceManage.deviceList[index].start_time) {
                    const diffMilliseconds = new Date().getTime() - DeviceManage.deviceList[index].start_time.getTime(); // 获取时间差（毫秒）
                    const hours = Number((diffMilliseconds / 1000 / 3600).toFixed(2)); // 获取小时数b
                    tableItem[header.props] = `${hours}h`;
                }
                else {
                    tableItem[header.props] = `--`;
                }
        
 
            }
  
            else if (deviceProp.prop == "batchnum") {
             
                if (DeviceManage.deviceList[index].batch_name== null||DeviceManage.deviceList[index].batch_name== undefined) {
    
                    tableItem[header.props] = `--`;
                }
                else {
                    tableItem[header.props] = DeviceManage.deviceList[index].batch_name;
                }
            }
            // 批次名
            else if (deviceProp.prop == "start_flag") {
                tableItem[header.props] = DeviceManage.deviceList[index].state;
            }
            // 酸泵
            else if (
                deviceProp.prop == "acid_pump"
            ) {
                if (DeviceManage.deviceList[index]?.nowData?.acidPumpSpeed !== null && DeviceManage.deviceList[index]?.deviceSet !== null) {
                    const acidPumpSpeed = DeviceManage.deviceList[index]?.nowData?.acidPumpSpeed ?? 0;
                    const acid_pump_sum_step_count = DeviceManage.deviceList[index]?.nowData?.acid_pump_sum_step_count ?? 0;
                    tableItem[header.props] = acidPumpSpeed * acid_pump_sum_step_count;
                    
                    let device = DeviceManage?.deviceList?.[index];
                    if (device && device.deviceSet) {
                        device.deviceSet.acidPumpSumStepCount = acidPumpSpeed * acid_pump_sum_step_count;
                    }
                } else {
                    tableItem[header.props] = '--';
                }
            }
            // 碱泵
            else if (deviceProp.prop == "lye_pump") {
                if (DeviceManage.deviceList[index]?.nowData?.lyePumpSpeed !== null) {
                    const lyePumpSpeed = DeviceManage.deviceList[index]?.nowData?.lyePumpSpeed ?? 0;
                    const lye_pump_sum_step_count = DeviceManage.deviceList[index]?.nowData?.lye_pump_sum_step_count ?? 0;
                    tableItem[header.props] = lyePumpSpeed * lye_pump_sum_step_count;
                    let device = DeviceManage?.deviceList?.[index];
                    if (device && device.deviceSet) {
                        device.deviceSet.lyePumpSumStepCount = lyePumpSpeed * lye_pump_sum_step_count;
                    }
                } else {
                    tableItem[header.props] = '--';
                }
                
            }
            // 食物泵
            else if (deviceProp.prop == "feed_pump") {
                if (DeviceManage.deviceList[index]?.nowData?.feedPumpSpeed !== null) {
                    const feedPumpSpeed = DeviceManage.deviceList[index]?.nowData?.feedPumpSpeed ?? 0;
                    const feed_pump_sum_step_count = DeviceManage.deviceList[index]?.nowData?.feed_pump_sum_step_count ?? 0;
                    tableItem[header.props] = feedPumpSpeed * feed_pump_sum_step_count;
                    let device = DeviceManage?.deviceList?.[index];
                    if (device && device.deviceSet) {
                        device.deviceSet.feedPumpSumStepCount = feedPumpSpeed * feed_pump_sum_step_count;
                    }
                } else {
                    tableItem[header.props] = '--';
                }
                
            }
            // 消泡泵
            else if (deviceProp.prop == "defoamer_pump") {
                if (DeviceManage.deviceList[index]?.nowData?.feed0PumpSpeed !== null) {
                    const defoamerPumpSpeed = DeviceManage.deviceList[index]?.nowData?.feed0PumpSpeed ?? 0;
                    const feed0_pump_sum_step_count = DeviceManage.deviceList[index]?.nowData?.feed0_pump_sum_step_count ?? 0;
                    tableItem[header.props] = defoamerPumpSpeed * feed0_pump_sum_step_count;
                    
                    let device = DeviceManage?.deviceList?.[index];
                    if (device && device.deviceSet) {
                        device.deviceSet.defoamerPumpSumStepCount = defoamerPumpSpeed * feed0_pump_sum_step_count;
                    }
                } else {
                    tableItem[header.props] = '--';
                }
                
            }
            // 转速读取-溶氧读取-PH值读取-温度读取
            else {
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
    // {name: '状态', F1: 1, F2: 1, F3: 2, F4: 1, F5: 0, F6: 1, F7: 2, F8: 1},
    // {name: '测量值', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
    // {name: '设定值', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
    // {name: '控制周期', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
    // {name: '周期开度', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
    // {name: '比例P', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
    // {name: '积分I', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
    // {name: '微分D', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
    // {name: '控制死区', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
    // {name: '报警上限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
    // {name: '报警下限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
]);


const props = {
    headerData: headerData,
    tableData: tableData
};


// ______________________功能函数_______________________
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
    '补料泵1': 'DefoamerPump',
    '补料泵2': 'FeedPump',
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


.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0;
}

</style>




