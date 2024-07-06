<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 定义props
interface Props {
    width?: string
    height?: string
    refresh?: number
    option: EChartsOption
}
const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '100%',
    refresh: 0,
    option: () => ({})
})

const myChartsRef = ref<HTMLDivElement>()
let myChart: ECharts

// 初始化echarts
const initChart = (): void => {
    if (myChart !== undefined) {
        myChart.dispose()
    }
    // myChart = init(myChartsRef.value as HTMLDivElement, 'dark')
    myChart = init(myChartsRef.value as HTMLDivElement)
}

// 重新渲染echarts
const resizeChart = (): void => {
    myChart.resize()
}

var timer: any
onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
    if (props.refresh > 500) {
        timer = setInterval(() => {
            myChart?.setOption(props.option, true)
        }, props.refresh)
    } else {
        // 延迟加载 勿动
        setTimeout(() => {
            myChart?.setOption(props.option, true)
        }, 500)
    }
})

onBeforeUnmount(() => {
    clearInterval(timer)
    myChart.dispose()
})
</script>

<template>
    <div ref="myChartsRef" :style="{ height: height, width: width }" :option="option"></div>
</template>
