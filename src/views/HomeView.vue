<template>
  <div
      class="w-full h-screen rounded-[15px] flex absolute z-10 bg-gradient-to-r from-[#C9D6FF] via-[#E2E2E2] to-[#E9E4F0]"
      style="background: radial-gradient(116.01% 64.30% at 17.78% 99.56%, rgba(202, 242, 211, 0.50) 0%, rgba(161, 217, 203, 0.00) 100%), linear-gradient(90deg, #C3E3D2 0%, #83BA9B 100%);">
    <!-- 左侧样式 -->
    <!-- 'w-1/5' 意味着当抽屉可见时，其占据 1/5 的屏幕宽度。'w-0' 意味着当抽屉不可见时，其宽度为 0 -->
    <div
        class="drawer h-full   relative rounded-[15px] flex items-center pl-[0.3rem] pt-[0.2rem] pb-[0.2rem] overflow-hidden transition-all duration-300 ease-in-out"
        v-bind:class="{ 'w-[15rem]': isDrawerVisible.visible, 'w-0': !isDrawerVisible.visible }">

      <!-- 根据计算设置元素的宽度和高度，并设置元素的背景颜色，同时定义了元素的类名 -->
      <div :style="{ width: 'calc(100% )', height: 'calc(100% - 0.3rem)' }"
           class="box-border  shadow bg-white   rounded-[15px] flex flex-col p-[0.5rem] justify-center items-center gap-6 inline-flex bg-opacity-80">
        <!-- 创建一个用户卡片组件 -->
        <!-- 定义一个导航区域，标明其角色为"Sidebar" -->
        <nav v-if="isDrawerVisible.visible" aria-label="Sidebar" class="flex flex-1 flex-col w-[100%]  relative      ">
          <NavigationView/>
        </nav>
      </div>

    </div>


    <!-- 右侧样式 -->
    <!-- 'w-4/5' 意味着当抽屉可见时，右侧样式占据 4/5 的屏幕宽度。'w-full' 和 'ml-[-0.3rem]' 意味着当抽屉不可见时，右侧样式占据全屏，且左侧有 0.3rem 的间隙 -->
    <div
        :class="{ 'w-[calc(100%-15rem)]': isDrawerVisible.visible, 'w-full': !isDrawerVisible.visible, 'ml-[-0.3rem]': !isDrawerVisible.visible }"
        class="right-side h-full relative flex flex-col justify-start items-start pl-[0.3rem] pt-[0.3rem] transition-all duration-300 ease-in-out "
        @contextmenu="toggleDrawer">
      <!-- 右侧白底 -->
      <div :style="{ width: 'calc(100% - 0.3rem)', height: 'calc(100% - 0.3rem)' }"
           class="box-border shadow bg-white bg-opacity-80 rounded-[15px] flex flex-col justify-center items-center gap-6 inline-flex transform-origin: left">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="move">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>

      </div>
    </div>
  </div>


</template>
<script lang="js" setup>
import {reactive, onMounted, onUnmounted, watch, ref} from 'vue';
import NavigationView from '../components/NavigationView.vue';
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
import {usePopupMangerState} from "@/store/PopupMangerState";
import {initDeviceManage, sendData} from '@/api/index.js'
const PopupMangerState = usePopupMangerState()
const AppGlobal = useAppGlobal();
const DeviceManage = useDeviceManage();
// 使用 Vue3 的 reactive 函数来创建一个响应式对象，用于控制抽屉的显示状态
const isDrawerVisible = reactive({
  visible: true

});

// 定义一个函数，用于切换抽屉的显示状态
const toggleDrawer = () => {
  isDrawerVisible.visible = !isDrawerVisible.visible;
  AppGlobal.updateDrawerState(isDrawerVisible.visible)
}

// 定义一个函数，用于更新抽屉的显示状态，当窗口宽度小于等于600px时，抽屉会自动隐藏
const updateWindowSize = () => {
  if (window.innerWidth / window.innerHeight <= 1.5 || window.innerWidth <= 900) {
    isDrawerVisible.visible = false;

    AppGlobal.updateDrawerState(isDrawerVisible.visible)

  } else {
    isDrawerVisible.visible = true;

    AppGlobal.updateDrawerState(isDrawerVisible.visible)
  }
}
//0是手动
/* 全速补料V
 * 1. 补料速度
 * 2. 发酵时间-触发时间点
 */
/* 线性补料
 * 1. 补料速度
 * 2. 溶氧上限-到了上限开始补料
 * 3. 溶氧下限-到了下限开始停止补料
 */
/* 占空比补料-不做
 * 1. 补料速度
 * 2. 检测周期
 * 3. 补料量
 * 4. 溶氧
 */


const deviceWatchers = {};

DeviceManage.deviceList.forEach((item, index) => {
    if (item.nowData !== null) {
        const stopCurrentWatcher = watch(() => item.nowData.feed_flag, (newValue, oldValue) => {
            
            // 清除该设备的所有监听器
            if (deviceWatchers[index]) {
                deviceWatchers[index].forEach(unwatch => unwatch());
                deviceWatchers[index].length = 0;
            } else {
                deviceWatchers[index] = [];
            }
            
            switch (newValue) {
                case 1: {
                    let interval;
                    const checkFermentationTime = () => {
                        const now = new Date();
                        const timeDiff = now - new Date(item.start_time);
                        const hours = Math.floor(timeDiff / 3600000);
                        
                        if (hours >= item.recordFeedMode.FullSpeed.feedDate) {
                            const data = {
                                feed_pump_now_set_speed: item.recordFeedMode.FullSpeed.feedSpeed
                            };
                            item.nowData.feed_pump_now_set_speed = item.recordFeedMode.FullSpeed.feedSpeed;
                            sendData(index, data);
                        }
                    };
                    
                    checkFermentationTime();
                    interval = setInterval(checkFermentationTime, 60000);
                    
                    deviceWatchers[index].push(() => {
                        clearInterval(interval);
                    });
                    
                    break;
                }
                
                case 2: {
                    const timing_DO = item.nowData.timing_DO;
                    const unwatchOxygen = watch(() => timing_DO, (newValue) => {
                        if (newValue >= item.recordFeedMode.Line.DOTopLimit) {
                            const data = {
                                feed_pump_now_set_speed: item.recordFeedMode.Line.feedSpeed
                            };
                            item.nowData.feed_pump_now_set_speed = item.recordFeedMode.Line.feedSpeed;
                            sendData(index, data);
                        }
                        if (newValue <= item.recordFeedMode.Line.DOBottomLimit) {
                            const data = {
                                feed_pump_now_set_speed: 0
                            };
                            item.nowData.feed_pump_now_set_speed = 0;
                            sendData(index, data);
                        }
                    });
                    
                    deviceWatchers[index].push(unwatchOxygen);
                    break;
                }
                
                default:
                    break;
            }
        });
    }
});



// 在组件销毁时，确保停止所有监听器


// 使用 Vue3 的生命周期钩子函数 onMounted，在组件挂载完成后添加窗口大小变化的监听事件
onMounted(() => {
  // TODO 设备列表的Storage开关
  // const storedData = localStorage.getItem('deviceList');
  // const deviceList = storedData!=null ? JSON.parse(storedData) : [];
  // DeviceManage.updateDeviceList( deviceList);
  console.log('___________________')
  window.addEventListener('resize', updateWindowSize);
  updateWindowSize();
  window.Electron.ipcRenderer.invoke('init-db').then(
      (res) => {
        console.log(res);
      }
  );
  initDeviceManage();
//   循环
//   setInterval(() => {
//     sendData(0)
//   }, 5000)


});

// 使用 Vue3 的生命周期钩子函数 onUnmounted，在组件卸载之前移除窗口大小变化的监听事件
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);

});


</script>