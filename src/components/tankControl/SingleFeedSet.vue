<template>
    <template v-if="localCache">
        <div class="h-[92vh] w-[82vw] overflow-auto relative transition-all duration-300 ease-in-out shadow bg-white rounded-2xl border-2  border-[#4EA67D] flex justify-start items-center">
            <!-- 关闭按钮 -->
            <div class="bg-[#F5F5F5] z-10 fixed right-[9vw] top-[4vh] top-0 w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer"
                 @click="closePop">
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                          fill="#19161D"/>
                </svg>
            </div>
            <!-- 左侧栏 -->
            <div class="relative w-[26rem]   h-[calc(100%-1rem)]   m-2  flex-col flex justify-start items-center">
                
                <!--开关选择-->
                <div class="relative  shadow w-[26rem]   h-[26rem] overflow-auto  m-2 rounded-2xl flex-col flex justify-start items-center">
                    <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">补料泵2总开关
                        
                        <Switch v-model="localCache.totalSwitch"
                                :class="[localCache.totalSwitch ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex ml-2 h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                            <span class="sr-only">Use setting</span>
                            <span :class="[localCache.totalSwitch ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
                                  aria-hidden="true"/>
                        </Switch>
                    
                    
                    </div>
                    <!--手动开关-->
                    <div :class="[localCache.supplementSwitch.type===1? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                         class="w-[90%] h-16 mt-2  rounded-xl flex justify-start items-center  ">
                        <!--左边部分-->
                        <div class="w-[60%]  h-full flex  justify-center items-start m-3">
                            <div class="h-full gap-10  flex justify-center items-center">
                                手动补料
                                <Switch v-model="localCache.supplementSwitch.manual"
                                        :class="[localCache.supplementSwitch.manual ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                                    <span class="sr-only">Use setting</span>
                                    <span :class="[localCache.supplementSwitch.manual ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
                                          aria-hidden="true"/>
                                </Switch>
                            </div>
                        
                        </div>
                        <!--右边部分-->
                        <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                            <div class="h-full flex justify-center items-center  pr-2">
                                
                                <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                     :class="[localCache.supplementSwitch.type===1? 'bg-green-800 ':'']"
                                     @click="postFeedSet(0,1)">
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
                    <div :class="[localCache.supplementSwitch.type===2? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                         class="w-[90%] h-[8rem] mt-2  rounded-2xl flex justify-start items-center ">
                        <!--左边部分-->
                        <div class="w-[30%]  h-full flex-col justify-center items-start ml-5">
                            <div class="h-1/2  flex justify-center items-center mt-2">
                                触发补料
                            </div>
                            <div class="h-1/2 flex justify-center items-center ">
                                <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                     :class="[localCache.supplementSwitch.type===2? 'bg-green-800 ':'']"
                                     @click="postFeedSet(0,2)">
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
                        <div class="w-[60%]  h-full flex-col flex justify-center items-center m-3">
                            
                            <div class="    w-full origin-top-right divide-y divide-gray-100  bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none">
                                
                                <div class="py-1" >
                                    <div :class="[localCache.supplementSwitch.trigger.dissolvedOxygen.selected ? 'bg-[rgb(218,240,228)] text-gray-900' : 'text-gray-700', 'group flex items-center text-sm cursor-pointer  py-1']">
                                        
                                        
                                        <input id="name" v-model="localCache.supplementSwitch.trigger.dissolvedOxygen.upperLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="上限"
                                               type="text"/>
                                        
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        
                                        <BeakerIcon aria-hidden="true"
                                                    class="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                                        <span class="mr-1 h-5 w-7 " @click="localCache.supplementSwitch.trigger.dissolvedOxygen.selected=!localCache.supplementSwitch.trigger.dissolvedOxygen.selected">
                                        溶氧
                                    </span>
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                            tt
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        <input id="name" v-model="localCache.supplementSwitch.trigger.dissolvedOxygen.lowerLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="下限"
                                               type="text"/>
                                    </div>
                                </div>
                                <div class="py-1" >
                                    
                                    <div :class="[localCache.supplementSwitch.trigger.pH.selected ? 'bg-[rgb(218,240,228)] text-gray-900' : 'text-gray-700', 'group flex items-center text-sm cursor-pointer  py-1']">
                                        <input id="name" v-model="localCache.supplementSwitch.trigger.pH.upperLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="上限"
                                               type="text"/>
                                        
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        
                                        <EyeDropperIcon aria-hidden="true"
                                                        class="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                                        <span class="mr-1 h-5 w-7 " @click="localCache.supplementSwitch.trigger.pH.selected=!localCache.supplementSwitch.trigger.pH.selected">
                                        PH
                                    </span>
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        <input id="name" v-model="localCache.supplementSwitch.trigger.pH.lowerLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="下限"
                                               type="text"/>
                                    </div>
                                </div>
                                <div class="py-1" >
                                    
                                    <div :class="[localCache.supplementSwitch.trigger.speed.selected ? 'bg-[rgb(218,240,228)] text-gray-900' : 'text-gray-700', 'group flex items-center text-sm cursor-pointer  py-1']">
                                        <input id="name" v-model="localCache.supplementSwitch.trigger.speed.upperLimit"
                                               class="block w-[2rem]  h-[100%]  bg-transparent" name="name"
                                               placeholder="上限"
                                               type="text"/>
                                        
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        <ArrowPathIcon aria-hidden="true"
                                                       class="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                                        <span class="mr-1 h-5 w-7 " @click="localCache.supplementSwitch.trigger.speed.selected=!localCache.supplementSwitch.trigger.speed.selected">
                                        转速
                                    </span>
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        <input id="name" v-model="localCache.supplementSwitch.trigger.speed.lowerLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="下限"
                                               type="text"/>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                        <!--右边部分-->
                        <div class="w-[10%]  h-full flex-col justify-center items-start m-3">
                            <div class="h-full  flex  justify-center items-center flex-col">
                                
                                <div class="cursor-pointer " @click="localCache.supplementSwitch.trigger.logic===1?localCache.supplementSwitch.trigger.logic=0:localCache.supplementSwitch.trigger.logic=1">
                                    <kbd class="kbd kbd-sm ">{{localCache.supplementSwitch.trigger.logic===1?'或':'且'}}</kbd>
                                </div>
                                <div class="w-full bg-gray-200 h-0.5 m-2"></div>
                                <div class="cursor-pointer ">
                                    <div class="tooltip w-full   tooltip-bottom tooltip-success" data-tip="t0捕捉开关">
                                        
                                        <Switch v-model="localCache.supplementSwitch.trigger.t0"
                                                :class="[localCache.supplementSwitch.trigger.t0 ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                                            <span class="sr-only">Use setting</span>
                                            <span :class="[localCache.supplementSwitch.trigger.t0 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
                                                  aria-hidden="true"/>
                                        </Switch>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    
                    </div>
                    <!--关联补料-->
                    <div :class="[localCache.supplementSwitch.type===3? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                         class="w-[90%] h-[8rem] mt-2  rounded-2xl flex justify-start items-center ">
                        <!--左边部分-->
                        <div class="w-[30%]  h-full flex-col justify-center items-start ml-5">
                            <div class="h-1/2  flex justify-center items-center mt-2">
                                关联补料
                            </div>
                            <div class="h-1/2 flex justify-center items-center ">
                                <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                     :class="[localCache.supplementSwitch.type===3? 'bg-green-800 ':'']"
                                     @click="postFeedSet(0,3)">
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
                        <div class="w-[60%]  h-full flex-col flex justify-center items-center m-3">
                            
                            <div class="    w-full origin-top-right divide-y divide-gray-100  bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none">
                                
                                <div class="py-1" >
                                    <div :class="[localCache.supplementSwitch.related.dissolvedOxygen.selected ? 'bg-[rgb(218,240,228)] text-gray-900' : 'text-gray-700', 'group flex items-center text-sm cursor-pointer  py-1']">
                                        <input id="name" v-model="localCache.supplementSwitch.related.dissolvedOxygen.upperLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="上限"
                                               type="text"/>
                                        
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        
                                        <BeakerIcon aria-hidden="true"
                                                    class="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                                        <span class="mr-1 h-5 w-7 " @click="localCache.supplementSwitch.related.dissolvedOxygen.selected=!localCache.supplementSwitch.related.dissolvedOxygen.selected">
                                        溶氧
                                    </span>
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                            tt
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        <input id="name" v-model="localCache.supplementSwitch.related.dissolvedOxygen.lowerLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="下限"
                                               type="text"/>
                                    </div>
                                </div>
                                <div class="py-1" >
                                    
                                    <div :class="[localCache.supplementSwitch.related.pH.selected ? 'bg-[rgb(218,240,228)] text-gray-900' : 'text-gray-700', 'group flex items-center text-sm cursor-pointer  py-1']">
                                        <input id="name" v-model="localCache.supplementSwitch.related.pH.upperLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="上限"
                                               type="text"/>
                                        
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        
                                        <EyeDropperIcon aria-hidden="true"
                                                        class="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                                        <span class="mr-1 h-5 w-7 " @click="localCache.supplementSwitch.related.pH.selected=!localCache.supplementSwitch.related.pH.selected">
                                        PH
                                    </span>
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        <input id="name" v-model="localCache.supplementSwitch.related.pH.lowerLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="下限"
                                               type="text"/>
                                    </div>
                                </div>
                                <div class="py-1" >
                                    
                                    <div :class="[localCache.supplementSwitch.related.speed.selected ? 'bg-[rgb(218,240,228)] text-gray-900' : 'text-gray-700', 'group flex items-center text-sm cursor-pointer  py-1']">
                                        <input id="name" v-model="localCache.supplementSwitch.related.speed.upperLimit"
                                               class="block w-[2rem]  h-[100%]  bg-transparent" name="name"
                                               placeholder="上限"
                                               type="text"/>
                                        
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        
                                        <ArrowPathIcon aria-hidden="true"
                                                       class="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                                        <span class="mr-1 h-5 w-7 " @click="localCache.supplementSwitch.related.speed.selected=!localCache.supplementSwitch.related.speed.selected">
                                        转速
                                    </span>
                                        <kbd class="kbd kbd-sm mr-1">
                                            <svg aria-hidden="true" height="1.312ex" style=""
                                                 viewBox="0 -540 778 580" width="1.76ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-4-TEX-N-3E"
                                                          d="M84 520Q84 528 88 533T96 539L99 540Q106 540 253 471T544 334L687 265Q694 260 694 250T687 235Q685 233 395 96L107 -40H101Q83 -38 83 -20Q83 -19 83 -17Q82 -10 98 -1Q117 9 248 71Q326 108 378 132L626 250L378 368Q90 504 86 509Q84 513 84 520Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mo">
                                                            <use xlink:href="#MJX-4-TEX-N-3E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                        <input id="name" v-model="localCache.supplementSwitch.related.speed.lowerLimit"
                                               class="block w-[2rem]  h-[100%] bg-transparent " name="name"
                                               placeholder="下限"
                                               type="text"/>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                        <!--右边部分-->
                        <div class="w-[10%]  h-full flex-col justify-center items-start m-3">
                            <div class="h-full  flex  justify-center items-center flex-col">
                                
                                <div class="cursor-pointer " @click="localCache.supplementSwitch.related.logic===1?localCache.supplementSwitch.related.logic=0:localCache.supplementSwitch.related.logic=1">
                                    <kbd class="kbd kbd-sm ">{{ localCache.supplementSwitch.related.logic === 1 ? '或' : '且' }}</kbd>
                                </div>
                            
                            
                            </div>
                        </div>
                    
                    </div>
                
                </div>
                <!--补料方式-->
                <div class="relative  shadow  h-[22rem]  w-[26rem]  overflow-auto  mb-2 rounded-2xl flex-col flex justify-start items-center">
                    <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">补料方式</div>
                    <!--持续补料-->
                    <div :class="[localCache.supplementMethod.type===1? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                         class="w-[90%] h-20 mt-4  rounded-2xl flex justify-start items-center ">
                        <!--左边部分-->
                        <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                            <div class="h-full  flex justify-center items-center">
                                持续补料
                            </div>
                        
                        </div>
                        <!--右边部分-->
                        <div class="w-[60%]  h-full flex-col justify-center items-start m-3">
                            <div class="h-full flex justify-center items-center ">
                                <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                     :class="[localCache.supplementMethod.type===1? 'bg-green-800 ':'']"
                                     @click="postFeedSet(1,1)">
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
                    <div  :class="[localCache.supplementMethod.type===2? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                          class="w-[90%] h-[10rem] mt-4  rounded-2xl flex justify-start items-center ">
                        <!--左边部分-->
                        <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                            <div class="h-1/2  flex justify-center items-center mt-2">
                                占空比补料
                            </div>
                            <div class="h-1/2 flex justify-center items-center ">
                                <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                     :class="[localCache.supplementMethod.type===2? 'bg-green-800 ':'']"
                                     @click="postFeedSet(1,2)">
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
                                    补料开度
                                </div>
                                <input id="name" v-model="localCache.supplementMethod.dutyCycle.opening"
                                       class="block w-[80%]  border-b-2 m-2" name="name" placeholder="单位 s"
                                       required type="number"/>
                            
                            </div>
                            <div class="h-1/3  flex ">
                                <div class="w-24 justify-start items-center flex">
                                    检测周期
                                </div>
                                <div class="block w-[80%]    m-2">
                                    
                                    <Menu as="div" class="relative inline-block text-left">
                                        <div>
                                            <MenuButton
                                                    class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                {{ localCache.supplementMethod.dutyCycle.detectionPeriod===null? '选择周期':localCache.supplementMethod.dutyCycle.detectionPeriod+'s' }}
                                                <ChevronDownIcon aria-hidden="true" class="-mr-1 h-5 w-5 text-gray-400"/>
                                            </MenuButton>
                                        </div>
                                        
                                        <transition enter-active-class="transition ease-out duration-100"
                                                    enter-from-class="transform opacity-0 scale-95"
                                                    enter-to-class="transform opacity-100 scale-100"
                                                    leave-active-class="transition ease-in duration-75"
                                                    leave-from-class="transform opacity-100 scale-100"
                                                    leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems
                                                    class="absolute flex right-0 z-10 mt-2 w-50 origin-top-right  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div class="py-1 flex">
                                                    <MenuItem v-slot="{ active }" @click="localCache.supplementMethod.dutyCycle.detectionPeriod=10">
                                                        <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer'] "
                                                        >10s</div>
                                                    </MenuItem>
                                                    <MenuItem v-slot="{ active }" @click="localCache.supplementMethod.dutyCycle.detectionPeriod=20">
                                                        <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']"
                                                        >20s</div>
                                                    </MenuItem>
                                                    <MenuItem v-slot="{ active }" @click="localCache.supplementMethod.dutyCycle.detectionPeriod=30">
                                                        <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']"
                                                        >30s</div>
                                                    </MenuItem>
                                                    <MenuItem v-slot="{ active }" @click="localCache.supplementMethod.dutyCycle.detectionPeriod=60">
                                                        <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']"
                                                        >60s</div>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                </div>
                            
                            </div>
                            
                            <div class="h-1/3  flex ">
                                <div class="w-24 justify-start items-center flex">
                                    实际流速
                                </div>
                                <div  class="block w-[80%]    pt-3   text-gray-400 cursor-no-drop ">
                                    {{!isNumber( DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.feed_ml_h*DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.feed_period/DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.feed_opening_degree)? DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.feed_ml_h*DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.feed_period/DeviceManage.deviceList[AppGlobal.pageChance]?.nowData?.feed_opening_degree+'ml/h':"实际流速"}}
                                </div>
                            
                            </div>
                        </div>
                    </div>
                
                
                </div>
            </div>
            <!-- 中间栏 -->
            <div class="relative w-[26rem]   h-[calc(100%-1rem)]   m-2  flex-col flex justify-start items-center">
                
                <div class="relative  shadow  h-[100%] overflow-auto  m-2 rounded-2xl flex-col flex justify-start items-center">
                    <div class="w-full h-14 bg-[#DAF0E4] rounded-t-2xl flex justify-center items-center">控制方式</div>
                    <div class="h-[calc(100%-3.5rem)]  justify-start items-center flex-col flex">
                        <!--单次补料-->
                        <!--单次补料-->
                        <div class="relative w-[90%] h-[10rem] mt-4  rounded-2xl" >
                            <div :class="[localCache.controlMethod.type===1? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                                 class="w-[100%] h-[10rem]   rounded-2xl flex justify-start items-center  ">
                                <!--左边部分-->
                                <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                                    <div class="h-1/2  flex justify-center items-center mt-2">
                                        单次补料
                                    </div>
                                    <div class="h-1/2 flex justify-center items-center ">
                                        <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                             :class="[localCache.controlMethod.type===1? 'bg-green-800 ':'']"
                                             @click="postFeedSet(2,1)">
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
                                        <input id="name" v-model="localCache.controlMethod.single.amount"
                                               class="block w-[80%]  border-b-2 m-2"
                                               name="name" placeholder="单位 ml" required
                                               type="number"/>
                                    
                                    </div>
                                    
                                    <div class="h-1/3  flex ">
                                        <div class="w-24 justify-start items-center flex">
                                            补料速度
                                        </div>
                                        <input id="name" v-model="localCache.controlMethod.single.speed"
                                               class="block w-[80%]  border-b-2  m-2" name="name"
                                               placeholder="单位 ml/h" required
                                               type="number"/>
                                    
                                    </div>
                                    <div class="h-1/3  flex ">
                                        <div class="w-24 justify-start items-center flex">
                                            冷却周期
                                        </div>
                                        <input id="name" v-model="localCache.controlMethod.single.cycle"
                                               v-if="localCache.supplementSwitch.type===3"
                                               class="block w-[80%]  border-b-2  m-2" name="name"
                                               placeholder="单位 s" required
                                               type="number"/>
                                        <input type="text" v-if="localCache.supplementSwitch.type!==3" class="block w-[80%]  border-b-2  m-2 cursor-no-drop bg-gray-200 " disabled/>
                                    
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <!--恒速补料-->
                        <div :class="[localCache.controlMethod.type===2? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                             class="w-[90%] h-[10rem] mt-4  rounded-2xl flex justify-start items-center ">
                            <!--左边部分-->
                            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                                <div class="h-1/2  flex justify-center items-center mt-2">
                                    恒速补料
                                </div>
                                <div class="h-1/2 flex justify-center items-center ">
                                    <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                         :class="[localCache.controlMethod.type===2? 'bg-green-800 ':'']"
                                         @click="postFeedSet(2,2)">
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
                                    <input id="name" v-model="localCache.controlMethod.constant.speed"
                                           class="block w-[80%]  border-b-2 m-2 h-8" name="name"
                                           placeholder="单位 ml/h" required
                                           type="number"/>
                                
                                </div>
                            
                            </div>
                        </div>
                        <!--分段补料-->
                        <div :class="[localCache.controlMethod.type===3? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                             class="w-[90%] h-[10rem] mt-4  rounded-2xl flex justify-start items-center ">
                            <!--左边部分-->
                            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                                <div class="h-1/2  flex justify-center items-center mt-2">
                                    分段补料
                                </div>
                                <div class="h-1/2 flex justify-center items-center ">
                                    <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                         :class="[localCache.controlMethod.type===3? 'bg-green-800 ':'']"
                                         @click="postFeedSet(2,3)">
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
                        <div :class="[localCache.controlMethod.type===4? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                             class="w-[90%] h-[17rem] mt-4  rounded-2xl flex justify-start items-center ">
                            <!--左边部分-->
                            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                                <div class="h-1/2  flex justify-center items-center mt-2 flex-col">
                                    线性补料
                                    <div class="w-24">
                                        <input class="input input-bordered w-full max-w-xs m-1 " disabled
                                               placeholder="单位 ml/h" type="text"/>
                                    </div>
                                </div>
                                <div class="h-1/2 flex justify-center items-center ">
                                    <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                         :class="[localCache.controlMethod.type===4? 'bg-green-800 ':'']"
                                         @click="postFeedSet(2,4)">
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
                                    <input id="name" v-model="localCache.time.t0_time_diff"
                                           class="block w-[80%]  border-b-2 m-2" name="name"
                                           placeholder="时间初始值" required
                                           type="number"/>
                                
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1">
                                    <div class="w-24 justify-start items-center flex">
                                        <kbd class="kbd kbd-md">
                                            <svg aria-hidden="true" height="1.913ex" style=""
                                                 viewBox="0 -680 1046.6 845.6" width="2.368ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-52-TEX-I-1D439"
                                                          d="M48 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H742Q749 676 749 669Q749 664 736 557T722 447Q720 440 702 440H690Q683 445 683 453Q683 454 686 477T689 530Q689 560 682 579T663 610T626 626T575 633T503 634H480Q398 633 393 631Q388 629 386 623Q385 622 352 492L320 363H375Q378 363 398 363T426 364T448 367T472 374T489 386Q502 398 511 419T524 457T529 475Q532 480 548 480H560Q567 475 567 470Q567 467 536 339T502 207Q500 200 482 200H470Q463 206 463 212Q463 215 468 234T473 274Q473 303 453 310T364 317H309L277 190Q245 66 245 60Q245 46 334 46H359Q365 40 365 39T363 19Q359 6 353 0H336Q295 2 185 2Q120 2 86 2T48 1Z"></path>
                                                    <path id="MJX-52-TEX-N-30"
                                                          d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="msub">
                                                            <g data-mml-node="mi">
                                                                <use xlink:href="#MJX-52-TEX-I-1D439"></use>
                                                            </g>
                                                            <g data-mml-node="mn"
                                                               transform="translate(643, -150) scale(0.707)">
                                                                <use xlink:href="#MJX-52-TEX-N-30"></use>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                    </div>
                                    <input id="name" v-model="localCache.controlMethod.linear.offset"
                                           class="block w-[80%]  border-b-2  m-2" name="name"
                                           placeholder="补料偏移" required
                                           type="number"/>
                                
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1">
                                    <div class="w-24 justify-start items-center flex">
                                        <kbd class="kbd kbd-md">
                                            <svg aria-hidden="true" height="1.545ex" style=""
                                                 viewBox="0 -683 889 683" width="2.011ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-54-TEX-I-1D43E"
                                                          d="M285 628Q285 635 228 637Q205 637 198 638T191 647Q191 649 193 661Q199 681 203 682Q205 683 214 683H219Q260 681 355 681Q389 681 418 681T463 682T483 682Q500 682 500 674Q500 669 497 660Q496 658 496 654T495 648T493 644T490 641T486 639T479 638T470 637T456 637Q416 636 405 634T387 623L306 305Q307 305 490 449T678 597Q692 611 692 620Q692 635 667 637Q651 637 651 648Q651 650 654 662T659 677Q662 682 676 682Q680 682 711 681T791 680Q814 680 839 681T869 682Q889 682 889 672Q889 650 881 642Q878 637 862 637Q787 632 726 586Q710 576 656 534T556 455L509 418L518 396Q527 374 546 329T581 244Q656 67 661 61Q663 59 666 57Q680 47 717 46H738Q744 38 744 37T741 19Q737 6 731 0H720Q680 3 625 3Q503 3 488 0H478Q472 6 472 9T474 27Q478 40 480 43T491 46H494Q544 46 544 71Q544 75 517 141T485 216L427 354L359 301L291 248L268 155Q245 63 245 58Q245 51 253 49T303 46H334Q340 37 340 35Q340 19 333 5Q328 0 317 0Q314 0 280 1T180 2Q118 2 85 2T49 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q147 65 216 339T285 628Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mi">
                                                            <use xlink:href="#MJX-54-TEX-I-1D43E"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                    </div>
                                    <input id="name" v-model="localCache.controlMethod.linear.slope"
                                           class="block w-[80%]  border-b-2  m-2" name="name"
                                           placeholder="补料系数" required
                                           type="number"/>
                                
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1">
                                    <div class="w-24 justify-start items-center flex">
                                        速度上限
                                    </div>
                                    <input id="name" v-model="localCache.controlMethod.linear.speedUpperLimit"
                                           class="block w-[80%]  border-b-2  m-2" name="name"
                                           placeholder="速度上限" required
                                           type="number"/>
                                
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1">
                                    <div class="w-24 justify-start items-center flex">
                                        速度下限
                                    </div>
                                    <input id="name" v-model="localCache.controlMethod.linear.speedLowerLimit"
                                           class="block w-[80%]  border-b-2  m-2" name="name"
                                           placeholder="速度下限" required
                                           type="number"/>
                                
                                </div>
                            </div>
                        </div>
                        <!--指数补料-->
                        <div :class="[localCache.controlMethod.type===5? 'border-[0.2rem]  border-[#4EA67D]':'border border-[#D6D6D6] hover:border-[#4EA67D] ']"
                             class="w-[90%] h-[17rem] mt-4  rounded-2xl flex justify-start items-center ">
                            <!--左边部分-->
                            <div class="w-[40%]  h-full flex-col justify-center items-start m-3">
                                <div class="h-1/2  flex justify-center items-center mt-2 flex-col">
                                    指数补料
                                    <div class="w-24">
                                        <input class="input input-bordered w-full max-w-xs m-1 " disabled
                                               placeholder="单位 ml/h" type="text"/>
                                    </div>
                                </div>
                                <div class="h-1/2 flex justify-center items-center ">
                                    <div class="bg-gray-300 border border-gray-400 w-16 h-7 rounded-md flex justify-center items-center cursor-pointer hover:bg-green-800  hover:bg-green-800 "
                                         :class="[localCache.controlMethod.type===5? 'bg-green-800 ':'']"
                                         @click="postFeedSet(2,5)">
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
                                        <svg aria-hidden="true" height="2.7ex" style=""
                                             viewBox="0 -943.3 8003.7 1193.3" width="18.108ex"
                                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <defs>
                                                <path id="MJX-184-TEX-I-1D439"
                                                      d="M48 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H742Q749 676 749 669Q749 664 736 557T722 447Q720 440 702 440H690Q683 445 683 453Q683 454 686 477T689 530Q689 560 682 579T663 610T626 626T575 633T503 634H480Q398 633 393 631Q388 629 386 623Q385 622 352 492L320 363H375Q378 363 398 363T426 364T448 367T472 374T489 386Q502 398 511 419T524 457T529 475Q532 480 548 480H560Q567 475 567 470Q567 467 536 339T502 207Q500 200 482 200H470Q463 206 463 212Q463 215 468 234T473 274Q473 303 453 310T364 317H309L277 190Q245 66 245 60Q245 46 334 46H359Q365 40 365 39T363 19Q359 6 353 0H336Q295 2 185 2Q120 2 86 2T48 1Z"></path>
                                                <path id="MJX-184-TEX-N-28"
                                                      d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path>
                                                <path id="MJX-184-TEX-I-1D461"
                                                      d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path>
                                                <path id="MJX-184-TEX-N-29"
                                                      d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path>
                                                <path id="MJX-184-TEX-N-3D"
                                                      d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path>
                                                <path id="MJX-184-TEX-N-30"
                                                      d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path>
                                                <path id="MJX-184-TEX-N-22C5"
                                                      d="M78 250Q78 274 95 292T138 310Q162 310 180 294T199 251Q199 226 182 208T139 190T96 207T78 250Z"></path>
                                                <path id="MJX-184-TEX-I-1D452"
                                                      d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path>
                                                <path id="MJX-184-TEX-I-1D462"
                                                      d="M21 287Q21 295 30 318T55 370T99 420T158 442Q204 442 227 417T250 358Q250 340 216 246T182 105Q182 62 196 45T238 27T291 44T328 78L339 95Q341 99 377 247Q407 367 413 387T427 416Q444 431 463 431Q480 431 488 421T496 402L420 84Q419 79 419 68Q419 43 426 35T447 26Q469 29 482 57T512 145Q514 153 532 153Q551 153 551 144Q550 139 549 130T540 98T523 55T498 17T462 -8Q454 -10 438 -10Q372 -10 347 46Q345 45 336 36T318 21T296 6T267 -6T233 -11Q189 -11 155 7Q103 38 103 113Q103 170 138 262T173 379Q173 380 173 381Q173 390 173 393T169 400T158 404H154Q131 404 112 385T82 344T65 302T57 280Q55 278 41 278H27Q21 284 21 287Z"></path>
                                                <path id="MJX-184-TEX-N-2212"
                                                      d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"></path>
                                            </defs>
                                            <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                               transform="matrix(1 0 0 -1 0 0)">
                                                <g data-mml-node="math">
                                                    <g data-mml-node="mi">
                                                        <use xlink:href="#MJX-184-TEX-I-1D439"></use>
                                                    </g>
                                                    <g data-mml-node="mo" transform="translate(749, 0)">
                                                        <use xlink:href="#MJX-184-TEX-N-28"></use>
                                                    </g>
                                                    <g data-mml-node="mi" transform="translate(1138, 0)">
                                                        <use xlink:href="#MJX-184-TEX-I-1D461"></use>
                                                    </g>
                                                    <g data-mml-node="mo" transform="translate(1499, 0)">
                                                        <use xlink:href="#MJX-184-TEX-N-29"></use>
                                                    </g>
                                                    <g data-mml-node="mo" transform="translate(2165.8, 0)">
                                                        <use xlink:href="#MJX-184-TEX-N-3D"></use>
                                                    </g>
                                                    <g data-mml-node="msub" transform="translate(3221.6, 0)">
                                                        <g data-mml-node="mi">
                                                            <use xlink:href="#MJX-184-TEX-I-1D439"></use>
                                                        </g>
                                                        <g data-mml-node="mn" transform="translate(643, -150) scale(0.707)">
                                                            <use xlink:href="#MJX-184-TEX-N-30"></use>
                                                        </g>
                                                    </g>
                                                    <g data-mml-node="mo" transform="translate(4490.3, 0)">
                                                        <use xlink:href="#MJX-184-TEX-N-22C5"></use>
                                                    </g>
                                                    <g data-mml-node="msup" transform="translate(4990.6, 0)">
                                                        <g data-mml-node="mi">
                                                            <use xlink:href="#MJX-184-TEX-I-1D452"></use>
                                                        </g>
                                                        <g data-mjx-texclass="ORD"
                                                           data-mml-node="TeXAtom"
                                                           transform="translate(466, 413) scale(0.707)">
                                                            <g data-mml-node="mi">
                                                                <use xlink:href="#MJX-184-TEX-I-1D462"></use>
                                                            </g>
                                                            <g data-mml-node="mo" transform="translate(572, 0)">
                                                                <use xlink:href="#MJX-184-TEX-N-22C5"></use>
                                                            </g>
                                                            <g data-mml-node="mo" transform="translate(850, 0)">
                                                                <use xlink:href="#MJX-184-TEX-N-28"></use>
                                                            </g>
                                                            <g data-mml-node="mi" transform="translate(1239, 0)">
                                                                <use xlink:href="#MJX-184-TEX-I-1D461"></use>
                                                            </g>
                                                            <g data-mml-node="mo" transform="translate(1600, 0)">
                                                                <use xlink:href="#MJX-184-TEX-N-2212"></use>
                                                            </g>
                                                            <g data-mml-node="msub" transform="translate(2378, 0)">
                                                                <g data-mml-node="mi">
                                                                    <use xlink:href="#MJX-184-TEX-I-1D461"></use>
                                                                </g>
                                                                <g data-mml-node="mn"
                                                                   transform="translate(361, -150) scale(0.707)">
                                                                    <use xlink:href="#MJX-184-TEX-N-30"></use>
                                                                </g>
                                                            </g>
                                                            <g data-mml-node="mo" transform="translate(3142.6, 0)">
                                                                <use xlink:href="#MJX-184-TEX-N-29"></use>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </kbd>
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1">
                                    <div class="w-24 justify-start items-center flex">
                                        <kbd class="kbd kbd-md">
                                            <svg aria-hidden="true" height="1.791ex" style=""
                                                 viewBox="0 -626 764.6 791.6" width="1.73ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-194-TEX-I-1D461"
                                                          d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path>
                                                    <path id="MJX-194-TEX-N-30"
                                                          d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="msub">
                                                            <g data-mml-node="mi">
                                                                <use xlink:href="#MJX-194-TEX-I-1D461"></use>
                                                            </g>
                                                            <g data-mml-node="mn"
                                                               transform="translate(361, -150) scale(0.707)">
                                                                <use xlink:href="#MJX-194-TEX-N-30"></use>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                    </div>
                                    <input id="name" v-model="localCache.time.t0_time_diff"
                                           class="block w-[80%]  border-b-2  m-2" name="name"
                                           placeholder="时间初始值" required
                                           type="number"/>
                                
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1 ">
                                    <div class="w-24 justify-start items-center flex">
                                        
                                        <kbd class="kbd kbd-md">
                                            <svg aria-hidden="true" height="1.913ex" style=""
                                                 viewBox="0 -680 1046.6 845.6" width="2.368ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-188-TEX-I-1D439"
                                                          d="M48 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H742Q749 676 749 669Q749 664 736 557T722 447Q720 440 702 440H690Q683 445 683 453Q683 454 686 477T689 530Q689 560 682 579T663 610T626 626T575 633T503 634H480Q398 633 393 631Q388 629 386 623Q385 622 352 492L320 363H375Q378 363 398 363T426 364T448 367T472 374T489 386Q502 398 511 419T524 457T529 475Q532 480 548 480H560Q567 475 567 470Q567 467 536 339T502 207Q500 200 482 200H470Q463 206 463 212Q463 215 468 234T473 274Q473 303 453 310T364 317H309L277 190Q245 66 245 60Q245 46 334 46H359Q365 40 365 39T363 19Q359 6 353 0H336Q295 2 185 2Q120 2 86 2T48 1Z"></path>
                                                    <path id="MJX-188-TEX-N-30"
                                                          d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="msub">
                                                            <g data-mml-node="mi">
                                                                <use xlink:href="#MJX-188-TEX-I-1D439"></use>
                                                            </g>
                                                            <g data-mml-node="mn"
                                                               transform="translate(643, -150) scale(0.707)">
                                                                <use xlink:href="#MJX-188-TEX-N-30"></use>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                    </div>
                                    <input id="name" v-model="localCache.controlMethod.exponential.offset"
                                           class="block w-[80%]  border-b-2 m-2" name="name"
                                           placeholder="补料偏移" required
                                           type="number"/>
                                
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1">
                                    <div class="w-24 justify-start items-center flex">
                                        <kbd class="kbd kbd-md">
                                            <svg aria-hidden="true" height="1.025ex" style=""
                                                 viewBox="0 -442 572 453" width="1.294ex"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <defs>
                                                    <path id="MJX-198-TEX-I-1D462"
                                                          d="M21 287Q21 295 30 318T55 370T99 420T158 442Q204 442 227 417T250 358Q250 340 216 246T182 105Q182 62 196 45T238 27T291 44T328 78L339 95Q341 99 377 247Q407 367 413 387T427 416Q444 431 463 431Q480 431 488 421T496 402L420 84Q419 79 419 68Q419 43 426 35T447 26Q469 29 482 57T512 145Q514 153 532 153Q551 153 551 144Q550 139 549 130T540 98T523 55T498 17T462 -8Q454 -10 438 -10Q372 -10 347 46Q345 45 336 36T318 21T296 6T267 -6T233 -11Q189 -11 155 7Q103 38 103 113Q103 170 138 262T173 379Q173 380 173 381Q173 390 173 393T169 400T158 404H154Q131 404 112 385T82 344T65 302T57 280Q55 278 41 278H27Q21 284 21 287Z"></path>
                                                </defs>
                                                <g fill="currentColor" stroke="currentColor" stroke-width="0"
                                                   transform="matrix(1 0 0 -1 0 0)">
                                                    <g data-mml-node="math">
                                                        <g data-mml-node="mi">
                                                            <use xlink:href="#MJX-198-TEX-I-1D462"></use>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </kbd>
                                    </div>
                                    <input id="name" v-model="localCache.controlMethod.exponential.exponent"
                                           class="block w-[80%]  border-b-2  m-2" name="name"
                                           placeholder="补料指数" required
                                           type="number"/>
                                
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1">
                                    <div class="w-24 justify-start items-center flex">
                                        速度上限
                                    </div>
                                    <input id="name" v-model="localCache.controlMethod.exponential.speedUpperLimit"
                                           class="block w-[80%]  border-b-2  m-2" name="name"
                                           placeholder="速度上限" required
                                           type="number"/>
                                
                                </div>
                                <div class="h-10  flex justify-center items-center mt-1">
                                    <div class="w-24 justify-start items-center flex">
                                        速度下限
                                    </div>
                                    <input id="name" v-model="localCache.controlMethod.exponential.speedLowerLimit"
                                           class="block w-[80%]  border-b-2  m-2" name="name"
                                           placeholder="速度下限" required
                                           type="number"/>
                                
                                </div>
                            </div>
                        </div>
                    
                    </div>
                
                
                </div>
            </div>
            <!-- 顺控栏 -->
            <div class="relative w-[23rem]   h-[calc(100%-1rem)]  mr-2  flex-col flex justify-start items-center">
                
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
                                <input id="name" v-model="localCache.time.t0_time_diff"
                                       class="block w-[6rem] border-b-2 m-2" name="name"
                                       placeholder="时间初始值" required
                                       type="number"/>
                            </div>
                        
                        </div>
                    
                    </div>
                
                
                </div>
            </div>
        
        </div>
    </template>

</template>

<script lang='js' setup>


// ______________________导入模块_______________________
import {computed, onMounted, reactive, ref} from 'vue'
import {useProcessPopupMangerState} from "@/store/ProcessPopupMangerState";
import {useDeviceManage} from '@/store/DeviceManage'
import {useAppGlobal} from '@/store/AppGlobal'
import {Menu, MenuButton, MenuItem, MenuItems, Switch} from '@headlessui/vue'
import {ArrowPathIcon, BeakerIcon, ChevronDownIcon, EyeDropperIcon,} from '@heroicons/vue/20/solid'
import {isNumber} from "util";


const DeviceManage = useDeviceManage();
const ProcessPopupMangerState = useProcessPopupMangerState()
const AppGlobal = useAppGlobal();



// ______________________本地缓存_______________________
const localCache = ref({
    totalSwitch: false, // 补料总开关，布尔值对应总的开启关闭
    time:{
        t0_time: new Date(), // t0时间
        t0_time_diff: null, // t0时间差
        
    },
    supplementSwitch: { // 补料开关
        type: 0, // 0未选择，1，2，3对应三种类型
        manual: false, // 手动补料是否开启
        trigger: { // 触发补料
            dissolvedOxygen: { // 溶氧
                upperLimit: null, // 溶氧上限
                lowerLimit: null, // 溶氧下限
                selected: false, // 是否选择
            },
            pH: { // PH
                upperLimit: null, // PH上限
                lowerLimit: null, // PH下限
                selected: false, // 是否选择
            },
            speed: { // 转速
                upperLimit: null, // 转速上限
                lowerLimit: null, // 转速下限
                selected: false, // 是否选择
            },
            logic: 1, // 且或补料逻辑，0代表或，1代表且
            t0: false, // t0选择按钮是否开启
        },
        related: { // 关联开关，结构同trigger
            dissolvedOxygen: { // 溶氧
                upperLimit: null, // 溶氧上限
                lowerLimit: null, // 溶氧下限
                selected: false, // 是否选择
            },
            pH: { // PH
                upperLimit: null, // PH上限
                lowerLimit: null, // PH下限
                selected: false, // 是否选择
            },
            speed: { // 转速
                upperLimit: null, // 转速上限
                lowerLimit: null, // 转速下限
                selected: false, // 是否选择
            },
            logic: 1, // 且或补料逻辑，0代表或，1代表且
        },
    },
    
    supplementMethod: { // 补料方式
        type: 0, // 补料方式选择，持续补料为1，占空比补料为2
        dutyCycle: { // 占空比补料内容设置
            opening: null, // 补料开度
            detectionPeriod: null, // 检测周期
        },
    },
    
    controlMethod: { // 控制方式
        type: 0, // 控制方式选择，单次补料1，恒速补料2，分段补料3，线性补料4，指数补料5
        single: { // 单次补料内容设置
            amount: null, // 补料量
            cycle: null, // 关联周期
            speed: null, // 补料速度
        },
        constant: { // 恒速补料内容设置
            speed: null, // 补料速度
        },
        segmented: { // 分段补料内容设置
            sequenceControl: [ // 数组顺控表
                // { id: null, supplementSpeed: null, segmentTime: null, totalSegmentTime: null }, ...
            ],
        },
        linear: { // 线性补料内容设置
            offset: null, // 偏移量
            slope: null, // 斜率
            speedUpperLimit: null, // 速度上限
            speedLowerLimit: null, // 速度下限
        },
        exponential: { // 指数补料内容设置
            offset: null, // 偏移量
            exponent: null, // 指数量
            speedUpperLimit: null, // 速度上限
            speedLowerLimit: null, // 速度下限
        },
    }
});

// 发酵时间的视图层
const fermentationTime=ref('0.00h')
setInterval(() => {
    if (DeviceManage.deviceList[AppGlobal.pageChance]?.start_time === null||
        DeviceManage.deviceList[AppGlobal.pageChance]?.start_time === undefined ) return '0h'
    // 把当前时间给到t0
    const nowDate = new Date().getTime();
    // 把t0和发酵开始时间差给到具体值
    let diff = nowDate - new Date(DeviceManage.deviceList[AppGlobal.pageChance].start_time).getTime();
    // 将差值转换为小时
    let hours =Math.floor((diff / 3600000) * 100) / 100;
    fermentationTime.value = hours + 'h'
}, 2000)

const postFeedSet = (kind, index) => {
    // 补料开关选择
    if (kind === 0) {
        if (localCache.value.supplementSwitch.type===index){
            localCache.value.supplementSwitch.type=0
        }
        else {
            localCache.value.supplementSwitch.type = index
        }
    }
    else if (kind === 1) {
        if (localCache.value.supplementMethod.type===index){
            localCache.value.supplementMethod.type=0
        }
        else {
            localCache.value.supplementMethod.type = index
        }
    }
    else if (kind === 2) {
        if (localCache.value.controlMethod.type===index){
            localCache.value.controlMethod.type=0
        }
        else {
            localCache.value.controlMethod.type = index
        }
    }
    // 本地缓存提交全局
    DeviceManage.supplementSystem[AppGlobal.pageChance][1]=localCache.value
    // 从全局读取数据存入本地，做二次确认
    localCache.value=DeviceManage.supplementSystem[AppGlobal.pageChance][1]
    
}
onMounted(()=>{
    // 同步补料设置数据
    localCache.value=DeviceManage.supplementSystem[AppGlobal.pageChance][1]
})
// ______________________顺控_______________________
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
    // 这里可以添加提交表单的逻辑
    localCache.value.controlMethod.segmented.sequenceControl = formData.items
    // 本地缓存提交全局
    DeviceManage.supplementSystem[AppGlobal.pageChance][1] = localCache.value
    // 从全局读取数据存入本地，做二次确认
    localCache.value = DeviceManage.supplementSystem[AppGlobal.pageChance][1]
    
};
// ______________________功能函数_______________________
const closePop = () => {
    ProcessPopupMangerState.updateIsShowPop(false)
}


// ______________________生命周期_______________________


</script>
<style lang="scss" scoped>


</style>
