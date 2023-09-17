<template>
  <div class="h-[94vh] transition-all duration-300 ease-in-out shadow bg-white rounded-2xl" :class="[AppGlobal.isDrawerState? 'w-[calc(94vw-15rem)]':'w-[94vw]']">

    <!--    标题-->
    <div class="h-[4%] self-stretch justify-start items-center  inline-flex mt-3  w-full ">
      <div class="w-[calc(10rem)] text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">溶氧控制</div>
      <div class="w-[calc(100%-10rem)] relative justify-end flex mr-3 ">

        <div class="bg-[#F5F5F5] right-0 relative w-7 h-7 justify-center items-center flex rounded-2xl hover:bg-[#F8F8F8] cursor-pointer" @click="closePop">
          <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                  fill="#19161D"/>
          </svg>
        </div>
      </div>
    </div>
    <!--    表格栏-->
    <div class="  w-[100%] h-[92%]  bottom-0   items-center justify-center flex  ">


      <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
        <div class=" w-full h-full ">
          <div class=" box-border overflow-x-hidden w-full h-full flex">

            <div class="float-left h-[100%] bg-[#E8F6ED] shadow border rounded-2xl z-20">
              <div class=" mt-3 w-[10rem]">
                <table class=" py-4 ">
                  <tr>
                    <th class="flex items-center justify-center gap-2   ">

                    </th>
                  </tr>
                </table>
              </div>
              <div
                  ref="firstColLayer"
                  class="w-full overflow-hidden "
              >
                <table class="mb-4 shadow  bg-[#E8F6ED] py-4">
                  <tr v-for="(col, index) in firstCol" :key="index" class=" w-full  ">
                    <td class="w-full  flex justify-center items-center   ">
                      <div >
                        {{ col }}

                      </div>

                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="right-div ">
              <!--窗口-->
              <div ref="firstRowLayer" class="right-div1 bg-[#F1F1F1] mt-3">
                <table :style="{ width: (firstRow.length+1 ) * 8.2+ 'rem' }" class="right-table1">
                  <tr>
                    <th v-for="(row, index) in firstRow" :key="index" class="first-row-style w-[8.2rem]  ">{{
                        row
                      }}
                    </th>
                  </tr>
                </table>
              </div>
              <div
                  id="targetDiv1"
                  ref="tableContainer"
                  class="right-div2"
                  @scroll="tableScroll()"
              >
                <table :style="{ width: (firstRow.length +1 ) * 8.2 + 'rem' }">
                  <tr v-for="(body,index) in tableBodyRows" :key="index">
                    <template v-for="(col, i) in tableBodyCols" :key="col.props + i">
                      <td v-if="index==0||index==10" class="w-[8.2rem] text-center border-l border-b ">
                        <details class="dropdown ">
                          <summary v-if="body[col.props]==0" class="m-1 btn w-[7rem] ">停止</summary>
                          <summary v-if="body[col.props]==1"
                                   class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3]">关联
                          </summary>


                          <ul class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-box w-[7rem] broder">
                            <li class="text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded" @click="col.props=0"><a>停止</a>
                            </li>
                            <li class="text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2 rounded"
                                @click="col.props=1"><a>关联</a></li>

                          </ul>
                        </details>
                      </td>

                      <td v-else
                          class="w-[8.2rem] text-center border-l border-b hover:bg-[#FAFAFA] ">
                        {{ body[col.props] }}
                      </td>
                    </template>


                  </tr>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>


    </div>


  </div>


</template>

<script lang='ts' setup>
import {computed, Ref, ref, watch, onUnmounted, onMounted, reactive} from 'vue'
import PopupManger from "@/components/PopupManger.vue";
import {usePopupMangerState} from "@/store/PopupMangerState";
import {PopupType} from "@/store/PopupMangerState";
import {useAppGlobal} from '@/store/AppGlobal'
const AppGlobal=useAppGlobal();
const PopupMangerState = usePopupMangerState()

interface TableDataItem {
  name: string;
  F1: number;
  F2: number;
  F3: number;
  F4: number;
  F5: number;
  F6: number;
  F7: number;
  F8: number;

  [key: string]: string | number;
}




interface HeaderItem {
  title: string;
  props: string;
}


const headerData: HeaderItem[] = [
  {title: '姓名', props: 'name'},
  {title: 'F1', props: 'F1'},
  {title: 'F2', props: 'F2'},
  {title: 'F3', props: 'F3'},
  {title: 'F4', props: 'F4'},
  {title: 'F5', props: 'F5'},
  {title: 'F6', props: 'F6'},
  {title: 'F7', props: 'F7'},
  {title: 'F8', props: 'F8'},
  {title: 'F1', props: 'F1'},
  {title: 'F2', props: 'F2'},
  {title: 'F3', props: 'F3'},
  {title: 'F4', props: 'F4'},
  {title: 'F5', props: 'F5'},
  {title: 'F6', props: 'F6'},
  {title: 'F7', props: 'F7'},
  {title: 'F8', props: 'F8'},

  // 你可以按需增加其他列
];


const tableData: TableDataItem[] = [
  {name: '转速控制', F1: 1, F2: 1, F3: 0, F4: 1, F5: 0, F6: 1, F7: 0, F8: 1},
  {name: '测量值', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '设定值', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: 'DO上限', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: 'DO下限', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '转速上限', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '转速下限', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '控制死区', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '报警上限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '报警下限', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '氧气控制', F1: 1, F2: 1, F3: 0, F4: 1, F5: 0, F6: 1, F7: 0, F8: 1},
  {name: '控制周期', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '控制比例', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '加氧上限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '加氧下限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},


];


const props = {
  headerData: headerData,
  tableData: tableData
};


const tableContainer: Ref<HTMLDivElement | null> = ref(null);
const firstRowLayer: Ref<HTMLDivElement | null> = ref(null);
const firstColLayer: Ref<HTMLDivElement | null> = ref(null);


const firstCol = computed(() => props.tableData.map(p => {
  const pArr = Object.keys(p);
  return p[pArr[0]]
}))


const firstRow = computed(() => {
  const rows: string[] = [];
  props.headerData.forEach((f, i) => {
    if (i !== 0) {
      rows.push(f.title)
    }
  })
  return rows;
})


const tableBodyRows = computed(() => {
  let arr: { [key: string]: any }[] = [];
  props.tableData.forEach((f) => {

    let res: { [key: string]: any } = {};
    for (const key in f) {
      if (Object.prototype.hasOwnProperty.call(f, key)) {
        if (key !== props.headerData[0].title) {
          res[key] = f[key]
        }
      }
    }
    arr.push(res)
  })
  return arr
})

const tableBodyCols = computed(() => {
  let arr: { title: string, props: string }[] = []
  props.headerData.forEach((f, i) => {
    if (i !== 0) {
      arr.push(f)
    }
  })
  return arr;
})


const tableScroll = () => {

  firstRowLayer.value!.scrollLeft = tableContainer.value!.scrollLeft;

  firstColLayer.value!.scrollTop = tableContainer.value!.scrollTop;
}

const closePop = () => {
  PopupMangerState.updateIsShowPop(false)
}




</script>
<style lang="scss" scoped>


table {
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  border-spacing: 0;

}

//
th {
  //word-break: break-all;
  //word-wrap: break-word;
  //height: 40px;
  //width: 100px;
  //vertical-align: middle;
  //text-align: center;
  //border-left: 1px solid #999;
  //background: #d9d9d9;
  //box-sizing: border-box;
  height: 4.5rem;

}

td {
  //word-break: break-all;
  //word-wrap: break-word;
  //width: 100px;
  //text-align: center;
  //vertical-align: middle;
  //line-height: 30px;
  //border-left: 1px solid #999;
  //box-sizing: border-box;
  height: 4.5rem;
}

//
//tr {
//  border-top: 1px solid #999;
//  box-sizing: border-box;
//}


.right-div {
  float: left;
  width: calc(100vw - 100px);
  margin-left: -1px;
}

.right-div1 {
  width: calc(100% - 10rem);
  overflow: hidden;

  .first-row-style {
    box-sizing: border-box;
  }
}

.right-div2 {
  width: calc(100% - 10rem);
  overflow: auto;
}

.right-table2 {
  overflow: hidden;
}


.empty-content {
  width: 100%;
  overflow: auto;
}


</style>