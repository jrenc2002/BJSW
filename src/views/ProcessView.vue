<template>
    
    
    <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  ">
        
        <transition name="fade">
            <div
                    v-show="ProcessPopupMangerState.isShowPop"
                    class="rounded-2xl absolute bg-white bg-opacity-50 h-[calc(100%-2rem)] w-[calc(100%-2rem)]  z-30 backdrop-blur-sm items-center justify-center flex"
            >
                <ProcessPopupManger :popcontent="PopupType[ProcessPopupMangerState.popupContent]"
                                    class="w-full h-full "></ProcessPopupManger>
            </div>
        </transition>
        
        <!--    标题-->
        <div class="h-[6%] self-stretch justify-center items-center gap-4 inline-flex ">
            <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">分罐流程
            </div>
        </div>
        <!--    内容-->
        <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow  flex  ">
            <div class="rounded-2xl  h-[calc(100%)] w-[calc(100%)]  items-center justify-center flex     ">
                <!--左侧控制栏-->
                <div class="h-full w-[20%] overflow-hidden p-1 flex-col gap-2.5 relative flex  items-end">
                    <!--溶氧栏-->
                    <div class="card min-w-[10vw]  bg-base-100 shadow-lg  border border-zinc-100  top-[2vh] absolute "
                    >
                        <div class="w-full h-[2.5rem] mb-2 font-black  bg-[#FAD6DA] flex items-center justify-center cursor-pointer rounded-t-2xl "
                             @click="popProcessManager('溶氧')">
                            <div class="w-full text-center relative">
                                溶氧
                            </div>
                        
                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full   flex h-[3vh] flex items-center justify-start mt-2  gap-1 ">
                                <div class=" w-[5rem]   text-left relative ">设定值:</div>
                                <span class="w-[5rem]   flex text-center items-center justify-center relative">
                                  <input v-model.lazy="localCache.DoData.SetData"
                                         class=" w-[4rem] border-b-2 text-right "
                                         max="100"
                                         min="0"
                                         step="0.01" type="number"
                                         @blur="paramSend('target_DO',AppGlobal.pageChance,localCache.DoData.SetData)"
                                  >{{ '%' }}
                                </span>
                            </div>
                            
                            <div class="w-full  flex h-[3vh] flex items-center justify-start mt-2 gap-1 ">
                                <div class=" w-[5rem] mr-1 text-left relative">测量值:</div>
                                <span class="w-[5rem]  flex text-center items-center justify-center relative">
                                  {{ localCache.DoData.MeasureData }} %
                                </span>
                            </div>
                            
                            <!--                            </div>-->
                            <div class="w-full  flex h-[3vh] flex items-center justify-start mt-2 gap-2 ">
                                <div class=" w-[5rem]   text-left relative">关联转速:</div>
                                <span class="w-[5rem]  flex text-center items-center justify-center relative">
                                    <Menu as="div" class="dropdown relative inline-block">
                                      <div>
                                        <MenuButton class="inline-flex w-[5rem] justify-center gap-x-1.5 scale-75">
                                          <summary
                                                  v-if="localCache.DoData.DO_flag!==1"
                                                  class="m-1 btn btn-sm w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-md"
                                                  @click="paramSend('DO_flag',AppGlobal.pageChance,1)">关闭</summary>
                                          <summary v-if="localCache.DoData.DO_flag===1"
                                                   class="m-1 btn btn-sm w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-md"
                                                   @click="paramSend('DO_flag',AppGlobal.pageChance,0)">关联</summary>
                                        </MenuButton>
                                      </div>
                               
                                    </Menu>
                                </span>
                            </div>
                        
                        </div>
                    </div>
                    <!--转速栏-->
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border  border-zinc-100  top-[22vh] absolute  "
                    >
                        <div class="w-full h-[2.5rem]   mb-2 font-black  bg-[#E1EEFF] flex items-center justify-center cursor-pointer rounded-t-2xl "
                             @click="popProcessManager('转速')">
                            <div class="w-full text-center relative ">
                                转速
                            </div>
                        
                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] text-left relative ">设定转速:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                                  <input id="numberInput"
                                         v-model.lazy="localCache.RPMData.SetSpeed"
                                         class=" w-[4rem]  border-b-2 text-right "
                                         max="1600"
                                         min="0"
                                         step="1" type="number"
                                         @blur="paramSend('target_motor_speed',AppGlobal.pageChance,localCache.RPMData.SetSpeed)"
                                  >{{ 'r/min' }}
                                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] mr-1 text-left relative">实时转速:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                  {{ localCache.RPMData.NowSpeed }} r/min
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] mr-1 text-left relative ">电机开关:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                                <Menu as="div" class="dropdown relative inline-block">
                                      <div>
                                        <MenuButton class="inline-flex w-[5rem] justify-center gap-x-1.5 scale-75">
                                          <summary v-if="localCache.RPMData.NowSpeed>0"
                                                   class="m-1 btn btn-sm w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-md"
                                                   @click="rpmConfirm('off')">启动</summary>
                                          <summary v-else
                                                   class="m-1 btn btn-sm w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-md"
                                                   @click="rpmConfirm('on')">停止</summary>
                                        </MenuButton>
                                      </div>
                                </Menu>
                </span>
                            </div>
                        
                        
                        </div>
                    </div>
                    <!--PH-->
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100   top-[42vh] absolute "
                    >
                        <div class="w-full h-[2.5rem]   mb-2 font-black  bg-[#FCF8DA] flex items-center justify-center cursor-pointer rounded-t-2xl "
                             @click="popProcessManager('PH值')">
                            <div class="w-full text-center relative">
                                PH值
                            </div>
                        
                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] mr-1 text-left relative ">设定值:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                                  <input id="numberInput"
                                         v-model.lazy="localCache.PHData.SetData"
                                         class=" w-[4rem]  border-b-2 text-center pl-4"
                                         max="14.00"
                                         min="0.00"
                                         step="0.01" type="number"
                                         @blur="paramSend('target_PH',AppGlobal.pageChance,localCache.PHData.SetData)"
                                  >
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] mr-1 text-left relative">测量值:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                   {{ localCache.PHData.MeasureData }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] mr-1 text-left relative">控制状态:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                                         <Menu as="div" class="dropdown relative inline-block">
                                      <div>
                                        <MenuButton class="inline-flex w-[5rem] justify-center gap-x-1.5 scale-75">
                                          <summary
                                                  v-if="localCache.PHData.PH_flag!==1"
                                                  class="m-1 btn btn-sm w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-md"
                                                  @click="paramSend('PH_flag',AppGlobal.pageChance,1)">手动</summary>
                                          <summary v-if="localCache.PHData.PH_flag===1"
                                                   class="m-1 btn btn-sm w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-md"
                                                   @click="paramSend('PH_flag',AppGlobal.pageChance,0)">自动</summary>
                                        </MenuButton>
                                      </div>
                               
                                    </Menu>
                </span>
                            </div>
                        
                        </div>
                    </div>
                    <!--温度-->
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100  top-[62vh] absolute ">
                        <div class="w-full h-[2.5rem] mb-2 font-black  bg-[#D9F0E4] flex items-center justify-center cursor-pointer rounded-t-2xl "
                             @click="popProcessManager('温度')">
                            
                            
                            <div class="w-[5rem] text-center relative flex items-center justify-center gap-2">
                                <div :class="[(localCache.TemperatureData.heatpower>0 &&!localCache.TemperatureData.water_flag )? 'bg-red-600' :(localCache.TemperatureData.water_flag)?'bg-blue-600':'bg-[#E0E0E0]' ]"
                                     class="w-3 h-3    rounded-full relative"></div>
                                
                                温度
                            </div>
                        
                        </div>
                        <div class="mx-6 my-2  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] mr-1 text-left relative ">设定值:</div>
                                <span class="w-[5rem]  flex text-center items-center justify-center relative">
                                  <input id="numberInput"
                                         v-model.lazy="localCache.TemperatureData.SetData"
                                         class=" w-[80px]  border-b-2 text-center pl-8"
                                         max="150"
                                         min="0"
                                         step="0.1" type="number"
                                         @blur="paramSend('target_temp',AppGlobal.pageChance,localCache.TemperatureData.SetData)"
                                  >
                                  {{ '℃' }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-3  ">
                                <div class=" w-[5rem] mr-1 text-left relative">测量值:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                  {{ localCache.TemperatureData.MeasureData }}{{ ' ℃' }}
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] mr-1 text-left relative">控制状态:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                                  <Menu as="div" class="dropdown relative inline-block">
                                      <div>
                                   <MenuButton class="inline-flex w-[5rem] justify-center gap-x-1.5 scale-75">
                                          <summary
                                                  v-if="localCache.TemperatureData.temp_flag!==1"
                                                  class="m-1 btn btn-sm w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-md"
                                                  @click="paramSend('temp_flag',AppGlobal.pageChance,1)">手动</summary>
                                          <summary v-if="localCache.TemperatureData.temp_flag===1"
                                                   class="m-1 btn btn-sm w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-md"
                                                   @click="paramSend('temp_flag',AppGlobal.pageChance,0)">自动</summary>
                                        </MenuButton>
                                      </div>
                                  </Menu>
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center mt-2 gap-2 ">
                                <div class=" w-[5rem] mr-1 text-left relative">温控状态:</div>
                                <span class="w-[5rem] flex text-center items-center justify-center relative">
                                       <Menu as="div" class="dropdown relative inline-block">
                                      <div>
                                   <div class="inline-flex w-[5rem] justify-center gap-x-1.5 scale-75">
                                          <div
                                                  v-if="localCache.TemperatureData.water_flag!==1"
                                                  class="m-1  w-[7rem] text-[#000000]  "
                                                 >{{(localCache.TemperatureData.heatpower>0 &&!localCache.TemperatureData.water_flag )? '加热' :(localCache.TemperatureData.water_flag)?'制冷':'--' }}</div>
                                        </div>
                                      </div>
                                  </Menu>
                </span>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <!--中间图片-->
                <div class="h-full   flex items-center justify-center">
                    <div class="  top-[10vh] absolute ">
                        <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
                            <div class="flex flex-col">
                                <span class="countdown font-mono text-4xl">
                                  <span :style="'--value:'+countdown.days"></span>
                                </span>
                                日
                            </div>
                            <div class="flex flex-col">
                                <span class="countdown font-mono text-4xl">
                                  <span :style="'--value:'+countdown.hours"></span>
                                </span>
                                小时
                            </div>
                            <div class="flex flex-col">
                                <span class="countdown font-mono text-4xl">
                                  <span :style="'--value:'+countdown.minutes"></span>
                                </span>
                                分钟
                            </div>
                            <div class="flex flex-col">
                                <span class="countdown font-mono text-4xl">
                                  <span :style="'--value:'+countdown.seconds"></span>
                                </span>
                                秒
                            </div>
                        </div>
                    
                    </div>
                    <img class="h-[70vh]" mode="heightFix" src="@/assets/image/JarImage.png">
                
                </div>
                <!--右侧控制栏-->
                <div class="h-full w-[20%]  p-1 flex-col gap-2.5 relative flex  items-start">
                    <!--酸泵-->
                    <transition name="fade">
                        <div v-if="stateManger.AcidPump" class=" w-[10rem] p-3 flex-col flex justify-start items-center
                                 bg-base-100 shadow-lg min-h-[6rem] rounded-xl  border border-[#874C53] top-[4vh] absolute left-[-12rem]  ">
                            <div>
                                <label class="block text font-medium leading-4 text-gray-900 mt-2">补料速度</label>
                                <div class="mt-2">
                                    <input v-model.lazy="stateManger.AcidPumpSpeed"
                                           class="block w-full pl-2 rounded-md border-[#AEAEAE] border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[6vh] absolute ">
                        <div class="w-full h-[3rem] mb-2   bg-[#FAD6DA] flex items-center justify-center rounded-t-2xl ">
                            
                            <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                                    <div :class="[  localCache.acidPumpData.SetData ===0?'bg-[#E0E0E0]':'bg-green-600']"
                                         class="w-2 h-2  rounded-full"></div>
                                </div>
                                <div :class="[stateManger.AcidPump?'text-white bg-[#E1A1A9]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                                     @click="stateManger.AcidPump=!stateManger.AcidPump">
                                    酸泵
                                </div>
                                <div :class="[stateManger.AddAcid?'text-white bg-[#E1A1A9]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                                     @click="handleHandControl('acid')">
                                    加酸
                                </div>
                            </div>
                        
                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">实时速率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ localCache.acidPumpData.SetData }} ml/h
                </span>
                            </div>
                            
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ localCache.acidPumpData.FeedAmount }} ml
                </span>
                            </div>
                        </div>
                    </div>
                    <!--碱泵-->
                    <transition name="fade">
                        <div v-if="stateManger.LyePump" class=" w-[10rem] p-3 flex-col flex justify-start items-center
           bg-base-100 shadow-lg min-h-[6rem] rounded-xl  border border-[#A7C2E4] top-[21vh] absolute left-[-12rem]  ">
                            
                            <div>
                                <label class="block text font-medium leading-4 text-gray-900 mt-2">补料速度</label>
                                <div class="mt-2">
                                    <input v-model.lazy="stateManger.LyePumpSpeed"
                                           class="block w-full pl-2 rounded-md border-[#AEAEAE] border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        
                        </div>
                    </transition>
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[21vh] absolute ">
                        <div class="w-full h-[3rem]   mb-2   bg-[#E1EEFF] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                                    
                                    <div :class="[  localCache.lyePumpData.SetData ===0?'bg-[#E0E0E0]':'bg-green-600']"
                                         class="w-2 h-2  rounded-full"></div>
                                </div>
                                
                                <div :class="[stateManger.LyePump?'text-white bg-[#A8C2E4]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-1 cursor-pointer "
                                     @click="stateManger.LyePump=!stateManger.LyePump">
                                    碱泵
                                </div>
                                <div :class="[stateManger.AddLye?'text-white bg-[#A8C2E4]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-2 cursor-pointer "
                                     @click="handleHandControl('lye')">
                                    加碱
                                </div>
                            </div>
                        
                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">实时速率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ localCache.lyePumpData.SetData }} ml/h
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ localCache.lyePumpData.MeasureData }} ml
                </span>
                            </div>
                        
                        </div>
                    </div>
                    
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[36vh] absolute ">
                        
                        <div class="w-full h-[3rem]   mb-2   bg-[#FCF8DA] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                                    <div :class="[  localCache.defoamerPumpData.SetData ===0?'bg-[#E0E0E0]':'bg-green-600']"
                                         class="w-2 h-2  rounded-full"></div>
                                </div>
                                
                                <div :class="[stateManger.DefoamerPump?'text-white bg-[#E4DDA4]':'bg-white']"
                                     class=" h-full w-[4.3rem]  flex justify-center items-center rounded mx-1 border-gray-300 border "
                                >
                                    补料泵1
                                </div>
                                <div :class="[stateManger.Defoamer?'text-white bg-[#E4DDA4]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-2 cursor-pointer "
                                     @click="popProcessManager('补料设置0')">
                                    设置
                                </div>
                            </div>
                        
                        </div>
                        
                        
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">设定速率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ localCache.defoamerPumpData.SetData }} ml/h
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ localCache.defoamerPumpData.MeasureData }} ml
                </span>
                            </div>
                        </div>
                    </div>
                    <!--补料泵-->
                    <div class="card min-w-[10vw] bg-base-100 shadow-lg  border border-zinc-100 top-[51vh] absolute ">
                        <div class="w-full h-[3rem]   mb-2   bg-[#D9F0E4] flex items-center justify-center rounded-t-2xl ">
                            <div class="w-full text-center relative  h-[70%] flex items-center justify-center">
                                <div class=" h-full w-3 flex justify-center items-center rounded mx-1 ">
                                    <div :class="[  localCache.feedPumpData.SetData ===0?'bg-[#E0E0E0]':'bg-green-600']"
                                         class="w-2 h-2  rounded-full"></div>
                                </div>
                                
                                <div :class="[stateManger.FeedPump?'text-white bg-[#9AD1B5]':'bg-white']"
                                     class=" h-full w-[4.3rem]  flex justify-center items-center rounded mx-1 border-gray-300 border "
                                >
                                    补料泵2
                                </div>
                                <div :class="[stateManger.AddFeed?'text-white bg-[#9AD1B5]':'bg-white']"
                                     class=" h-full w-[4.3rem] shadow flex justify-center items-center rounded mx-2 cursor-pointer "
                                     @click="popProcessManager('补料设置')">
                                    设置
                                </div>
                            </div>
                        
                        </div>
                        <div class="mx-6 my-3  mt-0 flex-col  ">
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative ">实时速率:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ localCache.feedPumpData.SetData }} ml/h
                </span>
                            </div>
                            <div class="w-full  flex h-[3vh] flex items-center justify-center gap-2 ">
                                <div class=" min-w-[7rem] mr-1 text-left relative">补料量:</div>
                                <span class="min-w-[2rem] flex text-center items-center justify-center relative">
                  {{ localCache.feedPumpData.MeasureData }} ml
                </span>
                            </div>
                        
                        </div>
                    </div>
                    <button class="w-[10rem] h-[4rem] text-lg relative bg-[#4EA67D] rounded-xl text-white hover:bg-[#327E5B]  top-[67vh]"
                            @click="popProcessManager('开始发酵')">
                        开始发酵
                    </button>
                    <div class="w-[21rem] h-[4rem]  right-[11rem] relative  rounded-xl text-black flex    top-[68vh]">
                        <div :class="!isAll?'bg-white hover:bg-neutral-50':'bg-[#4EA67D] hover:bg-[#327E5B] text-white'"
                             class=" swap w-[10rem] h-[4rem] mr-4 text-lg  relative  border-2 border-[#327E5B] rounded-xl text-black  flex items-center justify-center "
                             @click="popProcessManager('开始发酵')"
                        >
                            {{
                                DeviceManage.deviceList[AppGlobal.pageChance]?.batch_name !== null ? DeviceManage.deviceList[AppGlobal.pageChance]?.batch_name : '批号未定义'
                            }}
                        </div>
                        <button class="w-[10rem] h-[4rem]  text-lg  relative bg-[#E0E0E0] rounded-xl text-black hover:bg-[#CBCBCB]  "
                                @click="controlSend('end_running',AppGlobal.pageChance,1)">
                            结束发酵
                        </button>
                    
                    
                    </div>
                
                
                </div>
            </div>
        
        </div>
    
    
    </div>


</template>

<script setup>
import {PopupType, useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import ProcessPopupManger from "@/components/ProcessPopupManger.vue";
import {sendData} from "@/api";
import {useAppGlobal} from "@/store/AppGlobal";
import {useDeviceManage} from "@/store/DeviceManage";
import {toNumber} from "xe-utils";
import {Menu, MenuButton} from "@headlessui/vue";
import Swal from 'sweetalert2';

const rpmConfirm = (status) => {
    if (status === 'on') {
        if (localCache.RPMData.SetSpeed === 0) {
            Swal.fire({
                icon: 'error', // 由于是确认操作，使用 'question' 图标
                title: '请先设置转速不为0', // 设置标题
                showCancelButton: false, // 显示取消按钮
                confirmButtonColor: '#3085d6', // 确认按钮颜色
                confirmButtonText: '确认', // 确认按钮文本
            })
        } else {
            paramSend('target_motor_speed', AppGlobal.pageChance, localCache.RPMData.SetSpeed)
        }
        
    } else if (status === 'off') {
        Swal.fire({
            icon: 'question', // 由于是确认操作，使用 'question' 图标
            title: '确认关闭电机吗?', // 设置标题
            showCancelButton: true, // 显示取消按钮
            confirmButtonColor: '#3085d6', // 确认按钮颜色
            cancelButtonColor: '#d33', // 取消按钮颜色
            confirmButtonText: '确认', // 确认按钮文本
            cancelButtonText: '取消' // 取消按钮文本
        }).then((result) => {
            if (result.value) {
                // 用户点击了确认按钮
                paramSend('target_motor_speed', AppGlobal.pageChance, 0)
            }
        });
    }
    
    
}


const AppGlobal = useAppGlobal()
const DeviceManage = useDeviceManage();
const localCache = reactive({
    DoData: {
        SetData: 0,
        MeasureData: 0,
        DO_flag: 0,
    },
    RPMData: {
        SetSpeed: 0,
        NowSpeed: 0,
    },
    PHData: {
        SetData: 0,
        MeasureData: 0,
        PH_flag: 0,
    },
    TemperatureData: {
        SetData: 0,
        MeasureData: 0,
        temp_flag: 0,
        water_flag: 0,
        heatpower: 0
    },
    acidPumpData: {
        SetData: 0,
        FeedAmount: 0,
    },
    lyePumpData: {
        SetData: 0,
        MeasureData: 0,
    },
    defoamerPumpData: {
        SetData: 0,
        MeasureData: 0,
    },
    feedPumpData: {
        SetData: 0,
        MeasureData: 0,
    },
    
})


const isAll = ref(false);
watch(() => isAll.value, () => {
    console.log(isAll.value)
}, {deep: true});
watch(() => DeviceManage.deviceList[AppGlobal.pageChance].nowData, () => {
    initDataManger()
}, {deep: true});


const initDataManger = () => {
    if (!DeviceManage.deviceList || !Array.isArray(DeviceManage.deviceList)) {
        console.error("DeviceManage.deviceList未定义或不是数组。");
        return;
    }
    
    // 检查索引是否有效
    if (typeof AppGlobal.pageChance !== 'number' || AppGlobal.pageChance < 0 || AppGlobal.pageChance >= DeviceManage.deviceList.length) {
        console.error("AppGlobal.pageChance is an invalid index.");
        return;
    }
    const currentDeviceData = DeviceManage.deviceList[AppGlobal.pageChance].nowData;
    if (!currentDeviceData) {
        console.error("当前设备没有定义nowData。");
        return;
    }
    
    function formatData(value) {
        return typeof value === "number" ? value.toFixed(2) : value;
    }
    
    let currentDevice = DeviceManage.deviceList[AppGlobal.pageChance].nowData;
    let setDevice = DeviceManage.deviceList[AppGlobal.pageChance].deviceSet;
    
    localCache.DoData.SetData = formatData(currentDevice.target_DO);
    localCache.DoData.MeasureData = formatData(currentDevice.timing_DO);
    localCache.DoData.DO_flag = currentDevice.DO_flag;
    localCache.RPMData.NowSpeed = currentDevice.timing_motor_speed;
    localCache.RPMData.SetSpeed = currentDevice.target_motor_speed;
    localCache.PHData.SetData = formatData(currentDevice.target_PH);
    localCache.PHData.PH_flag= currentDevice.PH_flag;
    localCache.PHData.MeasureData = formatData(currentDevice.timing_PH);
    localCache.TemperatureData.SetData = formatData(currentDevice.target_temp);
    localCache.TemperatureData.MeasureData = formatData(currentDevice.timing_temp);
    localCache.TemperatureData.heatpower = formatData(currentDevice.heatpower);
    localCache.TemperatureData.water_flag = currentDevice.condensate_water_flag;
    localCache.TemperatureData.temp_flag = currentDevice.temp_flag;
    localCache.acidPumpData.SetData = formatData(currentDevice.acid_pump_now_speed);
    localCache.acidPumpData.FeedAmount = formatData(setDevice.acidPumpSumStepCount);
    localCache.lyePumpData.SetData = formatData(currentDevice.lye_pump_now_speed);
    localCache.lyePumpData.MeasureData = formatData(Number(setDevice.lyePumpSumStepCount));
    localCache.defoamerPumpData.SetData = formatData(Number(currentDevice.feed0_pump_now_speed));
    localCache.defoamerPumpData.MeasureData = formatData(Number(setDevice.defoamerPumpSumStepCount));
    localCache.feedPumpData.SetData = formatData(currentDevice.feed_pump_now_speed);
    localCache.feedPumpData.MeasureData = formatData(Number(setDevice.feedPumpSumStepCount));
    stateManger.AddFeed = Number(currentDevice.feed_flag) === 1;
    stateManger.DefoamerPump = Number(currentDevice.feed0_flag) === 1;
    
}
let lastClickTime = 0;
const controlSend = ((name, index, content) => {
    const debounceTime = 300; // 300ms
    const currentTime = new Date().getTime();
    
    if (currentTime - lastClickTime < debounceTime) {
        return; // If the function was called recently, do nothing
    }
    
    lastClickTime = currentTime; // Update the last clicked time
    
    if (name === 'begin_running') {
        
        if (isAll.value) {
            // 四个同时开启运行
            const data = {
                PH_flag: 0,
                DO_flag: 0,
                temp_flag: 0,
                start_flag: 0
            }
            
            sendData(index, data);
        } else {
            // 四个同时开启运行
            const data = {
                PH_flag: 1,
                DO_flag: 1,
                temp_flag: 1,
                start_flag: 1
            }
            sendData(index, data);
        }
        
    } else if (name === 'end_running') {
        // TODO: 关闭运行时应该用什么逻辑
        const data = {
            PH_flag: 0,
            DO_flag: 0,
            temp_flag: 0,
            start_flag: 0
        }
        
        sendData(index, data);
    } else if (name === 'acid_pump_set') {
        const data = {
            acid_pump_now_set_speed: toNumber(content)
        }
        
        console.log(data)
        sendData(index, data);
    } else if (name === 'lye_pump_set') {
        const data = {
            lye_pump_now_set_speed: toNumber(content)
        }
        
        console.log(data)
        sendData(index, data);
    }
    
})
const paramSend = ((name, index, content) => {
    // 使用方括号来设置动态属性名
    const data = {
        [name]: content
    };
    sendData(index, data);
    
});
const ProcessPopupMangerState = useProcessPopupMangerState()

// 弹窗管理
const popProcessManager = (val) => {
    
    ProcessPopupMangerState.updateIsShowPop(true)
    ProcessPopupMangerState.updatePopupContent(name_translation[val])
    
}
watch(() => ProcessPopupMangerState.isShowPop, (newValue, oldValue) => {
    
    if (newValue == false && oldValue == true) {
        stateManger.FeedPump = false
        stateManger.DefoamerPump = false
    }
});
// 当按下键盘时的处理函数，ESC关闭弹窗
const handleKeydownEsc = (event) => {
    if (event.keyCode === 27) { // 27 是 esc 键的 keyCode
        
        // 在此处执行你想要的操作
        ProcessPopupMangerState.updateIsShowPop(false)
        stateManger.FeedPump = false
        stateManger.DefoamerPump = false
    }
};
const name_translation = {
    '温度': 'Temperature',
    'PH值': 'PHValue',
    '转速': 'RPM',
    '溶氧': 'DissolvedOxygen',
    '开始发酵': 'BeginFermentation',
    '补料设置0': 'Feed0Setting',
    '补料设置': 'FeedSetting',
}
const stateManger = reactive({
    AcidPump: false,
    AddAcid: false,
    LyePump: false,
    AddLye: false,
    DefoamerPump: false,
    Defoamer: false,
    FeedPump: false,
    AddFeed: false,
    AcidPumpSpeed: 0,
    LyePumpSpeed: 0,
    DefoamerPumpSpeed: 0,
})

const handleHandControl = ((content) => {
    
    if (content == 'lye') {
        if (stateManger.LyePumpSpeed !== 0 && stateManger.LyePumpSpeed != undefined && stateManger.LyePumpSpeed != null) {
            if (!stateManger.AddLye) {
                
                controlSend('lye_pump_set', AppGlobal.pageChance, stateManger.LyePumpSpeed)
                stateManger.AddLye = !stateManger.AddLye
                
            } else {
                stateManger.LyePumpSpeed = 0
                stateManger.AddLye = !stateManger.AddLye
                controlSend('lye_pump_set', AppGlobal.pageChance, stateManger.LyePumpSpeed)
                
            }
        } else {
            stateManger.LyePump = !stateManger.LyePump
        }
    } else if (content == 'acid') {
        if (stateManger.AcidPumpSpeed !== 0 && stateManger.AcidPumpSpeed != undefined && stateManger.AcidPumpSpeed != null) {
            
            if (!stateManger.AddAcid) {
                
                controlSend('acid_pump_set', AppGlobal.pageChance, stateManger.AcidPumpSpeed)
                stateManger.AddAcid = !stateManger.AddAcid
                
            } else {
                stateManger.AcidPumpSpeed = 0
                stateManger.AddAcid = !stateManger.AddAcid
                controlSend('acid_pump_set', AppGlobal.pageChance, stateManger.LyePumpSpeed)
                
            }
            
        } else {
            stateManger.AcidPump = !stateManger.AcidPump
            
        }
    }
    
})


onMounted(() => {
    window.addEventListener('keydown', handleKeydownEsc);
    initDataManger()
    
    console.log(DeviceManage.deviceList[AppGlobal.pageChance]?.batch_name, '2222222')
// 使用 setInterval 定时器每秒更新一次时间差
    setInterval(() => {
        calculateTimeDifference()
    }, 1000);
    
})
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydownEsc);
});


function calculateTimeDifference() {
    
    const now = new Date();
    if (!DeviceManage.deviceList || !Array.isArray(DeviceManage.deviceList)) {
        console.error("DeviceManage.deviceList未定义或不是数组。");
        return;
    }
    if (DeviceManage.deviceList[AppGlobal.pageChance].state <= 1) {
        return
    }
    if (DeviceManage.deviceList[AppGlobal.pageChance].recordFlag === false) {
        return
    }
    
    const timeDiff = now - DeviceManage.deviceList[AppGlobal.pageChance].start_time;
    // 将时间差转换为天、小时、分钟和秒
    const days = Math.floor(timeDiff / (24 * 3600000));
    const hours = Math.floor((timeDiff % (24 * 3600000)) / 3600000);
    const minutes = Math.floor((timeDiff % 3600000) / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    countdown.value = {
        days,
        hours,
        minutes,
        seconds
    };
}


const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});
// --------------------
watch(() => localCache.DoData.SetData, (newValue) => {
    if (newValue == '') {
        localCache.DoData.SetData = 0
    }
    if (newValue > 150) {
        localCache.DoData.SetData = 150; // 将值设为100
    }
});
watch(() => localCache.RPMData.SetSpeed, (newValue) => {
    if (newValue === '') {
        localCache.RPMData.SetSpeed = 0
    }
    if (newValue > 1600) {
        localCache.RPMData.SetSpeed = 1600; // 将值设为100
    }
});
watch(() => localCache.PHData.SetData, (newValue) => {
    if (newValue === '') {
        localCache.PHData.SetData = 0
    }
    if (newValue > 14) {
        localCache.PHData.SetData = 14; // 将值设为100
    }
});
watch(() => localCache.TemperatureData.SetData, (newValue) => {
    if (newValue === '') {
        localCache.TemperatureData.SetData = 0
    }
    if (newValue > 150) {
        localCache.TemperatureData.SetData = 150; // 将值设为100
    }
});
</script>

<style lang="scss" scoped>

.fade-enter-from {
  transform-origin: right center;
  transform: scale(0.5);
  opacity: 0;
}

.fade-leave-to {
  transform-origin: right center;
  transform: scale(0.5);
  opacity: 0;
}
</style>
