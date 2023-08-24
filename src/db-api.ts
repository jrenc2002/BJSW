import {ipcMain, IpcMainInvokeEvent} from 'electron';
import path from 'path';
import sqlite3Lib, {RunResult} from 'sqlite3';

// 为了避免 ESLint 的 'no-var-requires' 错误，我们这样导入 sqlite3
const sqlite3 = sqlite3Lib.verbose();
const dbPath = path.join(__dirname, '../src/database.db');
const db = new sqlite3.Database(dbPath);


export function createInitDB(): any {
    ipcMain.handle('init-db', (event: IpcMainInvokeEvent) => {
        return new Promise<string>((resolve, reject) => {
            console.log("Database path:", dbPath);

            console.log('init-db');
            try {
                db.prepare(`
             CREATE TABLE  IF NOT EXISTS fermentation_data (
                            id INTEGER PRIMARY KEY, -- 数据ID
                            batch_name TEXT,        -- 批次名
                            can_number TEXT,        -- 罐号
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
                            start_flag INTEGER         -- 发酵开始标志位
                        );
              `).run(function (err: any) {
                    if (err) {
                        console.error('Error while initializing the database:', err);
                        reject(err);
                    } else {
                        resolve("数据库初始化成功");
                    }
                });

            }catch (error) {
                console.error('Unexpected error while initializing the database:', error);
                reject(error);
            }

        });
    });
}
