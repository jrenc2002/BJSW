import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/loginview',
    },
    {
        path: '/homeview',
        name: 'HomeView',
        meta: {
            title: '首页',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/HomeView.vue'),
        children: [
            {
                path: '/overview',
                name: 'OverView',
                meta: {
                    title: '数据总览',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/OverView.vue'),
            },
            {
                path: '/processview',
                name: 'ProcessView',
                meta: {
                    title: '分罐流程',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/ProcessView.vue'),
            },
            {
                path: '/curvecompare',
                name: 'CurveCompare',
                meta: {
                    title: '曲线对比',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/CurveCompare.vue'),
            },
            {
                path: '/historicaldata',
                name: 'HistoricalData',
                meta: {
                    title: '历史数据',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/HistoricalData.vue'),
            },
            {
                path: '/calibratebatch',
                name: 'CalibrateBatch',
                meta: {
                    title: '批次校准',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/CalibrateBatch.vue'),
            },
            {
                path: '/alarmdata',
                name: 'AlarmData',
                meta: {
                    title: '报警数据',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/AlarmData.vue'),
            },

            {
                path: '/testview',
                name: 'TestView',
                meta: {
                    title: '测试页面',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/TextView.vue'),
            }
        ]
    },
    {
        path: '/loginview',
        name: 'LoginView',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    },
    {
        path: '/403',
        name: 'ErrorPage',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | 生物设备`;
//     next('/loginview');
//     // const token = localStorage.getItem('token');
//     // if (!token && !['/login'].includes(to.path)) {
//     //     console.log(to.path);
//     //     next('/login');
//     // } else {
//     //     next()
//     // }
//
// });

export default router;