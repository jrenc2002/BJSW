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
                name: 'PH',
                selected: false,
                fieldName: 'timing_PH'
            },
            {
                name: '溶氧',
                selected: false,
                fieldName: 'timing_DO'
            },
            {
                name: '转速',
                selected: false,
                fieldName: 'timing_motor_speed'
            },
            {
                name: '酸泵补料量',
                selected: false,
                fieldName: 'acid_ml'
            },
            {
                name: '碱泵补料量',
                selected: false,
                fieldName: 'lye_ml'
            },
            {
                name: '补料一补料量',
                selected: false,
                fieldName: 'clean_ml'
            },
            {
                name: '补料二补料量',
                selected: false,
                fieldName: 'feed_ml'
            },
            {
                name: '补料一流速',
                selected: false,
                fieldName: 'defoamerPumpSpeed'
            },
            {
                name: '补料二流速',
                selected: false,
                fieldName: 'feedPumpSpeed'
            },

        ],
        // 设备选择
        deviceSelected: <any>[],
        dataSeries: <any>[],
        dataLegend: <any>[],
    
        // deviceSelected:[
        //     {   name: device.name,
        //         deviceNum: device.deviceNum,
        //         selected: false
        //     }
        // ]

        
        
        
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
