import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;
const route = useRoute()
const state = () => {
    return {

        // 参数选择
        paramSelected: [
            {
                name: '温度',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '酸碱',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '溶氧',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '转速',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '酸泵补料量',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '碱泵补料量',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '补料一补料量',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '补料二补料量',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '补料一流速',
                selected: false,
                fieldName: 'timing_temp'
            },
            {
                name: '补料二流速',
                selected: false,
                fieldName: 'timing_temp'
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
