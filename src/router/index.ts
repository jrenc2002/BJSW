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
                path: '/fermentationview',
                name: 'FermentationView',
                meta: {
                    title: '发酵参数',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/FermentationView.vue'),
            },
            {
                path: '/batchview',
                name: 'BatchView',
                meta: {
                    title: '批次比较',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "login" */ '../views/BatchView.vue'),
            },
            {
                path: '/testview',
                name: 'TestView',
                meta: {
                    title: '批次比较',
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