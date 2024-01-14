import {defineStore} from "pinia";

import Swal from 'sweetalert2';
// 给开发人员使用的debug
const debug = false;

interface SetData {
    
    /*PH控制部分变量*/
    timing_PH: number;   //实时PH值
    acid_speed: number;  //酸泵实时送料速率
    lye_speed: number;   //碱泵实时送料速率
    target_PH: number;   //设定目标PH
    acid_KP: number;     //酸泵KP
    acid_KI: number;     //酸泵KI
    acid_KD: number;     //酸泵KD
    lye_KP: number;      //碱泵KP
    lye_KI: number;      //碱泵KI
    lye_KD: number;      //碱泵KD
    PH_upper_limit: number;  //PH上限值
    PH_lower_limit: number;  //PH下限值
    PH_area_upper_limit: number;  //PH死区上限值
    PH_area_lower_limit: number;  //PH死区下限值
    
    PH_flag: number;       							//PH控制开启/停止标志位
    PH_calibration_status: number;  		//PH校准状态 0 -> 1 正在第一个校准中 2 酸校准完成 3 第二个校准中 4第二个校准完成 下位机发
    PH_calibration_progress: number;    //PH校准进度 0 -> 1 第一个校准 2 进行第二个校准
    acid_pump_step_count: number;   		//在校准模式时，酸泵发送给上位机的总步数，用来上位机计算每步加酸量
    acid_pump_calibration_flag: number; //酸泵标定开始标志位 0 1
    acid_pump_sum_step_count: number;  	//整个PH控制过程酸泵总步数
    acid_pump_now_speed: number;       	//酸泵当前速度-泵速==0为关闭
    acid_pump_now_ml: number;           //酸泵当前补料量
    acid_pump_now_set_speed: number;    //酸泵当前设定速度-上位机设定的
    lye_pump_step_count: number;    		//在校准模式时，碱泵发送给上位机的总步数，用来上位机计算每步加碱量
    lye_pump_calibration_flag: number;  //碱泵标定开始标志位 0 1
    lye_pump_sum_step_count: number; 		//整个PH控制过程碱泵总步数
    lye_pump_now_speed: number;         //碱泵当前速度-泵速==0为关闭
    lye_pump_now_ml: number;            //碱泵当前补料量
    lye_pump_now_set_speed: number;     //碱泵当前设定速度-上位机设定的
    
    /*温控部分变量*/
    timing_temp: number;          //实时温度值
    heatpower: number;						//加热毯实时功率
    target_temp: number;					//设定目标温度值
    Temp_KP: number;       				//温控KP
    Temp_KI: number;      				//温控KI
    Temp_KD: number;       				//温控KD
    Temp_area_upper_limit: number;  //温度死区上限值
    Temp_area_lower_limit: number;  //温度死区下限值
    
    temp_flag: number;							//温控开启/停止标志位
    condensate_water_flag: number;  //冷凝水开关
    heated_blanket_flag: number;    //加热毯开关
    
    /*氧含量控制部分变量*/
    timing_DO: number;          	//实时DO值
    target_DO: number;						//设定目标DO值
    DO_KP: number;       					//氧含量KP
    DO_KI: number;      					//氧含量KI
    DO_KD: number;       					//氧含量KD
    zero_po_value: number;  		//零点值
    saturation_value: number;  		//饱和值
    oxygen_percentage: number; 		//溶氧百分值
    DO_upper_limit: number;				//DO上限值
    DO_lower_limit: number;				//DO下限值
    DO_area_upper_limit: number;	//DO死区上限值
    DO_area_lower_limit: number;	//DO死区下限值
    
    DO_flag: number;								//氧含量控制开启标志位
    target_motor_speed: number;			//手动设定电机转速
    timing_motor_speed: number;			//电机实时转速
    motor_speed_l_limit: number;		//电机转速下限
    motor_speed_u_limit: number;		//电机转速上限
    DO_zero_calibration_flag: number;   			//溶氧校准标志位 0没开始 1 开始
    DO_saturation_calibration_flag: number;   //溶氧校准标志位 0没开始 1 开始
    

    /*补料0控制部分*/
    feed0_DO_upper_limit: number;					//补料溶氧上限
    feed0_DO_lower_limit: number;					//补料溶氧下限
    accumulated_feed0_value: number;    		//累计补料值（未使用）
    
    feed0_flag: number;											//补料开启/停止标志位
    feed0_pump_step_count: number; 					//补料泵发送步数
    feed0_pump_calibration_flag: number; 		//补料泵标定开始标志位
    feed0_pump_sum_step_count: number;  			//补料泵发送步数
    feed0_pump_now_speed: number;            //补料泵当前速度-泵速==0为关闭
    feed0_pump_now_ml: number;               //补料泵当前补料量
    feed0_pump_now_set_speed: number;        //补料泵当前设定速度-上位机设定的
    
    feed0_opening_degree: number;	//手动补料开度
    feed0_period: number;					//手动补料周期
    feed0_way : number;
    
    /*补料控制部分*/
    feed_DO_upper_limit: number;					//补料溶氧上限
    feed_DO_lower_limit: number;					//补料溶氧下限
    accumulated_feed_value: number;    		//累计补料值（未使用）
    
    feed_flag: number;											//补料开启/停止标志位
    feed_pump_step_count: number; 					//补料泵发送步数
    feed_pump_calibration_flag: number; 		//补料泵标定开始标志位
    feed_pump_sum_step_count: number;  			//补料泵发送步数
    feed_pump_now_speed: number;            //补料泵当前速度-泵速==0为关闭
    feed_pump_now_ml: number;               //补料泵当前补料量
    feed_pump_now_set_speed: number;        //补料泵当前设定速度-上位机设定的 单位：步
    
    feed_opening_degree: number;	//手动补料开度
    feed_period: number;					//手动补料周期
    feed_way : number;
    
    
    /*系统控制变量*/
    start_flag: number;     								//发酵开始标志位
    communicate_flag: number;   						//通讯连接成功标志位
    deviceNum:any;
}

interface deviceSet {
    /** 温度报警上限 */
    tempMaxWarn: number;
    
    /** 温度报警下限 */
    tempMinWarn: number;
    
    /** PH报警上限 */
    phMaxWarn: number;
    
    /** PH报警下限 */
    phMinWarn: number;
    
    /** DO报警上限 */
    doMaxWarn: number;
    
    /** DO报警下限 */
    doMinWarn: number;
    
    /** 酸泵单步速度 */
    acidPumpSpeed: number;
    
    /** 碱泵单步速度 */
    lyePumpSpeed: number;  // 单步速度：毫升/步
    
    /** 补料泵单步速度 */
    feedPumpSpeed: number;
    rpmMaxWarn: number;
    rpmMinWarn: number;
    
    /** 消泡泵单步速度 */
    defoamerPumpSpeed: number;
    
    
    tempState: number,
    phState: number,
    doState: number,
    acidPumpSumStepCount: number,
    lyePumpSumStepCount: number,
    feedPumpSumStepCount: number,
    defoamerPumpSumStepCount: number,
    
    
    
}

interface Device {
    id: number;
    name: string;
    deviceNum: string;
    ip: string;
    port?: number; // 这意味着 port 是可选的
    state: number;
    nowData: SetData | null;
    deviceSocket: any;
    start_time: any;
    batch_name: any;
    alarm: boolean;
    deviceSet: deviceSet | null
    batch_cycle: number;
    recordFlag: boolean;
    recordFeedMode: recordFeedMode;
    
}

interface FeedFullSpeed {
    feedSpeed: number;
    feedDate: number;
}

interface FeedLine {
    feedSpeed: number;
    DOTopLimit: number;
    DOBottomLimit: number;
}

interface FeedDutyCycle {
    feedSpeed: number;
    checkCycle: number;
    feedQuantity: number;
    DO: number;
}

interface recordFeedMode {
    FullSpeed: FeedFullSpeed;
    Line: FeedLine;
    DutyCycle: FeedDutyCycle;
    
}

// TODO:设备管理要重构
// 1.内容数据表项不全仍然缺乏
// 2.各个部分的状态灯
// 3.报警数据
// 4.完成数据库的数据存入

const state = (): {
    deviceList: Device[];
} => {
    return {
        deviceList: [
            {
                id: 0, name: '设备A', deviceNum: "CCC-022", ip: '192.168.1.3', port: 2000, batch_cycle: 0,
                state: 0, nowData: null, deviceSocket: null, start_time: null, batch_name: null, recordFlag: false,
                alarm: false, recordFeedMode: {
                    FullSpeed: {
                        feedSpeed: -1,
                        feedDate: -1
                    },
                    Line: {
                        feedSpeed: -1,
                        DOTopLimit: -1,
                        DOBottomLimit: -1
                        
                    },
                    DutyCycle: {
                        feedSpeed: -1,
                        checkCycle: -1,
                        feedQuantity: -1,
                        DO: -1
                    }
                }, deviceSet: {
                    tempState: 0,
                    phState: 0,
                    doState: 0,
                    tempMaxWarn: 0,
                    tempMinWarn: 0,
                    phMaxWarn: 0,
                    phMinWarn: 0,
                    doMaxWarn: 0,
                    doMinWarn: 0,
                    rpmMaxWarn: 0,
                    rpmMinWarn: 0,
                    acidPumpSpeed: 0,
                    lyePumpSpeed: 0,
                    feedPumpSpeed: 0,
                    defoamerPumpSpeed: 0,
                    acidPumpSumStepCount: 0,
                    lyePumpSumStepCount: 0,
                    feedPumpSumStepCount: 0,
                    defoamerPumpSumStepCount: 0,
                }
            },
        
        ]
    }
}

/**
 * 提供可视窗口的公共状态
 */
export const useDeviceManage = defineStore('DeviceManage', {
    state,
    actions: {
        // 添加设备
        addDevice(ip: string, port: number, nameDevice: string) {
            const newId = this.deviceList.length;
            const newDevice: Device = {
                id: newId,
                name: nameDevice,
                deviceNum: `BAB-${newId}`,
                batch_cycle: 0,
                ip: ip,
                port: port,
                state: 0,
                recordFlag: false,
                recordFeedMode: {
                    FullSpeed: {
                        feedSpeed: -1,
                        feedDate: -1
                    },
                    Line: {
                        feedSpeed: -1,
                        DOTopLimit: -1,
                        DOBottomLimit: -1
                        
                    },
                    DutyCycle: {
                        feedSpeed: -1,
                        checkCycle: -1,
                        feedQuantity: -1,
                        DO: -1
                    }
                }
                ,
                nowData: null,
                deviceSocket: null,
                start_time: null,
                batch_name: null,
                alarm: false,
                deviceSet: null
            };
            
            this.deviceList.push(newDevice);
            return newId;
        },
        // 更新设备数据
        updateDeviceListData(index: number, newDeviceData: (SetData | number)) {
            console.log('newDeviceData', newDeviceData)
            if (typeof newDeviceData === 'number') {
                if (newDeviceData === -1) console.log("Error")
                return;
            }
            // 将数据的时间归为现在时间
            const currentDate = new Date();
            
            if (newDeviceData) {  // 确保 nowData 不为 null
                /*——————————————————————————————对状态的处理———————————————————————————————————*/
                // 四种状态：未连接0，已连接1，运行中2，报警3
                // 未连接-未连接不会进行数据处理，在这里进行数据处理的只有已连接和报警两个选项
                // 已连接-已连接的设备如果没有修改通讯标志进行修改
                
                if (newDeviceData.communicate_flag === 0) {
                    const data = {
                        communicate_flag: 1,
                    }
                    this.deviceList[index].deviceSocket.send(JSON.stringify(data));
                }
                // 运行中-刚开始运行，状态还没变过来
                if (this.deviceList[index].state == 1 && newDeviceData.communicate_flag === 1 && newDeviceData.start_flag === 1) {
                    this.deviceList[index].state = 2
                    // 如果没有这个批次数据存入批次数据
                    
                    const batchdata = {
                        batch_name: this.deviceList[index].batch_name,
                        can_number: newDeviceData.deviceNum,
                        start_time: currentDate,
                    };
                    window.Electron.ipcRenderer.invoke('add-fermentation-batch', batchdata).then(
                        (res) => {
                            if (res) { // 确保res是有效的
                                console.log('已存储数据.');
                            } else {
                                console.error('请求批次内容数据没请求到.');
                            }
                        }
                    ).catch((error) => {
                        
                        Swal.fire({
                            icon: 'error', //error\warning\info\question
                            title: '添加批次',
                            text: '添加批次内容至数据库报错,报错为:' + error,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '确认',
                            cancelButtonText: '取消',
                        });
                        
                        console.error('添加批次内容至数据库报错,报错为:', error);
                    });
                    
                    
                }
                // 报警
                if (this.deviceList && this.deviceList[index] && this.deviceList[index].deviceSet != null && this.deviceList[index].state === 2) {
                    // 使用类型断言
                    const currentDeviceSet = this.deviceList[index].deviceSet as deviceSet;
                    let isAlarmFlag = false;
                    if (!(newDeviceData.timing_temp >= currentDeviceSet.tempMinWarn &&
                        newDeviceData.timing_temp <= currentDeviceSet.tempMaxWarn)) {
                        this.deviceList[index].state = 3;
                        currentDeviceSet.tempState = 1;
                        isAlarmFlag = true;
                    }
                    if (!(newDeviceData.timing_PH >= currentDeviceSet.phMinWarn &&
                        newDeviceData.timing_PH <= currentDeviceSet.phMaxWarn)) {
                        this.deviceList[index].state = 3;
                        currentDeviceSet.phState = 1;
                        isAlarmFlag = true;
                    }
                    if (!(newDeviceData.timing_DO >= currentDeviceSet.doMinWarn &&
                        newDeviceData.timing_DO <= currentDeviceSet.doMaxWarn)) {
                        this.deviceList[index].state = 3;
                        currentDeviceSet.doState = 1;
                        isAlarmFlag = true;
                    }
                    if (!isAlarmFlag && newDeviceData.communicate_flag === 1 && newDeviceData.start_flag === 1) {
                        this.deviceList[index].state = 2;
                        currentDeviceSet.tempState = 0;
                        currentDeviceSet.phState = 0;
                        currentDeviceSet.doState = 0;
                    }
                }
                if (this.deviceList[index].start_time !== null) {
                    // 获取相对时间单位为h
                    const relativeTime = (currentDate.getTime() - this.deviceList[index].start_time.getTime()) / 1000 / 60 / 60;
                    // 数据存入到数据库
                    // todo 数据同步存入数据库
                    const fermentationData = {
                        can_number: newDeviceData.deviceNum,
                        timing_temp: newDeviceData.timing_temp,
                        timing_PH: newDeviceData.timing_PH,
                        timing_DO: newDeviceData.timing_DO,
                        timing_motor_speed: newDeviceData.timing_motor_speed,
                        relative_time: relativeTime,
                        absolute_time: currentDate,
                        acid_ml: newDeviceData.acid_pump_now_ml,
                        lye_ml: newDeviceData.lye_pump_now_ml,
                        feed_ml: newDeviceData.feed_pump_now_ml,
                        defoamerPumpSpeed: this.deviceList[index].deviceSet!.defoamerPumpSpeed,
                        feedPumpSpeed: this.deviceList[index].deviceSet!.feedPumpSpeed,
                        fermentation_flag: newDeviceData.start_flag,
                        
                        
                    };
                    window.Electron.ipcRenderer.invoke('add-fermentation-data', fermentationData).then(
                        (res) => {
                            if (res) { // 确保res是有效的
                                
                                console.log('已存储数据.');
                            } else {
                                console.error('请求批次内容数据没请求到.');
                            }
                        }
                    ).catch((error) => {
                        console.error('请求批次内容数据没请求到,报错为:', error);
                    });
                }
                
                
            }
            
            
            this.deviceList[index].nowData = newDeviceData;
            
            
        },
        updateDeviceList(newDeviceList: Device[]) {
            this.deviceList = newDeviceList;
        }
        
        
    },
});

