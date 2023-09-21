import {useDeviceManage} from '@/store/DeviceManage'
const DeviceManage=useDeviceManage();

/* API-与下位机通讯: 连接设备
    * 文件包含上下位机通讯的所有API
    * @initDeviceManage 对设备管理器初始化
    * 首先他要从设备管理中获取设备列表，然后对设备列表进行遍历，对每一个设备进行尝试连接，如果连接成功就更新设备状态-成功，如果连接失败就更新设备状态-失败

    * @addDevice 增加设备后对设备进行自动尝试连接-对减少设备的异常情况自适应
    * 增加设备后，对设备进行自动尝试连接，如果连接成功就更新设备状态-成功，如果连接失败就更新设备状态-失败
    * _____________________
    * @openDevice  @closeDevice 手动控制设备的连接与断开
    * 设备连接失败后可以手动重新控制设备的连接和断开。
    * _____________________
    * @senddataDevice 设备连接成功后，对设备进行数据的发送
    * 设备连接成功后，对设备进行数据的接收与发送，接收到的数据进行拼接，然后进行解析，解析成功后，将数据更新到应该到的地方；
    * 发送数据时，将数据按特定格式处理，列如分包，然后进行发送，发送成功后，将数据更新到应该到的地方。
 */
// 对设备管理器初始化-添加外部监听
export const initDeviceManage = () => {
    // 首先他要从设备管理中获取设备列表，然后对设备列表进行遍历，对每一个设备进行尝试连接，
    // 如果连接成功就更新设备状态-成功，如果连接失败就更新设备状态-失败
    DeviceManage.deviceList.forEach((item, index) => {

        const device = window.useAPI.connect(item.ip, item.port);

        // 对每一个设备进行尝试连接，如果连接成功就更新设备状态-成功，如果连接失败就更新设备状态-失败
        device.on('connect', () => {
            item.state = true;
            item.devicesocket = device;
            console.log(item.ip,':',item.port,'连接成功');
        });

        // 假设你的设备API有一个'error'或'fail'事件来处理连接失败的情况
        device.on('error', (err) => {
            item.state = false;
            item.devicesocket = null;

            console.log(item.ip,':',item.port,'连接失败');
        });
        // 连接断开，更新状态
        device.on('disconnect', () => {
            item.state = false;
            item.devicesocket = null;

            console.log(item.ip,':',item.port,'连接失败');
        });
        device.onReceive((data) => {

            console.log('Data from device ${index}:', data);
            DeviceManage.updateDeviceListData(index, onDataReceived(data));


        });

    });
}



//  新增设备
export const addDevice = (ip, port, name) => {
    // 验证输入的有效性
    if (!ip || !port || !name) {
        console.error("无效的IP、端口或名称:", ip, port, name);
        return;
    }

    const index = DeviceManage.addDevice(ip, port, name);
    if (index === undefined || index < 0) {
        console.error(`添加设备失败: ${ip}:${port}`);
        return;
    }

    const deviceInfo = DeviceManage.deviceList[index];
    const device = window.useAPI.connect(ip, port);

    // 辅助函数：设置设备状态
    const setDeviceStatus = (state, socket = null) => {
        deviceInfo.state = state;
        deviceInfo.devicesocket = socket;
    };

    device.on('connect', () => {
        setDeviceStatus(true, device);
        console.log(`${deviceInfo.ip}:${deviceInfo.port} 连接成功`);
    });

    device.on('error', (err) => {
        setDeviceStatus(false);
        console.log(`${deviceInfo.ip}:${deviceInfo.port} 连接失败，错误信息:`, err);
    });

    device.on('disconnect', () => {
        setDeviceStatus(false);
        console.log(`${deviceInfo.ip}:${deviceInfo.port} 连接断开`);
    });

    device.onReceive((data) => {
        console.log(`Data from device ${index}:`, data);
        DeviceManage.updateDeviceListData(index, onDataReceived(data));
    });

    localStorage.setItem('deviceList', JSON.stringify(DeviceManage.deviceList));
}

// 删除设备
export const deleteDevice = (index) => {
    if (index >= 0 && index < DeviceManage.deviceList.length) {
        // 关闭与设备的连接
        const device = DeviceManage.deviceList[index].devicesocket;
        if (device) {
            device.close();
        }

        // 从设备列表中删除设备
        DeviceManage.deviceList.splice(index, 1);
        // 重新排序设备id
        DeviceManage.deviceList.forEach((device, index) => {
            device.id = index;
        });
        // 更新本地存储
        localStorage.setItem('deviceList', JSON.stringify(DeviceManage.deviceList));
    } else {
        console.error(`无效的设备索引: ${index}`);
    }
}


// 关闭设备
export const closeDevice = (index) => {
    // 检查 index 是否有效
    if (typeof index !== 'number' || index < 0 || index >= DeviceManage.deviceList.length) {
        console.error(`无效的设备索引: ${index}`);
        return;
    }

    const device = DeviceManage.deviceList[index];

    // 检查设备状态是否为 true
    if (!device.state) {
        console.warn(`设备 ${index} 已经关闭`);
        return;
    }

    try {
        if (device.devicesocket) {
            device.devicesocket.close();
            device.devicesocket = null;
        }
        device.state = false;
        console.log(`设备 ${index} 已成功关闭`);
    } catch (error) {
        console.error(`关闭设备 ${index} 时出错:`, error);
    }
}

// 打开设备
export const openDevice = (index) => {
    // 检查index是否有效
    if (typeof index !== 'number' || index < 0 || index >= DeviceManage.deviceList.length) {
        console.error(`无效的设备索引: ${index}`);
        return;
    }

    const deviceInfo = DeviceManage.deviceList[index];
    const { ip, port } = deviceInfo;
    const device = window.useAPI.connect(ip, port);

    // 辅助函数：设置设备状态
    const setDeviceStatus = (state, socket = null) => {
        deviceInfo.state = state;
        deviceInfo.devicesocket = socket;
    };

    device.on('connect', () => {
        setDeviceStatus(true, device);
        console.log(`${ip}:${port} 连接成功`);
    });

    device.on('error', () => {
        setDeviceStatus(false);
        console.log(`${ip}:${port} 连接失败`);
    });

    device.on('disconnect', () => {
        setDeviceStatus(false);
        console.log(`${ip}:${port} 连接断开`);
    });

    device.onReceive((data) => {
        console.log(`Data from device ${index}:`, data);
        DeviceManage.updateDeviceListData(index, onDataReceived(data));
    });
}


// 数据发送
export const sendData = (index) => {

    //分包发送
    const currentDate = new Date();
    // 初始化数据
    const data = {
        /*PH控制部分变量*/
        timing_PH: 5.1,   //实时PH值
        acid_speed: 0.0,  //酸泵实时送料速率
        lye_speed: 0.0,   //碱泵实时送料速率
        target_PH: 0.0,   //设定目标PH
        acid_KP: 0.0,     //PID参数
        acid_KI: 0.0,     //PID参数
        acid_KD: 0.0,     //PID参数
        lye_KP: 0.0,      //PID参数
        lye_KI: 0.0,      //PID参数
        lye_KD: 0.0,      //PID参数
        acid_ml: 0.0,     //酸泵目前送料量
        lye_ml: 0.0,      //碱泵目前送料量
        acid_handle_speed_set: 0.0,   //酸泵手动送料速率设置
        lye_handle_speed_set: 0.0,    //碱泵手动送料速率设置
        PH_flag: 0,       //PH控制开启/停止标志位
        Ph_auto_handle: 0,            //PH控制自动/手动控制标志位

        /*温控部分变量*/
        timing_temp: 0.0,             //实时温度值
        heatpower: 0.0,               //加热毯实时功率
        target_temp: 0.0,             //设定目标温度值
        Temp_KP: 0.0,                 //温控KP
        Temp_KI: 0.0,                 //温控KI
        Temp_KD: 0.0,                 //温控KD
        water_flag: 0,                //冷凝水通断标志位
        temp_flag: 0,                 //温控开启/停止标志位
        cool_water_autoflag: 0,       //冷凝水通断控制自动/手动标志位

        /*氧含量控制部分变量*/
        timing_DO: 0.0,               //实时DO值
        oxy_ratio: 0.0,               //氧气通度
        target_DO: 0.0,               //设定目标DO值
        target_oxy_ratio: 0.0,        //手动设定氧气通度
        DO_KP: 0.0,                   //氧含量KP
        DO_KI: 0.0,                   //氧含量KI
        DO_KD: 0.0,                   //氧含量KD
        DO_flag: 0,                   //氧含量控制开启标志位
        target_motor_speed: 0,        //手动设定电机转速
        timing_motor_speed: 0,        //电机实时转速
        motor_speed_l_limit: 0,       //电机转速下限
        motor_speed_u_limit: 0,       //电机转速上限
        motor_speed_autoflag: 0,      //转速关联氧含量开启/关闭标志位
        oxy_flag: 0,                  //通氧关联氧含量开启/关闭标志位

        /*消泡控制部分*/
        clean_speed: 0.0,             //消泡泵设定送料速率
        clean_ml: 0.0,                //消泡泵目前送料量
        clean_single_time: 0.0,       //消泡单次泵入时间
        clean_flag: 0,                //消泡开启/停止标志位

        /*补料控制部分*/
        feed_speed: 0.0,              //补料泵设定补料速率
        feed_ml: 0.0,                 //补料泵目前补料量
        feed_DO_cu_limit: 0.0,        //补料关联氧含量上限值
        feed_DO_cl_limit: 0.0,        //补料关联氧含量下限值
        feed_DO_connect_flag: 0,      //补料关联氧含量标志位
        feed_flag: 1,                 //补料开启/停止标志位
        feed_motor_connect_flag: 0,   //补料关联转速标志位
        feed_DO_motor_connect_flag: 0,//补料双关联转速、氧含量标志位
        feed_motor_flag: 1,           //补料泵开启标志位
        feed_motor_cu_limit: 0,       //补料关联转速上限值
        feed_motor_cl_limit: 0,       //补料关联转速下限值

        /*系统控制变量*/
        start_flag: 0,                //发酵开始标志位
        year: currentDate.getFullYear(),   //年
        mounth: currentDate.getMonth() + 1, //月 (注意: getMonth() 返回的月份是从0开始的，所以需要+1)
        day: currentDate.getDate(),        //日
        hour: currentDate.getHours(),      //时
        minute: currentDate.getMinutes(),  //分
        second: currentDate.getSeconds(),  //秒
        communicate_flag: 0,           //通讯开始标志
        decive_id: ""                   //罐号ID
    };

    // 将对象的键拆分成每6个一组的数组
    const chunks = Object.keys(data).reduce((result, key, index) => {
        if (index % 6 === 0) result.push([]);
        result[Math.floor(index / 6)].push(key);
        return result;
    }, []);

    let chunkIndex = 0;

    const sendDataChunk = () => {
        if (chunkIndex < chunks.length) {
            const chunkData = {};
            chunks[chunkIndex].forEach(key => {
                chunkData[key] = data[key];
            });
            // 发送当前分组的数据
            DeviceManage.deviceList[index].devicesocket.send(JSON.stringify(chunkData));
            chunkIndex++;
        } else {
            clearInterval(intervalId);  // 当所有分组都已发送时，清除间隔
        }
    };

    const intervalId = setInterval(sendDataChunk, 500);

}








// 拼合接受数据
let dataCache = "";
function onDataReceived(data) {
    // 添加到缓存
    dataCache += data;

    // 检查数据完整性
    while (dataCache.includes("{") && dataCache.includes("}")) {
        const startIndex = dataCache.indexOf("{");
        const endIndex = dataCache.lastIndexOf("}") + 1;

        // 提取完整的数据包
        const completeData = dataCache.substring(startIndex, endIndex);
        console.log(completeData)
        // 清除已经处理的数据
        dataCache = dataCache.substring(endIndex);

        // 解析数据
        try {
            const jsonData = JSON.parse(completeData);
            // TODO: 使用jsonData
            return jsonData
        } catch (error) {
            console.error("JSON解析错误", error);
            // TODO: 错误处理
            return -1
        }
    }
    return -2
}
