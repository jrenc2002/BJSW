<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] ">
    <!--    标题-->
    <div class="h-[6%] self-stretch justify-start items-center gap-4 inline-flex ">
      <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">数据总览</div>
    </div>
    <!--    表格栏-->
    <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow items-center justify-center flex ">
      <div class="rounded-2xl bg-white h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex   ">

        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-[100%]  h-[100%] rounded-2xl ">
          <div class="rounded-2xl inline-block min-w-full min-h-full py-2 align-middle sm:px-6 lg:px-2 items-center justify-center flex ">
            <table class="min-w-full min-h-full rounded-2xl ">
              <thead class=" h-[100%] rounded-2xl">
              <tr class="h-[2.9rem] bg-[#DAF0E4] rounded-2xl  ">
                <th scope="col"
                    class="justify-center  items-center  w-[10rem] text-sm font-semibold text-gray-900  rounded-tl-lg"></th>
                <th scope="col" class="justify-center items-center  w-[11%]  text-sm font-semibold text-gray-900 ">F1
                </th>
                <th scope="col" class="justify-center items-center  w-[11%] text-sm font-semibold text-gray-900">F2</th>
                <th scope="col" class="justify-center items-center w-[11%]  text-sm font-semibold text-gray-900">F3</th>
                <th scope="col" class="justify-center items-center  w-[11%] text-sm font-semibold text-gray-900">F4</th>
                <th scope="col" class="justify-center items-center  w-[11%] text-sm font-semibold text-gray-900 ">F5
                </th>
                <th scope="col" class="justify-center items-center  w-[11%] text-sm font-semibold text-gray-900">F6</th>
                <th scope="col" class="justify-center items-center w-[11%]  text-sm font-semibold text-gray-900">F7</th>
                <th scope="col"
                    class="justify-center items-center w-[11%]  text-sm font-semibold text-gray-900 rounded-tr-lg">F8
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="overdata in overdata" :key="overdata.id" class=" h-[6vh] bg-[#DAF0E4]  ">
                <td class="text-sm font-medium  text-gray-900 p-0 " :class="overdata.id==13?'rounded-bl-lg':''">
                  <div class="flex justify-center items-center h-full">
                    <button v-if="overdata.id>=4"
                         class="rounded-[5px] shadow bg-white w-[94%] h-[5vh]  text-center flex justify-center items-center">
                      {{ overdata.label }}
                    </button>
                    <div v-else>
                      {{ overdata.label }}
                    </div>

                  </div>
                </td>
                <td class="flex-1 border border-gray-200 bg-white whitespace-nowrap  text-sm font-medium text-gray-900 ">
                  {{ overdata.F1 }}
                </td>
                <td class="w-[11%] border border-gray-200 bg-white whitespace-nowrap p-4  text-sm font-medium text-gray-900 ">
                  {{ overdata.F2 }}
                </td>
                <td class="w-[11%] border border-gray-200 bg-white whitespace-nowrap  text-sm text-gray-500">
                  {{ overdata.F3 }}
                </td>
                <td class="w-[11%] border border-gray-200 bg-white whitespace-nowrap  text-sm text-gray-500">
                  {{ overdata.F4 }}
                </td>
                <td class="w-[11%]  border border-gray-200 bg-white whitespace-nowrap  text-sm text-gray-500 ">
                  {{ overdata.F5 }}
                </td>
                <td class="w-[11%] border border-gray-200 bg-white whitespace-nowrap  text-sm text-gray-500">
                  {{ overdata.F6 }}
                </td>
                <td class="w-[11%]  border border-gray-200 bg-white whitespace-nowrap  text-sm text-gray-500">
                  {{ overdata.F7 }}
                </td>
                <td :class="overdata.id==13?'rounded-lg border border-gray-200':'border border-gray-200'" class="w-[11%] bg-white whitespace-nowrap  text-sm text-gray-500 "
                    >
                  {{ overdata.F8 }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>


  </div>

</template>

<script setup lang="ts">
const overdata = [
  {id: 1, label: '运行状态', F1: '23', F2: '12', F3: '24', F4: '67', F5: '78', F6: '56', F7: '234', F8: '34'},
  {id: 2, label: '运行时间', F1: '13', F2: '22', F3: '34', F4: '47', F5: '28', F6: '16', F7: '124', F8: '44'},
  {id: 3, label: '发酵批号', F1: '33', F2: '32', F3: '44', F4: '27', F5: '38', F6: '26', F7: '214', F8: '54'},
  {id: 4, label: '温度/℃', F1: '43', F2: '42', F3: '54', F4: '37', F5: '48', F6: '36', F7: '204', F8: '64'},
  {id: 5, label: 'PH/PH', F1: '53', F2: '52', F3: '64', F4: '57', F5: '58', F6: '46', F7: '194', F8: '74'},
  {id: 6, label: '溶氧/%', F1: '63', F2: '62', F3: '74', F4: '67', F5: '68', F6: '56', F7: '184', F8: '84'},
  {id: 7, label: '转速/rpm', F1: '73', F2: '72', F3: '84', F4: '77', F5: '78', F6: '66', F7: '174', F8: '94'},
  {id: 8, label: '补速ml/h', F1: '83', F2: '82', F3: '94', F4: '87', F5: '88', F6: '76', F7: '164', F8: '104'},
  {id: 9, label: '补料周期/开度', F1: '93', F2: '92', F3: '104', F4: '97', F5: '98', F6: '86', F7: '154', F8: '114'},
  {id: 10, label: '泵1/g', F1: '103', F2: '102', F3: '114', F4: '107', F5: '108', F6: '96', F7: '144', F8: '124'},
  {id: 11, label: '泵2/g', F1: '113', F2: '112', F3: '124', F4: '117', F5: '118', F6: '106', F7: '134', F8: '134'},
  {id: 12, label: '泵3/g', F1: '123', F2: '122', F3: '134', F4: '127', F5: '128', F6: '116', F7: '124', F8: '144'},
  {id: 13, label: '泵4/g', F1: '133', F2: '132', F3: '144', F4: '137', F5: '138', F6: '126', F7: '114', F8: '154'},

];

</script>
<style>
.trunits {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11%;
  font-size: 0.875rem; /* 14px assuming base font-size is 16px */
  font-weight: 600; /* font-semibold */
  color: #1a202c; /* text-gray-900 assuming standard Tailwind CSS colors */
}


</style>