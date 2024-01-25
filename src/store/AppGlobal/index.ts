import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = true;
const route = useRoute()
const state = () => {
    return {
        // 选择项-就是已经点击选择上的选项
        pageChance: 0,
        // 侧边展开
        isDrawerState: true,
        // 触摸项-就是鼠标触摸到的选项
        selectedDeviceIndex:-1,
        // 通讯心跳定时器
        BeatTimer:3000,
        //图表比例系数
        chartScale:{
            ph_k:0,
            temp_k:10,
            do_k:10,
            rpm_k:100,
            acid_ml_k:0,
            lye_ml_k:0,
            feed0_ml_k:0,
            feed_ml_k:0,
            feed0_ml_h_k:0,
            feed_ml_h_k:0,
        },
        




    }
}

/**
 * 提供可视窗口的公共状态
 */
export const useAppGlobal = defineStore('AppGlobal', {
    state,
    actions: {

        updatePageChance(newpageChance: number) {
            this.pageChance = newpageChance;
        },
        updateDrawerState(newDrawerState: boolean) {
            this.isDrawerState = newDrawerState;
        }

    },
});
