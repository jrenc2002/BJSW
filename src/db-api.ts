import {ipcMain, IpcMainInvokeEvent} from 'electron';
import sqlite3Lib from 'sqlite3';

const path = require('path');

// 为了避免 ESLint 的 'no-var-requires' 错误，我们这样导入 sqlite3
const sqlite3 = sqlite3Lib.verbose();

const dbPath = path.join(__dirname, '../src/database.db');
console.log(dbPath)
const db = new sqlite3.Database(dbPath);

export function createInitDB(): any {
    ipcMain.handle('init-db', async (event: IpcMainInvokeEvent) => {
        console.log("Database path:", dbPath);
        console.log('init-db');
        
        // 确保数据库连接
        if (!db) {
            console.error('数据库连接失败');
            return "数据库连接失败";
        }
        
        const runQuery = (query: string) => {
            return new Promise((res, rej) => {
                db.prepare(query).run(err => {
                    if (err) rej(err);
                    else res("true");
                });
            });
        };
        
        // 开始数据库事务
        await runQuery('BEGIN TRANSACTION;');
        
        try {
            // 创建表格和索引
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
            CREATE INDEX IF NOT EXISTS idx_batch_name ON fermentation_batch(batch_name);
            CREATE INDEX IF NOT EXISTS idx_start_time ON fermentation_batch(start_time);
        `);
            await runQuery(`
            CREATE TABLE IF NOT EXISTS fermentation_data (
                data_id INTEGER PRIMARY KEY,
                can_number TEXT NOT NULL,
                batch_id INTEGER,
                batch_name TEXT,
                timing_temp REAL,
                timing_PH REAL,
                timing_DO REAL,
                timing_motor_speed INTEGER,
                relative_time REAL,
                absolute_time TEXT,
                acid_ml REAL,
                lye_ml REAL,
                clean_ml REAL,
                feed_ml REAL,
                defoamerPumpSpeed REAL,
                feedPumpSpeed REAL,
                fermentation_flag INTEGER
            );
        `);
            await runQuery(`
            CREATE INDEX IF NOT EXISTS idx_can_number ON fermentation_data(can_number);
            CREATE INDEX IF NOT EXISTS idx_absolute_time ON fermentation_data(absolute_time);
            CREATE INDEX IF NOT EXISTS idx_batch_id ON fermentation_data(batch_id);
        `);
            
            // 提交事务
            await runQuery('COMMIT;');
            return "数据库初始化成功";
        } catch (error) {
            // 回滚事务
            await runQuery('ROLLBACK;');
            console.error('Unexpected error while initializing the database:', error);
            return "数据库初始化失败";
        }
    });
    // 获取罐号的所有发酵批次
    ipcMain.handle('get-batches-by-can', (event, canNumber) => {
        console.log("查询发酵批次, 罐号:", canNumber);
        
        // 确保数据库连接
        if (!db) {
            console.error('数据库连接失败');
            return Promise.reject("数据库连接失败");
        }
        
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM fermentation_batch WHERE can_number = ?';
            db.prepare(query).all([canNumber], (err, rows) => {
                if (err) {
                    console.error('查询发酵批次时出现错误:', err);
                    reject("查询失败");
                } else {
                    resolve(rows);
                }
            });
        }).catch(error => {
            console.error("Unexpected error in get-batches-by-can:", error);
            throw error;  // 或者返回一个特定的错误消息或对象，这取决于您如何处理这些错误
        });
    });

    // 获取发酵批次的所有数据
    ipcMain.handle('get-data-by-batch', (event, batchId) => {

        // 确保数据库连接
        if (!db) {
            console.error('数据库连接失败');
            return Promise.reject("数据库连接失败");
        }
        
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM fermentation_data WHERE batch_id = ? ORDER BY absolute_time ASC';
            db.prepare(query).all([batchId], (err, rows) => {
                if (err) {
                    console.error('查询批次数据时出现错误:', err);
                    reject("查询失败");
                } else {
                    resolve(rows);
                }
            });
        }).catch(error => {
            console.error("Unexpected error in get-data-by-batch:", error);
            throw error;  // 或者返回一个特定的错误消息或对象，这取决于您如何处理这些错误
        });
    });

    // 添加新的发酵批次
    ipcMain.handle('add-fermentation-batch', async (event, batchData) => {
        // 确保数据库连接
        if (!db) {
            console.error('数据库连接失败');
            return "数据库连接失败";
        }
        
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO fermentation_batch (batch_name, can_number, start_time) VALUES (?, ?, ?)`;
            db.run(query, [batchData.batch_name, batchData.can_number, batchData.start_time], function(err) {
                if (err) {
                    console.error("添加新的发酵批次时发生错误:", err);
                    reject("添加发酵批次失败");
                } else {
                    console.log(`添加发酵批次成功, ID: ${this.lastID}`);
                    resolve(this.lastID);  // 返回新插入数据的ID
                }
            });
        }).catch(error => {
            console.error("Unexpected error in add-fermentation-batch:", error);
            throw error;  // 或者返回一个特定的错误消息或对象，这取决于您如何处理这些错误
        });
    });

    // 添加新的发酵数据
    ipcMain.handle('add-fermentation-data', async (event, fermentationData) => {
        try {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO fermentation_data (can_number, batch_id, timing_temp, timing_PH, timing_DO, timing_motor_speed, relative_time, absolute_time, acid_ml, lye_ml, clean_ml, feed_ml, defoamerPumpSpeed, feedPumpSpeed, fermentation_flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                
                db.run(query, [
                    fermentationData.can_number,
                    fermentationData.batch_id,
                    fermentationData.timing_temp,
                    fermentationData.timing_PH,
                    fermentationData.timing_DO,
                    fermentationData.timing_motor_speed,
                    fermentationData.relative_time,
                    fermentationData.absolute_time,
                    fermentationData.acid_ml,
                    fermentationData.lye_ml,
                    fermentationData.clean_ml,
                    fermentationData.feed_ml,
                    fermentationData.defoamerPumpSpeed,
                    fermentationData.feedPumpSpeed,
                    fermentationData.fermentation_flag
                ], function (err) {
                    if (err) {
                        console.error("添加发酵数据时出错:", err);
                        reject(err);
                    } else {
                        resolve(this.lastID);  // 返回新插入数据的ID
                    }
                });
            });
        } catch (error) {
            console.error("添加发酵数据过程中出现异常:", error);
            throw error;  // 或者返回一个特定的错误消息或对象
        }
    });


    // 获取最近数据
    ipcMain.handle('get-recent-fermentation-data', (event, canNumber, fieldName, dataCount) => {
        
        // 确保数据库连接
        if (!db) {
            console.error('数据库连接失败');
            return Promise.reject("数据库连接失败");
        }
        
        return new Promise((resolve, reject) => {
            const query = `
                SELECT ${fieldName}, absolute_time
                FROM fermentation_data
                WHERE can_number = ?
                ORDER BY absolute_time DESC
                LIMIT ?
            `;
            db.prepare(query).all([canNumber, dataCount], (err, rows) => {
                if (err) {
                    console.error('查询批次数据时出现错误:', err);
                    reject("查询失败");
                } else {
                    resolve(rows);
                }
            });
        }).catch(error => {
            console.error("Unexpected error in get-data-by-batch:", error);
            throw error;  // 或者返回一个特定的错误消息或对象，这取决于您如何处理这些错误
        });
    });
    
    // 查询批次id
    ipcMain.handle('get-batch-id', (event, batchName, canNumber,startTime) => {
        
        // 确保数据库连接
        if (!db) {
            console.error('数据库连接失败');
            return Promise.reject("数据库连接失败");
        }
        
        return new Promise((resolve, reject) => {
            const query = `
                SELECT id
                FROM fermentation_batch
                WHERE batch_name = ? AND can_number = ? AND start_time = ?
            `;
            db.prepare(query).get([batchName, canNumber,startTime], (err, row) => {
                if (err) {
                    console.error('查询批次id时出现错误:', err);
                    reject("查询失败");
                } else {
                    resolve(row);
                }
            });
        }).catch(error => {
            console.error("Unexpected error in get-batch-id:", error);
            throw error;  // 或者返回一个特定的错误消息或对象，这取决于您如何处理这些错误
        });
    });
    
}

