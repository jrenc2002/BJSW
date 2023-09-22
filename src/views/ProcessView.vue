<template>
<div>
  <div class="card w-56 bg-base-100 shadow-xl cursor-pointer">
    <div class="w-[calc(100%-3rem)] h-10  m-6 mb-2 font-black text-3xl ">
      <div class="w-16 text-right relative">

        溶氧
      </div>

    </div>
    <div class="m-6  mt-0 flex-col  ">
      <div class="w-full  flex h-7 flex items-center ">
        <div class="w-16 text-right relative">设定值</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>

      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">测量值</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">报警上限</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">报警下限</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
    </div>
  </div>
  <div class="card w-52 bg-base-100 shadow-xl cursor-pointer">
    <div class="w-[calc(100%-3rem)] h-10  m-6 mb-2 font-black text-3xl ">
      <div class="w-16 text-right relative">

        溶氧
      </div>

    </div>
    <div class="m-6  mt-0 flex-col  ">
      <div class="w-full  flex h-7 flex items-center ">
        <div class="w-16 text-right relative">设定值</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>

      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">测量值</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">报警上限</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">报警下限</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
    </div>
  </div>
  <div class="card w-52 bg-base-100 shadow-xl cursor-pointer">
    <div class="w-[calc(100%-3rem)] h-10  m-6 mb-2 font-black text-3xl ">
      <div class="w-16 text-right relative">

        溶氧
      </div>

    </div>
    <div class="m-6  mt-0 flex-col  ">
      <div class="w-full  flex h-7 flex items-center ">
        <div class="w-16 text-right relative">设定值</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>

      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">测量值</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">报警上限</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">报警下限</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
    </div>
  </div>
  <div class="card w-52 bg-base-100 shadow-xl cursor-pointer">
    <div class="w-[calc(100%-3rem)] h-10  m-6 mb-2 font-black text-3xl ">
      <div class="w-16 text-right relative">
        溶氧
      </div>

    </div>
    <div class="m-6  mt-0 flex-col  ">
      <div class="w-full  flex h-7 flex items-center ">
        <div class="w-16 text-right relative">设定值</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>

      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">测量值</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">报警上限</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
      <div class="w-full  flex h-7 flex items-center w-20">
        <div class="w-16 text-right relative">报警下限</div>
        <span class="countdown absolute right-10">
          <span style="--value:53;"></span>
        </span>
      </div>
    </div>
  </div>

</div>


</template>

<script setup>
import {usePopupMangerState} from "@/store/PopupMangerState";

const PopupManger=usePopupMangerState()



</script>