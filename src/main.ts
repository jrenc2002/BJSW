import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/text/text.css';
import "./tailwindcss.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// import 'element-plus/dist/index.css';
import infiniteScroll from 'vue-infinite-scroll'

import { Empty } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Empty)
app.use(VXETable);
app.use(infiniteScroll);
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);

}


// // 自定义权限指令
// app.directive('permiss', {
//     mounted(el, binding) {
//         // if (!permiss.key.includes(String(binding.value))) {
//         //     el['hidden'] = true;
//         // }
//     },
// });

app.mount('#app');