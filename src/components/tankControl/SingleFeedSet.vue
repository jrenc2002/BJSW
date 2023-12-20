<template>
  <div class="h-[92vh] w-[82vw] overflow-auto relative transition-all duration-300 ease-in-out shadow bg-white rounded-2xl border-2  border-[#4EA67D] flex justify-start items-center">
    <!-- 关闭按钮 -->
    <div class="bg-[#F5F5F5] z-10 absolute right-3 top-3 top-0 w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer"
         @click="closePop">
      <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
              fill="#19161D"/>
      </svg>
    </div>
    <!-- 左侧栏 -->
    <div class="relative w-[26rem]   h-[calc(100%-1rem)]   m-2  flex-col flex justify-start items-center">

      <!--开关选择-->
      <div class="relative  shadow  h-[26rem] overflow-auto  m-2 rounded-2xl flex-col flex justify-start items-center">
        <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">补料总开关

          <Switch v-model="enabled"
                  :class="[enabled ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex ml-2 h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
            <span class="sr-only">Use setting</span>
            <span :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
                  aria-hidden="true"/>
          </Switch>
        </div>
        <!--手动开关-->
        <div class="w-[90%] h-16 mt-2  rounded-xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
          <!--左边部分-->
          <div class="w-[60%]  h-full flex  justify-center items-start m-3">
            <div class="h-full gap-10  flex justify-center items-center">
              手动补料
              <Switch v-model="enabled"
                      :class="[enabled ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                <span class="sr-only">Use setting</span>
                <span :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
                      aria-hidden="true"/>
              </Switch>
            </div>

          </div>
          <!--右边部分-->
          <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
            <div class="h-full flex justify-center items-center  pr-2">

              <div class="bg-[#83BA9B] w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                   @click="postFeedSet(3)">
                <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path id="Vector"
                        d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                        fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!--触发补料-->
        <div class="w-[90%] h-[8rem] mt-2  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
          <!--左边部分-->
          <div class="w-[30%]  h-full flex-col justify-center items-start ml-5">
            <div class="h-1/2  flex justify-center items-center mt-2">
              触发补料
            </div>
            <div class="h-1/2 flex justify-center items-center ">
              <div class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                   @click="postFeedSet(3)">
                <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path id="Vector"
                        d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                        fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          <!--中间部分-->
          <div class="w-[30%]  h-full flex-col flex justify-center items-center m-3">

            <div class="    w-32 origin-top-right divide-y divide-gray-100  bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none">

              <div class="py-1">

                <div :class="[contentSet.chance==1 ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-1 text-sm cursor-pointer']">
                  <BeakerIcon aria-hidden="true"
                              class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                  <span class="mr-3 h-5 w-7 ">
                                        溶氧
                                    </span>
                  <span class="cursor-pointer ">
                                        <kbd class="kbd kbd-sm ">或</kbd>
                                    </span>
                </div>


              </div>
              <div class="py-1">

                <div :class="[contentSet.chance==1 ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-1 text-sm cursor-pointer']">
                  <EyeDropperIcon aria-hidden="true"
                                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                  <span class="mr-3 h-5 w-7 ">
                                        PH
                                    </span>
                  <span class="cursor-pointer ">
                                        <kbd class="kbd kbd-sm ">或</kbd>
                                    </span>
                </div>

              </div>
              <div class="py-1">

                <div :class="[contentSet.chance==1 ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-1 text-sm cursor-pointer']">
                  <ArrowPathIcon aria-hidden="true"
                                 class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                  <span class="mr-3 h-5 w-7 ">
                                        转速
                                    </span>
                  <span class="cursor-pointer ">
                                        <kbd class="kbd kbd-sm ">或</kbd>
                                    </span>
                </div>

              </div>
            </div>
          </div>
          <!--右边部分-->
          <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
            <div class="h-1/2  flex  justify-center items-center">

              <input id="name" v-model="contentSet.DutyFeed.feed_speed"
                     class="block w-[80%]  h-[50%] border-b-2 m-2" name="name"
                     placeholder="触发上限" required
                     type="number"/>

            </div>
            <div class="h-1/2  flex justify-center items-center">

              <input id="name" v-model="contentSet.DutyFeed.detection_cycle"
                     class="block w-[80%] h-[50%]  border-b-2  m-2 " name="name"
                     placeholder="触发下限" required
                     type="number"/>

            </div>
          </div>

        </div>
        <!--关联补料-->
        <div class="w-[90%] h-[8rem] mt-2  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
          <!--左边部分-->
          <div class="w-[30%]  h-full flex-col justify-center items-start ml-5">
            <div class="h-1/2  flex justify-center items-center mt-2">
              关联补料
            </div>
            <div class="h-1/2 flex justify-center items-center ">
              <div class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                   @click="postFeedSet(3)">
                <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path id="Vector"
                        d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                        fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          <!--中间部分-->
          <div class="w-[30%]  h-full flex-col flex justify-center items-center m-3">

            <div class="    w-32 origin-top-right divide-y divide-gray-100  bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none">

              <div class="py-1">

                <div :class="[contentSet.chance==1 ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-1 text-sm cursor-pointer']">
                  <BeakerIcon aria-hidden="true"
                              class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                  <span class="mr-3 h-5 w-7 ">
                                        溶氧
                                    </span>
                  <span class="cursor-pointer ">
                                        <kbd class="kbd kbd-sm ">或</kbd>
                                    </span>
                </div>


              </div>
              <div class="py-1">

                <div :class="[contentSet.chance==0 ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-1 text-sm cursor-pointer']">
                  <EyeDropperIcon aria-hidden="true"
                                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 "/>
                  <span class="mr-3 h-5 w-7 ">
                                        PH
                                    </span>
                  <span class="cursor-pointer ">
                                        <kbd class="kbd kbd-sm ">或</kbd>
                                    </span>
                </div>

              </div>
              <div class="py-1">

                <div :class="[contentSet.chance==1 ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-1 text-sm cursor-pointer']">
                  <ArrowPathIcon aria-hidden="true"
                                 class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                  <span class="mr-3 h-5 w-7 ">
                                        转速
                                    </span>
                  <span class="cursor-pointer ">
                                        <kbd class="kbd kbd-sm ">或</kbd>
                                    </span>
                </div>

              </div>
            </div>
          </div>
          <!--右边部分-->
          <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
            <div class="h-1/2  flex  justify-center items-center">

              <input id="name" v-model="contentSet.DutyFeed.feed_speed"
                     class="block w-[80%]  h-[50%] border-b-2 m-2" name="name"
                     placeholder="关联上限" required
                     type="number"/>

            </div>
            <div class="h-1/2  flex justify-center items-center">

              <input id="name" v-model="contentSet.DutyFeed.detection_cycle"
                     class="block w-[80%] h-[50%]  border-b-2  m-2 " name="name"
                     placeholder="关联下限" required
                     type="number"/>

            </div>
          </div>

        </div>


      </div>
      <!--补料方式-->
      <div class="relative  shadow  h-[22rem] overflow-auto  mb-2 rounded-2xl flex-col flex justify-start items-center">
        <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">补料方式</div>
        <!--持续补料-->
        <div class="w-[90%] h-20 mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
          <!--左边部分-->
          <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
            <div class="h-full  flex justify-center items-center">
              持续补料
            </div>

          </div>
          <!--右边部分-->
          <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
            <div class="h-full flex justify-center items-center ">
              <div class="bg-[#83BA9B] w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                   @click="postFeedSet(1)">
                <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path id="Vector"
                        d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                        fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!--占空比补料-->
        <div class="w-[90%] h-[10rem] mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
          <!--左边部分-->
          <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
            <div class="h-1/2  flex justify-center items-center mt-2">
              占空比补料
            </div>
            <div class="h-1/2 flex justify-center items-center ">
              <div class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                   @click="postFeedSet(3)">
                <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path id="Vector"
                        d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                        fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          <!--右边部分-->
          <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
            <div class="h-1/4  flex  ">
              <div class="w-24 justify-start items-center flex">
                补料速度
              </div>
              <input id="name" v-model="contentSet.DutyFeed.feed_speed"
                     class="block w-[80%]  border-b-2 m-2" name="name" placeholder="请填补料速度"
                     required type="number"/>

            </div>
            <div class="h-1/4  flex ">
              <div class="w-24 justify-start items-center flex">
                检测周期
              </div>
              <input id="name" v-model="contentSet.DutyFeed.detection_cycle"
                     class="block w-[80%]  border-b-2  m-2" name="name" placeholder="请填检测周期"
                     required type="number"/>

            </div>
            <div class="h-1/4  flex ">
              <div class="w-24 justify-start items-center flex">
                补料量
              </div>
              <input id="name" v-model="contentSet.DutyFeed.feed_amount"
                     class="block w-[80%]  border-b-2  m-2" name="name" placeholder="请填补料量"
                     required type="number"/>

            </div>
            <div class="h-1/4  flex ">
              <div class="w-24 justify-start items-center flex">
                溶氧触发
              </div>
              <input id="name" v-model="contentSet.DutyFeed.oxygen_trigger"
                     class="block w-[80%]  border-b-2  m-2" name="name" placeholder="请填溶氧值"
                     required type="number"/>

            </div>
          </div>
        </div>


      </div>
    </div>
    <!-- 中间栏 -->
    <div class="relative w-[26rem]   h-[calc(100%-1rem)]   m-2  flex-col flex justify-start items-center">
      <!--补料方式-->
      <div class="relative  shadow  h-[100%] overflow-auto  m-2 rounded-2xl flex-col flex justify-start items-center">
        <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">补料方式</div>
        <div class="h-[calc(100%-3.5rem)]  justify-start items-center flex-col flex">
          <!--单次补料-->
          <div class="w-[90%] h-[10rem] mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
            <!--左边部分-->
            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
              <div class="h-1/2  flex justify-center items-center mt-2">
                单次补料
              </div>
              <div class="h-1/2 flex justify-center items-center ">
                <div class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                     @click="postFeedSet(3)">
                  <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector"
                          d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                          fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
            <!--右边部分-->
            <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
              <div class="h-1/3  flex  ">
                <div class="w-24 justify-start items-center flex">
                  补料量
                </div>
                <input id="name" v-model="contentSet.DutyFeed.feed_speed"
                       class="block w-[80%]  border-b-2 m-2"
                       name="name" placeholder="请填补料量" required
                       type="number"/>

              </div>
              <div class="h-1/3  flex ">
                <div class="w-24 justify-start items-center flex">
                  关联周期
                </div>
                <input id="name" v-model="contentSet.DutyFeed.detection_cycle"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填关联周期" required
                       type="number"/>

              </div>
              <div class="h-1/3  flex ">
                <div class="w-24 justify-start items-center flex">
                  补料速度
                </div>
                <input id="name" v-model="contentSet.DutyFeed.feed_amount"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填补料速度" required
                       type="number"/>

              </div>
            </div>
          </div>
          <!--恒速补料-->
          <div class="w-[90%] h-[10rem] mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
            <!--左边部分-->
            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
              <div class="h-1/2  flex justify-center items-center mt-2">
                恒速补料
              </div>
              <div class="h-1/2 flex justify-center items-center ">
                <div class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                     @click="postFeedSet(3)">
                  <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector"
                          d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                          fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
            <!--右边部分-->
            <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
              <div class="h-full  flex  justify-center items-center ">
                <div class="w-24 justify-start items-center flex">
                  补料速度
                </div>
                <input id="name" v-model="contentSet.DutyFeed.feed_speed"
                       class="block w-[80%]  border-b-2 m-2 h-8" name="name"
                       placeholder="请填补料速度" required
                       type="number"/>

              </div>

            </div>
          </div>
          <!--分段补料-->
          <div class="w-[90%] h-[10rem] mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
            <!--左边部分-->
            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
              <div class="h-1/2  flex justify-center items-center mt-2">
                分段补料
              </div>
              <div class="h-1/2 flex justify-center items-center ">
                <div class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                     @click="postFeedSet(3)">
                  <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector"
                          d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                          fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
            <!--右边部分-->
            <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
              <div class="h-full  flex  ">
                <div class="w-full justify-start items-center flex">

                  <kbd class="kbd kbd-md">选择分段补料前请确保已完成顺控设置。</kbd>
                </div>

              </div>

            </div>
          </div>
          <!--线性补料-->
          <div class="w-[90%] h-[17rem] mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
            <!--左边部分-->
            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
              <div class="h-1/2  flex justify-center items-center mt-2 flex-col">
                线性补料
                <div class="w-24">
                  <input type="text" placeholder="补料速度" class="input input-bordered w-full max-w-xs m-1 " disabled />
                </div>
              </div>
              <div class="h-1/2 flex justify-center items-center ">
                <div class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                     @click="postFeedSet(3)">
                  <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector"
                          d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                          fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
            <!--右边部分-->
            <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
              <div class="mt-2 h-10  flex justify-center items-center">
                <kbd class="kbd kbd-md">
                  <svg aria-hidden="true" height="2.262ex" style=""
                       viewBox="0 -750 9505.6 1000" width="21.506ex"
                       xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                      <path id="MJX-24-TEX-I-1D439"
                            d="M48 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H742Q749 676 749 669Q749 664 736 557T722 447Q720 440 702 440H690Q683 445 683 453Q683 454 686 477T689 530Q689 560 682 579T663 610T626 626T575 633T503 634H480Q398 633 393 631Q388 629 386 623Q385 622 352 492L320 363H375Q378 363 398 363T426 364T448 367T472 374T489 386Q502 398 511 419T524 457T529 475Q532 480 548 480H560Q567 475 567 470Q567 467 536 339T502 207Q500 200 482 200H470Q463 206 463 212Q463 215 468 234T473 274Q473 303 453 310T364 317H309L277 190Q245 66 245 60Q245 46 334 46H359Q365 40 365 39T363 19Q359 6 353 0H336Q295 2 185 2Q120 2 86 2T48 1Z"></path>
                      <path id="MJX-24-TEX-N-28"
                            d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path>
                      <path id="MJX-24-TEX-I-1D461"
                            d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path>
                      <path id="MJX-24-TEX-N-29"
                            d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path>
                      <path id="MJX-24-TEX-N-3D"
                            d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path>
                      <path id="MJX-24-TEX-I-1D43E"
                            d="M285 628Q285 635 228 637Q205 637 198 638T191 647Q191 649 193 661Q199 681 203 682Q205 683 214 683H219Q260 681 355 681Q389 681 418 681T463 682T483 682Q500 682 500 674Q500 669 497 660Q496 658 496 654T495 648T493 644T490 641T486 639T479 638T470 637T456 637Q416 636 405 634T387 623L306 305Q307 305 490 449T678 597Q692 611 692 620Q692 635 667 637Q651 637 651 648Q651 650 654 662T659 677Q662 682 676 682Q680 682 711 681T791 680Q814 680 839 681T869 682Q889 682 889 672Q889 650 881 642Q878 637 862 637Q787 632 726 586Q710 576 656 534T556 455L509 418L518 396Q527 374 546 329T581 244Q656 67 661 61Q663 59 666 57Q680 47 717 46H738Q744 38 744 37T741 19Q737 6 731 0H720Q680 3 625 3Q503 3 488 0H478Q472 6 472 9T474 27Q478 40 480 43T491 46H494Q544 46 544 71Q544 75 517 141T485 216L427 354L359 301L291 248L268 155Q245 63 245 58Q245 51 253 49T303 46H334Q340 37 340 35Q340 19 333 5Q328 0 317 0Q314 0 280 1T180 2Q118 2 85 2T49 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q147 65 216 339T285 628Z"></path>
                      <path id="MJX-24-TEX-N-2212"
                            d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"></path>
                      <path id="MJX-24-TEX-N-30"
                            d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path>
                      <path id="MJX-24-TEX-N-2B"
                            d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z"></path>
                    </defs>
                    <g fill="currentColor" stroke="currentColor" stroke-width="0"
                       transform="matrix(1 0 0 -1 0 0)">
                      <g data-mml-node="math">
                        <g data-mml-node="mi">
                          <use xlink:href="#MJX-24-TEX-I-1D439"></use>
                        </g>
                        <g data-mml-node="mo" transform="translate(749, 0)">
                          <use xlink:href="#MJX-24-TEX-N-28"></use>
                        </g>
                        <g data-mml-node="mi" transform="translate(1138, 0)">
                          <use xlink:href="#MJX-24-TEX-I-1D461"></use>
                        </g>
                        <g data-mml-node="mo" transform="translate(1499, 0)">
                          <use xlink:href="#MJX-24-TEX-N-29"></use>
                        </g>
                        <g data-mml-node="mo" transform="translate(2165.8, 0)">
                          <use xlink:href="#MJX-24-TEX-N-3D"></use>
                        </g>
                        <g data-mml-node="mi" transform="translate(3221.6, 0)">
                          <use xlink:href="#MJX-24-TEX-I-1D43E"></use>
                        </g>
                        <g data-mml-node="mo" transform="translate(4110.6, 0)">
                          <use xlink:href="#MJX-24-TEX-N-28"></use>
                        </g>
                        <g data-mml-node="mi" transform="translate(4499.6, 0)">
                          <use xlink:href="#MJX-24-TEX-I-1D461"></use>
                        </g>
                        <g data-mml-node="mo" transform="translate(5082.8, 0)">
                          <use xlink:href="#MJX-24-TEX-N-2212"></use>
                        </g>
                        <g data-mml-node="msub" transform="translate(6083, 0)">
                          <g data-mml-node="mi">
                            <use xlink:href="#MJX-24-TEX-I-1D461"></use>
                          </g>
                          <g data-mml-node="mn" transform="translate(361, -150) scale(0.707)">
                            <use xlink:href="#MJX-24-TEX-N-30"></use>
                          </g>
                        </g>
                        <g data-mml-node="mo" transform="translate(6847.6, 0)">
                          <use xlink:href="#MJX-24-TEX-N-29"></use>
                        </g>
                        <g data-mml-node="mo" transform="translate(7458.8, 0)">
                          <use xlink:href="#MJX-24-TEX-N-2B"></use>
                        </g>
                        <g data-mml-node="msub" transform="translate(8459, 0)">
                          <g data-mml-node="mi">
                            <use xlink:href="#MJX-24-TEX-I-1D439"></use>
                          </g>
                          <g data-mml-node="mn" transform="translate(643, -150) scale(0.707)">
                            <use xlink:href="#MJX-24-TEX-N-30"></use>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </kbd>

              </div>
              <div class="h-10  flex justify-center items-center mt-1 ">
                <div class="w-24 justify-start items-center flex">

                  <kbd class="kbd kbd-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.73ex" height="1.791ex" viewBox="0 -626 764.6 791.6" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-44-TEX-I-1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path><path id="MJX-44-TEX-N-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><use xlink:href="#MJX-44-TEX-I-1D461"></use></g><g data-mml-node="mn" transform="translate(361, -150) scale(0.707)"><use xlink:href="#MJX-44-TEX-N-30"></use></g></g></g></g></svg>
                  </kbd>
                </div>
                <input id="name" v-model="contentSet.DutyFeed.feed_speed"
                       class="block w-[80%]  border-b-2 m-2" name="name"
                       placeholder="请填补料速度" required
                       type="number"/>

              </div>
              <div class="h-10  flex justify-center items-center mt-1">
                <div class="w-24 justify-start items-center flex">
                  <kbd class="kbd kbd-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.368ex" height="1.913ex" viewBox="0 -680 1046.6 845.6" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-52-TEX-I-1D439" d="M48 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H742Q749 676 749 669Q749 664 736 557T722 447Q720 440 702 440H690Q683 445 683 453Q683 454 686 477T689 530Q689 560 682 579T663 610T626 626T575 633T503 634H480Q398 633 393 631Q388 629 386 623Q385 622 352 492L320 363H375Q378 363 398 363T426 364T448 367T472 374T489 386Q502 398 511 419T524 457T529 475Q532 480 548 480H560Q567 475 567 470Q567 467 536 339T502 207Q500 200 482 200H470Q463 206 463 212Q463 215 468 234T473 274Q473 303 453 310T364 317H309L277 190Q245 66 245 60Q245 46 334 46H359Q365 40 365 39T363 19Q359 6 353 0H336Q295 2 185 2Q120 2 86 2T48 1Z"></path><path id="MJX-52-TEX-N-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><use xlink:href="#MJX-52-TEX-I-1D439"></use></g><g data-mml-node="mn" transform="translate(643, -150) scale(0.707)"><use xlink:href="#MJX-52-TEX-N-30"></use></g></g></g></g></svg>
                  </kbd>
                </div>
                <input id="name" v-model="contentSet.DutyFeed.detection_cycle"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填检测周期" required
                       type="number"/>

              </div>
              <div class="h-10  flex justify-center items-center mt-1">
                <div class="w-24 justify-start items-center flex">
                  <kbd class="kbd kbd-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.011ex" height="1.545ex" viewBox="0 -683 889 683" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-54-TEX-I-1D43E" d="M285 628Q285 635 228 637Q205 637 198 638T191 647Q191 649 193 661Q199 681 203 682Q205 683 214 683H219Q260 681 355 681Q389 681 418 681T463 682T483 682Q500 682 500 674Q500 669 497 660Q496 658 496 654T495 648T493 644T490 641T486 639T479 638T470 637T456 637Q416 636 405 634T387 623L306 305Q307 305 490 449T678 597Q692 611 692 620Q692 635 667 637Q651 637 651 648Q651 650 654 662T659 677Q662 682 676 682Q680 682 711 681T791 680Q814 680 839 681T869 682Q889 682 889 672Q889 650 881 642Q878 637 862 637Q787 632 726 586Q710 576 656 534T556 455L509 418L518 396Q527 374 546 329T581 244Q656 67 661 61Q663 59 666 57Q680 47 717 46H738Q744 38 744 37T741 19Q737 6 731 0H720Q680 3 625 3Q503 3 488 0H478Q472 6 472 9T474 27Q478 40 480 43T491 46H494Q544 46 544 71Q544 75 517 141T485 216L427 354L359 301L291 248L268 155Q245 63 245 58Q245 51 253 49T303 46H334Q340 37 340 35Q340 19 333 5Q328 0 317 0Q314 0 280 1T180 2Q118 2 85 2T49 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q147 65 216 339T285 628Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="mi"><use xlink:href="#MJX-54-TEX-I-1D43E"></use></g></g></g></svg>
                  </kbd>
                </div>
                <input id="name" v-model="contentSet.DutyFeed.feed_amount"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填补料量" required
                       type="number"/>

              </div>
              <div class="h-10  flex justify-center items-center mt-1">
                <div class="w-24 justify-start items-center flex">
                  速度上限
                </div>
                <input id="name" v-model="contentSet.DutyFeed.oxygen_trigger"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填溶氧值" required
                       type="number"/>

              </div>
              <div class="h-10  flex justify-center items-center mt-1">
                <div class="w-24 justify-start items-center flex">
                  速度上限
                </div>
                <input id="name" v-model="contentSet.DutyFeed.oxygen_trigger"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填溶氧值" required
                       type="number"/>

              </div>
            </div>
          </div>
          <!--指数补料-->
          <div class="w-[90%] h-[17rem] mt-4  rounded-2xl flex justify-start items-center border border-[#D6D6D6] hover:border-[#4EA67D]">
            <!--左边部分-->
            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
              <div class="h-1/2  flex justify-center items-center mt-2 flex-col">
                指数补料
                <div class="w-24">
                  <input type="text" placeholder="补料速度" class="input input-bordered w-full max-w-xs m-1 " disabled />
                </div>
              </div>
              <div class="h-1/2 flex justify-center items-center ">
                <div class="bg-[#83BA9B] w-16 h-7 mb-4 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800 "
                     @click="postFeedSet(3)">
                  <svg fill="none" height="13" viewBox="0 0 16 13" width="16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector"
                          d="M6 12.5L0 5.92025L0.942667 4.8865L6 10.4318L15.0573 0.5L16 1.53375L6 12.5Z"
                          fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
            <!--右边部分-->
            <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
              <div class="mt-2 h-10  flex justify-center items-center">
                <kbd class="kbd kbd-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18.108ex" height="2.7ex" viewBox="0 -943.3 8003.7 1193.3" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-184-TEX-I-1D439" d="M48 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H742Q749 676 749 669Q749 664 736 557T722 447Q720 440 702 440H690Q683 445 683 453Q683 454 686 477T689 530Q689 560 682 579T663 610T626 626T575 633T503 634H480Q398 633 393 631Q388 629 386 623Q385 622 352 492L320 363H375Q378 363 398 363T426 364T448 367T472 374T489 386Q502 398 511 419T524 457T529 475Q532 480 548 480H560Q567 475 567 470Q567 467 536 339T502 207Q500 200 482 200H470Q463 206 463 212Q463 215 468 234T473 274Q473 303 453 310T364 317H309L277 190Q245 66 245 60Q245 46 334 46H359Q365 40 365 39T363 19Q359 6 353 0H336Q295 2 185 2Q120 2 86 2T48 1Z"></path><path id="MJX-184-TEX-N-28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path><path id="MJX-184-TEX-I-1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path><path id="MJX-184-TEX-N-29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path><path id="MJX-184-TEX-N-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path id="MJX-184-TEX-N-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path><path id="MJX-184-TEX-N-22C5" d="M78 250Q78 274 95 292T138 310Q162 310 180 294T199 251Q199 226 182 208T139 190T96 207T78 250Z"></path><path id="MJX-184-TEX-I-1D452" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path><path id="MJX-184-TEX-I-1D462" d="M21 287Q21 295 30 318T55 370T99 420T158 442Q204 442 227 417T250 358Q250 340 216 246T182 105Q182 62 196 45T238 27T291 44T328 78L339 95Q341 99 377 247Q407 367 413 387T427 416Q444 431 463 431Q480 431 488 421T496 402L420 84Q419 79 419 68Q419 43 426 35T447 26Q469 29 482 57T512 145Q514 153 532 153Q551 153 551 144Q550 139 549 130T540 98T523 55T498 17T462 -8Q454 -10 438 -10Q372 -10 347 46Q345 45 336 36T318 21T296 6T267 -6T233 -11Q189 -11 155 7Q103 38 103 113Q103 170 138 262T173 379Q173 380 173 381Q173 390 173 393T169 400T158 404H154Q131 404 112 385T82 344T65 302T57 280Q55 278 41 278H27Q21 284 21 287Z"></path><path id="MJX-184-TEX-N-2212" d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="mi"><use xlink:href="#MJX-184-TEX-I-1D439"></use></g><g data-mml-node="mo" transform="translate(749, 0)"><use xlink:href="#MJX-184-TEX-N-28"></use></g><g data-mml-node="mi" transform="translate(1138, 0)"><use xlink:href="#MJX-184-TEX-I-1D461"></use></g><g data-mml-node="mo" transform="translate(1499, 0)"><use xlink:href="#MJX-184-TEX-N-29"></use></g><g data-mml-node="mo" transform="translate(2165.8, 0)"><use xlink:href="#MJX-184-TEX-N-3D"></use></g><g data-mml-node="msub" transform="translate(3221.6, 0)"><g data-mml-node="mi"><use xlink:href="#MJX-184-TEX-I-1D439"></use></g><g data-mml-node="mn" transform="translate(643, -150) scale(0.707)"><use xlink:href="#MJX-184-TEX-N-30"></use></g></g><g data-mml-node="mo" transform="translate(4490.3, 0)"><use xlink:href="#MJX-184-TEX-N-22C5"></use></g><g data-mml-node="msup" transform="translate(4990.6, 0)"><g data-mml-node="mi"><use xlink:href="#MJX-184-TEX-I-1D452"></use></g><g data-mml-node="TeXAtom" transform="translate(466, 413) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><use xlink:href="#MJX-184-TEX-I-1D462"></use></g><g data-mml-node="mo" transform="translate(572, 0)"><use xlink:href="#MJX-184-TEX-N-22C5"></use></g><g data-mml-node="mo" transform="translate(850, 0)"><use xlink:href="#MJX-184-TEX-N-28"></use></g><g data-mml-node="mi" transform="translate(1239, 0)"><use xlink:href="#MJX-184-TEX-I-1D461"></use></g><g data-mml-node="mo" transform="translate(1600, 0)"><use xlink:href="#MJX-184-TEX-N-2212"></use></g><g data-mml-node="msub" transform="translate(2378, 0)"><g data-mml-node="mi"><use xlink:href="#MJX-184-TEX-I-1D461"></use></g><g data-mml-node="mn" transform="translate(361, -150) scale(0.707)"><use xlink:href="#MJX-184-TEX-N-30"></use></g></g><g data-mml-node="mo" transform="translate(3142.6, 0)"><use xlink:href="#MJX-184-TEX-N-29"></use></g></g></g></g></g></svg>
                </kbd>

              </div>
              <div class="h-10  flex justify-center items-center mt-1 ">
                <div class="w-24 justify-start items-center flex">

                  <kbd class="kbd kbd-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.368ex" height="1.913ex" viewBox="0 -680 1046.6 845.6" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-188-TEX-I-1D439" d="M48 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H742Q749 676 749 669Q749 664 736 557T722 447Q720 440 702 440H690Q683 445 683 453Q683 454 686 477T689 530Q689 560 682 579T663 610T626 626T575 633T503 634H480Q398 633 393 631Q388 629 386 623Q385 622 352 492L320 363H375Q378 363 398 363T426 364T448 367T472 374T489 386Q502 398 511 419T524 457T529 475Q532 480 548 480H560Q567 475 567 470Q567 467 536 339T502 207Q500 200 482 200H470Q463 206 463 212Q463 215 468 234T473 274Q473 303 453 310T364 317H309L277 190Q245 66 245 60Q245 46 334 46H359Q365 40 365 39T363 19Q359 6 353 0H336Q295 2 185 2Q120 2 86 2T48 1Z"></path><path id="MJX-188-TEX-N-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><use xlink:href="#MJX-188-TEX-I-1D439"></use></g><g data-mml-node="mn" transform="translate(643, -150) scale(0.707)"><use xlink:href="#MJX-188-TEX-N-30"></use></g></g></g></g></svg>                 </kbd>
                </div>
                <input id="name" v-model="contentSet.DutyFeed.feed_speed"
                       class="block w-[80%]  border-b-2 m-2" name="name"
                       placeholder="请填补料速度" required
                       type="number"/>

              </div>
              <div class="h-10  flex justify-center items-center mt-1">
                <div class="w-24 justify-start items-center flex">
                  <kbd class="kbd kbd-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.73ex" height="1.791ex" viewBox="0 -626 764.6 791.6" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-194-TEX-I-1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path><path id="MJX-194-TEX-N-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><use xlink:href="#MJX-194-TEX-I-1D461"></use></g><g data-mml-node="mn" transform="translate(361, -150) scale(0.707)"><use xlink:href="#MJX-194-TEX-N-30"></use></g></g></g></g></svg>             </kbd>
                </div>
                <input id="name" v-model="contentSet.DutyFeed.detection_cycle"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填检测周期" required
                       type="number"/>

              </div>
              <div class="h-10  flex justify-center items-center mt-1">
                <div class="w-24 justify-start items-center flex">
                  <kbd class="kbd kbd-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.294ex" height="1.025ex" viewBox="0 -442 572 453" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-198-TEX-I-1D462" d="M21 287Q21 295 30 318T55 370T99 420T158 442Q204 442 227 417T250 358Q250 340 216 246T182 105Q182 62 196 45T238 27T291 44T328 78L339 95Q341 99 377 247Q407 367 413 387T427 416Q444 431 463 431Q480 431 488 421T496 402L420 84Q419 79 419 68Q419 43 426 35T447 26Q469 29 482 57T512 145Q514 153 532 153Q551 153 551 144Q550 139 549 130T540 98T523 55T498 17T462 -8Q454 -10 438 -10Q372 -10 347 46Q345 45 336 36T318 21T296 6T267 -6T233 -11Q189 -11 155 7Q103 38 103 113Q103 170 138 262T173 379Q173 380 173 381Q173 390 173 393T169 400T158 404H154Q131 404 112 385T82 344T65 302T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="mi"><use xlink:href="#MJX-198-TEX-I-1D462"></use></g></g></g></svg>     </kbd>
                </div>
                <input id="name" v-model="contentSet.DutyFeed.feed_amount"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填补料量" required
                       type="number"/>

              </div>
              <div class="h-10  flex justify-center items-center mt-1">
                <div class="w-24 justify-start items-center flex">
                  速度上限
                </div>
                <input id="name" v-model="contentSet.DutyFeed.oxygen_trigger"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填溶氧值" required
                       type="number"/>

              </div>
              <div class="h-10  flex justify-center items-center mt-1">
                <div class="w-24 justify-start items-center flex">
                  速度下限
                </div>
                <input id="name" v-model="contentSet.DutyFeed.oxygen_trigger"
                       class="block w-[80%]  border-b-2  m-2" name="name"
                       placeholder="请填溶氧值" required
                       type="number"/>

              </div>
            </div>
          </div>

        </div>


      </div>
    </div>
    <!-- 顺控栏 -->
    <div class="relative w-[23rem]   h-[calc(100%-1rem)]  mr-2  flex-col flex justify-start items-center">
      <!--补料方式-->
      <div class="relative  shadow  h-[100%] overflow-y-auto  m-2 rounded-2xl flex-col flex justify-start items-center">
        <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">顺控设置</div>
        <div class="h-[calc(100%-3.5rem)] w-[23rem] justify-start items-center flex-col flex">
          <div class="w-[calc(100%-0.5rem)] h-[85%] absolute overflow-y-auto">
            <form @submit.prevent="submitForm">
              <div v-for="(item, index) in formData.items" :key="item.id" class="flex m-2 border-2 p-4 border-[#83BA9B] rounded-lg">
                <input type="text" v-model="item.id" placeholder="序号" class="w-1/4 text-center ">
                <input type="text" v-model="item.speed" placeholder="补料速度" class="w-1/4 ">
                <input type="text" v-model="item.time" placeholder="区段时间" class="w-1/4 ">
                <button type="button" @click="removeItem(index)"  class="w-1/4 ">删除</button>
              </div>
            </form>
            <button type="button" @click="addItem" class="flex ml-2 w-[96%] hover:bg-green-50 border-2 p-4 border-[#83BA9B] rounded-lg justify-center items-center">
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 9V0H9.5V9H0.5V11H9.5V20H11.5V11H20.5V9H11.5Z" fill="#83BA9B"/>
              </svg>
            </button>
          </div>

          <div class="flex  w-full h-12 absolute bottom-2">
            <div class="absolute left-2 w-28 h-12 justify-center items-center flex">发酵时间</div>
            <button type="submit" class=" bg-[#83BA9B] hover:bg-green-800 text-white rounded-xl w-28 h-12 absolute right-2">保存数据</button>
          </div>

        </div>


      </div>
    </div>

  </div>


</template>

<script lang='ts' setup>

// ______________________导入模块_______________________
import {reactive, ref} from 'vue'
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {sendData} from '@/api/index.js'
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
import {toNumber} from "xe-utils";
import {Switch} from '@headlessui/vue'
import {ArrowPathIcon, BeakerIcon, EyeDropperIcon,} from '@heroicons/vue/20/solid'

const enabled = ref(false)
const DeviceManage = useDeviceManage();
const ProcessPopupMangerState = useProcessPopupMangerState()
const AppGlobal = useAppGlobal();

// ______________________表单_______________________
const batch_name = ref(null);
const batch_cycle = ref(null);
const contentSet = ref({
  FullSpeedFeed: {
    feedSpeed: null,
    feedDate: null,
  },
  LinearFeed: {
    feedSpeed: null,
    DOTopLimit: null,
    DOBottomLimit: null
  },
  DutyFeed: {
    feedSpeed: null,
    checkCycle: null,
    feedQuantity: null,
    DO: null
  },
  chance: 0,


});


const postFeedSet = (flag) => {
  if (flag === 1) {
    const {feedSpeed, feedDate} = contentSet.value.FullSpeedFeed;
    DeviceManage.deviceList[AppGlobal.pageChance].recordFeedMode.FullSpeed = {
      feedSpeed: feedSpeed !== null ? feedSpeed : 0,
      feedDate: feedDate !== null ? feedDate : 0
    };
  } else if (flag === 2) {
    const {feedSpeed, DOTopLimit, DOBottomLimit} = contentSet.value.LinearFeed;
    DeviceManage.deviceList[AppGlobal.pageChance].recordFeedMode.Line = {
      feedSpeed: feedSpeed !== null ? feedSpeed : 0,
      DOTopLimit: DOTopLimit !== null ? DOTopLimit : 0,
      DOBottomLimit: DOBottomLimit !== null ? DOBottomLimit : 0
    };
  } else if (flag === 3) {
    const {feedSpeed, checkCycle, feedQuantity, DO} = contentSet.value.DutyFeed;
    DeviceManage.deviceList[AppGlobal.pageChance].recordFeedMode.DutyCycle = {
      feedSpeed: feedSpeed !== null ? feedSpeed : 0,
      checkCycle: checkCycle !== null ? checkCycle : 0,
      feedQuantity: feedQuantity !== null ? feedQuantity : 0,
      DO: DO !== null ? DO : 0
    };

  }
}

const controlSend = ((name, index) => {
  if (name == 'beginFerment') {
    if (batch_name.value !== null && batch_name.value !== '' && batch_name.value !== undefined) {
      DeviceManage.deviceList[index].batch_name = batch_name.value;
      if (batch_cycle.value !== null && batch_cycle.value !== '' && batch_cycle.value !== undefined) {
        DeviceManage.deviceList[index].batch_cycle = toNumber(batch_cycle.value);
      }
      const data = {
        start_flag: 1,

      }
      sendData(index, data);
      ProcessPopupMangerState.updateIsShowPop(false)
    }


  }


})


// ______________________顺控_______________________
const formData = reactive({
  items: [
    { id: 1, speed: '', time: ''},
    // 更多的项目可以根据需要添加
  ]
});

const addItem = () => {
  const nextId = formData.items.length + 1;
  formData.items.push({ id: nextId, speed: '', time: ''});
};

const removeItem = (index) => {
  formData.items.splice(index, 1);
};

const submitForm = () => {
  // 这里可以添加提交表单的逻辑
  console.log('Form Data:', formData.items);
};
// ______________________功能函数_______________________
const closePop = () => {
  ProcessPopupMangerState.updateIsShowPop(false)
}


// ______________________生命周期_______________________


</script>
<style lang="scss" scoped>


</style>