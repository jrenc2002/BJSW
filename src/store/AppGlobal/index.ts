import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;
const route = useRoute()
const state = () => {
    return {
        // 分页选择项
        pageChance: 1,
        // 分页名称
        pageName: [
            {id: 1, name: '设备A', href: '#', deviceNum:"BAB-00"},
            {id: 2, name: '设备b', href: '#', deviceNum:"AAB-00"},
            {id: 3, name: '三号工厂', href: '#', deviceNum:"BAA-00"},
            {id: 4, name: '四号工厂', href: '#', deviceNum:"BBB-00"},
            {id: 5, name: '五号工厂', href: '#', deviceNum:"BBB-00"},
            {id: 6, name: '32工厂', href: '#', deviceNum:"AAB-00"},
            {id: 7, name: '31工厂', href: '#', deviceNum:"BAA-00"},
            {id: 8, name: '33工厂', href: '#', deviceNum:"BAB-00"},
            {id: 9, name: '34工厂', href: '#', deviceNum:"BBA-00"},
        ],


    }
}

/**
 * 提供可视窗口的公共状态
 */
export const useAppGlobal = defineStore('AppGlobal', {
    state,
    actions: {

        updatePageChance(pageChance: number) {
            this.pageChance = pageChance;
        }


    },
});
