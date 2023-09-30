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
    deviceNum: string;
    ip: string;
    port?: number; // 这意味着 port 是可选的
    state: boolean;
    nowdata: SetData|null;
    devicesocket: any;
    start_time: any;
    batch_name: any;
    pump1_speed: number;
    pump2_speed: number;
    pump3_speed: number;
    pump4_speed: number;
    alarm:boolean;


}
// TODO:设备管理要重构
// 1.内容数据表项不全仍然缺乏
// 2.各个部分的状态灯

const state = (): {
    deviceList: Device[];
} => {
    return {
        deviceList: [
            {id: 0, name: '设备A',  deviceNum: "BAB-00", ip: '192.168.1.3', port: 2000,
                state: false, nowdata: null, devicesocket: null,start_time:null,batch_name:null,
                pump1_speed:0,pump2_speed:0,pump3_speed:0,pump4_speed:0,alarm:false
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
        addDevice(ip: string, port: number,nameDevice:string){
            const newId = this.deviceList.length;
            const newDevice: Device = {
                id: newId,
                name: nameDevice,
                deviceNum: `BAB-${newId}`,
                ip: ip,
                port: port,
                state: false,
                nowdata: null,
                devicesocket: null,
                start_time:null,
                batch_name:null,
                pump1_speed:0,
                pump2_speed:0,
                pump3_speed:0,
                pump4_speed:0,
                alarm:false
            };

            this.deviceList.push(newDevice);
            return newId;
        },
        updateDeviceListData(index:number, newDeviceData: (SetData|number)) {

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


        },
        updateDeviceList(newDeviceList: Device[]) {
            this.deviceList= newDeviceList;
        }


    },
});
