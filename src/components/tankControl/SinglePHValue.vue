<template>
    <div class="h-[94vh] w-[70rem] transition-all duration-300 ease-in-out shadow bg-white rounded-2xl">

        <!--    标题-->
        <div class="h-[4%] self-stretch justify-start items-center  inline-flex mt-3  w-full ">
            <div class="w-[calc(10rem)] text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">
                PH值控制
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
      <div class="  w-[100%] h-[100%]     items-center justify-center  flex  " >
        <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
          <div class=" w-full h-[92%] overflow-auto" >
            <div class=" box-border  w-full h-full flex overflow-auto" >
              <!--原表格left-->
              <!--                        <div class="float-left  bg-[#E8F6ED] shadow border rounded-tl-2xl z-20">-->
<!--                                          <div class="  w-[10rem]">-->
<!--                                              <table class=" py-4 ">-->
<!--                                                  <tr>-->
<!--                                                      <th class="flex items-center justify-center gap-2   ">-->

<!--                                                      </th>-->
<!--                                                  </tr>-->
<!--                                              </table>-->
<!--                                          </div>-->
              <!--                            <div-->
              <!--                                    ref="firstColLayer"-->
              <!--                                    class="w-full overflow-hidden "-->
              <!--                            >-->
              <!--                                <table class="mb-4 shadow  bg-[#E8F6ED] py-4 rounded-bl-2xl">-->
              <!--                                    <tr v-for="(col, index) in firstCol" :key="index" class=" w-full  ">-->
              <!--                                        <td class="w-full  flex justify-center items-center   ">-->
              <!--                                            <div>-->
              <!--                                                {{ col }}-->

              <!--                                            </div>-->

              <!--                                        </td>-->
              <!--                                    </tr>-->
              <!--                                </table>-->
              <!--                            </div>-->
              <!--                        </div>-->
              <!--&lt;!&ndash;                        原表格right&ndash;&gt;-->
              <!--                        <div class="right-div ">-->
              <!--                            &lt;!&ndash;窗口&ndash;&gt;-->
<!--                                          <div ref="firstRowLayer"-->
<!--                                               class="right-div1 bg-[#F1F1F1] rounded-tr-2xl">-->
<!--                                              <table class=" flex items-start self-start w-[8.2rem]  rounded-br-2xl">-->

<!--                                                  <tr>-->
<!--                                                      <th v-for="(row, index) in firstRow" :key="index"-->
<!--                                                          class="first-row-style w-[8.2rem]  ">{{-->
<!--                                                              row-->
<!--                                                          }}-->
<!--                                                      </th>-->
<!--                                                  </tr>-->
<!--                                              </table>-->
<!--                                          </div>-->
              <!--                            <div-->

              <!--                                    ref="tableContainer"-->
              <!--                                    class="right-div2 flex items-start self-start"-->
              <!--                                    @scroll="tableScroll()"-->

              <!--                            >-->
              <!--                                <table class="flex items-start w-[8.2rem]  ">-->
              <!--                                    <div class="flex-col justify-center items-center">-->
              <!--                                        <tr v-for="(body,index) in tableBodyRows" :key="index"-->
              <!--                                            class="flex justify-center items-center">-->
              <!--                                            <template v-for="(col, i) in tableBodyCols" :key="col.props + i">-->
              <!--                                                <td v-if="index==0" class="w-[8.2rem] text-center border-r border-b flex justify-center items-center">-->

              <!--                                                  <Menu as="div" class="dropdown relative inline-block">-->
              <!--                                                    <div>-->
              <!--                                                      <MenuButton class="inline-flex w-[7rem] justify-center gap-x-1.5">-->
              <!--                                                        <summary v-if="body[col.props]==0||body[col.props]==null||body[col.props]==undefined" class="m-1 btn w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-box">停止</summary>-->
              <!--                                                        <summary v-if="body[col.props]==1" class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-[1rem]">开启</summary>-->
              <!--                                                      </MenuButton>-->
              <!--                                                    </div>-->
              <!--                                                    <MenuItems class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-box w-[7rem] border absolute origin-top-left left-0 mt-2">-->
              <!--                                                      <MenuItem v-slot="{ active }">-->
              <!--                                                        <button @click="controlSend('DO_flag', i, 0)" :class="[active ? 'bg-[#E0E0E0] text-[#000000]' : 'text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2]', 'block px-4 py-2 text-sm rounded-[0.5rem]']">停止</button>-->
              <!--                                                      </MenuItem>-->
              <!--                                                      <MenuItem v-slot="{ active }">-->
              <!--                                                        <button @click="controlSend('DO_flag', i, 1)" :class="[active ? 'bg-[#BAE7C7] text-[#256637]' : 'text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2', 'block px-4 py-2 text-sm rounded mt-2']">开启</button>-->
              <!--                                                      </MenuItem>-->
              <!--                                                    </MenuItems>-->
              <!--                                                  </Menu>-->

              <!--                                                </td>-->

              <!--                                                <td v-else-if="index>=2&&index<=10"-->
              <!--                                                    class="w-[8.2rem] text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center"-->
              <!--                                                    @dblclick="inputVisible[i][index-2].control = !inputVisible[i][index-2].control">-->
              <!--                                                    <input-->
              <!--                                                            v-if="inputVisible[i][index-2].control&&DeviceManage.deviceList[i]?.deviceSet!==null"-->
              <!--                                                            v-model="inputVisible[i][index-2].cache"-->
              <!--                                                            :placeholder="placeholder[index-2]"-->
              <!--                                                            class="w-[8.2rem]  h-full text-center break-all whitespace-normal "-->
              <!--                                                            type="text"-->
              <!--                                                            @keyup.enter="keyupEnterInput(i,index-2)"-->
              <!--                                                    />-->

              <!--                                                    <span v-else-->
              <!--                                                          class="w-[8.2rem] leading-5 text-center whitespace-normal break-all flex justify-center items-center">-->
              <!--                    {{ body[col.props] }}</span>-->
              <!--                                                </td>-->
              <!--                                                <td v-else-->
              <!--                                                    class="w-[8.2rem] text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">-->
              <!--                                                    {{ body[col.props] }}-->
              <!--                                                </td>-->
              <!--                                            </template>-->



              <!--                                        </tr>-->
              <!--                                    </div>-->
              <!--                                </table>-->
              <!--                            </div>-->
              <!--                        </div>-->
              <!-- 新格式-->
              <!--左侧列left-->
              <div class="relative w-[26rem]   h-[calc(100%-1rem)] ml-8  m-2  flex-col flex justify-start items-center ">
                <!--设置参数-->
                <div class="relative border shadow w-[20rem] m-2 rounded-2xl mb-14 justify-start items-center">
                  <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium ">
                    <div class="ml-4 ">
                      设置参数
                    </div>
                  </div>
                  <!--表格内容-->
                  <div class="  w-[100%] h-[100%]  top-0    justify-center flex mb-10  ">
                    <div class="rounded-2xl   w-[calc(100%-1.5rem)]   justify-center flex     ">
                      <div class=" w-full h-[92%] ">
                        <div class=" box-border overflow-x-hidden w-full  flex">
                          <!--原表格left-->
                          <div class="float-left  shadow  border-radius rounded-tl-2xl z-20">
                            <div class="w-[8rem]  overflow-hidden ">
                              <table class="mb-4 shadow  bg-[#E8F6ED] py-4 rounded-bl-2xl">
                                <tr>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>状态</div>
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
                          <!--原表格right-->
                          <div class="right-div ">
                            <div  class="right-div2 flex items-start self-start" >
                              <table class="flex items-start w-[10rem]  ">
                                <div class="flex justify-center items-center">
                                  <tr  class=" justify-center items-center">
                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div class="h-full flex justify-center items-center  ">
                                        <Menu as="div" class="dropdown relative inline-block">
                                          <div>
                                            <MenuButton class="inline-flex w-[7rem] justify-center gap-x-1.5">
                                              <summary v-if="PH_flag==0||PH_flag==null||PH_flag==undefined" class="m-1 btn w-[7rem] text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded-box">停止</summary>
                                              <summary v-if="PH_flag==1" class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] rounded-[1rem]">开启</summary>
                                            </MenuButton>
                                          </div>
                                          <MenuItems class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-box w-[7rem] border absolute origin-top-left left-0 mt-2">
                                            <MenuItem v-slot="{ active }">
                                              <button @click="controlSend('PH_flag',AppGlobal.pageChance,0)" :class="[active ? 'bg-[#E0E0E0] text-[#000000]' : 'text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2]', 'block px-4 py-2 text-sm rounded-[0.5rem]']">停止</button>
                                            </MenuItem>
                                            <MenuItem v-slot="{ active }">
                                              <button @click="controlSend('PH_flag',AppGlobal.pageChance,1)" :class="[active ? 'bg-[#BAE7C7] text-[#256637]' : 'text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2', 'block px-4 py-2 text-sm rounded mt-2']">开启</button>
                                            </MenuItem>
                                          </MenuItems>
                                        </Menu>

                                      </div>
                                    </td>
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      0
                                    </td>
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.setNum.target_PH"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填设定值"
                                               @blur="controlSend('target_PH', AppGlobal.pageChance, localcache.setNum.target_PH)"
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
                <div class="relative  shadow w-[20rem]   border   m-2 rounded-2xl  justify-start items-center">
                  <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium ">
                    <div class="ml-4">
                      控制参数
                    </div>
                  </div>
                  <!--表格内容-->
                  <div class="  w-[100%] h-[100%]  top-0  mb-14  justify-center flex  ">
                    <div class="rounded-2xl   w-[calc(100%-1.5rem)]   justify-center flex     ">
                      <div class=" w-full h-[92%] ">
                        <div class=" box-border overflow-hidden w-full  flex">
                          <!--原表格left-->
                          <div class="float-left   shadow border-radius rounded-tl-2xl z-20">
                            <div class="w-[8rem]  overflow-hidden ">
                              <table class="mb-4 shadow  bg-[#E8F6ED] py-4 rounded-bl-2xl">
                                <tr>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>控制死区</div>
                                  </td>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>误差上限</div>
                                  </td>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>误差下限</div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                          <!--原表格right-->
                          <div class="right-div ">
                            <div  class="right-div2 flex items-start self-start" >
                              <table class="flex items-start w-[10rem]  ">
                                <div class="flex-col justify-center items-center">
                                  <tr  class="flex justify-center items-center">
                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请输控制死区"

                                               required type="number"/>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr  class="flex justify-center items-center">
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.controlNum.PH_upper_limit"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请输误差上限"
                                               @blur="controlSend('PH_upper_limit', AppGlobal.pageChance, localcache.controlNum.PH_upper_limit)"
                                               required type="number"/>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr  class="flex justify-center items-center">
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.controlNum.PH_lower_limit"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请输误差下限"
                                                @blur="controlSend('PH_lower_limit', AppGlobal.pageChance, localcache.controlNum.PH_lower_limit)"
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
              <div class="relative w-[26rem]   h-[calc(100%-1rem)]   m-2  flex-col flex justify-start items-center">


                <!--报警参数-->
                <div class="relative  shadow w-[20rem] mt-11 border  rounded-2xl  justify-start items-center">
                  <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium">
                    <div class="ml-4">
                      报警参数
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
                              <table class="mb-4 shadow  bg-[#E8F6ED] py-4 rounded-bl-2xl">
                                <tr>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>PH报警上限</div>
                                  </td>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>PH报警下限</div>
                                  </td>

                                </tr>
                              </table>
                            </div>
                          </div>
                          <!--原表格right-->
                          <div class="right-div ">
                            <div  class="right-div2 flex items-start self-start" >
                              <table class="flex items-start w-[10rem]  ">
                                <div class="flex justify-center items-center">
                                  <tr  class=" justify-center items-center">
                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.alarmNum.alarm_h_limit"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填报警上限"
                                               @blur="controlSend('alarm_h_limit', AppGlobal.pageChance, localcache.alarmNum.alarm_h_limit)"
                                               required type="number"/>
                                      </div>
                                    </td>
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name"  v-model="localcache.alarmNum.alarm_l_limit"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填报警下限"
                                                @blur="controlSend('alarm_l_limit', AppGlobal.pageChance, localcache.alarmNum.alarm_l_limit)"
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
                </div><!--报警参数-->

                <!--自动参数酸碱pid-->
                <div class="relative  shadow w-[30rem] mt-20  border m-2 rounded-2xl  justify-start items-center">
                  <div class="w-full h-14  rounded-t-2xl flex   items-center text-lg font-medium">
                    <div class="ml-4">
                      自动参数
                    </div>
                  </div>
                  <!--表格内容-->
                  <div class="  w-[100%]   top-0    justify-center flex  ">
                    <div class="rounded-2xl   w-[calc(100%-1.5rem)] mb-5  justify-center flex     ">
                      <div class=" w-full h-[92%] ">
                        <div class=" box-border overflow-x-hidden w-full   flex">
                          <!--表格left-->
                          <div class="float-left   shadow-radius border-radius  rounded-tl-2xl z-20">

                            <div class="bg-[#E8F6ED] ">
                              <table class=" py-4 ">
                                <tr>
                                  <th class="flex items-center justify-center gap-2   ">

                                  </th>
                                </tr>
                              </table>
                            </div>

                            <div class="w-[8rem]  overflow-hidden ">
                              <table class="mb-4 shadow  bg-[#E8F6ED] py-4 rounded-bl-2xl">
                                <tr>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>P</div>
                                  </td>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>I</div>
                                  </td>
                                  <td class="w-full  flex justify-center items-center   ">
                                    <div>D</div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                          <!--表格right-->
                          <div class="right-div ">
                            <div ref="firstRowLayer"
                                 class="right-div1 bg-[#F1F1F1] ">
                              <table class=" flex items-start self-start w-[8.2rem]  rounded-br-2xl">

                                <tr>
                                  <th
                                      class="first-row-style w-[8.2rem]  ">酸泵
                                  </th>
                                </tr>
                              </table>
                            </div>
                            <div  class="right-div2 flex items-start self-start" >
                              <table class="flex items-start w-[10rem]  ">
                                <div class="flex justify-center items-center">
                                  <tr  class=" justify-center items-center">
                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.acidNum.acid_KP"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填酸泵P"
                                                @blur="controlSend('acid_KP', AppGlobal.pageChance, localcache.acidNum.acid_KP)"
                                               required type="number"/>
                                      </div>
                                    </td>
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.acidNum.acid_KI"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填酸泵I"
                                                @blur="controlSend('acid_KI', AppGlobal.pageChance, localcache.acidNum.acid_KI)"
                                               required type="number"/>
                                      </div>
                                    </td>
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.acidNum.acid_KD"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填酸泵D"
                                                @blur="controlSend('acid_KD', AppGlobal.pageChance, localcache.acidNum.acid_KD)"
                                               required type="number"/>
                                      </div>
                                    </td>
                                  </tr>
                                </div>
                              </table>
                            </div>
                          </div>
                          <!--第三列-->
                          <div class="right-div ">
                            <div ref="firstRowLayer"
                                 class="right-div1 bg-[#F1F1F1] ">
                              <table class=" flex items-start self-start w-[8.2rem]  rounded-br-2xl">

                                <tr>
                                  <th
                                      class="first-row-style w-[8.2rem]  ">碱泵
                                  </th>
                                </tr>
                              </table>
                            </div>
                            <div  class="right-div2 flex items-start self-start" >
                              <table class="flex items-start w-[10rem]  ">
                                <div class="flex justify-center items-center">
                                  <tr  class=" justify-center items-center">
                                    <td class=" text-center border-t border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.lyeNum.lye_KP"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填碱泵P"
                                                @blur="controlSend('lye_KP', AppGlobal.pageChance, localcache.lyeNum.lye_KP)"
                                               required type="number"/>
                                      </div>
                                    </td>
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.lyeNum.lye_KI"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填碱泵I"
                                                @blur="controlSend('lye_KI', AppGlobal.pageChance, localcache.lyeNum.lye_KI)"
                                               required type="number"/>
                                      </div>
                                    </td>
                                    <td class=" text-center  border-b border-r  hover:bg-[#FAFAFA] cursor-pointer flex justify-center items-center">
                                      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <input id="name" v-model="localcache.lyeNum.lye_KD"
                                               class="block w-[80%]  border-b-2 m-2 text-center" name="name" placeholder="请填碱泵D"
                                                @blur="controlSend('lye_KD', AppGlobal.pageChance, localcache.lyeNum.lye_KD)"
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
                </div><!--pid-->

              </div>
            </div>

          </div>

        </div>


      </div>


    </div>


</template>

<script lang='ts' setup>

// ______________________导入模块_______________________
import {computed, Ref, ref, watch, onUnmounted, onMounted, reactive} from 'vue'
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {sendData} from '@/api/index.js'
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const DeviceManage = useDeviceManage();
const ProcessPopupMangerState = useProcessPopupMangerState()
const AppGlobal = useAppGlobal();

// --------------------localcache-------------

const localcache = ref({
  setNum: {
    target_PH: null,
    PH_flag: null,
  },
  controlNum: {

    PH_upper_limit: null,
    PH_lower_limit: null,
  },
  alarmNum: {
    alarm_h_limit: null,
    alarm_l_limit: null,
  },
  acidNum: {
    acid_KP: null,
    acid_KI: null,
    acid_KD: null,
  },
  lyeNum: {
    lye_KP: null,
    lye_KI: null,
    lye_KD: null,
  },

})
const PH_flag = localcache.value.setNum.PH_flag

// ______________________表格数据处理_______________________
watch(() => DeviceManage.deviceList, () => {
    initTableData()
}, {deep: true});

interface InputVisible {
    id: number;
    control: boolean;
    cache: number | null;
}

type DeviceInput = InputVisible[];

const inputVisible = ref<DeviceInput[]>([]); // 用于追踪哪一行显示输入框


// 读取表格数据
const initTableData = () => {

    if (!DeviceManage || !Array.isArray(DeviceManage.deviceList)) {
        console.error("Error: DeviceManage.deviceList is not a valid array.");
        return;
    }

    let initheaderData: HeaderItem[] = [
        {title: '凑数的', props: 'name'}
    ];

    DeviceManage.deviceList.forEach(device => {
        
        if (AppGlobal.pageChance != device.id) {

            return;
        }
        if (typeof device.name !== 'string' || typeof device.id !== 'number') {
            console.error("Error: Invalid device entry found in DeviceManage.deviceList.");
            return;
        }

        initheaderData.push({title: device.name, props: 'F1'});
        inputVisible.value.push([])

    });

    headerData.length = 0;  // 清空原始数据
    initheaderData.forEach(item => headerData.push(item));  // 添加新的数据

    const deviceProperties = [
        {name: '状态', prop: 'PH_flag'}, // 0: 停止, 1: 自动
        {name: '测量值', prop: 'timing_PH'},
        {name: '设定值', prop: 'target_PH'},
        {name: '误差上限', prop: 'PH_upper_limit'},
        {name: '误差下限', prop: 'PH_lower_limit'},
        {name: '酸泵比例P', prop: 'acid_KP'},
        {name: '酸泵积分I', prop: 'acid_KI'},
        {name: '酸泵微分D', prop: 'acid_KD'},
        {name: '碱泵比例P', prop: 'lye_KP'},
        {name: '碱泵积分I', prop: 'lye_KI'},
        {name: '碱泵微分D', prop: 'lye_KD'},
        {name: '报警上限', prop: 'alarm_h_limit'}, //报警上限
        {name: '报警下限', prop: 'alarm_l_limit'}  //报警下限
    ]


    let resultItems: any[] = []; // 声明结果数组
    deviceProperties.map((deviceProp, deviceIndex) => {
        let tableItem = {
            name: deviceProp.name,
            prop: deviceProp.prop
        };
        initheaderData.forEach((header, index) => {
            
            if (index === 0) {
                return;
            }
            index--;
            if (AppGlobal.pageChance === index) {
                inputVisible.value[index].push({id: deviceIndex, control: false, cache: null});


            }


            if (DeviceManage.deviceList[index].nowData == null && deviceProp.prop != "alarm_h_limit" && deviceProp.prop != "alarm_l_limit") {
                tableItem[header.props] = 0;

                return;
            }

            // 报警上限
            if (deviceProp.prop == "alarm_h_limit") {
                if (DeviceManage.deviceList[index]?.deviceSet?.doMaxWarn !== null) {
                    const doMaxWarn = DeviceManage.deviceList[index]?.deviceSet?.doMaxWarn ?? 0;
                    tableItem[header.props] = doMaxWarn;
                } else {
                    tableItem[header.props] = 0;
                }
            }
            // 报警下限
            else if (deviceProp.prop == "alarm_l_limit") {
                if (DeviceManage.deviceList[index]?.deviceSet?.doMinWarn !== null) {
                    const doMinWarn = DeviceManage.deviceList[index]?.deviceSet?.doMinWarn ?? 0;
                    tableItem[header.props] = doMinWarn;
                } else {
                    tableItem[header.props] = 0;
                }
            } else {
                try {
                    const value = DeviceManage.deviceList[index].nowData![deviceProp.prop];
                    if (typeof value === 'number' && !Number.isInteger(value)) {
                        tableItem[header.props] = parseFloat(value.toFixed(2));
                    } else {
                        tableItem[header.props] = value;
                    }
                } catch (e) {
                    console.error(`Error: The property ${deviceProp.prop} is missing or null for device at index ${index}.`);
                    return;
                }
            }
        });

        resultItems.push(tableItem);
        return tableItem;
    });

    tableData.length = 0;  // 清空原始数据
    resultItems.forEach(item => tableData.push(item));  // 添加新的数据

}
const keyupEnterInput = (deviceID: number, setIndex: number) => {

    inputVisible.value[deviceID][setIndex].control = false;

    if (setIndex == 0 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.target_PH = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 1 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.PH_upper_limit = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 2 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.PH_lower_limit = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 3 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.acid_KP = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 4 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.acid_KI = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 5 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.acid_KD = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 6 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.lye_KP = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 7 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.lye_KI = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 8 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.nowData) {
            DeviceManage.deviceList[deviceID]!.nowData!.lye_KD = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }

    if (setIndex == 9 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.deviceSet) {
            DeviceManage.deviceList[deviceID]!.deviceSet!.phMaxWarn = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex == 10 && inputVisible.value[deviceID][setIndex].cache != null) {
        if (DeviceManage.deviceList[deviceID] && DeviceManage.deviceList[deviceID]!.deviceSet) {
            DeviceManage.deviceList[deviceID]!.deviceSet!.phMinWarn = inputVisible.value[deviceID][setIndex].cache || 0;
        }
    }
    if (setIndex >= 0 && setIndex <= 8) {
        controlSend('all', deviceID, 0)
    }


}

const placeholder = ref([
    "请输设定值",
    "请输误差上限",
    "请输误差下限",
    "请输酸泵P",
    "请输酸泵I",
    "请输酸泵D",
    "请输碱泵P",
    "请输碱泵I",
    "请输碱泵D",
    "请输报警上限",
    "请输报警下限",


])

const firstCol = computed(() => props.tableData.map(p => {
    const pArr = Object.keys(p);
    return p[pArr[0]]
}))


const firstRow = computed(() => {
    const rows: string[] = [];
    props.headerData.forEach((f, i) => {
        if (i !== 0) {
            rows.push(f.title)
        }
    })
    return rows;
})


const tableBodyRows = computed(() => {
    let arr: { [key: string]: any }[] = [];
    props.tableData.forEach((f, index) => {

        let res: { [key: string]: any } = {};
        for (const key in f) {
            if (Object.prototype.hasOwnProperty.call(f, key)) {
                if (key !== props.headerData[0].title) {
                    res[key] = f[key]
                }
            }
        }
        arr.push(res)
    })
    return arr
})

const tableBodyCols = computed(() => {
    let arr: { title: string, props: string }[] = []
    props.headerData.forEach((f, i) => {
        if (i !== 0) {
            arr.push(f)
        }
    })
    return arr;
})


// ______________________表格数据变量_______________________

const headerData: HeaderItem[] = reactive([
    {title: '姓名', props: 'name'},


    // 你可以按需增加其他列
]);


const tableData: any = reactive([
    {name: '测量值', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
    {name: '设定值', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
    {name: '控制周期', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
    {name: '周期开度', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
    {name: '比例P', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
    {name: '积分I', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
    {name: '微分D', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
    {name: '控制死区', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
    {name: '报警上限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
    {name: '报警下限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
]);

const controlSend = ((name, index, content) => {
    if (name=='PH_flag') {
        const data = {
            PH_flag: content
        }
        sendData(index, data);
    }
    if (name == 'all') {
        const data = {
            // TODO 数据发送分割，一次性发送多了容易崩
            target_PH: Number(DeviceManage.deviceList[index]!.nowData!.target_PH),
            PH_upper_limit: Number(DeviceManage.deviceList[index]!.nowData!.PH_upper_limit),
            PH_lower_limit: Number(DeviceManage.deviceList[index]!.nowData!.PH_lower_limit),
            acid_KP: Number(DeviceManage.deviceList[index]!.nowData!.acid_KP),
            acid_KI: Number(DeviceManage.deviceList[index]!.nowData!.acid_KI),
            acid_KD: Number(DeviceManage.deviceList[index]!.nowData!.acid_KD),
            lye_KP: Number(DeviceManage.deviceList[index]!.nowData!.lye_KP),
            lye_KI: Number(DeviceManage.deviceList[index]!.nowData!.lye_KI),
            lye_KD: Number(DeviceManage.deviceList[index]!.nowData!.lye_KD),
        }
        sendData(index, data);
    }


})
const props = {
    headerData: headerData,
    tableData: tableData
};


// ______________________功能函数_______________________
const closePop = () => {
    ProcessPopupMangerState.updateIsShowPop(false)
}

const tableContainer: Ref<HTMLDivElement | null> = ref(null);
const firstRowLayer: Ref<HTMLDivElement | null> = ref(null);
const firstColLayer: Ref<HTMLDivElement | null> = ref(null);

const tableScroll = () => {
    firstRowLayer.value!.scrollLeft = tableContainer.value!.scrollLeft;
    firstColLayer.value!.scrollTop = tableContainer.value!.scrollTop;
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
//   循环
//   setInterval(() => {
//     // sendData(0)
//   }, 10000)
    initTableData()
});

// 当组件卸载时移除事件监听器
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});


/* ______________________静态接口_____________________________ */
interface HeaderItem {
    title: string;
    props: string;
}


const name_translation = {
    '运行状态': 'None',
    '运行时间': 'None',
    '发酵批号': 'None',
    '温度': 'Temperature',
    'PH值': 'PHValue',
    '溶氧': 'DissolvedOxygen',
    '转速': 'RPM',
    '酸泵': 'AcidPump',
    '碱泵': 'LyePump',
    '补料泵': 'FeedPump',
    '消泡剂泵': 'DefoamerPump'
}

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