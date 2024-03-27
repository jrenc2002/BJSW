<template>
    <div class="h-[95vh] border transition-all duration-300 ease-in-out shadow bg-white rounded-2xl">
        
        <!--    标题-->
        <div class="h-[3rem] self-stretch justify-start items-center  inline-flex mt-3  w-full ">
            <div class="w-[calc(10rem)] m-auto text-xl leading-10 text-zinc-900 text-2xl font-medium p-2 leading-loose left-4 relative">
                溶氧控制
            </div>
            <div class="w-[calc(100%-10rem)] relative justify-end flex mr-3 ">
                <div class="bg-[#F5F5F5] right-0 relative w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer"
                     @click="closePop">
                    <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                              fill="#19161D"/>
                    </svg>
                </div>
            </div>
        </div>
        <!--    表格栏-->
        <div class="  w-[100%] h-[92%]     items-center justify-center  flex  ">
            <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
                <div class=" w-full h-[100%] ">
                    <div class=" box-border  w-full h-full flex" style="overflow: auto;">
                        
                        <!-- 新格式-->
                        <!--左侧列left-->
                        <div class="relative w-[20rem]  h-[calc(100%-1rem)]  flex-col flex justify-start items-center ">
                            <!--设置参数-->
                            <div class="relative  shadow w-[19rem] m-2 rounded-2xl  justify-start items-center border border-gray-300 ">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium ">
                                    <div class="ml-4 ">
                                        设置参数
                                    </div>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%] h-[calc(92%-3.5rem)]  top-0    justify-center flex mb-4  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)]   justify-center flex     ">
                                        <div class=" w-full h-[100%] ">
                                            <div class=" box-border overflow-x-hidden w-full  flex">
                                                <!--原表格left-->
                                                <div class=" float-left  shadow  border-radius z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="mb-4   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>关联状态</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>测量值</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>设定值</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start  ">
                                                            <div class="flex justify-center items-center">
                                                                <tr class=" justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r rounded-tr-2xl hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="h-full flex justify-center items-center  ">
                                                                            <Menu as="div"
                                                                                  class="dropdown relative inline-block">
                                                                                <div>
                                                                                    <MenuButton
                                                                                            class="inline-flex w-[7rem] justify-center gap-x-1.5">
                                                                                        <summary
                                                                                                v-if="localCache.setNum.DO_flag!==1"
                                                                                                class="m-1 btn w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-md">
                                                                                            停止
                                                                                        </summary>
                                                                                        <summary v-if="localCache.setNum.DO_flag===1"
                                                                                                 class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-md">
                                                                                            开启
                                                                                        </summary>
                                                                                    </MenuButton>
                                                                                </div>
                                                                                <MenuItems
                                                                                        class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-md w-[7rem] border absolute origin-top-left left-0 mt-2">
                                                                                    <MenuItem v-slot="{ active }">
                                                                                        <button @click="paramSend('DO_flag',AppGlobal.pageChance,0)" :class="[active ? 'bg-[#E0E0E0] text-[#000000]' : 'text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2]', 'block px-4 py-2 text-sm rounded']">
                                                                                            停止
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                    <MenuItem v-slot="{ active }">
                                                                                        <button @click="paramSend('DO_flag',AppGlobal.pageChance,1)" :class="[active ? 'bg-[#BAE7C7] text-[#256637]' : 'text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2', 'block px-4 py-2 text-sm rounded mt-2']">
                                                                                            开启
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                </MenuItems>
                                                                            </Menu>
                                                                        
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        {{DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.oxygen_percentage!==undefined&&DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.oxygen_percentage!==0?DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.oxygen_percentage+' %':'--'}}
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r rounded-br-2xl  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model.lazy="localCache.setNum.target_DO"
                                                                                   @blur="deadZoneControl()"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="溶氧设定值"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!--pid 自动参数-->
                            <div class="relative  shadow w-[19rem] m-2 mt-6 rounded-2xl  justify-start items-center border border-gray-300 ">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium ">
                                    <div class="mx-4 ">
                                        自动参数
                                    </div>
                                    <button class="bg-white p-1 border-gray-300 border text-sm hover:bg-gray-100"
                                            @click="PIDReset">PID重置
                                    </button>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%] h-[calc(92%-3.5rem)]  top-0    justify-center flex mb-4  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)]   justify-center flex     ">
                                        <div class=" w-full h-[100%] ">
                                            <div class=" box-border overflow-x-hidden w-full  flex">
                                                <!--原表格left-->
                                                <div class=" float-left  shadow  border-radius z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="mb-4   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>比例P</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>积分I</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>微分D</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start  ">
                                                            <div class="flex justify-center items-center">
                                                                <tr class=" justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-tr-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model.lazy="localCache.pidNum.DO_KP"
                                                                                   @blur="paramSend('DO_KP',AppGlobal.pageChance,localCache.setNum.DO_KP)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="比例P"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model.lazy="localCache.pidNum.DO_KI"
                                                                                   @blur="paramSend('DO_KI',AppGlobal.pageChance,localCache.setNum.DO_KI)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="积分I"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-br-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model.lazy="localCache.pidNum.DO_KD"
                                                                                   @blur="paramSend('DO_KD',AppGlobal.pageChance,localCache.setNum.DO_KD)"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" placeholder="微分D"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <!--中侧-->
                        <div class="relative w-[22rem]   h-[calc(100%-1rem)]     flex-col flex justify-start items-center">
                            <!--报警参数-->
                            <div class="relative  shadow w-[19rem]      m-2 rounded-2xl  justify-start items-center  border border-gray-300">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium ">
                                    <div class="ml-4">
                                        报警参数
                                    </div>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%] h-[calc(100%-3.5rem)]  top-0  mb-4  justify-center flex  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)]   justify-center flex     ">
                                        <div class=" w-full h-[92%] ">
                                            <div class="  overflow-hidden w-full  flex">
                                                <!--原表格left-->
                                                <div class="float-left     rounded-l-2xl z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>溶氧报警上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>溶氧报警下限</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!--原表格right-->
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start w-[10rem]  rounded-r-2xl ">
                                                            <div class="flex-col justify-center items-center">
                                                                <tr class="flex justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r rounded-tr-2xl  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            
                                                                            <input id="name" v-model.lazy="localCache.alarmNum.doMaxWarn"
                                                                                   @blur="DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.doMaxWarn=localCache.alarmNum.doMaxWarn"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="请输报警上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr class="flex justify-center items-center">
                                                                    <td class=" text-center  border-b border-r  rounded-br-2xl hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model.lazy="localCache.alarmNum.doMinWarn"
                                                                                   @blur="DeviceManage.deviceList[AppGlobal.pageChance].deviceSet.doMinWarn=localCache.alarmNum.doMinWarn"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="请输报警下限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!--控制参数-->
                            <div class="relative  shadow w-[19rem] mt-6     m-2 rounded-2xl  justify-start items-center  border border-gray-300">
                                <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium">
                                    <div class="ml-4">
                                        关联控制参数
                                    </div>
                                </div>
                                <!--表格内容-->
                                <div class="  w-[100%]   top-0    justify-center flex  ">
                                    <div class="rounded-2xl   w-[calc(100%-1.5rem)] mb-5  justify-center flex     ">
                                        <div class=" w-full h-[92%] ">
                                            <div class=" box-border overflow-x-hidden w-full   flex">
                                                <!--原表格left-->
                                                <div class="float-left   shadow-radius border-radius  rounded-tl-2xl z-20">
                                                    <div class="w-[8rem]  overflow-hidden ">
                                                        <table class="mb-4   bg-[#E8F6ED] py-4 rounded-l-2xl">
                                                            <tr>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>控制死区</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>溶氧上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>溶氧下限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>转速上限</div>
                                                                </td>
                                                                <td class="w-full  flex justify-center items-center   ">
                                                                    <div>转速下限</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!--原表格right-->
                                                <div class="right-div ">
                                                    <div class="right-div2 flex items-start self-start">
                                                        <table class="flex items-start w-[10rem]  ">
                                                            <div class="flex justify-center items-center">
                                                                <tr class=" justify-center items-center">
                                                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-tr-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name" v-model="localCache.controlNum.DO_dead_zone"
                                                                                   @blur="deadZoneControl()"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"
                                                                                   placeholder="请填控制死区"
                                                                                   step="0.01"
                                                                                   required type="number"/>
                                                                        </div>
                                                                     </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]   m-2 text-center bg-inherit"
                                                                                   name="name"  v-model="localCache.controlNum.DO_upper_limit"
                                                                                   disabled        placeholder="请填溶氧上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]   m-2 text-center bg-inherit"
                                                                                   name="name"   v-model="localCache.controlNum.DO_lower_limit"
                                                                                   placeholder="请填溶氧下限" disabled
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name"   v-model.lazy="localCache.controlNum.motor_speed_u_limit"
                                                                                   @blur="paramSend('motor_speed_u_limit',AppGlobal.pageChance,localCache.controlNum.motor_speed_u_limit)"
                                                                                   placeholder="请填转速上限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center rounded-br-2xl">
                                                                        <div class="flex justify-center items-center w-full">
                                                                            <input id="name"
                                                                                   class="block w-[80%]  border-b-2 m-2 text-center bg-inherit"
                                                                                   name="name" v-model.lazy="localCache.controlNum.motor_speed_l_limit"
                                                                                   @blur="paramSend('motor_speed_l_limit',AppGlobal.pageChance,localCache.controlNum.motor_speed_l_limit)"
                                                                                   placeholder="请填转速下限"
                                                                                   required type="number"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </div>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <!--右侧-->
                        <div class="relative w-[22rem]   h-[calc(100%-1rem)]     flex-col flex justify-start items-center">
                            <div class="relative  shadow  h-[100%] overflow-y-auto  m-2 rounded-2xl flex-col flex justify-start items-center">
                                <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">分段补料设置</div>
                                <div class="h-[calc(100%-3.5rem)] w-[23rem] justify-start items-center flex-col flex">
                                    <div class="w-[calc(100%-0.5rem)] h-[85%] absolute overflow-y-auto">
                                        <button class="flex m-2 w-[96%] text-sm hover:bg-green-50 border-2 p-4 border-[#83BA9B] rounded-lg justify-center items-center"
                                                type="button" @click="updateTotalSegmentTime()">
                                            <div class="w-1/5 text-center "> 序号</div>
                    
                                            <div class="w-1/5 text-center ">速度</div>
                    
                                            <div class="w-1/5 text-center ">设定时间</div>
                    
                                            <div class="w-1/5 text-center ">已分配</div>
                    
                                            <div class="w-1/5 text-center ">删除</div>
                                        </button>
                                        <form @submit.prevent="submitForm">
                                            <div v-for="(item, index) in formData.items" :key="item.id"
                                                 class="flex m-2 border-2 p-4 border-[#83BA9B] rounded-lg">
                                                <input v-model="item.id" @blur="updateForm()" class="w-1/5 text-center  border" placeholder="序号" type="text">
                                                <input v-model="item.supplementSpeed" @blur="updateForm()" class="w-1/5 text-center border" type="number"  placeholder="ml/h">
                                                <input v-model="item.segmentTime" @blur="updateForm()" class="w-1/5 text-center border" type="number" placeholder="h">
                                                <div  class="w-1/5 text-center bg-gray-100" disabled>{{item.totalSegmentTime}}h</div>
                                                <button class="w-1/5 text-center" type="button" @click="removeItem(index)">删除
                                                </button>
                                            </div>
                                        </form>
                                        <button class="flex ml-2 w-[96%] hover:bg-green-50 border-2 p-4 border-[#83BA9B] rounded-lg justify-center items-center"
                                                type="button"
                                                @click="addItem">
                                            <svg fill="none" height="20" viewBox="0 0 21 20" width="21"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.5 9V0H9.5V9H0.5V11H9.5V20H11.5V11H20.5V9H11.5Z" fill="#83BA9B"/>
                                            </svg>
                                        </button>
                                    </div>
            
                                    <div class="flex  w-full h-12 absolute bottom-2 justify-center items-center flex ">
                                        <div class="absolute bg-[#83BA9B] text-white rounded-md w-32 h-10  p-2 left-6 justify-center items-center flex">发酵时间 {{ fermentationTime }}</div>
                                        <div class="absolute   rounded-md w-36 h-10   right-6 justify-center items-center flex">
                                            <div class="w-10 justify-start items-center flex">
                                                <kbd class="kbd kbd-md">
                                                    <svg aria-hidden="true" height="1.791ex" style=""
                                                         viewBox="0 -626 764.6 791.6" width="1.73ex"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <defs>
                                                            <path id="MJX-44-TEX-I-1D461"
                                                                  d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path>
                                                            <path id="MJX-44-TEX-N-30"
                                                                  d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path>
                                                        </defs>
                                                        <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                           transform="matrix(1 0 0 -1 0 0)">
                                                            <g data-mml-node="math">
                                                                <g data-mml-node="msub">
                                                                    <g data-mml-node="mi">
                                                                        <use xlink:href="#MJX-44-TEX-I-1D461"></use>
                                                                    </g>
                                                                    <g data-mml-node="mn"
                                                                       transform="translate(361, -150) scale(0.707)">
                                                                        <use xlink:href="#MJX-44-TEX-N-30"></use>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </kbd>
                                            </div>
                                            <input id="name"
                                                   class="block w-[6rem] border-b-2 m-2" name="name"
                                                   placeholder="时间初始值" required
                                                   type="number"/>
                                        </div>
            
                                    </div>
        
                                </div>
    
    
                            </div>


                        </div>

                    </div>
                
                </div>
            
            </div>
        
        
        </div>
    
    
    </div>


</template>

<script lang='js' setup>

// ______________________导入模块_______________________
import {computed, onMounted, onUnmounted, reactive, ref, Ref, watch} from 'vue'
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {sendData} from '@/api/index.js'
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import Swal from "sweetalert2";

const DeviceManage = useDeviceManage();
const ProcessPopupMangerState = useProcessPopupMangerState()
const AppGlobal = useAppGlobal();
// -------------数据缓冲-----------------
const localCache = ref({
    setNum:{
        DO_flag:null,
        target_DO: null,
    },
    pidNum:{
        DO_KP: null,
        DO_KI: null,
        DO_KD: null,
    },
    alarmNum:{
        doMaxWarn: null,
        doMinWarn: null,
    },
    controlNum:{
        DO_dead_zone: null,
        DO_upper_limit: null,
        DO_lower_limit: null,
        motor_speed_u_limit: null,
        motor_speed_l_limit: null,
    }
    
})


const deadZoneControl=()=>{
    paramSend('target_DO',AppGlobal.pageChance,localCache.value.setNum.target_DO);
    if (localCache.value.controlNum.DO_dead_zone!==null&&localCache.value.controlNum.DO_dead_zone!==undefined){
       if (localCache.value.setNum.target_DO!==null&&localCache.value.setNum.target_DO!==undefined){
           paramSend('DO_area_limit',AppGlobal.pageChance,Number(localCache.value.controlNum.DO_dead_zone))

       }else {
           Swal.fire({
               icon: 'error', // 由于是确认操作，使用 'question' 图标
               title: '请先设置目标溶氧值不为空', // 设置标题
               showCancelButton: false, // 显示取消按钮
               confirmButtonColor: '#3085d6', // 确认按钮颜色
               confirmButtonText: '确认', // 确认按钮文本
           })
       }
    }
    
}

// 数据同步 监听device
watch(() => DeviceManage.deviceList[AppGlobal.pageChance]?.nowData, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        updateCache();
    }
})
// updateCache函数
const updateCache = () => {
// 更新数据
    localCache.value.setNum.DO_flag = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_flag;
    localCache.value.setNum.target_DO = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.target_DO;
    
    localCache.value.pidNum.DO_KP = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_KP;
    localCache.value.pidNum.DO_KI = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_KI;
    localCache.value.pidNum.DO_KD = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_KD;
    
    localCache.value.alarmNum.doMaxWarn = DeviceManage.deviceList[AppGlobal.pageChance]?.deviceSet?.doMaxWarn;
    localCache.value.alarmNum.doMinWarn = DeviceManage.deviceList[AppGlobal.pageChance]?.deviceSet?.doMinWarn;
    
    localCache.value.controlNum.DO_dead_zone = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_area_limit
    localCache.value.controlNum.DO_upper_limit = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.target_DO+ DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_area_limit;
    localCache.value.controlNum.DO_lower_limit = returnZero( DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.target_DO- DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.DO_area_limit);
    localCache.value.controlNum.motor_speed_u_limit = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.motor_speed_u_limit;
    localCache.value.controlNum.motor_speed_l_limit = DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.motor_speed_l_limit;
    
}
const returnZero = (num) => {
    if (num < 0) {
        return 0
    } else {
        return num
    }
}
// ______________________表格数据变量_______________________

const paramSend = ((name, index, content) => {
    // 使用方括号来设置动态属性名
    const data = {
        [name]: content
    };
    sendData(index, data);
    
});

// ______________________功能函数_______________________
const closePop = () => {
    ProcessPopupMangerState.updateIsShowPop(false)
}

const PIDReset = () => {
    paramSend('DO_KP', AppGlobal.pageChance, 80)
    paramSend('DO_KI', AppGlobal.pageChance, 0.5)
    paramSend('DO_KD', AppGlobal.pageChance, 0)
    localCache.value.pidNum.DO_KP = 80
    localCache.value.pidNum.DO_KI = 0.5
    localCache.value.pidNum.DO_KD = 0
    
}


// 当按下键盘时的处理函数，ESC关闭弹窗
const handleKeydown = (event) => {
    if (event.keyCode === 27) { // 27 是 esc 键的 keyCode
        
        // 在此处执行你想要的操作
        ProcessPopupMangerState.updateIsShowPop(false)
    }
};
// 弹窗管理

// ______________________生命周期_______________________

// 当组件挂载时添加事件监听器
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    updateCache();
//   循环
//   setInterval(() => {
//     // sendData(0)
//   }, 10000)
//     initTableData()
});

// 当组件卸载时移除事件监听器
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});



// 溶氧顺控
const formData = reactive({
    items: [
    
    ]
});

const addItem = () => {
    const nextId = formData.items.length + 1;
    
    formData.items.push( { id: nextId, supplementSpeed: null, segmentTime: null, totalSegmentTime: null });
    updateTotalSegmentTime();
};

const removeItem = (index) => {
    formData.items.splice(index, 1);
    updateTotalSegmentTime();
};
const updateTotalSegmentTime = () => {
    // 重新排序 id
    formData.items.forEach((item, index) => {
        item.id = index + 1;
    });
    
    // 计算 totalSegmentTime
    formData.items.forEach((item, index) => {
        let total = 0;
        for (let i = 0; i < index+1; i++) {
            
            total += formData.items[i].segmentTime;
        }
        item.totalSegmentTime = total;
    });
};
const updateForm= () => {
    updateTotalSegmentTime();
    submitForm();
};
const submitForm = () => {
    // 本地缓存提交全局
    DeviceManage.deviceList[AppGlobal.pageChance].SequenceControl.DO = formData.items
    
};
</script>
<style lang="scss" scoped>


table {
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  border-spacing: 0;

}

//
th {
  //word-break: break-all;
  //word-wrap: break-word;
  //height: 40px;
  //width: 100px;
  //vertical-align: middle;
  //text-align: center;
  //border-left: 1px solid #999;
  //background: #d9d9d9;
  //box-sizing: border-box;
  height: 4.5rem;

}

td {
  //word-break: break-all;
  //word-wrap: break-word;
  //width: 100px;
  //text-align: center;
  //vertical-align: middle;
  //line-height: 30px;
  //border-left: 1px solid #999;
  //box-sizing: border-box;
  height: 4.5rem;
}

//
//tr {
//  border-top: 1px solid #999;
//  box-sizing: border-box;
//}


.right-div {
  float: left;

  margin-left: -1px;
}

.right-div1 {
  overflow: hidden;

  .first-row-style {
    box-sizing: border-box;
  }
}

.right-div2 {
  overflow: auto;
}

.right-table2 {
  overflow: hidden;
}


.empty-content {
  width: 100%;
  overflow: auto;
}


</style>
