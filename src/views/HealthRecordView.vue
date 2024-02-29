<template>
    <el-container>
        <el-header>
            <el-page-header @back="onBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 健康档案 </span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                            Health Record
                        </span>
                    </div>
                </template>
                <template #extra>
                    <div class="flex gap-2 mt-4">
                        <el-tag effect="dark" round>展示记录条数</el-tag>
                        <el-select
                            v-model="count"
                            clearable
                            placeholder="Select"
                            style="width: 100px; margin-left: 10px"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </div>
                </template>
            </el-page-header>
        </el-header>
        <el-main>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane v-for="item in persons" :label="item.name" :name="item.id">
                    <el-tabs type="border-card" v-model="activeName2">
                        <el-tab-pane label="监测数据" name="data">
                            <el-table
                                :data="data"
                                style="width: 100%; height: 100%"
                                table-layout="fixed"
                            >
                                <el-table-column
                                    sortable
                                    prop="detectTime"
                                    label="测量时间"
                                    width="340"
                                />
                                <el-table-column
                                    sortable
                                    prop="heartRate"
                                    label="心率(bpm)"
                                    width="220"
                                />
                                <el-table-column
                                    sortable
                                    prop="respiratoryRate"
                                    label="呼吸率(bpm)"
                                    width="220"
                                />
                                <el-table-column
                                    sortable
                                    prop="systolicPressure"
                                    label="收缩压(mmHg)"
                                    width="220"
                                />
                                <el-table-column
                                    sortable
                                    prop="diastolicPressure"
                                    label="舒张压(mmHg)"
                                />
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane
                            label="心率"
                            name="heart_rate"
                            style="display: flex; justify-content: center"
                        >
                            <Echarts
                                :option="getLineOption(data, 'heartRate', '心率 (bmp)')"
                                :style="{ height: '60vh', width: '80vw' }"
                                :refresh="1000"
                            />
                        </el-tab-pane>
                        <el-tab-pane
                            label="呼吸率"
                            name="respiratory_rate"
                            style="display: flex; justify-content: center"
                        >
                            <Echarts
                                :option="
                                    getLineOption(data, 'respiratoryRate', '呼吸率 (bmp)', true)
                                "
                                :style="{ height: '60vh', width: '80vw' }"
                                :refresh="1000"
                            />
                        </el-tab-pane>
                        <el-tab-pane
                            label="血压"
                            name="pressure"
                            style="display: flex; justify-content: center"
                        >
                            <Echarts
                                :option="getPressureOption(data)"
                                :style="{ height: '60vh', width: '80vw' }"
                                :refresh="1000"
                            />
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import type { Person, Sign } from '@/components/interface'
// import { getMembers, getSigns, getLineOption, getPressureOption } from '@/components/getTestData'
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

const route = useRoute()

var refresh: string | number | NodeJS.Timeout | undefined
onMounted(async () => {
    persons.value = await getMembers()
    activeName.value = persons.value[0].id
    data.value = await getSigns(activeName.value, count.value)
    refresh = setInterval(async () => {
        data.value = await getSigns(activeName.value, count.value)
    }, 2000)

    const id = route.query.id as string
    if (id) {
        activeName.value = parseInt(id)
    }
})

onBeforeUnmount(()=>{
    clearInterval(refresh)
})

watch(
    () => activeName.value,
    async (newValue) => {
        data.value = await getSigns(newValue, count.value)
    }
)

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

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
</style>
