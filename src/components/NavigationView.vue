<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto  px-4  pt-0">
    <nav class="flex flex-1 flex-col ">
      <ul class="flex flex-1 flex-col gap-y-1" role="list">
        <li class="h-[4rem] flex items-center">
          <div class="flex w-[100%] h-[29%]  justify-start items-center inline-flex relative ">
            <div class="flex justify-start items-center absolute left-[2%]">
              <div class="mr-3.5 flex-shrink-0 self-center">
                <img alt="王雷" class="h-12 w-12 rounded-full" src="../assets/image/user-head.jpg">
              </div>
              <div class="self-center">
                <div class=" antialiased font-bold text-zinc-600   leading-5 tracking-tight font-ibt text-lg pt-1.5">
                  王雷
                </div>
                <div class=" antialiased mt-1 font-bold text-zinc-500 text-base font-normal leading-1 font-iwz">管理员
                </div>
              </div>
            </div>
          </div>
        </li>
        <!-- 遍历导航项数据，为每一个导航项创建一个列表项 -->
        <li v-for="item in navigation" :key="item.name">
          <router-link :class="[item.current ? 'bg-white text-green-600 rounded-xl shadow' : 'text-gray-700 hover:text-gray-600 hover:bg-white',
          'group flex gap-x-3  rounded-md p-3 text-sm leading-6 font-semibold']"
                       :to="item.href">
            <!-- 使用 img 元素来渲染图标，并根据导航项的当前状态动态绑定类名 -->
            <img :class="[item.current ? 'text-indigo-600' : 'text-gray-400 ', 'h-6 w-6 shrink-0']"
                 :src="item.icon"
                 aria-hidden="true"/>
            <!-- 显示导航项的名称 -->
            {{ item.name }}
          </router-link>
        </li>

        <li >
          <div class="relative">
            <div aria-hidden="true" class="top-2 relative inset-0 flex items-center h-3">
              <div class="w-full border-t border-gray-300"/>
            </div>
          </div>

          <div class="w-full h-[60vh] overflow-auto">
          <ul class="-mx-0 mt-4 space-y-1" role="list">
            <li v-for="team in pages" :key="team.name">
              <div
                  :class="[team.current ? 'bg-white text-green-600 rounded-xl shadow' : 'text-gray-700 hover:text-gray-600 hover:bg-white hover:shadow',
            'group flex gap-x-3  rounded-xl p-3 text-sm leading-6 font-semibold']"
                  :href="team.href" @click.prevent="changebindPage(team.id,$event)"
                  @dblclick.stop="changePageName(team.id,$event)">
                <button
                    :class="[team.current ? 'text-green-600 border-green-600' : 'text-gray-400 border-gray-200  ', 'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white']">
                  {{
                    team.id
                  }}
                </button>

                <button v-if="team.id !== editID" class="truncate ">{{ team.name }}</button>
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

const route = useRoute()
const AppGlobal = useAppGlobal()
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

])
// 分页名称
const basePages = ref(AppGlobal.pageName)
const pages = computed(() => {
  return basePages.value.map(page => ({
    ...page,
    current: page.id === chancepage.value

  }))
})

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

</script>
