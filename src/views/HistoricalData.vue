<template>
    <div class="flex w-full h-full flex-col items-center justify-center flex">
        <transition name="fade">
            <div
                    v-show="isShowCharts"
                    class="rounded-2xl absolute bg-white bg-opacity-50 h-[calc(100%-2rem)] w-[calc(100%-2rem)]  z-30 backdrop-blur-sm items-center justify-center flex"
            >
                <TableCharts v-model:data="tableData" v-model:name="batchName" v-model:switch="isShowCharts"
                             class="w-full h-full z-40 "></TableCharts>
            </div>
        </transition>
        <div class="w-full p-5 h-[4.2rem] flex items-center text-xl text-zinc-900 font-medium">
            批次数据
        </div>
        <div class="w-full px-3 pb-3 h-[calc(100%-4.2rem)] flex items-center gap-3 ">
            <div class=" h-full w-[28rem] bg-white  rounded-lg shadow ">
                <div class="infinite-list-wrapper w-[100%] h-[100%]" style="overflow:auto;">
                    <ul
                            v-infinite-scroll="load"
                            class="list"
                            infinite-scroll-disabled="disabled"
                            infinite-scroll-distance="200"
                            infinite-scroll-immediate="true"
                    >
                        <li v-for="(item,index) in showBatchData" :key="index" @click="selectBatch(item.id)">
                            
                            <view :class="[item.id=== selectedBatch? 'border-2 border-[#83BA9B] shadow ' : '']"
                                  class="flex bg-[#DAF0E4]  cursor-pointer p-3 m-2 rounded-md  justify-center items-center gap-8
              text-[15px]"
                            >
                                
                                <p class="text-[#295C3F]">
                                    {{ item.batch_name }}
                                </p>
                                <p class="text-[#79930F]">
                                    {{ item.can_number }}
                                </p>
                                <p class="text-[#1A3A8D]">
                                    {{ timestampToString(item.start_time) }}
                                </p>
                            
                            </view>
                        
                        </li>
                    
                    </ul>
                    <p v-if="batchloading">加载中...</p>
                    <p v-if="noMore">无更多数据</p>
                
                </div>
                
                <div>
                    
                    <Transition name="fade">
                        <div v-if="isExpanded" class="
              w-[25.7rem] h-[232px] border-[2px] border-[#83BA9B] rounded-[14px] fixed bottom-4 m-3 bg-white">
                            <div class="absolute right-0 p-2 cursor-pointer" @click="toggle">
                                <svg fill="none" height="18" viewBox="0 0 15 15" width="18"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                                          fill="#828282"/>
                                </svg>
                            </div>
                            <div class="flex-col items-center justify-center">
                                <div class="w-[100%] h-9 flex items-center justify-center">
                                    批号查询
                                </div>
                                <div class="w-full h-[23px] px-1 justify-start items-center gap-[9px] inline-flex">
                                    <div class=" h-5 text-center w-[2rem] text-black text-[1rem] font-normal leading-tight tracking-tight">
                                        批号
                                    </div>
                                    <input class=" bg-white rounded-[3px] border border-black border-opacity-50"
                                           type="text" blur="" placeholder="请输入批号" v-model="filterName"
                                    />
                                </div>
                                <div class="w-[96%] h-px m-2 bg-zinc-300"></div>
                                <div class="w-[100%] h-9 flex items-center justify-center">
                                    批次时间查询
                                </div>
                                <div class="w-[100%]  flex items-center justify-center ">
                                  
                                    <el-date-picker
                                            class="w-[90%]"
                                            v-model="timeFilter"
                                            type="datetimerange"
                                            range-separator="To"
                                            start-placeholder="Start date"
                                            end-placeholder="End date"
                                    />
                                </div>
                            
                            </div>
                        
                        
                        </div>
                        <div v-else class=" transition hover:bg-[#83BA9B] hover:text-white  hover:stroke-white duration-150  cursor-pointer
           w-[100px] h-10 px-4 py-5 bg-white rounded-[14px] border-[2px] border-[#83BA9B] justify-start
           items-center gap-2 inline-flex fixed bottom-4 m-3 " @click="toggle">
                            <div class="w-4 h-4 relative ">
                                <svg fill="none" height="16" viewBox="0 0 16 16" width="16"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.5 13.7931L10.7239 10.017C11.6313 8.9277 12.0838 7.5305 11.9872 6.11608C11.8907 4.70165 11.2525 3.37891 10.2055 2.423C9.15855 1.4671 7.78335 0.951637 6.366 0.983845C4.94865 1.01605 3.59828 1.59345 2.59581 2.59593C1.59333 3.5984 1.01593 4.94877 0.983723 6.36612C0.951515 7.78347 1.46698 9.15867 2.42288 10.2057C3.37879 11.2526 4.70153 11.8908 6.11596 11.9873C7.53038 12.0839 8.92758 11.6314 10.0169 10.7241L13.7929 14.5001L14.5 13.7931ZM2 6.50012C2 5.6101 2.26392 4.74007 2.75838 4.00005C3.25285 3.26003 3.95565 2.68325 4.77792 2.34266C5.60019 2.00207 6.50499 1.91295 7.3779 2.08658C8.25082 2.26022 9.05264 2.6888 9.68198 3.31814C10.3113 3.94747 10.7399 4.7493 10.9135 5.62221C11.0872 6.49513 10.998 7.39993 10.6575 8.22219C10.3169 9.04446 9.74008 9.74726 9.00006 10.2417C8.26004 10.7362 7.39001 11.0001 6.5 11.0001C5.30693 10.9988 4.1631 10.5243 3.31948 9.68064C2.47585 8.83701 2.00132 7.69319 2 6.50012Z"
                                          fill="#53575A"/>
                                </svg>
                            </div>
                            <div class="grow shrink basis-0  text-sm font-normal leading-tight tracking-tight">搜索
                            </div>
                        </div>
                    
                    </Transition>
                </div>
            </div>
            <div class=" h-full  bg-white   rounded-lg shadow flex-col w-[calc(100%-28rem)] ">
                
                <!--表格栏-->
                <div class="w-full h-[calc(100%)] relative">
                    
                    <vxe-grid
                            ref="xGrid"
                            :scroll-y="{enabled: true}"
                            v-bind="gridOptions"
                            v-on="gridEvent"
                    >
                        <template #toolbar>
                            <!--顶栏-->
                            <div
                                    class="w-full h-[39px] px-4 py-[7px] bg-white rounded-t-lg border-b border-gray-200 justify-between items-center gap-4 inline-flex">
                                <div class="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
                                    <div class="flex-col justify-start items-start inline-flex">
                                        <div class="text-zinc-900 text-base font-medium leading-tight tracking-tight">
                                            发酵参数
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    <vxe-input v-model="filterName" placeholder="试试全表搜索" type="search"
                                               @keyup="searchEvent"></vxe-input>
                                </p>
                                
                                <!--最大化表格-->
                                
                                <button @click="zoomEvent">
                                    <svg fill="none" height="26" viewBox="0 0 26 26" width="26"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect fill="#E9E9E9" height="25" rx="12.5" width="25" x="0.4646" y="0.926025"/>
                                        <path d="M15.9646 13.426H16.9646V9.42603H12.9646V10.426H15.9646V13.426Z"
                                              fill="#19161D"/>
                                        <path d="M8.9646 17.426H12.9646V16.426H9.9646V13.426H8.9646V17.426Z"
                                              fill="#19161D"/>
                                        <path
                                                d="M17.9646 19.426H7.9646C7.69948 19.4257 7.4453 19.3203 7.25783 19.1328C7.07036 18.9453 6.9649 18.6911 6.9646 18.426V8.42603C6.9649 8.1609 7.07036 7.90673 7.25783 7.71925C7.4453 7.53178 7.69948 7.42633 7.9646 7.42603H17.9646C18.2297 7.42633 18.4839 7.53178 18.6714 7.71925C18.8588 7.90673 18.9643 8.1609 18.9646 8.42603V18.426C18.9643 18.6911 18.8588 18.9453 18.6714 19.1328C18.4839 19.3203 18.2297 19.4257 17.9646 19.426ZM7.9646 8.42603V18.426H17.9652L17.9646 8.42603H7.9646Z"
                                                fill="#19161D"/>
                                    </svg>
                                </button>
                                <!--打印-->
                                <button @click="printEvent1">
                                    <svg fill="none" height="26" viewBox="0 0 26 26" width="26"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect fill="#E9E9E9" height="25" rx="12.5" width="25" x="0.631348"
                                              y="0.926025"/>
                                        <path
                                                d="M19.1313 9.92603H17.6313V6.92603H8.63135V9.92603H7.13135C6.86613 9.92603 6.61178 10.0314 6.42424 10.2189C6.2367 10.4065 6.13135 10.6608 6.13135 10.926V15.926C6.13135 16.1912 6.2367 16.4456 6.42424 16.6331C6.61178 16.8207 6.86613 16.926 7.13135 16.926H8.63135V19.926H17.6313V16.926H19.1313C19.3966 16.926 19.6509 16.8207 19.8385 16.6331C20.026 16.4456 20.1313 16.1912 20.1313 15.926V10.926C20.1313 10.6608 20.026 10.4065 19.8385 10.2189C19.6509 10.0314 19.3966 9.92603 19.1313 9.92603ZM9.63135 7.92603H16.6313V9.92603H9.63135V7.92603ZM16.6313 18.926H9.63135V13.926H16.6313V18.926ZM19.1313 15.926H17.6313V12.926H8.63135V15.926H7.13135V10.926H19.1313V15.926Z"
                                                fill="#19161D"/>
                                    </svg>
                                </button>
                                
                                <!--导出表格-->
                                <button @click="exportDataEvent">
                                    <svg fill="none" height="26" viewBox="0 0 26 26" width="26"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect fill="#E9E9E9" height="25" rx="12.5" width="25" x="0.9646" y="0.926025"/>
                                        <path
                                                d="M19.4646 9.42603H17.4646V7.42603C17.4643 7.16091 17.3588 6.90675 17.1713 6.71928C16.9839 6.53182 16.7297 6.42636 16.4646 6.42603H7.4646C7.19948 6.42636 6.94532 6.53182 6.75786 6.71928C6.57039 6.90675 6.46493 7.16091 6.4646 7.42603V16.426C6.46493 16.6911 6.57039 16.9453 6.75786 17.1328C6.94532 17.3202 7.19948 17.4257 7.4646 17.426H9.4646V19.426C9.46493 19.6911 9.57039 19.9453 9.75786 20.1328C9.94532 20.3202 10.1995 20.4257 10.4646 20.426H19.4646C19.7297 20.4257 19.9839 20.3202 20.1713 20.1328C20.3588 19.9453 20.4643 19.6911 20.4646 19.426V10.426C20.4643 10.1609 20.3588 9.90675 20.1713 9.71928C19.9839 9.53182 19.7297 9.42636 19.4646 9.42603ZM16.4646 16.426H12.4646V13.926H16.4646V16.426ZM16.4646 12.926H12.4646V10.426H16.4646V12.926ZM11.4646 12.926H7.4646V10.426H11.4646V12.926ZM16.4646 7.42603V9.42603H7.4646V7.42603H16.4646ZM7.4646 16.426V13.926H11.4646V16.426H7.4646ZM19.4646 19.426H10.4646V17.426H16.4646C16.7297 17.4257 16.9839 17.3202 17.1713 17.1328C17.3588 16.9453 17.4643 16.6911 17.4646 16.426V10.426H19.4646V19.426Z"
                                                fill="#19161D"/>
                                    </svg>
                                </button>
                                <!--查看图表-->
                                <button @click="showCharts">
                                    <svg fill="none" height="25" viewBox="0 0 25 25" width="25"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect fill="#E9E9E9" height="25" rx="12.5" width="25"/>
                                        <path d="M7.25 7.25V17.75H17.75" stroke="#333333" stroke-linecap="round"
                                              stroke-linejoin="round"/>
                                        <path d="M9.5835 15.4167L11.9168 10.75L14.8335 13.375L17.7502 7.25"
                                              stroke="#333333" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                
                                </button>
                            
                            
                            </div>
                        </template>
                        
                        <!--自定义空数据模板-->
                        <template #empty>
                            <div class="flex flex-col justify-start items-center h-32">
                                <div class="spinner">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            <div class="font-bold text-green-500 text-[1.5rem] h-16 flex flex-col justify-center items-center pt-5">
                            <p>暂未查询到数据</p>
                          </div>
                            
                            </div>
                 
                        </template>
                    
                    </vxe-grid>
                
                </div>
            
            </div>
        
        
        </div>
    
    </div>


</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import {VxeButtonEvents, VxeGridInstance, VxeGridListeners, VxeGridProps} from 'vxe-table'
import {useAppGlobal} from '@/store/AppGlobal'
import {useDeviceManage} from '@/store/DeviceManage'
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import TableCharts from "@/components/Charts/TableCharts.vue";
const debug = true

const AppGlobal = useAppGlobal()
const DeviceManage = useDeviceManage()
// 批次数据
const batchData = ref()
const ProcessPopupMangerState = useProcessPopupMangerState()
const gridEvent: VxeGridListeners<any> = {
    proxyQuery() {
        console.log('数据代理查询事件')
    },
    proxyDelete() {
        console.log('数据代理删除事件')
    },
    proxySave() {
        console.log('数据代理保存事件')
    }
}
const xGrid = ref<VxeGridInstance<any>>()

const batchName = ref('')

// 表格数据
const tableData = ref<any[]>([])
// 表格配置项
const gridOptions = reactive<VxeGridProps<any>>({
    showOverflow: true,
    border: 'inner',
    height: 'auto',
    rowConfig: {
        keyField: 'id'
    },
    columnConfig: {
        resizable: true
    },
    printConfig: {
        columns: [
            {field: 'can_number'},
            {field: 'timing_temp'},
            {field: 'timing_PH'},
            {field: 'timing_DO'},
            {field: 'timing_motor_speed'},
            {field: 'relative_time'},
            {field: 'absolute_time'},
            {field: 'acid_ml'},
            {field: 'lye_ml'},
            {field: 'clean_ml'},
            {field: 'feed_ml'},
            {field: 'defoamerPumpSpeed'},
            {field: 'feedPumpSpeed'},
            {field: 'fermentation_flag'},
            {field: 'data_id'},
            {field: 'batch_id'},
        ]
    },
    sortConfig: {
        trigger: 'cell',
        remote: true,
        defaultSort: {
            field: 'name',
            order: 'desc'
        }
    },
    filterConfig: {
        remote: true
    },
    
    exportConfig: {
        type: 'csv',
        types: ['csv', 'html', 'xml', 'txt'],
        modes: ['current', 'all']
    },
    radioConfig: {
        labelField: 'id',
        reserve: true,
        highlight: true
    },
    toolbarConfig: {
        export: true,
        print: true,
        custom: true,
        slots: {
            buttons: 'toolbar'
        },
        refresh: true,
        zoom: true
    },
    columns: [
        
        {field: 'absolute_time', title: '绝对时间', minWidth: 160, fixed: 'left'},
        {field: 'timing_temp', title: '实时温度', minWidth: 160},
        {field: 'timing_PH', title: '实时PH值', minWidth: 160},
        {field: 'timing_DO', title: '实时溶氧值', minWidth: 160},
        {field: 'timing_motor_speed', title: '电机速度', minWidth: 160},
        {field: 'relative_time', title: '相对时间', minWidth: 160},
        {field: 'acid_ml', title: '酸泵目前送料量', minWidth: 160},
        {field: 'lye_ml', title: '碱泵目前送料量', minWidth: 160},
        {field: 'clean_ml', title: '补料泵一目前送料量', minWidth: 160},
        {field: 'feed_ml', title: '补料泵二目前送料量', minWidth: 160},
        {field: 'defoamerPumpSpeed', title: '补料泵一速度', minWidth: 160},
        {field: 'feedPumpSpeed', title: '补料泵二速度', minWidth: 160},
        {field: 'fermentation_flag', title: '发酵标志', minWidth: 160},
        {field: 'data_id', title: '数据ID', minWidth: 160},
        {field: 'batch_id', title: '批次ID', minWidth: 160},
        {field: 'can_number', title: '罐编号', minWidth: 160},
    ]
    
});


// 表格最大化
const zoomEvent = () => {
    const $grid = xGrid.value
    if ($grid) {
        $grid.zoom()
    }
}

// 打印
const printEvent1: VxeButtonEvents.Click = () => {
    const $table = xGrid.value
    if ($table) {
        $table.print()
    }
}

// 导出
const exportDataEvent: VxeButtonEvents.Click = () => {
    const $table = xGrid.value
    if ($table) {
        $table.exportData({type: 'csv'})
    }
}
// 全表搜索
const list = ref<any[]>([])
const searchEvent = () => {
    const filterVal = String(filterName.value).trim().toLowerCase()
    if (filterVal) {
        const filterRE = new RegExp(filterVal, 'gi')
        const searchProps = ['name', 'role', 'age', 'address']
        const rest = gridOptions.data?.filter(item => searchProps.some(key => String(item[key]).toLowerCase().indexOf(filterVal) > -1))
        gridOptions.data = rest?.map(row => {
            const item = Object.assign({}, row)
            searchProps.forEach(key => {
                item[key] = String(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
            })
            console.log(item)
            return item
        })
    }
}
onMounted(() => {
    searchEvent()
    updateBatchData()
    updateBatchContentData()
})


// 懒加载
const batchloading = ref(false)
const load = () => {
    batchloading.value = true
    setTimeout(() => {
        batchData.value += 2
        batchloading.value = false
    }, 3000)
}
const noMore = computed(() => {
    return batchData.value >= 20
})
const disabled = computed(() => {
    return batchloading.value || noMore.value
})
const isShowCharts = ref(false)
const showCharts = () => {
    isShowCharts.value = true
    
    
}
// 关闭页面
const closePop = () => {
    isShowCharts.value = false
}
// 选择批次ID
const selectedBatch = ref(null);
const selectBatch = (batch) => {
    if (debug){
        console.log('【批次比较】选择的批次ID',batch)
    }
    selectedBatch.value = batch;
    // 在这里，您可以执行其他所需的操作，例如更新其他 UI 元素、调用 API 等
};

const filterName = ref('')
const timeFilter=ref([])
// 查询批次列表数据
const updateBatchData = () => {
    // 检查DeviceManage、deviceList和AppGlobal是否存在
    if (!DeviceManage || !DeviceManage.deviceList || typeof AppGlobal.pageChance === 'undefined') {
        console.error('设备管理器有问题.');
        return;
    }
    
    let deviceNum = DeviceManage.deviceList[AppGlobal.pageChance]?.deviceNum;
    if (deviceNum) {
        window.Electron.ipcRenderer.invoke('get-batches-by-can', deviceNum).then(
            (res) => {
                if (res) {
                    // 将res中的批次名为null的数据删除
                    res = res.filter((item) => {
                        return item.batch_name !== null;
                    });
                    
                    if (debug){
                        console.log('【批次比较】读取的批次数据',res)
                    }
                    batchData.value = res;
                    showBatchData.value = res;
                    selectedBatch.value = res[0].id
                    batchName.value = '设备罐号' + res[0].can_number + ' - 批次号' + res[0].batch_name
                } else {
                    console.error('请求批次内容数据没请求到.');
                }
            }
        ).catch((error) => {
            console.error('请求批次内容数据没请求到,报错为:', error);
        });
    } else {
        console.error('未找到该罐号的数据.');
    }
}
const showBatchData= ref()
// 查询批次内容数据
const updateBatchContentData = () => {
    if (!selectedBatch.value) {
        console.error('未选择批次数据.');
        return;
    }
    
    window.Electron.ipcRenderer.invoke('get-data-by-batch', selectedBatch.value).then(
        (res) => {
            if (res) { // 确保res是有效的
                if (debug){
                    console.log('【批次比较】读取批次数据',selectedBatch.value,res)
                }
                // 进行数据处理relative_time保留三位小数，absolute_time从时间戳化为实际时间
                res.forEach((item) => {
                    item.relative_time = item.relative_time.toFixed(4);
                    item.absolute_time = timestampToString(item.absolute_time);
                });
                
                gridOptions.data = res;
                tableData.value = res;
            } else {
                console.error('请求批次内容数据没请求到.');
            }
        }
    ).catch((error) => {
        console.error('请求批次内容数据没请求到,报错为:', error);
    });
}

// 监听timeFilter变化和
watch(() => timeFilter.value, () => {
    batchFilter()
});
watch(() => filterName.value, () => {
    batchFilter()
});
// 批号筛选
const batchFilter = () => {

        // 将批次数据进行字符串匹配，匹配到字符就存入showBatchData，匹配不到不存入
    let restName = batchData.value.filter(item => item.batch_name.includes(filterName.value))
    showBatchData.value = restName
    
    if (timeFilter.value?.length!==2){
        return
    }
    let rest = restName.filter(item => item.start_time>=new Date(timeFilter.value[0]).getTime()&&item.start_time<=new Date(timeFilter.value[1]).getTime())
    showBatchData.value = rest
    
    
   
 

}


// 监控数据变化
watch(() => AppGlobal.pageChance, () => {
    updateBatchData()
});
watch(() => selectedBatch.value, () => {
    updateBatchContentData()
    
});

const isExpanded = ref(false);

const toggle = () => {
    isExpanded.value = !isExpanded.value;
};

function timestampToString(timestamp) {
    // 将时间戳转换为毫秒
    let date = new Date(Number(timestamp));
    // 使用toLocaleString将日期和时间转换为字符串格式
    let dateString = date.toLocaleString();
    return dateString;
}


</script>
<style>


.vxe-pager {
    border-radius: 0.5rem; /* 8px */
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s;
}

.fade-enter-from {
    transform-origin: right top;
    transform: scale(0.5);
    opacity: 0;
}

.fade-leave-to {
    transform-origin: right top;
    transform: scale(0.5);
    opacity: 0;
}
.spinner {
    width: 44px;
    height: 44px;
    animation: spinner-y0fdc1 2s infinite ease;
    transform-style: preserve-3d;
}

.spinner > div {
    background-color: rgba(34, 255, 0, 0.2);
    height: 100%;
    position: absolute;
    width: 100%;
    border: 2px solid #55c483;
}

.spinner div:nth-of-type(1) {
    transform: translateZ(-22px) rotateY(180deg);
}

.spinner div:nth-of-type(2) {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
}

.spinner div:nth-of-type(3) {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
}

.spinner div:nth-of-type(4) {
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
}

.spinner div:nth-of-type(5) {
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
}

.spinner div:nth-of-type(6) {
    transform: translateZ(22px);
}

@keyframes spinner-y0fdc1 {
    0% {
        transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    }

    50% {
        transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    }

    100% {
        transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    }
}
</style>
