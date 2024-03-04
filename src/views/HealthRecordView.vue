<template>
    <el-container>
        <el-header>
            <el-page-header @back="onBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 个人档案 </span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)"> Health Record </span>
                    </div>
                </template>
                <template #extra>
                    <div class="flex gap-2 mt-4">
                        <el-tag effect="dark" round>展示记录条数</el-tag>
                        <el-select v-model="count" clearable placeholder="Select" style="width: 100px; margin-left: 10px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                </template>
            </el-page-header>
        </el-header>
        <el-main style="margin-top: -40px">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane v-for="(item, idx) in persons" :label="item.name" :name="item.id" :key="idx">
                    <div class="dv-border-box-13" style="">
                        <svg class="dv-border-svg-container" style="margin: -11px 0 0 -5px">
                            <path fill="transparent" stroke-width="3" stroke-linecap="round" stroke-dasharray="10, 5" stroke="#6586ec" d="M 16 9 L 61 9"></path>
                            <path fill="transparent" stroke="#2cf7fe" d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"></path>
                        </svg>
                        <el-tabs type="border-card" v-model="activeName2">
                            <el-tab-pane label="监测数据" name="data">
                                <!-- <dv-scroll-board :config="config" style="height:520px"></dv-scroll-board> -->
                                <el-table :data="data" style="width: 100%; height: 100%" table-layout="fixed" stripe>
                                    <el-table-column sortable prop="detectTime" label="测量时间" width="340" />
                                    <el-table-column sortable prop="heartRate" label="心率(bpm)" width="220" />
                                    <el-table-column sortable prop="respiratoryRate" label="呼吸率(bpm)" width="220" />
                                    <el-table-column label="收缩压/舒张压(mmHg)">
                                        <template #default="scope">
                                            <div style="display: flex; align-items: center">
                                                <span style="margin-left: 10px"> {{ scope.row.systolicPressure }} / {{ scope.row.diastolicPressure }} </span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <el-tab-pane label="心率" name="heart_rate" style="display: flex; justify-content: center">
                                <Echarts :option="getLineOption(data, 'heartRate')" :style="{ height: '60vh', width: '80vw' }" :refresh="1000" />
                            </el-tab-pane>
                            <el-tab-pane label="呼吸率" name="respiratory_rate" style="display: flex; justify-content: center">
                                <Echarts :option="getLineOption(data, 'respiratoryRate', true, 'green')" :style="{ height: '60vh', width: '80vw' }" :refresh="1000" />
                            </el-tab-pane>
                            <el-tab-pane label="血压" name="pressure" style="display: flex; justify-content: center">
                                <Echarts :option="getPressureOption(data)" :style="{ height: '60vh', width: '80vw' }" :refresh="1000" />
                            </el-tab-pane>
                            <el-tab-pane label="拟合曲线" name="predict" style="display: flex; justify-content: center">
                                <Echarts :option="getLineOption(data, 'heartRate', true, 'yellow')" :style="{ height: '60vh', width: '80vw' }" :refresh="1000" />
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Person, Sign } from '@/components/interface'
import { useRoute, useRouter } from 'vue-router'
import { getLineOption, getPressureOption } from '@/components/getTestData'
import { getSigns, getMembers } from '@/components/request'

import Echarts from '@/components/Recharts.vue'

// 展示条数
const count = ref(50)
const options = [
    {
        value: null,
        label: '全部显示'
    },
    {
        value: 15,
        label: '15条'
    },
    {
        value: 50,
        label: '50条'
    },
    {
        value: 100,
        label: '100条'
    },
    {
        value: 200,
        label: '200条'
    }
]

const persons = ref<Person[]>()
const activeName = ref<number>(0)
const activeName2 = ref('data')
const data = ref<Sign[]>([])

var refresh: string | number | NodeJS.Timeout | undefined
onMounted(async () => {
    persons.value = await getMembers()
    activeName.value = persons.value[0].id
    data.value = await getSigns(activeName.value, count.value)
    // refresh = setInterval(async () => {
    //     data.value = await getSigns(activeName.value, count.value)
    // }, 2000)

    const id = route.query.id as string
    if (id) {
        activeName.value = parseInt(id)
    }
})

onBeforeUnmount(() => {
    clearInterval(refresh)
})

watch(
    () => activeName.value,
    async (newValue) => {
        data.value = await getSigns(newValue, count.value)
    }
)

const route = useRoute()
const router = useRouter()
const onBack = () => {
    router.push({ path: '/person_info' })
}
</script>

<style>
.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-card.is-always-shadow {
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.05);
}

.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}

.el-button--large {
    height: 60px;
    font-size: large;
}

td.el-table__cell {
    border: 1px solid #ffffff1e;
}

#pane-3 > div > div > div.el-tabs__content {
    background-image: linear-gradient(rgba(29, 30, 31, 0.95), rgba(29, 30, 31, 0.95)), url('../assets/background.jpg');
}

#app > section > section > main > section > main > div > div.el-tabs__content {
    background-color: #091222;
    border: 1px solid #235fa7;
}

div.el-tabs__content,
#pane-3 > div > div > div.el-tabs__header.is-top > div > div {
    border: 1px solid #546db9;
}
</style>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}
</style>
