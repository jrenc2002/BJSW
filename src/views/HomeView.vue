<template>
  <div
      style="background: radial-gradient(116.01% 64.30% at 17.78% 99.56%, rgba(202, 242, 211, 0.50) 0%, rgba(161, 217, 203, 0.00) 100%), linear-gradient(90deg, #C3E3D2 0%, #83BA9B 100%);"
      class="w-full h-screen rounded-[28px] flex absolute z-10 bg-gradient-to-r from-[#C9D6FF] via-[#E2E2E2] to-[#E9E4F0]">
    <!-- 左侧样式 -->
    <!-- 'w-1/5' 意味着当抽屉可见时，其占据 1/5 的屏幕宽度。'w-0' 意味着当抽屉不可见时，其宽度为 0 -->
    <div v-bind:class="{ 'w-[15rem]': isDrawerVisible.visible, 'w-0': !isDrawerVisible.visible }"
         class="drawer h-full   relative rounded-3xl flex items-center pl-[0.3rem] pt-[0.2rem] pb-[0.2rem] overflow-hidden transition-all duration-300 ease-in-out">

      <!-- 根据计算设置元素的宽度和高度，并设置元素的背景颜色，同时定义了元素的类名 -->
      <div :style="{ width: 'calc(100% )', height: 'calc(100% - 0.3rem)' }"
           class="box-border  shadow bg-white   rounded-3xl flex flex-col p-[0.5rem] justify-center items-center gap-6 inline-flex bg-opacity-80">
        <!-- 创建一个用户卡片组件 -->
        <!-- 定义一个导航区域，标明其角色为"Sidebar" -->
        <nav v-if="isDrawerVisible.visible" class="flex flex-1 flex-col w-[100%]  relative      " aria-label="Sidebar">
          <NavigationView/>
        </nav>
      </div>

    </div>


    <!-- 右侧样式 -->
    <!-- 'w-4/5' 意味着当抽屉可见时，右侧样式占据 4/5 的屏幕宽度。'w-full' 和 'ml-[-0.3rem]' 意味着当抽屉不可见时，右侧样式占据全屏，且左侧有 0.3rem 的间隙 -->
    <div @dblclick="toggleDrawer"
         v-bind:class="{ 'w-[calc(100%-15rem)]': isDrawerVisible.visible, 'w-full': !isDrawerVisible.visible, 'ml-[-0.3rem]': !isDrawerVisible.visible }"
         class="right-side h-full relative flex flex-col justify-start items-start pl-[0.3rem] pt-[0.3rem] transition-all duration-300 ease-in-out ">
      <!-- 右侧白底 -->
      <div :style="{ width: 'calc(100% - 0.3rem)', height: 'calc(100% - 0.3rem)' }"
           class="box-border shadow bg-white bg-opacity-80 rounded-3xl flex flex-col justify-center items-center gap-6 inline-flex transform-origin: left">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>

      </div>
    </div>
  </div>



</template>
<script setup lang="ts">
import {reactive, onMounted, onUnmounted} from 'vue';
import NavigationView from '../components/NavigationView.vue';

// 使用 Vue3 的 reactive 函数来创建一个响应式对象，用于控制抽屉的显示状态
const isDrawerVisible = reactive({
  visible: true
});

// 定义一个函数，用于切换抽屉的显示状态
const toggleDrawer = () => {
  isDrawerVisible.visible = !isDrawerVisible.visible;
}

// 定义一个函数，用于更新抽屉的显示状态，当窗口宽度小于等于600px时，抽屉会自动隐藏
const updateWindowSize = () => {
  if (window.innerWidth / window.innerHeight <= 1.5 || window.innerWidth <= 900) {
    isDrawerVisible.visible = false;
  } else {
    isDrawerVisible.visible = true;
  }
}

// 使用 Vue3 的生命周期钩子函数 onMounted，在组件挂载完成后添加窗口大小变化的监听事件
onMounted(() => {
  window.addEventListener('resize', updateWindowSize);
  updateWindowSize();
});

// 使用 Vue3 的生命周期钩子函数 onUnmounted，在组件卸载之前移除窗口大小变化的监听事件
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});


</script>