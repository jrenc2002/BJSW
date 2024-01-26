import {useDeviceManage} from '@/store/DeviceManage'
import Swal from 'sweetalert2';

const DeviceManage = useDeviceManage();
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
            item.state = 1;
            item.deviceSocket = device;
            console.log(item.ip, ':', item.port, '连接成功');
            // todo debug测试记得
            
            setTimeout(() => {
                initValue(index)
            }, 1500);
        });
        
        // 假设你的设备API有一个'error'或'fail'事件来处理连接失败的情况
        device.on('error', (err) => {
            item.state = 0;
            item.deviceSocket = null;
            
            console.log(item.ip, ':', item.port, '连接失败');
        });
        // 连接断开，更新状态
        device.on('disconnect', () => {
            item.state = 0;
            item.deviceSocket = null;
            
            console.log(item.ip, ':', item.port, '连接失败');
        });
        device.onReceive((data) => {
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
        deviceInfo.deviceSocket = socket;
    };
    
    device.on('connect', () => {
        setDeviceStatus(1, device);
        setTimeout(() => {
            initValue(index)
        }, 1500);
        console.log(`${deviceInfo.ip}:${deviceInfo.port} 连接成功`);
    });
    
    device.on('error', (err) => {
        setDeviceStatus(0);
        console.log(`${deviceInfo.ip}:${deviceInfo.port} 连接失败，错误信息:`, err);
    });
    
    device.on('disconnect', () => {
        setDeviceStatus(0);
        console.log(`${deviceInfo.ip}:${deviceInfo.port} 连接断开`);
    });
    
    device.onReceive((data) => {
        DeviceManage.updateDeviceListData(index, onDataReceived(data));
    });
    
    localStorage.setItem('deviceList', JSON.stringify(DeviceManage.deviceList));
}

// 删除设备
export const deleteDevice = (index) => {
    if (index >= 0 && index < DeviceManage.deviceList.length) {
        // 关闭与设备的连接
        const device = DeviceManage.deviceList[index]?.deviceSocket;
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
    const data = {
        communicate_flag: 0,
    };
    DeviceManage.deviceList[index]?.deviceSocket?.send(JSON.stringify(data));
    // 检查设备状态是否为 true
    if (!device.state) {
        console.warn(`设备 ${index} 已经关闭`);
        return;
    }
    
    try {
        if (device.deviceSocket) {
            device.deviceSocket.close();
            device.deviceSocket = null;
        }
        device.state = 0;
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
    const {ip, port} = deviceInfo;
    const device = window.useAPI.connect(ip, port);
    
    // 辅助函数：设置设备状态
    const setDeviceStatus = (state, socket = null) => {
        deviceInfo.state = state;
        deviceInfo.deviceSocket = socket;
    };
    
    device.on('connect', () => {
        setDeviceStatus(1, device);
        setTimeout(() => {
            initValue(index)
        }, 1500);
        
        console.log(`${ip}:${port} 连接成功`);
    });
    
    device.on('error', () => {
        setDeviceStatus(0);
        console.log(`${ip}:${port} 连接失败`);
    });
    
    device.on('disconnect', () => {
        setDeviceStatus(0);
        console.log(`${ip}:${port} 连接断开`);
    });
    
    device.onReceive((data) => {
        const jsonData = onDataReceived(data);
        if (jsonData !== -2 || -1) {
            DeviceManage.updateDeviceListData(index, jsonData);
        }
    });
}


// 数据发送
export const sendData = async (index, data) => {
    
    //分包发送
    
    if (DeviceManage.deviceList[index].nowData !== undefined && DeviceManage.deviceList[index].nowData !== null) {
        
        // 将对象的键拆分成每6个一组的数组
        const chunks = Object.keys(data).reduce((result, key, chunkindex) => {
            if (chunkindex % 6 === 0) result.push([]);
            result[Math.floor(chunkindex / 6)].push(key);
            return result;
        }, []);
        
        let chunkIndex = 0;
        let check = true;
        
    
        // 数据拦截器进入
        await dataInterceptor(index, data).then((res) => {
            console.log("【数据拦截器】--------------------",res)
            check=res
        })
        if (check===false){
            return
        }
        // 数据预存器进入
        await dataPreserver(index, data);
    
    
        const sendDataChunk = () => {
            if (chunkIndex < chunks.length) {
                const chunkData = {};
                chunks[chunkIndex].forEach(key => {
                    chunkData[key] = data[key];
                });
                // 发送当前分组的数据
                console.log("发送数据", chunkData);
                DeviceManage.deviceList[index]?.deviceSocket.send(JSON.stringify(chunkData));
                chunkIndex++;
            } else {
                clearInterval(intervalId);  // 当所有分组都已发送时，清除间隔
            }
        };
        
        const intervalId = setInterval(sendDataChunk, 1000);
        
    }
}

// 帮我写个数据拦截器，如果数据通过就可以发送，数据不通过就驳回
function dataInterceptor(index, data) {
    // 上下限问题
    // 温度控制自动状态下无法更改加热毯冷凝水状态
    return new Promise((resolve, reject) => {
        
        // 温度控制自动状态下无法更改加热毯冷凝水状态
        if (data.condensate_water_flag !== undefined) {
            if (DeviceManage.deviceList[index].nowData.temp_flag === 1) {
                Swal.fire({
                    icon: 'warning', // 由于是确认操作，使用 'question' 图标
                    title: '自动控制状态下不能手动改变冷水阀', // 设置标题
                    showCancelButton: false, // 显示取消按钮
                    confirmButtonColor: '#3085d6', // 确认按钮颜色
                    confirmButtonText: '确认', // 确认按钮文本
                })
                resolve(false)
                
            } else {
                resolve(true)
            }
        }
        if (data.heated_blanket_flag !== undefined) {
            if (DeviceManage.deviceList[index].nowData.temp_flag === 1) {
                Swal.fire({
                    icon: 'warning', // 由于是确认操作，使用 'question' 图标
                    title: '自动控制状态下不能手动改变加热毯开关', // 设置标题
                    showCancelButton: false, // 显示取消按钮
                    confirmButtonColor: '#3085d6', // 确认按钮颜色
                    confirmButtonText: '确认', // 确认按钮文本
                })
                resolve(false)
                
            } else {
                resolve(true)
            }
        }
        if (data.target_motor_speed !== undefined) {
            // 将设定的转速与上下限进行比较,然后重新发送一下数据
            if (data.target_motor_speed > DeviceManage.deviceList[index].nowData.motor_speed_u_limit) {
                sendData(index, {target_motor_speed: DeviceManage.deviceList[index].nowData.motor_speed_u_limit})
                resolve(false)
                
            }
            if (data.target_motor_speed < DeviceManage.deviceList[index].nowData.motor_speed_l_limit) {
                sendData(index, {target_motor_speed: DeviceManage.deviceList[index].nowData.motor_speed_l_limit})
                resolve(false)
                
            }
            resolve(true)
            
     
            
        }
        resolve(true)
        
        
    })
    
    
}

// 数据预存器
export const dataPreserver = (index, data) => {
    // data是一个对象将data里的每个对象存入设备管理器对应的nowdata里相应的键名
    for (const key in data) {
        DeviceManage.deviceList[index].nowData[key] = data[key]
    }
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
        // 清除已经处理的数据
        dataCache = dataCache.substring(endIndex);
        
        // 解析数据
        try {
            const jsonData = JSON.parse(completeData);
            
            return jsonData
        } catch (error) {
            Swal.fire({
                icon: 'warning', //error\warning\info\question
                title: '通讯警告',
                text: '通讯报错，请检查设备连接',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                confirmButton: false,
                cancelButtonText: '取消',
            });
            console.log("通讯报错，请检查设备连接", completeData)
            return -1
        }
    }
    return -2
}

function initValue(index) {
    const data = {
        Temp_KP: 500,
        Temp_KI: 5,
        Temp_KD: 1,
        DO_KP: 80,
        DO_KI: 0.5,
        DO_KD: 0,
        acid_KP: 10,
        acid_KI: 0.02,
        acid_KD: 0,
        lye_KP: 10,
        lye_KI: 0.02,
        lye_KD: 0,
        motor_speed_u_limit: 1000,
        motor_speed_l_limit: 300,
        zero_point_value: 0.057787,
        saturation_value: 19.5,
        
    }
    sendData(index, data)
}
