import {defineStore} from "pinia";
import {sendData} from "@/api";

// 给开发人员使用的debug
const debug = false;

interface SetData {
    // PH控制部分变量
    timing_PH: number;               // 实时PH值
    acid_speed: number;              // 酸泵实时送料速率
    lye_speed: number;               // 碱泵实时送料速率
    target_PH: number;               // 设定目标PH
    acid_KP: number;                 // PID参数
    acid_KI: number;                 // PID参数
    acid_KD: number;                 // PID参数
    lye_KP: number;                  // PID参数
    lye_KI: number;                  // PID参数
    lye_KD: number;                  // PID参数
    acid_ml: number;                 // 酸泵目前送料量
    lye_ml: number;                  // 碱泵目前送料量
    PH_upper_limit: number;          // PH上限值
    PH_lower_limit: number;          // PH下限值
    PH_flag: number;                 // PH控制开启/停止标志位
    Ph_auto_handle: number;          // PH控制自动/手动控制标志位


    PH_calibration_status: number;           // PH校准状态
    PH_calibration_progress: number;         // PH校准进度
    acid_pump_step_count: number;            // 酸泵发送步数
    acid_pump_calibration_flag: number;      // 酸泵标定开始标志位
    lye_pump_step_count: number;             // 碱泵发送步数
    lye_pump_calibration_flag: number;       // 碱泵标定开始标志位
    // 温控部分变量
    timing_temp: number;                 // 实时温度值
    heatpower: number;                   // 加热毯实时功率
    target_temp: number;                 // 设定目标温度值
    Temp_KP: number;                     // 温控KP
    Temp_KI: number;                     // 温控KI
    Temp_KD: number;                     // 温控KD
    water_flag: number;                  // 冷凝水通断标志位
    temp_flag: number;                   // 温控开启/停止标志位

    // 氧含量控制部分变量
    timing_DO: number;                   // 实时DO值
    oxy_ratio: number;                   // 氧气通度
    target_DO: number;                   // 设定目标DO值

    DO_KP: number;                       // 氧含量KP
    DO_KI: number;                       // 氧含量KI
    DO_KD: number;                       // 氧含量KD
    DO_flag: number;                     // 氧含量控制开启标志位
    target_motor_speed: number;          // 手动设定电机转速
    timing_motor_speed: number;          // 电机实时转速
    motor_speed_l_limit: number;         // 电机转速下限
    motor_speed_u_limit: number;         // 电机转速上限
    motor_speed_autoflag: number;        // 转速关联氧含量开启/关闭标志位
    oxy_flag: number;                    // 通氧关联氧含量开启/关闭标志位

    // 新增的氧含量控制部分变量
    DO_zero_calibration_flag: number;            // 溶氧校准标志位
    DO_saturation_calibration_flag: number;      // 溶氧校准标志位
    zero_point_value: number;                    // 零点值
    saturation_value: number;                    // 饱和值
    oxygen_percentage: number;                   // 需要显示的是百分比
    DO_upper_limit: number;                      // DO上限值
    DO_lower_limit: number;                      // DO下限值

    // 消泡控制部分
    clean_speed: number;                 // 消泡泵设定送料速率
    clean_ml: number;                    // 消泡泵目前送料量
    clean_single_time: number;           // 消泡单次泵入时间
    clean_flag: number;                  // 消泡开启/停止标志位

    // 新增的消泡控制部分变量
    accumulated_defoam_value: number;            // 累计消泡值
    defoam_pump_step_count: number;              // 消泡泵发送步数
    defoam_pump_calibration_flag: number;        // 消泡泵标定开始标志位
    acid_pump_sum_step_count: number;            // 酸泵总步数
    lye_pump_sum_step_count: number;             // 碱泵总步数
    defoam_pump_sum_step_count: number;          // 消泡泵总步数
    feed_pump_sum_step_count: number;           // 补料泵总步数
    // ——————————————实时速来——————————————
    feed_pump_now_speed: number;                // 补料泵当前速度-泵速==0为关闭
    acid_pump_now_speed: number;                // 酸泵当前速度-泵速==0为关闭
    lye_pump_now_speed: number;                 // 碱泵当前速度-泵速==0为关闭
    feed_pump_now_ml: number;                   // 补料泵当前补料量
    lye_pump_now_ml: number;                    // 碱泵当前补料量
    acid_pump_now_ml: number;                   // 酸泵当前补料量
    lye_pump_now_set_speed: number;             // 碱泵当前设定速度-我设定的
    acid_pump_now_set_speed: number;            // 酸泵当前设定速度-我设定的
    feed_pump_now_set_speed: number;            // 补料泵当前设定速度-我设定的
    defoam_pump_now_speed: number;              // 消泡泵当前速度-泵速==0为关闭
    defoam_pump_now_set_speed:number;           // 消泡泵设定速度


    // 补料控制部分
    feed_speed: number;                  // 补料泵设定补料速率
    feed_ml: number;                     // 补料泵目前补料量
    feed_DO_cu_limit: number;            // 补料关联氧含量上限值
    feed_DO_cl_limit: number;            // 补料关联氧含量下限值
    feed_DO_connect_flag: number;        // 补料关联氧含量标志位
    feed_flag: number;                   // 补料开启/停止标志位
    feed_motor_connect_flag: number;     // 补料关联转速标志位
    feed_DO_motor_connect_flag: number;  // 补料双关联转速、氧含量标志位
    feed_motor_flag: number;             // 补料泵开启标志位
    feed_motor_cu_limit: number;         // 补料关联转速上限值
    feed_motor_cl_limit: number;         // 补料关联转速下限值


    feed_pump_step_count: number;        // 补料泵发送步数
    feed_pump_calibration_flag: number;  // 补料泵标定开始标志位
     condensate_water_flag:number;          // 冷凝水开关
     heated_blanket_flag:number;           // 加热毯开关
    // 系统控制变量
    start_flag: number;          // 发酵开始标志位
    year: number;                // 年
    mounth: number;              // 月
    day: number;                 // 日
    hour: number;                // 时
    minute: number;              // 分
    second: number;              // 秒
    communicate_flag: number;    // 通讯开始标志位
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
    lyePumpSpeed: number;

    /** 补料泵单步速度 */
    feedPumpSpeed: number;
    rpmMaxWarn: number;
    rpmMinWarn: number;

    /** 消泡泵单步速度 */
    defoamerPumpSpeed: number;
    tempState: number,
    phState: number,
    doState: number,
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
    batch_cycle:number;

}

// TODO:设备管理要重构
// 1.内容数据表项不全仍然缺乏
// 2.各个部分的状态灯
// 3.报警数据

const state = (): {
    deviceList: Device[];
} => {
    return {
        deviceList: [
            {
                id: 0, name: '设备A', deviceNum: "BAB-00", ip: '192.168.1.3', port: 2000,batch_cycle:0,
                state: 0, nowData: null, deviceSocket: null, start_time: null, batch_name: null,
                alarm: false, deviceSet: {
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
        addDevice(ip: string, port: number, nameDevice: string) {
            const newId = this.deviceList.length;
            const newDevice: Device = {
                id: newId,
                name: nameDevice,
                deviceNum: `BAB-${newId}`,
                batch_cycle:0,
                ip: ip,
                port: port,
                state: 0,
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
        updateDeviceListData(index: number, newDeviceData: (SetData | number)) {
            console.log('newDeviceData', newDeviceData)
            if (typeof newDeviceData === 'number') {
                if (newDeviceData === -1) console.log("Error")
                return;
            }
            // 将数据的时间归为现在时间
            const currentDate = new Date();

            if (newDeviceData) {  // 确保 nowData 不为 null

                newDeviceData.year = currentDate.getFullYear();     //年
                newDeviceData.mounth = currentDate.getMonth() + 1;  //月 (注意: getMonth() 返回的月份是从0开始的，所以需要+1)
                newDeviceData.day = currentDate.getDate();          //日
                newDeviceData.hour = currentDate.getHours();        //时
                newDeviceData.minute = currentDate.getMinutes();    //分
                newDeviceData.second = currentDate.getSeconds();    //秒
                /*——————————————————————————————对状态的处理———————————————————————————————————*/
                // 未连接-未连接不会进行数据处理，在这里进行数据处理的只有已连接和报警两个选项
                // 已连接-已连接的设备如果没有修改通讯标志进行修改
                 if (newDeviceData.communicate_flag === 0) {
                    const data = {
                        communicate_flag: 1,

                    }
                    console.log("发送数据", data);
                    this.deviceList[index].deviceSocket.send(JSON.stringify(data));
                }
                // 运行中-刚开始运行，状态还没变过来
                if (this.deviceList[index].state == 1 && newDeviceData.communicate_flag === 1 && newDeviceData.start_flag === 1) {
                    this.deviceList[index].state = 2
                }
                // 报警
                if (this.deviceList && this.deviceList[index] && this.deviceList[index].deviceSet != null) {
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
                    if (!isAlarmFlag&&newDeviceData.communicate_flag === 1 && newDeviceData.start_flag === 1) {
                        this.deviceList[index].state = 2;
                        currentDeviceSet.tempState = 0;
                        currentDeviceSet.phState = 0;
                        currentDeviceSet.doState = 0;
                    }
                }


            }
            this.deviceList[index].nowData = newDeviceData;


        },
        updateDeviceList(newDeviceList: Device[]) {
            this.deviceList = newDeviceList;
        }


    },
});
