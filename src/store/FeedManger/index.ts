import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;
const route = useRoute()
const state = () => {
    return {
        
        supplementSystem: [
            [
                {
                    id: 0,
                    time:{
                        t0_time: new Date(), // t0时间
                        t0_time_diff: 0, // t0时间差
                        
                    },
                    totalSwitch: false, // 补料总开关，布尔值对应总的开启关闭
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
                            logic: 0, // 且或补料逻辑，1代表或，2代表且
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
                            logic: 0, // 且或补料逻辑，0代表或，1代表且
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
                            cycle: null, // 冷却周期
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
                    },
                },
                {
                    id: 1,
                    time:{
                        t0_time: new Date(), // t0时间
                        t0_time_diff: 0, // t0时间差
        
                    },
                    totalSwitch: false, // 补料总开关，布尔值对应总的开启关闭
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
                            logic: 0, // 且或补料逻辑，1代表或，2代表且
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
                            logic: 0, // 且或补料逻辑，0代表或，1代表且
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
                            cycle: null, // 冷却周期
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
                    },
                }]
        
        ]
        
        
    }
}

/**
 * 提供可视窗口的公共状态
 */
export const useFeedManger = defineStore('FeedManger', {
    state,
    actions: {},
});
