<template>
  <!-- 主容器，垂直布局 -->
  <div class="flex grow flex-col gap-y-5 overflow-y-auto  px-4  pt-2">

    <!-- 导航部分 -->
    <nav class="flex flex-1 flex-col ">

      <!-- 列表容器 -->
      <ul class="flex flex-1 flex-col gap-y-1" role="list">

        <!-- 用户信息部分 -->
        <li class="h-[4rem] flex items-center mt-2">
          <div class="flex w-[100%] h-[29%]  justify-start items-center inline-flex relative ">
            <div class="flex justify-start items-center absolute left-[2%]">
              <!-- 用户头像 -->
              <div class="mr-3.5 flex-shrink-0 self-center">
                <img alt="王雷" class="h-12 w-12 rounded-full" src="../assets/image/user-head.jpg">
              </div>
              <!-- 用户名 -->
              <div class="self-center">
                <div class=" antialiased font-bold text-zinc-600   leading-5 tracking-tight font-ibt text-lg pt-1.5">
                  王雷
                </div>
                <!-- 用户角色 -->
                <div class=" antialiased mt-1 font-bold text-zinc-500 text-base font-normal leading-1 font-iwz">管理员
                </div>
              </div>
            </div>
          </div>
        </li>

        <!-- 主导航列表，遍历导航项数据 -->
        <li v-for="item in navigation" :key="item.name">
          <router-link
              :class="['group flex gap-x-3  rounded-md p-3 text-sm leading-6 font-semibold']"
              :to="item.href"
              active-class="bg-white text-green-600 rounded-xl shadow">
            <!-- 导航图标 -->
            <img :class="['h-6 w-6 shrink-0']"
                 :src="item.icon"
                 aria-hidden="true"/>
            <!-- 导航名称 -->
            {{ item.name }}
          </router-link>
        </li>

        <!-- 分隔线 -->
        <li>
          <div class="relative">
            <div aria-hidden="true" class="top-2 relative inset-0 flex items-center h-3">
              <div class="w-full border-t border-gray-300"/>
            </div>
          </div>

          <!-- 页面列表部分 -->
          <div class="w-full h-[60vh] overflow-auto">
            <ul class="-mx-0 mt-4 space-y-1" role="list">
              <!-- 遍历页面列表 -->
              <li v-for="team in pages" :key="team.name">
                <div
                    :class="[team.current ? 'bg-white text-green-600 rounded-xl shadow' : 'text-gray-700 hover:text-gray-600 hover:bg-white hover:shadow',
            'group flex gap-x-3  rounded-xl p-3 text-sm leading-6 font-semibold']"
                    :href="team.href" @click.prevent="changebindPage(team.id,$event)"
                    @dblclick.stop="changePageName(team.id,$event)">
                  <!-- 页面ID -->
                  <button
                      :class="[team.current ? 'text-green-600 border-green-600' : 'text-gray-400 border-gray-200  ', 'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white']">
                    {{
                      team.id
                    }}
                  </button>
                  <!-- 页面名称 -->
                  <button v-if="team.id !== editID" class="truncate ">{{ team.name }}</button>
                  <!-- 页面编辑模式 -->
                  <span v-else>
                <input v-model="updateName"
                       :placeholder="team.name"
                       class="broder border-gray-200 text-black w-full"
                       @keyup.enter="enterEdit(team.id,$event)"
                >

              </span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
    <!-- 添加按钮   -->
    <div>
      <Transition name="fade">
        <div v-if="isExpanded" class="
              w-[12rem] h-[255px] border-[2px] border-[#83BA9B] rounded-[14px] fixed bottom-4  bg-white">
          <div class="absolute right-0 p-2 cursor-pointer" @click="toggle">
            <svg fill="none" height="18" viewBox="0 0 15 15" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                    fill="#828282"/>
            </svg>
          </div>
          <div class="flex-col items-center justify-center">
            <div class="w-[100%] h-9 flex items-center justify-center">
              新增设备
            </div>

            <!--            <div class="w-[96%] h-px m-2 bg-zinc-300"></div>-->

            <div class="isolate -space-y-px rounded-md ">

              <div
                  class="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                <div class="flex w-full mb-1">
                  <label class="block text-xs font-medium text-gray-900 w-2/3 mr-1" for="name">IP地址</label>
                  <label class="block text-xs font-medium text-gray-900 " for="name">端口</label>
                </div>
                <div class="flex">
                  <input id="name" class="block w-2/3 border p-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-1 mr-1" name="name"
                         placeholder="192.168.1.2" v-model="ipAddress"
                         type="text"/>
                  <input id="name" class="block w-1/3 border p-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-1" name="name"
                         placeholder="2000" v-model="port"
                         type="text"/>
                </div>
              </div>
              <div
                  class="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                <label class="block text-xs font-medium text-gray-900 mb-1" for="job-title">设备名称</label>
                <input id="job-title" class="block w-full border p-0 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6 pl-1 " name="job-title"
                       placeholder="F1"  v-model="nameDevice"
                       type="text"/>

              </div>

            </div>
            <div class="w-[100%] h-9 flex items-center justify-begin">

              <button
                  className="flex items-center justify-begin w-20 mt-6 ml-2 inline-flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="button"
                  @click="newDevice"
              >
                <div class="ml-1">确定</div>
                <svg class="ml-1.5" fill="none" height="12" viewBox="0 0 12 12" width="12"
                     xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M6 10.375C8.41625 10.375 10.375 8.41625 10.375 6C10.375 3.58375 8.41625 1.625 6 1.625C3.58375 1.625 1.625 3.58375 1.625 6C1.625 8.41625 3.58375 10.375 6 10.375ZM6 11.25C8.89949 11.25 11.25 8.89949 11.25 6C11.25 3.10051 8.89949 0.75 6 0.75C3.10051 0.75 0.75 3.10051 0.75 6C0.75 8.89949 3.10051 11.25 6 11.25Z"
                        fill="white"
                        fill-rule="evenodd"/>
                </svg>

              </button>
            </div>
            <div class="ml-2 mt-5 text-green-600 ">

              {{ message }}
            </div>
          </div>


        </div>
        <div v-else class=" transition hover:bg-[#83BA9B] hover:text-white  hover:stroke-white duration-150  cursor-pointer
              bg-white rounded-[50px] border-[2px] border-[#83BA9B] justify-center flex items-center w-10 h-10
           items-center flex fixed bottom-4  " @click="toggle">
          <div class="w-4 h-4 relative justify-center flex items-center">
            <svg fill="none" height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 4.5V0H4.5V4.5H0V5.5H4.5V10H5.5V5.5H10V4.5H5.5Z" fill="#19161D"/>
            </svg>


          </div>

        </div>

      </Transition>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router'
import {computed, ref} from 'vue'
import ShujuImg from '@/assets/image/shuju.png'
import ShujuImg1 from '@/assets/image/shuju1.png'
import FenguanImg1 from '@/assets/image/fenguan1.png'
import FaxiaoImg1 from '@/assets/image/faxiao1.png'
import FenguanImg from '@/assets/image/fenguan.png'
import FaxiaoImg from '@/assets/image/faxiao.png'
import PiciImg from '@/assets/image/pici.png'
import PiciImg1 from '@/assets/image/pici1.png'
import {useAppGlobal} from '@/store/AppGlobal'
import {useDeviceManage} from '@/store/DeviceManage'


const route = useRoute()
const AppGlobal = useAppGlobal()
const DeviceManage = useDeviceManage()
const chancepage = ref(AppGlobal.pageChance)
const editID = ref(-1)
const updateName = ref('')
const navigation = computed(() => [
  {
    name: '数据总览',
    href: '/overview',
    icon: route.path === '/overview' ? ShujuImg1 : ShujuImg,
    current: route.path === '/overview'
  },
  {
    name: '分罐流程',
    href: '/processview',
    icon: route.path === '/processview' ? FenguanImg1 : FenguanImg,
    current: route.path === '/processview'
  },
  {
    name: '发酵参数',
    href: '/fermentationview',
    icon: route.path === '/fermentationview' ? FaxiaoImg1 : FaxiaoImg,
    current: route.path === '/fermentationview'
  },
  {
    name: '批次比较',
    href: '/batchview',
    icon: route.path === '/batchview' ? PiciImg1 : PiciImg,
    current: route.path === '/batchview'
  },
  {
    name: '测试页面',
    href: '/testview',
    icon: route.path === '/testview' ? PiciImg1 : PiciImg,
    current: route.path === '/testview'
  },

])
// 分页名称
const basePages = ref(DeviceManage.deviceList)
const pages = computed(() => {
  return basePages.value.map(page => ({
    ...page,
    current: page.id === chancepage.value

  }))
})
const isExpanded = ref(false);

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};
// 切换绑定的分页
const changebindPage = (id: number) => {
  chancepage.value = id;
  AppGlobal.updatePageChance(id);

}
// 改变分页名称
const changePageName = (id: number) => {
  editID.value = id

}
// 监听分页名称输入框
const enterEdit = (id: number) => {
  basePages.value[id - 1].name = updateName.value;
  editID.value = -1;
  updateName.value = ''
}


// 新建设备
const ipAddress = ref('');
const port = ref('');
const message = ref('');
const nameDevice = ref('');
const isValidDevice = (Ip,Port) => {

  const isSameIpDevica = !DeviceManage.deviceList.some(device => device.ip === Ip && device.port === Port);

  const ipPatternIp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipPatternPort = /^(102[4-9]|10[3-9][0-9]|1[1-9][0-9]{2}|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
  return ipPatternIp.test(Ip)&&ipPatternPort.test(Port)&&isSameIpDevica;
};

const newDevice = ()=>{
  if (isValidDevice(ipAddress.value,port.value)) {
    message.value = '已添加设备！';
    DeviceManage.addDevice(ipAddress.value,port.value,nameDevice.value)
    // You can also send the IP to a server or any other logic here
  } else {

    message.value = 'IP校验失败！';
  }

}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from {
  transform-origin: left bottom;
  transform: scale(0.5);
  opacity: 0;
}

.fade-leave-to {
  transform-origin: left bottom;
  transform: scale(0.5);
  opacity: 0;
}
</style>