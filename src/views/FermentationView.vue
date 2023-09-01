<template>
  <div>
    <p>
      <vxe-button @click="showOverflow = !showOverflow">单元格是否换行</vxe-button>
      <vxe-button @click="exportDataEvent">默认导出</vxe-button>
      <vxe-button @click="exportSelectEvent">导出选中</vxe-button>
      <vxe-button @click="openExportEvent">高级导出</vxe-button>
    </p>

    <vxe-table
        ref="tableRef"
        :data="tableData"
        :export-config="{}"
        :row-config="{isHover: true}"
        :show-overflow="showOverflow"
        height="300">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-colgroup title="Group1">
        <vxe-column field="name" title="Name"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="Group2">
        <vxe-column field="attr1" title="自动转换"></vxe-column>
        <vxe-column cell-type="number" field="amount" title="导出数值"></vxe-column>
        <vxe-column cell-type="string" field="num" sortable title="导出字符串"></vxe-column>
      </vxe-colgroup>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {VxeTableInstance, VxeButtonEvents} from 'vxe-table'

interface RowVO {
  name: string
  attr1: string | number | boolean
  amount: string
  num: string | number
}

const tableRef = ref<VxeTableInstance<RowVO>>()

const showOverflow = ref(false)

const tableData = ref<RowVO[]>([])

const exportDataEvent: VxeButtonEvents.Click = () => {
  const $table = tableRef.value
  if ($table) {
    $table.exportData({type: 'csv'})
  }
}

const exportSelectEvent: VxeButtonEvents.Click = () => {
  const $table = tableRef.value
  if ($table) {
    $table.exportData({
      data: $table.getCheckboxRecords()
    })
  }
}

const openExportEvent: VxeButtonEvents.Click = () => {
  const $table = tableRef.value
  if ($table) {
    $table.openExport()
  }
}
</script>