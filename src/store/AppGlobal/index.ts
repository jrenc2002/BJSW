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
            {id: 1, name: '一号工厂', href: '#'},
            {id: 2, name: '二号工厂', href: '#'},
            {id: 3, name: '三号工厂', href: '#'},
            {id: 4, name: '四号工厂', href: '#'},
            {id: 5, name: '五号工厂', href: '#'},
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
