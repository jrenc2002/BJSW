<template>
  <div v-show="props.popcontent !== PopupType.None"
       class="h-full w-full fixed inset-0 flex items-center justify-center">
    <div v-show="props.popcontent === PopupType.Temperature" ref="popupCreateCard">
      <ProcessTemperatureControl></ProcessTemperatureControl>
    </div>
    <div v-show="props.popcontent === PopupType.PHValue" ref="popupCreateCard">
      <ProcessPHValue> </ProcessPHValue>
    </div>
    <div v-show="props.popcontent === PopupType.DissolvedOxygen" ref="popupCreateTaskCard">
      <ProcessDissolvedOxygen></ProcessDissolvedOxygen>
    </div>
    <div v-show="props.popcontent === PopupType.RPM" ref="popupCreateTaskCard">
      <ProcessRPM></ProcessRPM>
    </div>
      <div v-show="props.popcontent === PopupType.BeginFermentation" ref="popupCreateTaskCard">
          <ProcessBeginFermentation></ProcessBeginFermentation>
      </div>
      <div v-show="props.popcontent === PopupType.FeedSetting" ref="popupCreateTaskCard">
          <ProcessFeedSetting></ProcessFeedSetting>
      </div>
  </div>
</template>

<script lang="js" setup>
/**
 * 本组件管理弹窗，保证甘特页面只有一个弹窗
 * 通过弹窗共享状态，来获取怎么弹法
 */
import {PopupType} from "@/store/ProcessPopupMangerState";
import {defineProps, onMounted} from "vue";
import ProcessTemperatureControl from "@/components/tankControl/SingleTemperature.vue";
import ProcessPHValue from "@/components/tankControl/SinglePHValue.vue";
import ProcessDissolvedOxygen from "@/components/tankControl/SingleDissolvedOxygen.vue";
import ProcessRPM from "@/components/tankControl/SingleRPM.vue"
import ProcessBeginFermentation from "@/components/tankControl/SingleBegin.vue"
import ProcessFeedSetting from "@/components/tankControl/SingleFeedSet.vue"
const props = defineProps({
  popcontent: {
    type: String,
    required: true,
  }
})

onMounted(() => {
 console.log(props.popcontent, "11111111_____________________")
})


</script>

<style scoped>

</style>

