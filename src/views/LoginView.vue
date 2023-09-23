<template>
  <!-- 整体样式 -->
  <div class="w-full h-screen rounded-[28px]  items-start inline-flex absolute z-10"
       style="background: linear-gradient(90deg, #C9D6FF 0%, #E9E4F0 100%), radial-gradient(85.89% 47.61% at 442.62% 78.80%, rgba(89.85, 125.68, 217.81, 0.50) 0%, rgba(81, 253, 211.72, 0) 100%); border-radius: 28px">

    <!-- 左侧样式 -->
    <div class="w-2/3 h-full relative rounded-3xl  items-center place-self-center pl-[0.3rem] pt-[0.3rem] pb-[0.3rem]">
      <!-- 左侧背景图片样式 -->
      <img class=" rounded-3xl bg-cover absolute	 shadow"
        :style="{ width: 'calc(100% - 0.3rem)', height: 'calc(100% - 0.6rem)' }"
        src="../assets/image/loginbackground.png" />

      <!-- 左侧文字内容样式 -->
      <div class="w-[99%] h-[99%] absolute left-[0.5%] top-[0.5%]   rounded-3xl">
        <!-- 左上侧logo+名称样式 -->
        <div class="h-[2vh]  justify-start items-center gap-1.5 inline-flex relative left-10 top-10">
          <img src="../assets/image/login-logo.png" class=" h-[1.25rem]   bg-cover ">
          <div class="text-white text-base font-medium leading-normal font-wz subpixel-antialiased text-1xl">
            中国生物</div>
        </div>
        <!-- 左下标题样式 -->
        <div class="h-[14vh] absolute bottom-10 left-10 gap-6  flex justify-center items-center  ">
          <div class=" h-full gap-1 flex flex-col justify-center items-left ">
            <div
              class="font-bt leading-normal text-white text-[2.3vw] subpixel-antialiased font-semibold tracking-wide  ">
              最趋于完美的生物发酵罐
            </div>
            <div class="w-[34vw] text-white text-wz font-normal text-[1.12vw] leading-normal subpixel-antialiased  ">
              中国生物是一家致力于生物发酵产业的公司，如果您有需要可以致电0532-223212获取进一步相关信息₍ᐢ..ᐢ₎♡</div>
          </div>
        </div>

      </div>
    </div>
    <!-- 右侧样式 -->
    <div class="w-1/3 h-full relative  flex-col justify-start items-start flex pl-[0.3rem] pt-[0.3rem] ">
      <!-- 右侧白底 -->
      <div :style="{ width: 'calc(100% - 0.3rem)', height: 'calc(100% - 0.3rem)' }"
        class=" box-border  shadow bg-white rounded-3xl   absoluteflex-col justify-center items-center gap-6 inline-flex">
        <!-- 图标 -->
        <div class="w-[92.5%]  absolute  top-[2%]  bg-black ">
          <div
            class="h-8 w-8 p-2 bg-[#F5F5F5] rounded-[2.5rem] right-[0%] justify-center items-center inline-flex  absolute">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                fill="#19161D" />
            </svg>
            <div />
          </div>
        </div>
        <!-- 登录成功悬浮栏样式 -->
        <div v-if="loginStatus === 'success'" class="rounded-md bg-green-50 p-4 absolute z-40 top-[10vh]">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">登录成功₍ᐢ..ᐢ₎♡</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button type="button"
                  class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">
                  <span class="sr-only">Dismiss</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" @click="close" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 登录失败悬浮栏样式 -->
        <div v-if="loginStatus === 'failure'" class="rounded-md bg-red-50 p-4 absolute z-40 top-[10vh]">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">登录失败๑ᵒᯅᵒ๑</h3>


            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button type="button"
                  class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">
                  <span class="sr-only">Dismiss</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" @click="close" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 核心功能框 -->
        <div class="flex flex-col justify-center items-start gap-6 w-[70%] mix-w">
          <!-- 文字展示区 -->
          <div class="self-stretch h-[58px] flex-col justify-start items-start flex ">
            <div class="self-stretch text-zinc-900 text-3xl font-medium leading-[3rem]">登录</div>
            <div class="self-stretch text-zinc-600 text-sm font-normal leading-tight tracking-tight">
              请输入您的账号与密码
            </div>
          </div>
          <!-- 账号密码区-->
          <div class="self-stretch h-[138px] flex-col justify-start items-start gap-3.5 flex">
            <!-- 账号输入框 -->
            <div class="self-stretch h-12 flex-col justify-start items-start flex">
              <div class="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
                <input v-model="param.username" placeholder="账号" name="account" type="text" autocomplete="account"
                  class="self-stretch h-12 px-3 py-1.5 bg-white rounded-lg border border-gray-200 justify-start items-center gap-2 inline-flex" />

              </div>
            </div>
            <!-- 密码输入框&忘记密码/记住密码功能 -->
            <div class="self-stretch h-[76px] flex-col justify-start items-start gap-2 flex">
              <div class="self-stretch h-12 flex-col justify-start items-start flex">
                <div class="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
                  <input v-model="param.password" name="password" type="password" autocomplete="current-password"
                    placeholder="密码"
                    class=" rounded-md shadow-sm  py-1.5 self-stretch h-12 px-3  bg-white border border-gray-200  gap-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " />
                </div>
              </div>

              <!-- 忘记密码/记住密码 -->
              <div class="self-stretch justify-between items-center gap-1 inline-flex">

                <div class="form-control justify-start items-start gap-1.5 flex">
                  <label class="label cursor-pointer flex justify-center items-center inline-flex gap-2">

                    <span class="text-zinc-900 text-sm font-normal  tracking-tight">记住密码</span>

                    <input type="checkbox" class="toggle toggle-sm " v-model="rememberPassword" checked />

                  </label>
                </div>
                <div class="justify-start items-center gap-1.5 flex">
                  <div class="tooltip" data-tip=" 请联系管理员或厂家找回">
                    <button
                      class="  text-center text-zinc-900 text-sm font-normal  tracking-tight">忘记密码</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <!-- 登录按钮 -->
          <div class="self-stretch h-12 px-4 py-3.5 bg-[#4EA67D] rounded-[40px] justify-center items-center gap-2
                    inline-flex hover:bg-[#83ba9b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:bg-[#83ba9b]" @click="submitForm">
            <div class="text-white text-sm font-normal leading-tight tracking-tight">登录</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
              <path d="M9.5 3L8.785 3.6965L12.575 7.5H2.5V8.5H12.575L8.785 12.2865L9.5 13L14.5 8L9.5 3Z" fill="white" />
            </svg>
          </div>
          <!-- 注册下划区 -->
          <div class="self-stretch justify-center items-center gap-2 inline-flex">
            <div class="grow shrink basis-0 h-px bg-neutral-200" />
            <div class="text-zinc-900 text-sm font-normal leading-tight tracking-tight">注册</div>
            <div class="grow shrink basis-0 h-px bg-neutral-200" />
          </div>
          <!-- 手机号按钮 -->
          <div
            class="self-stretch h-12 px-4 py-3.5 bg-white rounded-[40px] border border-gray-200 justify-center items-center gap-2 inline-flex">
            <div class="text-zinc-900 text-sm font-normal leading-tight tracking-tight">请联系管理员注册</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,onMounted } from 'vue';

import { useRouter } from 'vue-router';
import { CheckCircleIcon, XMarkIcon,XCircleIcon } from '@heroicons/vue/20/solid'
// import { UserLogin } from "../api/index";
interface LoginInfo {
  username: string;
  password: string;
}
// 这里定义了一个响应式的对象 param，它有两个属性 username 和 password，它们的默认值分别为 'admin' 和 '123123'。这个对象会在组件中被用于双向绑定和表单验证。
const router = useRouter();
const param = reactive<LoginInfo>({
  username: '',
  password: ''
});

const rememberPassword = ref(false);
onMounted(() => {
  const remember = localStorage.getItem('rememberPassword');
  rememberPassword.value = remember === 'true';
});

const submitForm = () => {
  if (param.username === 'root' && param.password === '123456') {
    loginStatus.value = 'success';
    localStorage.setItem('username', param.username);

    console.log(rememberPassword.value)
    if (rememberPassword.value) {
      // 只有当复选框被选中时，才保存密码
      console.log(rememberPassword.value)
      localStorage.setItem('password', param.password);
      localStorage.setItem('rememberPassword', JSON.stringify(rememberPassword.value));
    } else {
      localStorage.removeItem('password');
    }
    router.push({ name: "OverView" });
  }
  else{
    loginStatus.value = 'failure';
    param.password = '';
    // 登录失败后5秒后，loginStatus设置为空
    setTimeout(() => {
      loginStatus.value = '';
    }, 3000);
  }
  // UserLogin(param).then((res: any) => {
  //   loginStatus.value = 'success';
  //   localStorage.setItem('username', param.username);
  //
  //   console.log(rememberPassword.value)
  //   if (rememberPassword.value) {
  //     // 只有当复选框被选中时，才保存密码
  //     console.log(rememberPassword.value)
  //     localStorage.setItem('password', param.password);
  //     localStorage.setItem('rememberPassword', JSON.stringify(rememberPassword.value));
  //   } else {
  //     localStorage.removeItem('password');
  //   }
  //   router.push({ name: "dashboard" });
  //
  // }).catch((_error:any)=> {
  //   loginStatus.value = 'failure';
  //
  //   // 登录失败后5秒后，loginStatus设置为空
  //   setTimeout(() => {
  //     loginStatus.value = '';
  //   }, 3000);
  // });
}
// 当组件加载时，检查localStorage中是否有用户名和密码，如果有则自动填充
onMounted(() => {

  const remember = localStorage.getItem('rememberPassword');
  rememberPassword.value = remember ? JSON.parse(remember) : false;
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');


  if (remember && storedUsername && storedPassword) {
    // 只有当复选框被选中时，才自动填充密码
    param.username = storedUsername;
    param.password = storedPassword;
  }
});

// 关闭弹窗的函数
const close = () => {
  console.log(loginStatus.value);
  loginStatus.value = '';
}


// 记录登录状态
const loginStatus = ref('') // 登录状态，可以是 'success', 'failure', 或者 '' (空字符串)
</script>

<style ></style>