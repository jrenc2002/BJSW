<template>
    <div v-show="props.popcontent !== PopupType.None"
         class="h-full w-full fixed inset-0 flex items-center justify-center">
        <div v-show="props.popcontent === PopupType.Temperature" ref="popupCreateCard">
            <TemperatureControl></TemperatureControl>
        </div>
        <div v-show="props.popcontent === PopupType.PHValue" ref="popupCreateCard">
            <PHValue> </PHValue>
        </div>
        <div v-show="props.popcontent === PopupType.DissolvedOxygen" ref="popupCreateTaskCard">
            <DissolvedOxygen></DissolvedOxygen>
        </div>
        <div v-show="props.popcontent === PopupType.RPM" ref="popupCreateTaskCard">
            <RPM></RPM>
        </div>
        <div v-show="props.popcontent === PopupType.AcidPump" ref="popupCreateTaskCard">
            <AcidPump></AcidPump>
        </div>
        <div v-show="props.popcontent === PopupType.LyePump" ref="popupCreateTaskCard">
            <LyePump></LyePump>
        </div>

        <div v-show="props.popcontent === PopupType.DefoamerPump" ref="popupCreateTaskCard">
            <DefoamerPump></DefoamerPump>
        </div>
        <div v-show="props.popcontent === PopupType.FeedPump" ref="popupCreateTaskCard">
            <FeedPump></FeedPump>
        </div>
    </div>
</template>

<script lang="js" setup>
/**
 * 本组件管理弹窗，保证甘特页面只有一个弹窗
 * 通过弹窗共享状态，来获取怎么弹法
 */
import {PopupType} from "@/store/PopupMangerState";
import {defineProps, onMounted} from "vue";
import TemperatureControl from "@/components/popupManager/TemperatureControl.vue";
import PHValue from "@/components/popupManager/PHValue.vue";
import DissolvedOxygen from "@/components/popupManager/DissolvedOxygen.vue";
import RPM from "@/components/popupManager/RPM.vue"
import AcidPump from "@/components/popupManager/AcidPump.vue"
import LyePump from "@/components/popupManager/LyePump.vue"
import DefoamerPump from "@/components/popupManager/DefoamerPump.vue"
import FeedPump from "@/components/popupManager/FeedPump.vue"

const props = defineProps({
    popcontent: {
        type: String,
        required: true,
    }
})



</script>

<style scoped>

</style>

