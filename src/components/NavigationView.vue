<template>


  <ul role="list" class="-mx-1 space-y-2 pl-5 pr-5  ">
    <div class="flex w-[100%] h-[29%]  justify-start items-center inline-flex relative " >
      <div class="flex justify-start items-center absolute left-[2%]">
        <div class="mr-3.5 flex-shrink-0 self-center">
          <img class="h-12 w-12 rounded-full" src="../assets/image/user-head.jpg" alt="王雷">
        </div>
        <div class="self-center">
          <div class=" antialiased font-bold text-zinc-600   leading-5 tracking-tight font-ibt text-lg pt-1.5">王雷</div>
          <div class=" antialiased mt-1 font-bold text-zinc-500 text-base font-normal leading-1 font-iwz">管理员</div>
        </div>
      </div>
    </div>
    <!-- 遍历导航项数据，为每一个导航项创建一个列表项 -->
    <li v-for="item in navigation" :key="item.name">
      <router-link :to="item.href"
                   :class="[item.current ? 'bg-white text-green-600 rounded-xl shadow' : 'text-gray-700 hover:text-gray-600 hover:bg-white',
          'group flex gap-x-3  rounded-md p-3 text-sm leading-6 font-semibold']">
        <!-- 使用 img 元素来渲染图标，并根据导航项的当前状态动态绑定类名 -->
        <img :src="item.icon"
             :class="[item.current ? 'text-indigo-600' : 'text-gray-400 ', 'h-6 w-6 shrink-0']"
             aria-hidden="true" />
        <!-- 显示导航项的名称 -->
        {{ item.name }}
      </router-link>
    </li>


  </ul>

</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import ShujuImg from '@/assets/image/shuju.png'
import ShujuImg1 from '@/assets/image/shuju1.png'
import FenguanImg1 from '@/assets/image/fenguan1.png'
import FaxiaoImg1 from '@/assets/image/faxiao1.png'
import FenguanImg from '@/assets/image/fenguan.png'
import FaxiaoImg from '@/assets/image/faxiao.png'
import PiciImg from '@/assets/image/pici.png'
import PiciImg1 from '@/assets/image/pici1.png'
const route = useRoute()
const navigation = computed(() => [
  {name: '数据总览', href: '/overview', icon: route.path === '/overview'?ShujuImg1:ShujuImg, current: route.path === '/overview'},
  {name: '分罐流程', href: '/processview', icon: route.path === '/processview'?FenguanImg1:FenguanImg, current: route.path === '/processview'},
  {name: '发酵参数', href: '/fermentationview', icon: route.path === '/fermentationview'?FaxiaoImg1:FaxiaoImg, current: route.path === '/fermentationview'},
  {name: '批次比较', href: '/batchview', icon: route.path === '/batchview'?PiciImg1:PiciImg, current: route.path === '/batchview'},

])


</script>
