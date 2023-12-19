import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;
const route = useRoute()
const state = () => {
    return {
        // 选择项-就是已经点击选择上的选项
        pageChance: 0,
        // 侧边展开
        isDrawerState: true,
        // 触摸项-就是鼠标触摸到的选项
        selectedDeviceIndex:-1,
        
        
        
        
    }
}

/**
 * 提供可视窗口的公共状态
 */
export const useFeedManger = defineStore('FeedManger', {
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