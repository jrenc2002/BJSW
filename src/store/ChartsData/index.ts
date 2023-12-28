import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;
const route = useRoute()
const state = () => {
    return {
        // 选择项-就是已经点击选择上的选项
        chartSelected: 0,

        
        
        
        
    }
}

/**
 * 提供可视窗口的公共状态
 */
export const useChartsData = defineStore('ChartsData', {
    state,
    actions: {
    
    
    },
});
