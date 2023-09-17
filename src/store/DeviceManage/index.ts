import {defineStore} from "pinia";

// 给开发人员使用的debug
const debug = false;
interface SetData {
    /*PH控制部分变量*/
    timing_PH: number;   //实时PH值
    acid_speed: number;  //酸泵实时送料速率
    lye_speed: number;   //碱泵实时送料速率
    target_PH: number;   //设定目标PH
    acid_KP: number;     //PID参数
    acid_KI: number;     //PID参数
    acid_KD: number;     //PID参数
    lye_KP: number;      //PID参数
    lye_KI: number;      //PID参数
    lye_KD: number;      //PID参数
    acid_ml: number;     //酸泵目前送料量
    lye_ml: number;      //碱泵目前送料量
    acid_handle_speed_set: number;   //酸泵手动送料速率设置
    lye_handle_speed_set: number;    //碱泵手动送料速率设置
    PH_flag: number;     //PH控制开启/停止标志位
    Ph_auto_handle: number;          //PH控制自动/手动控制标志位

    /*温控部分变量*/
    timing_temp: number;             //实时温度值
    heatpower: number;               //加热毯实时功率
    target_temp: number;             //设定目标温度值
    Temp_KP: number;                 //温控KP
    Temp_KI: number;                 //温控KI
    Temp_KD: number;                 //温控KD
    water_flag: number;              //冷凝水通断标志位
    temp_flag: number;               //温控开启/停止标志位
    cool_water_autoflag: number;     //冷凝水通断控制自动/手动标志位

    /*氧含量控制部分变量*/
    timing_DO: number;               //实时DO值
    oxy_ratio: number;               //氧气通度
    target_DO: number;               //设定目标DO值
    target_oxy_ratio: number;        //手动设定氧气通度
    DO_KP: number;                   //氧含量KP
    DO_KI: number;                   //氧含量KI
    DO_KD: number;                   //氧含量KD
    DO_flag: number;                 //氧含量控制开启标志位
    target_motor_speed: number;      //手动设定电机转速
    timing_motor_speed: number;      //电机实时转速
    motor_speed_l_limit: number;     //电机转速下限
    motor_speed_u_limit: number;     //电机转速上限
    motor_speed_autoflag: number;    //转速关联氧含量开启/关闭标志位
    oxy_flag: number;                //通氧关联氧含量开启/关闭标志位

    /*消泡控制部分*/
    clean_speed: number;             //消泡泵设定送料速率
    clean_ml: number;                //消泡泵目前送料量
    clean_single_time: number;       //消泡单次泵入时间
    clean_flag: number;              //消泡开启/停止标志位

    /*补料控制部分*/
    feed_speed: number;              //补料泵设定补料速率
    feed_ml: number;                 //补料泵目前补料量
    feed_DO_cu_limit: number;        //补料关联氧含量上限值
    feed_DO_cl_limit: number;        //补料关联氧含量下限值
    feed_DO_connect_flag: number;    //补料关联氧含量标志位
    feed_flag: number;               //补料开启/停止标志位
    feed_motor_connect_flag: number; //补料关联转速标志位
    feed_DO_motor_connect_flag: number; //补料双关联转速、氧含量标志位
    feed_motor_flag: number;         //补料泵开启标志位
    feed_motor_cu_limit: number;     //补料关联转速上限值
    feed_motor_cl_limit: number;     //补料关联转速下限值

    /*系统控制变量*/
    start_flag: number;              //发酵开始标志位
    year: number;                    //年
    mounth: number;                  //月
    day: number;                     //日
    hour: number;                    //时
    minute: number;                  //分
    second: number;                  //秒
    communicate_flag: number;        //通讯开始标志位
    decive_id: string;                   //罐号ID
}
interface Device {
    id: number;
    name: string;
    href: string;
    deviceNum: string;
    ip: string;
    port: number;
    state: boolean;
    nowdata: SetData|null;
    devicesocket: any;
}

const defaultVar = {
    timing_PH: 0.0,
    acid_speed: 0.0,
    lye_speed: 0.0,
    target_PH: 0.0,
    acid_KP: 0.0,
    acid_KI: 0.0,
    acid_KD: 0.0,
    lye_KP: 0.0,
    lye_KI: 0.0,
    lye_KD: 0.0,
    acid_ml: 0.0,
    lye_ml: 0.0,
    acid_handle_speed_set: 0.0,
    lye_handle_speed_set: 0.0,
    PH_flag: 0,
    Ph_auto_handle: 0,
    timing_temp: 0.0,
    heatpower: 0.0,
    target_temp: 0.0,
    Temp_KP: 0.0,
    Temp_KI: 0.0,
    Temp_KD: 0.0,
    water_flag: 0,
    temp_flag: 0,
    cool_water_autoflag: 0,
    timing_DO: 0.0,
    oxy_ratio: 0.0,
    target_DO: 0.0,
    target_oxy_ratio: 0.0,
    DO_KP: 0.0,
    DO_KI: 0.0,
    DO_KD: 0.0,
    DO_flag: 0,
    target_motor_speed: 0,
    timing_motor_speed: 0,
    motor_speed_l_limit: 0,
    motor_speed_u_limit: 0,
    motor_speed_autoflag: 0,
    oxy_flag: 0,
    clean_speed: 0.0,
    clean_ml: 0.0,
    clean_single_time: 0.0,
    clean_flag: 0,
    feed_speed: 0.0,
    feed_ml: 0.0,
    feed_DO_cu_limit: 0.0,
    feed_DO_cl_limit: 0.0,
    feed_DO_connect_flag: 0,
    feed_flag: 0,
    feed_motor_connect_flag: 0,
    feed_DO_motor_connect_flag: 0,
    feed_motor_flag: 0,
    feed_motor_cu_limit: 0,
    feed_motor_cl_limit: 0,
    start_flag: 0,
    year: 0,
    mounth: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    communicate_flag: 0,
    decive_id:""
};
const state = (): {
    deviceList: Device[];
} => {
    return {
        deviceList: [
            {id: 1, name: '设备A', href: '#', deviceNum: "BAB-00", ip: '192.168.1.3', port: 2000, state: false, nowdata: null, devicesocket: null},

        ]
    }
}

/**
 * 提供可视窗口的公共状态
 */
export const useDeviceManage = defineStore('DeviceManage', {
    state,
    actions: {

        updateDeviceList(index:number,newDeviceData: (SetData|number)) {
            console.log(newDeviceData)
            if (typeof newDeviceData === 'number') {
                if (newDeviceData===-1)console.log("Error")
                return;
            }

            // 将数据的时间归为现在时间
            const currentDate = new Date();

                if (newDeviceData) {  // 确保 nowdata 不为 null
                    newDeviceData.year = currentDate.getFullYear();     //年
                    newDeviceData.mounth = currentDate.getMonth() + 1;  //月 (注意: getMonth() 返回的月份是从0开始的，所以需要+1)
                    newDeviceData.day = currentDate.getDate();          //日
                    newDeviceData.hour = currentDate.getHours();        //时
                    newDeviceData.minute = currentDate.getMinutes();    //分
                    newDeviceData.second = currentDate.getSeconds();    //秒
                }


            this.deviceList[index].nowdata = newDeviceData;
            console.log(newDeviceData)
            console.log(this.deviceList[index].nowdata)
        }


    },
});
