import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;
const route = useRoute()
const state = () => {
    return {
        // 分页选择项
        pageChance: 1,



    }
}

/**
 * 提供可视窗口的公共状态
 */
export const useDBSave = defineStore('DBSave', {
    state,
    actions: {

        // updatePageChance(pageChance: number) {
        //     this.pageChance = pageChance;
        // }


    },
});