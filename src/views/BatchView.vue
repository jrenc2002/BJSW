<template>
  <div class="flex w-full h-full flex-col">
    <div class="w-full p-5 h-[4.2rem] flex items-center text-xl text-zinc-900 font-medium">
      批次比较
    </div>
    <div class="w-full px-3 pb-3 h-[calc(100%-4.2rem)] flex items-center gap-3 ">
      <div class=" h-full w-[30%] bg-white  rounded-lg shadow ">

      </div>
      <div class=" h-full w-[70%] bg-white   rounded-lg shadow flex-col ">
        <!--顶栏-->
        <div
            class="w-full h-[39px] px-4 py-[7px] bg-white rounded-t-lg border-b border-gray-200 justify-between items-center gap-4 inline-flex">
          <div class="grow shrink basis-0 h-5 justify-start items-center gap-2 flex">
            <div class="flex-col justify-start items-start inline-flex">
              <div class="text-zinc-900 text-base font-medium leading-tight tracking-tight">发酵参数</div>
            </div>
          </div>
          <p>
            <vxe-input v-model="filterName" type="search" placeholder="试试全表搜索" @keyup="searchEvent"></vxe-input>
          </p>
          <!--打印-->
          <button @click="printEvent1">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.631348" y="0.926025" width="25" height="25" rx="12.5" fill="#E9E9E9"/>
              <path
                  d="M19.1313 9.92603H17.6313V6.92603H8.63135V9.92603H7.13135C6.86613 9.92603 6.61178 10.0314 6.42424 10.2189C6.2367 10.4065 6.13135 10.6608 6.13135 10.926V15.926C6.13135 16.1912 6.2367 16.4456 6.42424 16.6331C6.61178 16.8207 6.86613 16.926 7.13135 16.926H8.63135V19.926H17.6313V16.926H19.1313C19.3966 16.926 19.6509 16.8207 19.8385 16.6331C20.026 16.4456 20.1313 16.1912 20.1313 15.926V10.926C20.1313 10.6608 20.026 10.4065 19.8385 10.2189C19.6509 10.0314 19.3966 9.92603 19.1313 9.92603ZM9.63135 7.92603H16.6313V9.92603H9.63135V7.92603ZM16.6313 18.926H9.63135V13.926H16.6313V18.926ZM19.1313 15.926H17.6313V12.926H8.63135V15.926H7.13135V10.926H19.1313V15.926Z"
                  fill="#19161D"/>
            </svg>
          </button>
          <!--最大化表格-->
          <vxe-button @click="maximizeEvent">表格最大化</vxe-button>

          <!--导出表格-->
          <button @click="exportDataEvent">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.9646" y="0.926025" width="25" height="25" rx="12.5" fill="#E9E9E9"/>
              <path
                  d="M19.4646 9.42603H17.4646V7.42603C17.4643 7.16091 17.3588 6.90675 17.1713 6.71928C16.9839 6.53182 16.7297 6.42636 16.4646 6.42603H7.4646C7.19948 6.42636 6.94532 6.53182 6.75786 6.71928C6.57039 6.90675 6.46493 7.16091 6.4646 7.42603V16.426C6.46493 16.6911 6.57039 16.9453 6.75786 17.1328C6.94532 17.3202 7.19948 17.4257 7.4646 17.426H9.4646V19.426C9.46493 19.6911 9.57039 19.9453 9.75786 20.1328C9.94532 20.3202 10.1995 20.4257 10.4646 20.426H19.4646C19.7297 20.4257 19.9839 20.3202 20.1713 20.1328C20.3588 19.9453 20.4643 19.6911 20.4646 19.426V10.426C20.4643 10.1609 20.3588 9.90675 20.1713 9.71928C19.9839 9.53182 19.7297 9.42636 19.4646 9.42603ZM16.4646 16.426H12.4646V13.926H16.4646V16.426ZM16.4646 12.926H12.4646V10.426H16.4646V12.926ZM11.4646 12.926H7.4646V10.426H11.4646V12.926ZM16.4646 7.42603V9.42603H7.4646V7.42603H16.4646ZM7.4646 16.426V13.926H11.4646V16.426H7.4646ZM19.4646 19.426H10.4646V17.426H16.4646C16.7297 17.4257 16.9839 17.3202 17.1713 17.1328C17.3588 16.9453 17.4643 16.6911 17.4646 16.426V10.426H19.4646V19.426Z"
                  fill="#19161D"/>
            </svg>
          </button>

          <!--导出PDF-->
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.297852" y="0.926025" width="25" height="25" rx="12.5" fill="#E9E9E9"/>
            <path d="M19.7979 14.4262V13.4262H16.7979V18.4262H17.7979V16.4262H19.2979V15.4262H17.7979V14.4262H19.7979Z"
                  fill="#19161D"/>
            <path
                d="M14.2979 18.4262H12.2979V13.4262H14.2979C14.6955 13.4266 15.0768 13.5848 15.358 13.866C15.6392 14.1472 15.7974 14.5285 15.7979 14.9262V16.9262C15.7974 17.3239 15.6392 17.7052 15.358 17.9864C15.0768 18.2676 14.6955 18.4258 14.2979 18.4262ZM13.2979 17.4262H14.2979C14.4304 17.4261 14.5575 17.3733 14.6512 17.2796C14.745 17.1859 14.7977 17.0588 14.7979 16.9262V14.9262C14.7977 14.7936 14.745 14.6665 14.6512 14.5728C14.5575 14.4791 14.4304 14.4263 14.2979 14.4262H13.2979V17.4262Z"
                fill="#19161D"/>
            <path
                d="M10.2979 13.4262H7.79785V18.4262H8.79785V16.9262H10.2979C10.563 16.9258 10.8171 16.8204 11.0046 16.6329C11.192 16.4455 11.2975 16.1913 11.2979 15.9262V14.4262C11.2975 14.1611 11.1921 13.9069 11.0046 13.7194C10.8172 13.532 10.563 13.4265 10.2979 13.4262ZM8.79785 15.9262V14.4262H10.2979L10.2984 15.9262H8.79785Z"
                fill="#19161D"/>
            <path
                d="M15.7979 12.4262V10.4262C15.7996 10.3605 15.7872 10.2952 15.7613 10.2347C15.7354 10.1743 15.6967 10.1202 15.6479 10.0762L12.1479 6.5762C12.1038 6.52736 12.0498 6.48866 11.9893 6.46276C11.9289 6.43686 11.8636 6.42439 11.7979 6.4262H6.79785C6.53287 6.42698 6.27897 6.53258 6.0916 6.71995C5.90424 6.90732 5.79863 7.16122 5.79785 7.4262V19.4262C5.79785 19.6914 5.90321 19.9458 6.09074 20.1333C6.27828 20.3208 6.53264 20.4262 6.79785 20.4262H14.7979V19.4262H6.79785V7.4262H10.7979V10.4262C10.7986 10.6912 10.9042 10.9451 11.0916 11.1324C11.279 11.3198 11.5329 11.4254 11.7979 11.4262H14.7979V12.4262H15.7979ZM11.7979 10.4262V7.6262L14.5979 10.4262H11.7979Z"
                fill="#19161D"/>
          </svg>

        </div>
        <!--表格栏-->
        <div class="w-full h-[calc(100%-39px)] relative">

          <vxe-table
              border
              stripe

              ref="tableRef"
              height="100%"
              :loading="loading"
              :column-config="{resizable: true}"
              :row-config="{isHover: true}"
              :checkbox-config="{labelField: 'id', highlight: true, range: true}"
              :data="list">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column type="checkbox" title="ID" width="140"></vxe-column>
            <vxe-column field="name" title="Name" width="140"></vxe-column>
            <vxe-column field="sex" title="Sex" width="140" :filters="sexOptions" :filter-multiple="false"
                        :formatter="formatterSex"></vxe-column>
            <vxe-column field="age" title="Age" :filters="ageOptions" :filter-method="filterAgeMethod"
                        width="140"></vxe-column>
            <vxe-column field="address" title="Address" width="140" show-overflow></vxe-column>
          </vxe-table>

        </div>

      </div>


    </div>

  </div>


</template>
<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import {VxeColumnPropTypes} from 'vxe-table'
import { VxeButtonEvents, VxeGridProps, VxeGridInstance} from 'vxe-table'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const loading = ref(false)
const tableData = ref<RowVO[]>([])
const sexOptions = ref([
  {
    label: '女',
    value: '0'
  },
  {
    label: '男',
    value: '1'
  }
])
const list = ref<RowVO[]>([])
const ageOptions = ref([
  {label: '大于16岁', value: 16},
  {label: '大于26岁', value: 26},
  {label: '大于30岁', value: 30}
])

const formatterSex: VxeColumnPropTypes.Formatter<RowVO> = ({cellValue}) => {
  const item = sexOptions.value.find(item => item.value === cellValue)
  return item ? item.label : ''
}

const filterAgeMethod: VxeColumnPropTypes.FilterMethod<RowVO> = ({value, row}) => {
  return row.age >= value
}

const filterName = ref('')
tableData.value = [
  {id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc'},
  {id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou'},
  {id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai'},
  {id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc'},
  {id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai'},
  {id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc'},
  {id: 10007, name: 'Test7', role: 'Test', sex: '0', age: 29, address: 'test abc'},
  {id: 10008, name: 'Test8', role: 'Develop', sex: '0', age: 35, address: 'test abc'},
  {id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 21, address: 'test abc'},
  {id: 10010, name: 'Test10', role: 'Develop', sex: '0', age: 28, address: 'test abc'},
  {id: 10011, name: 'Test11', role: 'Test', sex: '0', age: 29, address: 'test abc'},
  {id: 10012, name: 'Test12', role: 'Develop', sex: '1', age: 27, address: 'test abc'},
  {id: 10013, name: 'Test13', role: 'Test', sex: '0', age: 24, address: 'test abc'},
  {id: 10014, name: 'Test14', role: 'Develop', sex: '1', age: 34, address: 'test abc'},
  {id: 10015, name: 'Test15', role: 'Test', sex: '1', age: 21, address: 'test abc'},
  {id: 10016, name: 'Test16', role: 'Develop', sex: '0', age: 20, address: 'test abc'},
  {id: 10017, name: 'Test17', role: 'Test', sex: '1', age: 31, address: 'test abc'},
  {id: 10018, name: 'Test18', role: 'Develop', sex: '0', age: 32, address: 'test abc'},
  {id: 10019, name: 'Test19', role: 'Test', sex: '1', age: 37, address: 'test abc'},
  {id: 10020, name: 'Test20', role: 'Develop', sex: '1', age: 41, address: 'test abc'}
]
const searchEvent = () => {
  const filterVal = String(filterName.value).trim().toLowerCase()
  console.log(filterVal)
  if (filterVal) {
    const filterRE = new RegExp(filterVal, 'gi')
    const searchProps = ['name', 'role', 'age', 'address']
    console.log(filterRE)
    const rest = tableData.value.filter(item => searchProps.some(key => String(item[key]).toLowerCase().indexOf(filterVal) > -1))
    list.value = rest.map(row => {
      const item = Object.assign({}, row)
      searchProps.forEach(key => {
        item[key] = String(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
      })
      return item
    })
  } else {
    list.value = tableData.value
  }
}

searchEvent()
const tableRef = ref<VxeGridInstance<RowVO>>()

const exportDataEvent: VxeButtonEvents.Click = () => {
  const $table = tableRef.value
  if ($table) {
    $table.exportData({type: 'csv'})
  }
}
const printEvent1: VxeButtonEvents.Click = () => {
  const $table = tableRef.value
  if ($table) {
    $table.print()
  }
}
const xGrid = ref<VxeGridInstance<RowVO>>()

const maximizeEvent = () => {
  const $table = tableRef.value
  if ($table) {
    $table.maximize()
  }
}

</script>
<style>

</style>