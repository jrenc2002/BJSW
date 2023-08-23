// import request from '../../../../BjswProject/bjsw/src/utils/request';
//
// // 用户部分
// // export const UserLogin = (data: any): Promise<any> => {
// //     console.log(data.username, data.password)
// //     console.log(data.username === 'root', data.password === '123456')
// //
// //     return new Promise((resolve, reject) => {
// //         if (data.username === 'root' && data.password === '123456') {
// //             console.log('Resolving promise');
// //             resolve({ message: 'Login successful' });
// //         } else {
// //             console.log('Rejecting promise');
// //             reject({ message: 'Login failed' });
// //         }
// //     });
// // };
//
//
//
//
// // export const UserCreate = (data: any) => {
// //     return request({
// //         url: '/auth/user',
// //         method: 'post',
// //         data: data
// //     })
// // }
//
// // export const UserPasswordChange = (id: number, data: any) => {
// //     return request({
// //         url: `/auth/user/${id}/change-password`,
// //         method: 'post',
// //         data: data
// //     })
// // }
//
// // export const UserList = () => {
// //     return request({
// //         url: '/auth/user',
// //         method: 'get'
// //     })
// // }
//
// // export const UserDelete = (id: number) => {
// //     return request({
// //         url: `/auth/user/${id}`,
// //         method: 'delete'
// //     })
// // }
//
// // // 数据部分 SMT
// // export const SMTDataList = (query: any) => {
// //     return request({
// //         url: `/smt`,
// //         method: 'get',
// //         params: query,
// //     })
// // }
//
// // export const SMTDataExport = (query: any) => {
// //     return request({
// //         url: `/smt-export`,
// //         method: 'get',
// //         params: query,
// //         responseType: 'blob'
// //     })
// // }
//
// // export const SMTUpdate = (data: any) => {
// //     return request({
// //         url: `/smt`,
// //         method: 'patch',
// //         data: data
// //     })
// // }
//
// // export const SMTDeletes = (data: any) => {
// //     return request({
// //         url: `/smt`,
// //         method: 'delete',
// //         data: data
// //     })
// // }
//
// // // 数据部分 PBA
// // export const PBADataList = (query: any) => {
// //     return request({
// //         url: `/pba`,
// //         method: 'get',
// //         params: query,
// //     })
// // }
//
// // export const PBADataExport = (query: any) => {
// //     return request({
// //         url: `/pba-export`,
// //         method: 'get',
// //         params: query,
// //         responseType: 'blob'
// //     })
// // }
//
// // export const PBAUpdate = (data: any) => {
// //     return request({
// //         url: `/pba`,
// //         method: 'patch',
// //         data: data
// //     })
// // }
//
// // export const PBADeletes = (data: any) => {
// //     return request({
// //         url: `/pba`,
// //         method: 'delete',
// //         data: data
// //     })
// // }