<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] ">
    <!--    标题-->
    <div class="h-[6%] self-stretch justify-start items-center gap-4 inline-flex ">
      <div class="text-xl leading-10 text-zinc-900 text-2xl font-medium leading-loose left-4 relative">数据总览</div>
    </div>
    <!--    表格栏-->
    <div class=" rounded-2xl bg-white w-[100%] h-[92%]  bottom-0  shadow items-center justify-center flex ">
      <div
          class="rounded-2xl bg-white h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]  items-center justify-center flex    ">
        <div class=" w-full h-full">
          <div class=" box-border overflow-x-hidden w-full h-full flex">
            <template v-if="props.tableData.length > 0">
              <div class="float-left h-[100%] bg-[#E8F6ED] shadow border rounded-2xl z-40">
                <div class=" mt-3 w-[10rem]">
                  <table class=" py-4 ">
                    <tr>
                      <th class="flex items-center justify-center gap-2   ">
                        <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 4H8V5H15V4Z" fill="#19161D"/>
                          <path d="M3 5.295L1.705 4L1 4.705L3 6.705L7 2.705L6.295 2L3 5.295Z" fill="#19161D"/>
                          <path d="M15 11H8V12H15V11Z" fill="#19161D"/>
                          <path d="M3 12.295L1.705 11L1 11.705L3 13.705L7 9.705L6.295 9L3 12.295Z" fill="#19161D"/>
                        </svg>
                        设置界面

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
                        <div
                            :class="[col!='运行状态'&&col!='运行时间'&&col!='发酵批号' ? 'bg-white  rounded-[8px] shadow hover:bg-[#FAFAFA] cursor-pointer' : '','w-[90%] h-[90%] flex justify-center items-center ']">
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
                    ref="tableContainer"
                    class="right-div2"
                    @scroll="tableScroll()"
                >
                  <table :style="{ width: (firstRow.length +1 ) * 8.2 + 'rem' }" class="right-table2">
                    <tr v-for="(body,index) in tableBodyRows" :key="index">
                      <td v-for="(col, i) in tableBodyCols" :key="col.props + i"
                          class="w-[8.2rem] text-center border-l border-b hover:bg-[#FAFAFA] cursor-pointer">{{ body[col.props] }}
                      </td>
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
import {computed, Ref, ref,} from 'vue'
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
  { title: '姓名', props: 'name' },
  { title: 'F1', props: 'F1' },
  { title: 'F2', props: 'F2' },
  { title: 'F3', props: 'F3' },
  { title: 'F4', props: 'F4' },
  { title: 'F5', props: 'F5' },
  { title: 'F6', props: 'F6' },
  { title: 'F7', props: 'F7' },
  { title: 'F8', props: 'F8' },

  // 你可以按需增加其他列
];


const tableData: TableDataItem[] = [
  { name: '运行状态', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37 },
  { name: '运行时间', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32 },
  { name: '发酵批号', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35 },
  { name: '温度/°C', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37 },
  { name: 'PH/PH', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32 },
  { name: '溶氧/%', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35 },
  { name: '转速/rpm', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37 },
  { name: '泵1/g', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32 },
  { name: '泵2/g', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35 },
  { name: '泵3/g', F1: 30, F2: 31, F3: 32, F4: 33, F5: 34, F6: 35, F7: 36, F8: 37 },
  { name: '泵4/g', F1: 25, F2: 26, F3: 27, F4: 28, F5: 29, F6: 30, F7: 31, F8: 32 },
  { name: '泵5/g', F1: 28, F2: 29, F3: 30, F4: 31, F5: 32, F6: 33, F7: 34, F8: 35 }
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
  props.tableData.forEach((f, index) => {

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
  width: 89%;
  overflow: hidden;

  .first-row-style {
    box-sizing: border-box;
  }
}

.right-div2 {
  width: 89%;
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