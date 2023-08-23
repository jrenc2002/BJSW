// import { ipcMain, IpcMainInvokeEvent } from 'electron';
// import path from 'path';
// import sqlite3Lib, { RunResult } from 'sqlite3';
//
// // 为了避免 ESLint 的 'no-var-requires' 错误，我们这样导入 sqlite3
// const sqlite3 = sqlite3Lib.verbose();
//
// const dbPath = path.join(__dirname, './database.db');
// const db = new sqlite3.Database(dbPath);
//
// interface Params {
//     name: string;
// }
//
// export function handleDatabaseApi(): void {
//     ipcMain.handle('api-test', (event: IpcMainInvokeEvent, params: Params) => {
//         return new Promise<RunResult[]>((resolve, reject) => {
//             db.all(
//                 'SELECT ?',
//                 [params.name],
//                 (err: Error | null, rows: RunResult[]) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(rows);
//                     }
//                 }
//             );
//         });
//     });
// }
