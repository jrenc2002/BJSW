import {ipcMain, IpcMainInvokeEvent} from 'electron';
import path from 'path';
import sqlite3Lib, {RunResult} from 'sqlite3';

// 为了避免 ESLint 的 'no-var-requires' 错误，我们这样导入 sqlite3
const sqlite3 = sqlite3Lib.verbose();
const dbPath = path.join(__dirname, '../src/database.db');
const db = new sqlite3.Database(dbPath);

export function createInitDB(): any {
    ipcMain.handle('init-db', async (event: IpcMainInvokeEvent) => {
        console.log("Database path:", dbPath);
        console.log('init-db');
        const runQuery = (query: string) => {
            return new Promise((res, rej) => {
                db.prepare(query).run(err => {
                    if (err) rej(err);
                    else res("true");
                });
            });
        };
        try {
            await runQuery(`
                CREATE TABLE IF NOT EXISTS fermentation_batch (
                    id INTEGER PRIMARY KEY, 
                    batch_name TEXT,        
                    can_number TEXT,        
                    start_time TEXT,
                    UNIQUE(batch_name, can_number)      
                );
            `);
            await runQuery(`
                CREATE TABLE IF NOT EXISTS fermentation_data (
                            data_id INTEGER PRIMARY KEY,
                            batch_id INTEGER,       -- 这是外键，与fermentation_batch的id对应
                            time TEXT,              -- 时间
                            timing_PH REAL,         -- 实时PH值
                            acid_speed REAL,        -- 酸泵实时送料速率
                            lye_speed REAL,         -- 碱泵实时送料速率
                            target_PH REAL,         -- 设定目标PH
                            acid_KP REAL,           -- 酸泵P
                            acid_KI REAL,           -- 酸泵I
                            acid_KD REAL,           -- 酸泵D
                            lye_KP REAL,            -- 碱泵P
                            lye_KI REAL,            -- 碱泵I
                            lye_KD REAL,            -- 碱泵D
                            acid_ml REAL,           -- 酸泵目前送料量
                            lye_ml REAL,            -- 碱泵目前送料量
                            acid_handle_speed_set REAL, -- 酸泵手动送料速率设置
                            lye_handle_speed_set REAL, -- 碱泵手动送料速率设置
                            PH_flag INTEGER,        -- PH控制开启/停止标志位
                            Ph_auto_handle INTEGER, -- PH控制自动/手动控制标志位
                            timing_temp REAL,       -- 实时温度值
                            heatpower REAL,         -- 加热毯实时功率
                            target_temp REAL,       -- 设定目标温度值
                            Temp_KP REAL,           -- 温控KP
                            Temp_KI REAL,           -- 温控KI
                            Temp_KD REAL,           -- 温控KD
                            water_flag INTEGER,     -- 冷凝水通断标志位
                            temp_flag INTEGER,      -- 温控开启/停止标志位
                            cool_water_autoflag INTEGER, -- 冷凝水通断控制自动/手动标志位
                            timing_DO REAL,         -- 实时DO值
                            oxy_ratio REAL,         -- 氧气通度
                            target_DO REAL,         -- 设定目标DO值
                            target_oxy_ratio REAL,  -- 设定目标氧气通度
                            DO_KP REAL,             -- 氧含量KP
                            DO_KI REAL,             -- 氧含量KI
                            DO_KD REAL,             -- 氧含量KD
                            DO_flag INTEGER,        -- 氧含量控制开启标志位
                            target_motor_speed INTEGER, -- 电机转速
                            timing_motor_speed INTEGER,  -- 电机实时转速
                            motor_speed_l_limit INTEGER, -- 电机转速下限
                            motor_speed_u_limit INTEGER, -- 电机转速上限
                            motor_speed_autoflag INTEGER, -- 转速关联氧含量开启/关闭标志位
                            oxy_flag INTEGER,          -- 通氧关联氧含量开启/关闭标志位
                            clean_speed REAL,          -- 消泡泵设定送料速率
                            clean_ml REAL,             -- 消泡泵目前送料量
                            clean_single_time REAL,    -- 消泡单次泵入时间
                            clean_flag INTEGER,        -- 消泡开启/停止标志位
                            feed_speed REAL,           -- 补料泵设定补料速率
                            feed_ml REAL,              -- 补料泵目前补料量
                            feed_DO_cu_limit REAL,     -- 补料关联氧含量上限值
                            feed_DO_cl_limit REAL,     -- 补料关联氧含量下限值
                            feed_DO_connect_flag INTEGER, -- 补料关联氧含量标志位
                            feed_flag INTEGER,         -- 补料开启/停止标志位
                            feed_motor_connect_flag INTEGER, -- 补料关联转速标志位
                            feed_DO_motor_connect_flag INTEGER, -- 补料双关联转速、氧含量标志位
                            feed_motor_flag INTEGER,   -- 补料泵开启标志位
                            feed_motor_cu_limit INTEGER,  -- 补料关联转速上限值
                            feed_motor_cl_limit INTEGER,  -- 补料关联转速下限值
                            start_flag INTEGER,         -- 发酵开始标志位
                            FOREIGN KEY(batch_id) REFERENCES fermentation_batch(id)  --这是外键
                );
            `);
            return "数据库初始化成功";

        } catch (error) {
            console.error('Unexpected error while initializing the database:', error);
            return "数据库初始化失败";
        }

    });
    ipcMain.handle('get-fermentation-batch-data', async (event: IpcMainInvokeEvent, can_number: string) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM fermentation_batch WHERE can_number = ?';
            db.all(query, [can_number],(err, rows) => {
                if (err) {
                    console.error("Error fetching data from fermentation_batch:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
    ipcMain.handle('get-fermentation-data-by-batch-id', async (event: IpcMainInvokeEvent, batch_id: number) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM fermentation_data WHERE batch_id = ?';
            db.all(query, [batch_id], (err, rows) => {
                if (err) {
                    console.error("Error fetching data from fermentation_data by batch_id:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
    // 添加新的发酵批次
    ipcMain.handle('add-fermentation-batch', async (event: IpcMainInvokeEvent, batchData: { batch_name: string, can_number: string, start_time: string }) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO fermentation_batch(batch_name, can_number, start_time) VALUES (?, ?, ?)`;
            db.run(query, [batchData.batch_name, batchData.can_number, batchData.start_time], function(err: Error) {
                if (err) {
                    console.error("Error adding data to fermentation_batch:", err);
                    reject(err);
                } else {
                    resolve(this.lastID);  // 返回新插入数据的ID
                }
            });
        });
    });

    // 添加新的发酵数据
    ipcMain.handle('add-fermentation-data', async (event: IpcMainInvokeEvent, data: any) => {
        return new Promise((resolve, reject) => {
            const query = `
            INSERT INTO fermentation_data(
                batch_id, time, timing_PH, acid_speed, lye_speed, target_PH, acid_KP, acid_KI, acid_KD, 
                lye_KP, lye_KI, lye_KD, acid_ml, lye_ml, acid_handle_speed_set, lye_handle_speed_set, 
                PH_flag, Ph_auto_handle, timing_temp, heatpower, target_temp, Temp_KP, Temp_KI, Temp_KD, 
                water_flag, temp_flag, cool_water_autoflag, timing_DO, oxy_ratio, target_DO, target_oxy_ratio,
                DO_KP, DO_KI, DO_KD, DO_flag, target_motor_speed, timing_motor_speed, motor_speed_l_limit,
                motor_speed_u_limit, motor_speed_autoflag, oxy_flag, clean_speed, clean_ml, clean_single_time, 
                clean_flag, feed_speed, feed_ml, feed_DO_cu_limit, feed_DO_cl_limit, feed_DO_connect_flag, 
                feed_flag, feed_motor_connect_flag, feed_DO_motor_connect_flag, feed_motor_flag, feed_motor_cu_limit, 
                feed_motor_cl_limit, start_flag
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
            db.run(query, [
                data.batch_id, data.time, data.timing_PH, data.acid_speed, data.lye_speed, data.target_PH, data.acid_KP,
                data.acid_KI, data.acid_KD, data.lye_KP, data.lye_KI, data.lye_KD, data.acid_ml, data.lye_ml,
                data.acid_handle_speed_set, data.lye_handle_speed_set, data.PH_flag, data.Ph_auto_handle,
                data.timing_temp, data.heatpower, data.target_temp, data.Temp_KP, data.Temp_KI, data.Temp_KD,
                data.water_flag, data.temp_flag, data.cool_water_autoflag, data.timing_DO, data.oxy_ratio, data.target_DO,
                data.target_oxy_ratio, data.DO_KP, data.DO_KI, data.DO_KD, data.DO_flag, data.target_motor_speed,
                data.timing_motor_speed, data.motor_speed_l_limit, data.motor_speed_u_limit, data.motor_speed_autoflag,
                data.oxy_flag, data.clean_speed, data.clean_ml, data.clean_single_time, data.clean_flag, data.feed_speed,
                data.feed_ml, data.feed_DO_cu_limit, data.feed_DO_cl_limit, data.feed_DO_connect_flag, data.feed_flag,
                data.feed_motor_connect_flag, data.feed_DO_motor_connect_flag, data.feed_motor_flag, data.feed_motor_cu_limit,
                data.feed_motor_cl_limit, data.start_flag
            ], function(err: Error) {
                if (err) {
                    console.error("Error adding data to fermentation_data:", err);
                    reject(err);
                } else {
                    resolve(this.lastID);  // 返回新插入数据的ID
                }
            });
        });
    });


}

