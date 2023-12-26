<template>
    <template></template>
</template>

<script setup>
// todo 新建supplementSystem的代码
import {onMounted} from "vue";
import {useFeedManger} from "@/store/FeedManger";
import {useDeviceManage} from "@/store/DeviceManage";
import Swal from 'sweetalert2';
import {sendData} from "@/api";

const debug = true;
const DeviceManage = useDeviceManage();
const FeedManger = useFeedManger();
// 创建定时器群组
const timerGroup = new Map();
// 定时时间
const interval = 3000;
onMounted(() => {
    
    
    // 遍历数组创建监听器
    FeedManger.supplementSystem.forEach((feedDevice) => {
        feedDevice.forEach((feedSet) => {
            let isSupplementing = false;
            let coolingTimer = null;
            let supplementTimer = null;
            
            // 创建定时器
            const timer = setInterval(() => {
                
                // 前置检验未通过会跳过
                if (!checkDevice(feedSet.id)) {
                    return;
                }
                // 补料开关逻辑判断
                if (feedSet.supplementSwitch.type === 0) {
                    // 等于0的时候就跳过，因为补料与否都无所谓
                    return;
                } else if (feedSet.supplementSwitch.type === 2) {
                    // 触发补料，设立一个监控器，监控溶氧，ph，转速，且关系如果在这个范围内执行补料并销毁
                    const currentValues = DeviceManage.deviceList[Math.floor(feedSet.id / 2)].nowData;
                    let triggers = {
                        oxygen: feedSet.supplementSwitch.trigger.dissolvedOxygen.selected && currentValues.oxygen_percentage >= feedSet.supplementSwitch.trigger.dissolvedOxygen.lowerLimit && currentValues.oxygen_percentage <= feedSet.supplementSwitch.trigger.dissolvedOxygen.upperLimit,
                        pH: feedSet.supplementSwitch.trigger.pH.selected && currentValues.timing_PH >= feedSet.supplementSwitch.trigger.pH.lowerLimit && currentValues.timing_PH <= feedSet.supplementSwitch.trigger.pH.upperLimit,
                        speed: feedSet.supplementSwitch.trigger.speed.selected && currentValues.timing_motor_speed >= feedSet.supplementSwitch.trigger.speed.lowerLimit && currentValues.timing_motor_speed <= feedSet.supplementSwitch.trigger.speed.upperLimit,
                    };
                    
                    let shouldTrigger = false;
                    
                    // 2是且，且就是选择的都得有，1是或，或就是选择的有一个就行
                    if (feedSet.supplementSwitch.trigger.logic === 1) {
                        shouldTrigger = (!feedSet.supplementSwitch.trigger.dissolvedOxygen.selected || triggers.oxygen) && (!feedSet.supplementSwitch.trigger.pH.selected || triggers.pH) && (!feedSet.supplementSwitch.trigger.speed.selected || triggers.speed);
                    } else if (feedSet.supplementSwitch.trigger.logic === 0) {
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
                        // todo 分段补料的t0存储
                    }
                } else if (feedSet.supplementSwitch.type === 3) {
                    // 触发补料，设立一个监控器，监控溶氧，ph，转速，且关系如果在这个范围内执行补料并销毁
                    const currentValues = DeviceManage.deviceList[Math.floor(feedSet.id / 2)].nowData;
                    let related = {
                        oxygen: feedSet.supplementSwitch.related.dissolvedOxygen.selected && currentValues.oxygen_percentage >= feedSet.supplementSwitch.related.dissolvedOxygen.lowerLimit && currentValues.oxygen_percentage <= feedSet.supplementSwitch.related.dissolvedOxygen.upperLimit,
                        pH: feedSet.supplementSwitch.related.pH.selected && currentValues.timing_PH >= feedSet.supplementSwitch.related.pH.lowerLimit && currentValues.timing_PH <= feedSet.supplementSwitch.related.pH.upperLimit,
                        speed: feedSet.supplementSwitch.related.speed.selected && currentValues.timing_motor_speed >= feedSet.supplementSwitch.related.speed.lowerLimit && currentValues.timing_motor_speed <= feedSet.supplementSwitch.related.speed.upperLimit,
                    };
                    
                    let shouldRelated = false;
                    
                    // 1是且，且就是选择的都得有，0是或，或就是选择的有一个就行
                    if (feedSet.supplementSwitch.related.logic === 1) {
                        shouldRelated = (!feedSet.supplementSwitch.related.dissolvedOxygen.selected || related.oxygen) && (!feedSet.supplementSwitch.related.pH.selected || related.pH) && (!feedSet.supplementSwitch.related.speed.selected || related.speed);
                    } else if (feedSet.supplementSwitch.related.logic === 0) {
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
                
                // ————————————————— 补料方式的逻辑判断 —————————————————————————
                // 是否进行补料，如果为false就不补，跳过
                if (!feedSet.supplementSwitch.manual) {
                    return;
                }
                
                // 补料方式的逻辑判断
                if (feedSet.supplementMethod.type === 1) {
                    // 持续补料
                    controlSend('持续补料', feedSet)
                } else if (feedSet.supplementMethod.type === 2) {
                    // 占空比补料
                    controlSend('占空比补料', feedSet)
                } else {
                    Swal.fire({
                        icon: 'warning', //error\warning\info\question
                        title: '补料警告',
                        text: Math.floor(feedSet.id / 2) + '号设备补料已启动但未选择补料方式。',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '确认',
                        confirmButton: false,
                        cancelButtonText: '取消',
                    });
                    return;
                }
                // ————————————————— 控制方式的逻辑判断 —————————————————————————
                if (feedSet.controlMethod.type === 1) {
                    // 单次补料
                    // 目前问题是，我单次补料其实要有一个时间维度的考量的，分段，线性，幂函数。对于后者线性和幂的话，是可以通过T0
                    // 时间差，来进行计算时间与其对应的值，但是对于单次补料，或许我需要在补料完设置一个计时器表示我已经补了。
                    
                    // 如果应该触发补料且当前不在补料中，也不在冷却周期中
                    if (!isSupplementing && !coolingTimer) {
                        // 标记为正在补料
                        isSupplementing = true;
                        
                        // 计算补料时间（秒）
                        // TODO 记得增加校准变量;
                        // TODO 补料速度时间单位统一,这个的单位得是s
                        const supplementDuration = feedSet.controlMethod.single.amount / feedSet.controlMethod.single.speed;
                        
                        // 发送开始补料的指令
                        controlSend('补料速度', feedSet, feedSet.controlMethod.single.speed);
                        
                        // setTimeout嵌套就是连续定时器，因为他是先定时然后再回调的。
                        // 设置补料定时器
                        supplementTimer = setTimeout(() => {
                            // 补料完成
                            controlSend('补料速度', feedSet, 0);
                            
                            // 标记补料结束
                            feedSet.isSupplementing = false;
                            
                            // 进入冷却周期
                            coolingTimer = setTimeout(() => {
                                
                                // 清除冷却周期定时器标识
                                feedSet.coolingTimer = null;
                                
                            }, feedSet.controlMethod.single.cycle * 1000); // 将冷却周期转换为毫秒
                            
                            // 清除补料定时器标识
                            supplementTimer = null;
                            
                        }, supplementDuration * 1000); // 将补料时间转换为毫秒
                    }
                    
                } else if (feedSet.controlMethod.type === 2) {
                    // 恒速补料
                    controlSend('补料速度', feedSet, feedSet.controlMethod.constant.speed);
                    
                } else if (feedSet.controlMethod.type === 3) {
                    checkTimeDiff(feedSet);
                    // 分段补料
                    
                    // 计算当前时间和t0的时间差（以小时为单位）
                    const calculateTimeDiff = (t0) => {
                        let currentTime = new Date();
                        let diff = currentTime.getTime() - t0; // t0需要是时间戳
                        return parseFloat((diff / (1000 * 60 * 60)).toFixed(2)); // 将毫秒转换为小时
                    }
                    const getSupplementSpeed = (t0, projects) => {
                        let timeDiff = calculateTimeDiff(t0);
                        for (let project of projects) {
                            // 检查时间差是否在当前项目的时间段内
                            if (timeDiff >= project.totalSegmentTime && timeDiff < project.totalSegmentTime + project.segmentTime) {
                                return project.supplementSpeed;
                            }
                        }
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        return null;
                    }
                    // 使用函数
                    let currentSupplementSpeed = getSupplementSpeed(feedSet.time.t0_time, feedSet.controlMethod.segmented.sequenceControl);
                    if (currentSupplementSpeed === null) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备分段补料已执行完毕。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
                        controlSend('补料速度', feedSet, 0);
                        return;
                    } else {
                        controlSend('补料速度', feedSet, currentSupplementSpeed);
                    }
                    
                } else if (feedSet.controlMethod.type === 4) {
                    checkTimeDiff(feedSet);
                    // 线性补料
                    if (feedSet.controlMethod.linear.offset === null||feedSet.controlMethod.linear.slope === null||feedSet.controlMethod.linear.speedUpperLimit === null||feedSet.controlMethod.linear.speedLowerLimit === null) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备线性补料数据未全部填写。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
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
                    if (currentSupplementSpeed<=0) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备线性补料数据计算错误。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
                        return;
                    }
                    controlSend('补料速度', feedSet,currentSupplementSpeed)
                    
                } else if (feedSet.controlMethod.type === 5) {
                    checkTimeDiff(feedSet);
                    // 指数补料
                    if (feedSet.controlMethod.linear.offset === null||feedSet.controlMethod.linear.slope === null||feedSet.controlMethod.linear.speedUpperLimit === null||feedSet.controlMethod.linear.speedLowerLimit === null) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备指数补料数据未全部填写。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
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
                    if (currentSupplementSpeed<=0) {
                        // 如果没有找到匹配的项目，可以返回一个默认值或错误
                        Swal.fire({
                            icon: 'warning', //error\warning\info\question
                            title: '补料提示',
                            text: Math.floor(feedSet.id / 2) + '号设备指数补料数据计算错误。',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            confirmButton: false,
                            cancelButtonText: '取消',
                        });
                        return;
                    }
                    controlSend('补料速度', feedSet,currentSupplementSpeed)
    
                } else {
                    Swal.fire({
                        icon: 'warning', //error\warning\info\question
                        title: '补料警告',
                        text: Math.floor(feedSet.id / 2) + '号设备补料已启动但未选择控制方式。',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '确认',
                        confirmButton: false,
                        cancelButtonText: '取消',
                    });
                    return;
                }
            }, interval)
            // 添加到定时器群组
            timerGroup.set(feedSet.id, timer);
        })
    })
    
    
})
const controlSend = ((name, feedSet, content) => {
    if (name === '持续补料') {
        console.log('持续补料');
    } else if (name === '占空比补料') {
        //一个设备有两个补料泵，需要有两个占空比补料；
        const index = feedSet.id;
        const data = {
            start_flag: 1,
            
        }
        sendData(index, data);
    } else if (name === '补料速度') {
        //一个设备有两个补料泵，需要有两个占空比补料；
        const index = feedSet.id;
        const data = {
            speed: Number(content),
        }
        sendData(index, data);
    }
    
    
})

// 设备前置检验
function checkDevice(feedDeviceID) {
    // 设备是否开机
    const isPower = DeviceManage.deviceList[Math.floor(feedDeviceID / 2)].state <= 0;
    // 总开关是否开启
    const isSwitch = FeedManger.supplementSystem[Math.floor(feedDeviceID / 2)][feedDeviceID % 2].totalSwitch;
    return isPower && isSwitch;
}

// 设备前置检验
function checkTimeDiff(feedSet) {
    //  time_diff验证-两种情况，一种是t0捕捉开启是那我会自动获取t0时间，那同时我也会自动计算time_diff;另一种情况是t0捕捉关闭，那我就需要手动输入t0时间和time_diff，但这个时候我只有time_diff没有time，所以我需要进行一个数据统一，让time_diff转换成time。t0_time等于start_time+time_diff,time_diff是单位h的数字，所以要乘以3600000
    // 设备是否开机
    if (feedSet.time.t0_time_diff === null || feedSet.time.t0_time_diff === undefined || feedSet.time.t0_time_diff === -1) {
        Swal.fire({
            icon: 'warning', //error\warning\info\question
            title: '补料警告',
            text: Math.floor(feedSet.id / 2) + '号设备补料已启动但补料时间差为' + feedSet.time.t0_time_diff,
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
// 触发补料函数
function triggerFeed(feedSet) {
    // 获取设备
    // 参数的上限和下限
    const limits = {
        oxygen: {min: 5, max: 10}, // 溶氧范围
        pH: {min: 6.5, max: 7.5}, // pH范围
        speed: {min: 100, max: 500}, // 转速范围
    };

// 用户选择的参数
    const selections = {
        oxygen: true, // 用户选择了监控溶氧
        pH: true, // 用户选择了监控pH
        speed: false, // 用户没有选择监控转速
    };

// 全局关系选择，'AND' 表示且关系，'OR' 表示或关系
    let globalRelation = 'AND'; // 初始设置为且关系

// 读取实时数据的函数（示例）
    function readSensors() {
        // 示例数据，实际应用中应从传感器读取
        return {
            oxygen: 7, // 当前溶氧值
            pH: 7, // 当前pH值
            speed: 150, // 当前转速
        };
    }

// 检查是否触发的函数
    
    function checkAndTrigger() {
        const currentValues = readSensors();
        let triggers = {
            oxygen: feedSet.supplementSwitch.trigger.dissolvedOxygen.selected && currentValues.oxygen >= limits.oxygen.min && currentValues.oxygen <= limits.oxygen.max,
            pH: feedSet.supplementSwitch.trigger.pH.selected && currentValues.pH >= limits.pH.min && currentValues.pH <= limits.pH.max,
            speed: feedSet.supplementSwitch.trigger.speed.selected && currentValues.speed >= limits.speed.min && currentValues.speed <= limits.speed.max,
        };
        
        let shouldTrigger = false;
        if (globalRelation === 'AND') {
            shouldTrigger = (!feedSet.supplementSwitch.trigger.dissolvedOxygen.selected || triggers.oxygen) && (!feedSet.supplementSwitch.trigger.pH.selected || triggers.pH) && (!feedSet.supplementSwitch.trigger.speed.selected || triggers.speed);
        } else if (globalRelation === 'OR') {
            shouldTrigger = (feedSet.supplementSwitch.trigger.dissolvedOxygen.selected && triggers.oxygen) || (feedSet.supplementSwitch.trigger.pH.selected && triggers.pH) || (feedSet.supplementSwitch.trigger.speed.selected && triggers.speed);
        }
        
        if (shouldTrigger) {
            // 触发某个操作
            console.log('触发条件满足');
        } else {
            console.log('触发条件不满足');
        }
    }

// 测试代码
    checkAndTrigger();
}

</script>

<style scoped>

</style>
