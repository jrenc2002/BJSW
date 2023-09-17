<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] shadow bg-white rounded-2xl ">
    <!--    标题-->
    <div class="h-[4%] self-stretch justify-start items-center gap-2 inline-flex mt-3  ">
      <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">温度控制</div>
    </div>
    <!--    表格栏-->
    <div class="  w-[100%] h-[92%]  bottom-0   items-center justify-center flex  ">


      <div class="rounded-2xl  h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex     ">
        <div  class=" w-full h-full " >
          <div class=" box-border overflow-x-hidden w-full h-full flex">
            <template v-if="props.tableData.length > 0">
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
                        <div @click="popManager(col)">
                          {{ col }}

                        </div>

                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="right-div ">
                <!--窗口-->
                <div ref="firstRowLayer" class="right-div1 bg-[#F1F1F1] mt-3" >
                  <table :style="{ width: (firstRow.length+1 ) * 8.2+ 'rem' }" >
                    <tr>
                      <th v-for="(row, index) in firstRow" :key="index" class="first-row-style w-[8.2rem]  ">{{
                          row
                        }}
                      </th>
                    </tr>
                  </table>
                </div>
                <div
                    ref="tableContainer"
                    class="right-div2"
                    id="targetDiv1"
                    @scroll="tableScroll()"
                >
                  <table :style="{ width: (firstRow.length +1 ) * 8.2 + 'rem' }" >
                    <tr v-for="(body,index) in tableBodyRows" :key="index">
                      <template v-for="(col, i) in tableBodyCols" :key="col.props + i">
                        <td v-if="index==0" class="w-[8.2rem] text-center border-l border-b cursor-pointer">
                          <details class="dropdown ">
                            <summary v-if="body[col.props]==0"  class="m-1 btn w-[7rem] text-center">停止</summary>
                            <summary v-if="body[col.props]==1"  class="m-1 btn w-[7rem] text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3]">自动</summary>
                            <summary v-if="body[col.props]==2"  class="m-1 btn w-[7rem]  text-[#776B00] bg-[#FAF3B7] hover:bg-[#E5E0AA]">顺控</summary>

                            <ul  class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[7rem] broder">
                              <li @click="col.props=0" class="text-[#000000] bg-[#E0E0E0] hover:bg-[#C2C2C2] rounded"><a>停止</a></li>
                              <li @click="col.props=1" class="text-[#256637] bg-[#BAE7C7] hover:bg-[#A9CDB3] mt-2 rounded"><a>自动</a></li>
                              <li @click="col.props=2" class="text-[#776B00] bg-[#FAF3B7] hover:bg-[#E5E0AA] mt-2 rounded"><a>顺控</a></li>
                            </ul>
                          </details>
                        </td>

                        <td v-if="index!=0"
                            class="w-[8.2rem] text-center border-l border-b hover:bg-[#FAFAFA] cursor-pointer">
                          {{ body[col.props] }}
                        </td>
                      </template>


                    </tr>
                  </table>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="empty-content">
                <table
                    :style="{ width: (headerData.length - 1) * 100 + 'px', height: '10rem', overflow: 'auto' }"
                >
                  <thead class="table-header">
                  <tr>
                    <th v-for="(item) in props.headerData" :key="item.title">{{ item.title }}</th>
                  </tr>
                  </thead>

                  <van-empty class="empty-res" description="空空如也！"/>
                </table>
              </div>
            </template>
          </div>
        </div>

      </div>
    </div>


  </div>




</template>

<script lang='ts' setup>
import {computed, Ref, ref, watch,onUnmounted,onMounted,reactive} from 'vue'
import PopupManger from "@/components/PopupManger.vue";
import {usePopupMangerState} from "@/store/PopupMangerState";
import {PopupType} from "@/store/PopupMangerState";
const PopupMangerState=usePopupMangerState()
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
const name_translation = {
  '运行状态': 'None',
  '运行时间': 'None',
  '发酵批号': 'None',
  '温度': 'Temperature',
  'PH值': 'PHValue',
  '溶氧': 'DissolvedOxygen',
  '转速': 'RPM',
  '酸液泵': 'Acidpump',
  '碱液泵': 'Lyepump',
  '补料泵': 'Feedpump',
  '消泡剂泵': 'Defoamerpump'
}


const popManager =(val:any)=>{

  console.log(PopupMangerState.isShowPop)
  console.log(PopupMangerState.popupContent)
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
  {name: '状态', F1: 1, F2: 1, F3: 2, F4: 1, F5: 0, F6: 1, F7: 2, F8: 1},
  {name: '测量值', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '设定值', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '控制周期', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '比例P', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '积分I', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '微分D', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '最大加热',F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '最大冷却', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35},
  {name: '控制死区', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37},
  {name: '报警上限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},
  {name: '报警下限', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32},


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