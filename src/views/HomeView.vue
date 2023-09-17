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
        @dblclick="toggleDrawer">
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
import {reactive, onMounted, onUnmounted} from 'vue';
import NavigationView from '../components/NavigationView.vue';
import {useDeviceManage} from '@/store/DeviceManage'

const DeviceManage = useDeviceManage();
import {useAppGlobal} from '@/store/AppGlobal'
import {usePopupMangerState} from "@/store/PopupMangerState";
const PopupMangerState = usePopupMangerState()
const AppGlobal = useAppGlobal();
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

const socketNet = () => {
  DeviceManage.deviceList.forEach((item, index) => {
    console.log(item.ip);
    console.log(item.port);
    const device = window.useAPI.connect(item.ip, item.port);


    // 连接成功，更新状态
    device.on('connect', () => {
      item.state = true;
      item.devicesocket = device;


    });
    // 连接断开，更新状态
    device.on('disconnect', () => {
      item.state = false;
    });
    // 连接断开，更新状态
    device.on('error', () => {
      item.state = false;
    });

    device.onReceive((data) => {

      console.log('Data from device 1:', data);
      DeviceManage.updateDeviceList(index, onDataReceived(data));


    });


    // 分包发送定时器
    setInterval(() => {
      //分包发送
      const currentDate = new Date();
      // 初始化数据
      const data = {
        /*PH控制部分变量*/
        timing_PH: 5.1,   //实时PH值
        acid_speed: 0.0,  //酸泵实时送料速率
        lye_speed: 0.0,   //碱泵实时送料速率
        target_PH: 0.0,   //设定目标PH
        acid_KP: 0.0,     //PID参数
        acid_KI: 0.0,     //PID参数
        acid_KD: 0.0,     //PID参数
        lye_KP: 0.0,      //PID参数
        lye_KI: 0.0,      //PID参数
        lye_KD: 0.0,      //PID参数
        acid_ml: 0.0,     //酸泵目前送料量
        lye_ml: 0.0,      //碱泵目前送料量
        acid_handle_speed_set: 0.0,   //酸泵手动送料速率设置
        lye_handle_speed_set: 0.0,    //碱泵手动送料速率设置
        PH_flag: 0,       //PH控制开启/停止标志位
        Ph_auto_handle: 0,            //PH控制自动/手动控制标志位

        /*温控部分变量*/
        timing_temp: 0.0,             //实时温度值
        heatpower: 0.0,               //加热毯实时功率
        target_temp: 0.0,             //设定目标温度值
        Temp_KP: 0.0,                 //温控KP
        Temp_KI: 0.0,                 //温控KI
        Temp_KD: 0.0,                 //温控KD
        water_flag: 0,                //冷凝水通断标志位
        temp_flag: 0,                 //温控开启/停止标志位
        cool_water_autoflag: 0,       //冷凝水通断控制自动/手动标志位

        /*氧含量控制部分变量*/
        timing_DO: 0.0,               //实时DO值
        oxy_ratio: 0.0,               //氧气通度
        target_DO: 0.0,               //设定目标DO值
        target_oxy_ratio: 0.0,        //手动设定氧气通度
        DO_KP: 0.0,                   //氧含量KP
        DO_KI: 0.0,                   //氧含量KI
        DO_KD: 0.0,                   //氧含量KD
        DO_flag: 0,                   //氧含量控制开启标志位
        target_motor_speed: 0,        //手动设定电机转速
        timing_motor_speed: 0,        //电机实时转速
        motor_speed_l_limit: 0,       //电机转速下限
        motor_speed_u_limit: 0,       //电机转速上限
        motor_speed_autoflag: 0,      //转速关联氧含量开启/关闭标志位
        oxy_flag: 0,                  //通氧关联氧含量开启/关闭标志位

        /*消泡控制部分*/
        clean_speed: 0.0,             //消泡泵设定送料速率
        clean_ml: 0.0,                //消泡泵目前送料量
        clean_single_time: 0.0,       //消泡单次泵入时间
        clean_flag: 0,                //消泡开启/停止标志位

        /*补料控制部分*/
        feed_speed: 0.0,              //补料泵设定补料速率
        feed_ml: 0.0,                 //补料泵目前补料量
        feed_DO_cu_limit: 0.0,        //补料关联氧含量上限值
        feed_DO_cl_limit: 0.0,        //补料关联氧含量下限值
        feed_DO_connect_flag: 0,      //补料关联氧含量标志位
        feed_flag: 1,                 //补料开启/停止标志位
        feed_motor_connect_flag: 0,   //补料关联转速标志位
        feed_DO_motor_connect_flag: 0,//补料双关联转速、氧含量标志位
        feed_motor_flag: 1,           //补料泵开启标志位
        feed_motor_cu_limit: 0,       //补料关联转速上限值
        feed_motor_cl_limit: 0,       //补料关联转速下限值

        /*系统控制变量*/
        start_flag: 0,                //发酵开始标志位
        year: currentDate.getFullYear(),   //年
        mounth: currentDate.getMonth() + 1, //月 (注意: getMonth() 返回的月份是从0开始的，所以需要+1)
        day: currentDate.getDate(),        //日
        hour: currentDate.getHours(),      //时
        minute: currentDate.getMinutes(),  //分
        second: currentDate.getSeconds(),  //秒
        communicate_flag: 0,           //通讯开始标志
        decive_id: ""                   //罐号ID
      };

// 将对象的键拆分成每6个一组的数组
      const chunks = Object.keys(data).reduce((result, key, index) => {
        if (index % 6 === 0) result.push([]);
        result[Math.floor(index / 6)].push(key);
        return result;
      }, []);

      let chunkIndex = 0;

      const sendDataChunk = () => {
        if (chunkIndex < chunks.length) {
          const chunkData = {};
          chunks[chunkIndex].forEach(key => {
            chunkData[key] = data[key];
          });

          // 发送当前分组的数据
          device.send(JSON.stringify(chunkData));

          chunkIndex++;
        } else {
          clearInterval(intervalId);  // 当所有分组都已发送时，清除间隔
        }
      };

      const intervalId = setInterval(sendDataChunk, 500);
    }, 10000);

  });


}
// 拼合接受数据
let dataCache = "";

function onDataReceived(data) {
  // 添加到缓存
  dataCache += data;

  // 检查数据完整性
  while (dataCache.includes("{") && dataCache.includes("}")) {
    const startIndex = dataCache.indexOf("{");
    const endIndex = dataCache.lastIndexOf("}") + 1;

    // 提取完整的数据包
    const completeData = dataCache.substring(startIndex, endIndex);
    console.log(completeData)
    // 清除已经处理的数据
    dataCache = dataCache.substring(endIndex);

    // 解析数据
    try {
      const jsonData = JSON.parse(completeData);
      // TODO: 使用jsonData
      return jsonData
    } catch (error) {
      console.error("JSON解析错误", error);
      // TODO: 错误处理
      return -1
    }
  }
  return -2
}



// 使用 Vue3 的生命周期钩子函数 onMounted，在组件挂载完成后添加窗口大小变化的监听事件
onMounted(() => {
  window.addEventListener('resize', updateWindowSize);
  updateWindowSize();
  window.Electron.ipcRenderer.invoke('init-db').then(
      (res) => {
        console.log(res);
      }
  );
  // socketNet();


});

// 使用 Vue3 的生命周期钩子函数 onUnmounted，在组件卸载之前移除窗口大小变化的监听事件
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});


</script>