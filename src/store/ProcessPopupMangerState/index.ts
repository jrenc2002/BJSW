import {defineStore} from "pinia";

// 给开发人员使用的debug
const debug = false;

export enum PopupType {
    // 无弹窗
    None = 0,
    // 温度值
    Temperature = 1,
    // PH值
    PHValue = 2,
    // 溶氧值
    DissolvedOxygen = 3,
    // 转速值
    RPM = 4,
    FeedPump = 5,
    BeginFermentation=6,
    DefoamerPump=7,
    FeedSetting=8,


}


const state = () => {
    return {
        // 弹出内容为:
        popupContent: PopupType.None,
        // 是否打开弹窗
        isShowPop:false


    }
}

/**
 * 提供弹窗管理
 */
export const useProcessPopupMangerState = defineStore('processPopupManger', {
    state,
    actions: {
        updatePopupContent(popupContent: PopupType) {

            if (debug) {
                console.log('[调试] 当前弹窗为：', popupContent);
            }
            this.popupContent = popupContent;
        },
        updateIsShowPop(newisShowPop:boolean){
            if (debug) {
                console.log('[调试] 当前弹窗为：', newisShowPop);
            }
            this.isShowPop = newisShowPop;
        }

    },
});
