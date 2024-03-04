<template>
    <template></template>
</template>

<script setup>
import {onMounted, watch} from "vue";
import {useDeviceManage} from "@/store/DeviceManage";
import Swal from 'sweetalert2';
import {sendData} from "@/api";
import {useAppGlobal} from "@/store/AppGlobal";

const debug = true;
const DeviceManage = useDeviceManage();
// 创建定时器群组
const timerGroup = new Map();
// 补料逻辑检验的定时时间

const AppGlobal = useAppGlobal()
onMounted(() => {
    // 遍历数组创建监听器
    DeviceManage.supplementSystem.forEach((feedDevice, deviceIndex) => {
        feedDevice.forEach((feedSet) => {
    
            let isSupplementing = false;
            let coolingTimer = null;
            let supplementTimer = null;
            
            watch(() => feedSet.totalSwitch, (newValues, oldValues) => {
                if (newValues===false){
                    isSupplementing=false;
                    coolingTimer=null;
                    controlSend('持续补料', deviceIndex, feedSet, 0);
                    console.log('---------------触发监听---------------')
                }
            });
            watch(() => feedSet.controlMethod.single, (newValues, oldValues) => {

                    isSupplementing=false;
                    coolingTimer=null;
                    controlSend('持续补料', deviceIndex, feedSet, 0);
                    console.log('---------------触发监听---------------')
                
            },{deep:true});
            watch(() => feedSet.supplementSwitch.manual, (newValues, oldValues) => {
    
                if (newValues===false){
                    isSupplementing=false;
                    coolingTimer=null;
                    controlSend('持续补料', deviceIndex, feedSet, 0);
                    console.log('---------------触发监听---------------')
                }
        
            },{deep:true});
            
            // 创建定时器
            const timer = setInterval(() => {
                if (debug) {
                    console.log('------------------计时器仍在进行---------------')
                }
                // 前置检验未通过会跳过
                const checkResult=checkDevice(feedSet.id)
         
                if (!checkResult) {

                    return;
                }
                if (debug) {
                    console.log('------------------前置检验通过---------------')
                }
                if (debug) {
                    console.log('feedSet.supplementSwitch.type', feedSet.supplementSwitch.type)
                }
                // 补料开关逻辑判断
                if (feedSet.supplementSwitch.type === 0) {
                    // 等于0的时候就跳过，因为补料与否都无所谓
                    isSupplementing=false;
                    coolingTimer=null;
                    controlSend('持续补料', deviceIndex, feedSet, 0);
                    return;
                }
                else if (feedSet.supplementSwitch.type === 1) {
                    // 是否进行手动补料，如果为false就不补，跳过
                    if (!feedSet.supplementSwitch.manual) {
             
                        return;
                    }
                }
                else if (feedSet.supplementSwitch.type === 2) {
                    // 触发补料，设立一个监控器，监控溶氧，ph，转速，且关系如果在这个范围内执行补料并销毁
                    const currentValues = DeviceManage.deviceList[Math.floor(feedSet.id / 2)].nowData;
                    let triggers = {
                        oxygen: feedSet.supplementSwitch.trigger.dissolvedOxygen.selected && currentValues.oxygen_percentage > feedSet.supplementSwitch.trigger.dissolvedOxygen.lowerLimit && currentValues.oxygen_percentage < feedSet.supplementSwitch.trigger.dissolvedOxygen.upperLimit,
                        pH: feedSet.supplementSwitch.trigger.pH.selected && currentValues.timing_PH > feedSet.supplementSwitch.trigger.pH.lowerLimit && currentValues.timing_PH < feedSet.supplementSwitch.trigger.pH.upperLimit,
                        speed: feedSet.supplementSwitch.trigger.speed.selected && currentValues.timing_motor_speed > feedSet.supplementSwitch.trigger.speed.lowerLimit && currentValues.timing_motor_speed < feedSet.supplementSwitch.trigger.speed.upperLimit,
                    };
                    
                   if (debug){
                       console.log(feedSet.supplementSwitch.trigger.logic)
                       console.log('【触发补料】触发条件',triggers,currentValues.timing_motor_speed,feedSet.supplementSwitch.trigger.speed.lowerLimit,feedSet.supplementSwitch.trigger.speed.upperLimit)
                   }
                    let shouldTrigger = false;
                    
                    // 0是且，且就是选择的都得有，1是或，或就是选择的有一个就行
                    // 如果是且,这三个如果选中了都必须符合条件
                    // 如果是或,这三个如果选中了只要一个符合条件就行
                    if (feedSet.supplementSwitch.trigger.logic === 0) {
                        shouldTrigger = (!feedSet.supplementSwitch.trigger.dissolvedOxygen.selected || triggers.oxygen) && (!feedSet.supplementSwitch.trigger.pH.selected || triggers.pH) && (!feedSet.supplementSwitch.trigger.speed.selected || triggers.speed);
                    } else if (feedSet.supplementSwitch.trigger.logic === 1) {
                        shouldTrigger = (feedSet.supplementSwitch.trigger.dissolvedOxygen.selected && triggers.oxygen) || (feedSet.supplementSwitch.trigger.pH.selected && triggers.pH) || (feedSet.supplementSwitch.trigger.speed.selected && triggers.speed);
                    } else {
                        return;
                    }
                    // shouldTrigger为真表示触发，未触发就继续监听
                    if (!shouldTrigger) {
                        return
                    }
                    // 进行触发补料的操作,跳转为手动补料且补料打开;
                    feedSet.supplementSwitch.manual = true;
                    feedSet.supplementSwitch.type = 1;
                    
                    // 检测t0捕捉开关开启状况
                    if (feedSet.supplementSwitch.trigger.t0) {
                        // 把当前时间给到t0
                        feedSet.time.t0_time = new Date().getTime();
                        // 把t0和发酵开始时间差给到具体值
                        let diff = feedSet.time.t0_time - new Date(DeviceManage.deviceList[Math.floor(feedSet.id / 2)].start_time).getTime();
                        // 将差值转换为小时
                        let hours = diff / 3600000;
                        
                        // t0存储
                        feedSet.time.t0_time_diff = parseFloat(hours.toFixed(2));
                        if (debug){
                            console.log('【t0捕捉】t0_time', feedSet.time.t0_time, 't0_time_diff', feedSet.time.t0_time_diff)
                        }
                    }
                }
                else if (feedSet.supplementSwitch.type === 3) {
                    // 触发补料，设立一个监控器，监控溶氧，ph，转速，且关系如果在这个范围内执行补料并销毁
                    const currentValues = DeviceManage.deviceList[Math.floor(feedSet.id / 2)].nowData;
                    let related = {
                        oxygen: feedSet.supplementSwitch.related.dissolvedOxygen.selected && currentValues.oxygen_percentage > feedSet.supplementSwitch.related.dissolvedOxygen.lowerLimit && currentValues.oxygen_percentage < feedSet.supplementSwitch.related.dissolvedOxygen.upperLimit,
                        pH: feedSet.supplementSwitch.related.pH.selected && currentValues.timing_PH > feedSet.supplementSwitch.related.pH.lowerLimit && currentValues.timing_PH < feedSet.supplementSwitch.related.pH.upperLimit,
                        speed: feedSet.supplementSwitch.related.speed.selected && currentValues.timing_motor_speed > feedSet.supplementSwitch.related.speed.lowerLimit && currentValues.timing_motor_speed < feedSet.supplementSwitch.related.speed.upperLimit,
                    };
                    
                    let shouldRelated = false;
                    
                    // 1是且，且就是选择的都得有，0是或，或就是选择的有一个就行
                    if (feedSet.supplementSwitch.related.logic === 0) {
                        shouldRelated = (!feedSet.supplementSwitch.related.dissolvedOxygen.selected || related.oxygen) && (!feedSet.supplementSwitch.related.pH.selected || related.pH) && (!feedSet.supplementSwitch.related.speed.selected || related.speed);
                    } else if (feedSet.supplementSwitch.related.logic === 1) {
                        shouldRelated = (feedSet.supplementSwitch.related.dissolvedOxygen.selected && related.oxygen) || (feedSet.supplementSwitch.related.pH.selected && related.pH) || (feedSet.supplementSwitch.related.speed.selected && related.speed);
                    } else {
                        return;
                    }
                    
                    if (!shouldRelated) {
                        feedSet.supplementSwitch.manual = false;
                        return
                    }
                    // 进行触发补料的操作,跳转为手动补料且补料打开;
                    feedSet.supplementSwitch.manual = true;
                    
                    
                }
                if (debug) {
                    console.log('------------------补料开启---------------')
                }
                // ————————————————— 补料方式的逻辑判断 —————————————————————————
                
                let feedMethod;
                // 补料方式的逻辑判断
                if (feedSet.supplementMethod.type === 1) {
                    // 持续补料
                    feedMethod = '持续补料';
                } else if (feedSet.supplementMethod.type === 2) {
                    // 占空比补料
                    feedMethod = '占空比补料';
                } else {
                    controlSend('持续补料', deviceIndex, feedSet, 0);
                    Swal.fire({
                        icon: 'warning', //error\warning\info\question
                        title: '补料警告',
                        text: Math.floor(feedSet.id / 2) + '号设备 '+'补料泵'+(feedSet.id+1)+'补料已启动但未选择补料方式。',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '确认',
                        confirmButton: false,
                        cancelButtonText: '取消',
                    });
                    isSupplementing=false;
                    coolingTimer=null;
                    return;
                }
                if (debug) {
                    console.log('补料方式：' + feedMethod);
                }
                // ————————————————— 控制方式的逻辑判断 —————————————————————————
                if (feedSet.controlMethod.type !== 1){
                    isSupplementing=false;
                    coolingTimer=null;
                }
                
                if (feedSet.controlMethod.type === 1) {
                    // 单次补料
                    // 目前问题是，我单次补料其实要有一个时间维度的考量的，分段，线性，幂函数。对于后者线性和幂的话，是可以通过T0
                    // 时间差，来进行计算时间与其对应的值，但是对于单次补料，或许我需要在补料完设置一个计时器表示我已经补了。
                    if (debug){
                        console.log('【单次补料】检查补料状态', isSupplementing, coolingTimer, supplementTimer)
                    }
                    // 如果应该触发补料且当前不在补料中，也不在冷却周期中
                    if (!isSupplementing && !coolingTimer) {
                        // 标记为正在补料
                        isSupplementing = true;
                        
                        // 计算补料时间（秒）
                        if (debug){
                             console.log("【单次补料】计算补料时间",feedSet.controlMethod.single.amount / feedSet.controlMethod.single.speed * 3600, feedSet.controlMethod.single.amount, feedSet.controlMethod.single.speed)
                        }
                        const supplementDuration = feedSet.controlMethod.single.amount / feedSet.controlMethod.single.speed * 3600
                        
                        // 发送开始补料的指令
                        controlSend(feedMethod, deviceIndex, feedSet, feedSet.controlMethod.single.speed);
                        
                        // setTimeout嵌套就是连续定时器，因为他是先定时然后再回调的。
                        // 设置补料定时器
                        supplementTimer = setTimeout(() => {
                            // 补料完成
                            controlSend(feedMethod, deviceIndex, feedSet, 0);
                            
                            // 标记补料结束
                            feedSet.isSupplementing = false;
                            
                            if (feedSet.controlMethod.single.cycle>0){
                                // 进入冷却周期
                                coolingTimer = setTimeout(() => {
                                    if (debug){
                                        console.log('【单次补料】冷却周期进行中')
                                    }
                                    // 清除冷却周期定时器标识
                                    coolingTimer = null;
                                    // feedSet.
                                }, feedSet.controlMethod.single.cycle * 1000); // 将冷却周期转换为毫秒
                            }
                            if (feedSet.supplementSwitch.type === 1) {
                                // 手动补料
                                feedSet.supplementSwitch.manual = false;
                            }
                   
                            
                            // 清除补料定时器标识
                            supplementTimer = null;
                            
                        }, supplementDuration * 1000); // 将补料时间转换为毫秒
                    }
                    
                } else if (feedSet.controlMethod.type === 2) {
                    // 恒速补料
                    controlSend(feedMethod, deviceIndex, feedSet, feedSet.controlMethod.constant.speed);
                    
                } else if (feedSet.controlMethod.type === 3) {
                    checkTimeDiff(feedSet);
                    // 分段补料
                    // 计算当前时间和t0的时间差（以小时为单位）
                    const calculateTimeDiff = (t0) => {
                        let currentTime = new Date();
                        let diff = currentTime.getTime() - t0; // t0需要是时间戳
                        if (debug){
                            console.log('【分段补料】diff ',diff, t0,parseFloat((diff / (1000 * 60 * 60)).toFixed(2)))
                        }
                        return parseFloat((diff / (1000 * 60 * 60)).toFixed(2)); // 将毫秒转换为小时
                    }
                
                    const getSupplementSpeed = (t0, projects) => {
                        let timeDiff = calculateTimeDiff(t0);
                        if (debug){
                            console.log('【分段补料】计算当前时间差', timeDiff)
                        }
                        if (debug){
                            console.log('【分段补料】计算当前项目的速度', projects)}
                        for (let project of projects) {
                            // 检查时间差是否在当前项目的时间段内
                            if (debug){
                                console.log('【分段补料】计算当前项目的速度',timeDiff,  project.totalSegmentTime, project.segmentTime,projects)
                            }
                            if (timeDiff >= (project.totalSegmentTime- project.segmentTime) && timeDiff < project.totalSegmentTime ) {
                                if (debug){
                                    console.log('【分段补料】计算当前项目的速度', project.supplementSpeed)
                                }
                                return project.supplementSpeed;
                            }
                        }
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        return null;
                    }
                    // 使用函数
                    let currentSupplementSpeed = getSupplementSpeed(feedSet.time.t0_time, feedSet.controlMethod.segmented.sequenceControl);
                    if (debug){
                        console.log('【分段补料】计算应该的补料速度', currentSupplementSpeed)
                    }
                    if (currentSupplementSpeed === null) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        console.log(Math.floor(feedSet.id / 2) + '号设备 '+'补料泵'+(feedSet.id+1)+'分段补料已执行完毕。')
                        controlSend(feedMethod, deviceIndex, feedSet, 0);
                        return;
                    } else {
                        controlSend(feedMethod, deviceIndex, feedSet, currentSupplementSpeed);
                    }
                    
                } else if (feedSet.controlMethod.type === 4) {
                    checkTimeDiff(feedSet);
                    // 线性补料
                    if (feedSet.controlMethod.linear.offset === null || feedSet.controlMethod.linear.slope === null || feedSet.controlMethod.linear.speedUpperLimit === null || feedSet.controlMethod.linear.speedLowerLimit === null) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备 '+'补料泵'+(feedSet.id+1)+'线性补料数据未全部填写。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
                        controlSend(feedMethod, deviceIndex, feedSet, 0);
                        return;
                    }
                    // 计算当前时间和t0的时间差（以小时为单位）
                    const calculateTimeDiff = (t0) => {
                        let currentTime = new Date();
                        let diff = currentTime.getTime() - t0; // t0需要是时间戳
                        return parseFloat((diff / (1000 * 60 * 60)).toFixed(2)); // 将毫秒转换为小时
                    }
                    
                    // 根据时间差和一次函数计算补料速度
                    const calculateSupplementSpeed = (t0, F0, K) => {
                        let timeDiff = calculateTimeDiff(t0);
                        let supplementSpeed = K * timeDiff + F0;
                        
                        // 根据速度上限和下限调整计算出的速度
                        if (supplementSpeed > feedSet.controlMethod.linear.speedUpperLimit) {
                            supplementSpeed = feedSet.controlMethod.linear.speedUpperLimit;
                        } else if (supplementSpeed < feedSet.controlMethod.linear.speedLowerLimit) {
                            supplementSpeed = feedSet.controlMethod.linear.speedLowerLimit;
                        }
                        return supplementSpeed;
                    }
                    
                    // 使用函数计算补料速度
                    let currentSupplementSpeed = calculateSupplementSpeed(feedSet.time.t0_time, feedSet.controlMethod.linear.offset, feedSet.controlMethod.linear.slope);
                    if (currentSupplementSpeed <= 0) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备 '+'补料泵'+(feedSet.id+1)+'线性补料数据计算错误。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
                        controlSend(feedMethod, deviceIndex, feedSet, 0);
                        return;
                    }
                    
                    controlSend(feedMethod, deviceIndex, feedSet, currentSupplementSpeed);
                    
                } else if (feedSet.controlMethod.type === 5) {
                    checkTimeDiff(feedSet);
                    // 指数补料
                    if (feedSet.controlMethod.linear.offset === null || feedSet.controlMethod.linear.slope === null || feedSet.controlMethod.linear.speedUpperLimit === null || feedSet.controlMethod.linear.speedLowerLimit === null) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备 '+'补料泵'+(feedSet.id+1)+'指数补料数据未全部填写。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
                        controlSend(feedMethod, deviceIndex, feedSet, 0);
                        return;
                    }
                    // 计算当前时间和t0的时间差（以小时为单位）
                    const calculateTimeDiff = (t0) => {
                        let currentTime = new Date();
                        let diff = currentTime.getTime() - t0; // t0需要是时间戳
                        return parseFloat((diff / (1000 * 60 * 60)).toFixed(2)); // 将毫秒转换为小时
                    }
                    
                    // 根据时间差和一次函数计算补料速度
                    const calculateSupplementSpeed = (t0, F0, u) => {
                        let timeDiff = calculateTimeDiff(t0);
                        let supplementSpeed = F0 * Math.exp(u * timeDiff);
                        
                        // 根据速度上限和下限调整计算出的速度
                        if (supplementSpeed > feedSet.controlMethod.linear.speedUpperLimit) {
                            supplementSpeed = feedSet.controlMethod.linear.speedUpperLimit;
                        } else if (supplementSpeed < feedSet.controlMethod.linear.speedLowerLimit) {
                            supplementSpeed = feedSet.controlMethod.linear.speedLowerLimit;
                        }
                        return supplementSpeed;
                    }
                    
                    // 使用函数计算补料速度
                    let currentSupplementSpeed = calculateSupplementSpeed(feedSet.time.t0_time, feedSet.controlMethod.exponential.offset, feedSet.controlMethod.exponential.exponent);
                    if (currentSupplementSpeed <= 0) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备 '+'补料泵'+(feedSet.id+1)+'指数补料数据计算错误。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
                        controlSend(feedMethod, deviceIndex, feedSet, 0);
                        return;
                    }
                    controlSend(feedMethod, deviceIndex, feedSet, currentSupplementSpeed);
                } else {
                    Swal.fire({
                        icon: 'warning', //error\warning\info\question
                        title: '补料警告',
                        text: Math.floor(feedSet.id / 2) + '号设备 '+'补料泵'+(feedSet.id+1)+'补料已启动但未选择控制方式。',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '确认',
                        confirmButton: false,
                        cancelButtonText: '取消',
                    });
                    controlSend('线性补料', deviceIndex, feedSet, 0);
                    return;
                }
            }, AppGlobal.BeatTimer)
            // 添加到定时器群组
            timerGroup.set(feedSet.id, timer);
        })
    })

})

/*
* @name: controlSend 控制发送函数
* @param: name:补料方式，index:设备编号，feedSet:补料数据，content:补料速度
* @return: null
* @description: 根据补料方式发送不同的数据
* */
const controlSend = ((name, deviceIndex, feedSet, content) => {
    if (debug) {
        console.log('补料方式：' + name, '补料速度：' + content, '设备编号：' + deviceIndex + '-' + feedSet.id, '补料数据：' + feedSet);
    }

    //
    if (feedSet.id === 0) {
        // 泵1
        if (name === '持续补料') {
            const data = {
                feed0_way: 1,
                feed0_ml_h: content,
                feed0_flag: content > 0 ? 1 : 0
                
            }
            sendData(deviceIndex, data);
        } else if (name === '占空比补料') {
            const data = {
                feed0_way: 2,
                feed0_ml_h: content,
                feed0_period: feedSet.supplementMethod.dutyCycle.detectionPeriod,
                feed0_opening_degree: feedSet.supplementMethod.dutyCycle.opening,
                feed0_flag: content > 0 ? 1 : 0
                
            }
            sendData(deviceIndex, data);
        }
    } else if (feedSet.id === 1) {
        // 泵2
        if (name === '持续补料') {
            const data = {
                feed_way: 1,
                feed_ml_h: content,
                feed_flag: content > 0 ? 1 : 0
            }
            sendData(deviceIndex, data);
        } else if (name === '占空比补料') {
            const data = {
                feed_way: 2,
                feed_ml_h: content,
                feed_period: feedSet.supplementMethod.dutyCycle.detectionPeriod,
                feed_opening_degree: feedSet.supplementMethod.dutyCycle.opening,
                feed_flag: content > 0 ? 1 : 0
            }
            sendData(deviceIndex, data);
        }
    }
    
    
})
// 设备前置检验
function checkDevice(feedDeviceID) {
    // 设备是否开机
    const isPower = DeviceManage.deviceList[Math.floor(feedDeviceID / 2)].state > 1;
    // 总开关是否开启
    const isSwitch = DeviceManage.supplementSystem[Math.floor(feedDeviceID / 2)][feedDeviceID % 2]?.totalSwitch !== undefined ? DeviceManage.supplementSystem[Math.floor(feedDeviceID / 2)][feedDeviceID % 2].totalSwitch : false;
    
    
    return isPower && isSwitch;
}


// 设备前置检验
function checkTimeDiff(feedSet) {
    //  time_diff验证-两种情况，一种是t0捕捉开启是那我会自动获取t0时间，那同时我也会自动计算time_diff;另一种情况是t0捕捉关闭，那我就需要手动输入t0时间和time_diff，但这个时候我只有time_diff没有time，所以我需要进行一个数据统一，让time_diff转换成time。t0_time等于start_time+time_diff,time_diff是单位h的数字，所以要乘以3600000
    // 设备是否开机
    if (feedSet.time.t0_time_diff === null || feedSet.time.t0_time_diff === undefined || feedSet.time.t0_time_diff < 0) {
        Swal.fire({
            icon: 'warning', //error\warning\info\question
            title: '补料警告',
            text: Math.floor(feedSet.id / 2) + '号设备 '+'补料泵'+(feedSet.id+1)+'补料已启动但未成功设置补料时间差。',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '确认',
            confirmButton: false,
            cancelButtonText: '取消',
        });
        return;
    }
    let diffInMilliseconds = feedSet.time.t0_time_diff * 60 * 60 * 1000;
    feedSet.time.t0_time = new Date(new Date(DeviceManage.deviceList[Math.floor(feedSet.id / 2)].start_time).getTime() + diffInMilliseconds);
    
    return;
}

// 关闭计时器
// // 检验设备进行补料环境
// if (!checkDevice(feed.id)){
//     // 如果检验不通过销毁计时器
//     clearInterval(timer);
//     // 从定时器群组中删除
//     timerGroup.delete(feed.id);
//
// }

</script>

<style scoped>

</style>
