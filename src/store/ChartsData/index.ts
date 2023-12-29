import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;
const route = useRoute()
const state = () => {
    return {
        // 选择图表
        chartSelected: 0,
        // 参数选择
        paramSelected: [
            {
                name: '温度',
                selected: false
            },
            {
                name: '酸碱',
                selected: false
            },
            {
                name: '溶氧',
                selected: false
            },
            {
                name: '转速',
                selected: false
            },
            {
                name: '酸泵补料量',
                selected: false
            },
            {
                name: '碱泵补料量',
                selected: false
            },
            {
                name: '补料一补料量',
                selected: false
            },
            {
                name: '补料二补料量',
                selected: false
            },
            {
                name: '补料一流速',
                selected: false
            },
            {
                name: '补料二流速',
                selected: false
            },

        ],
        // 设备选择
        deviceSelected: <any>[],
        
        
        
        
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
