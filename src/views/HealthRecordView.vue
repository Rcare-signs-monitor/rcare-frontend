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
                <el-tab-pane v-for="(item, idx) in persons" :label="item.info.name" :name="item.info.id" :key="idx"  @tab-click="backroom=item.info.room; currentItem=item">
                    <div class="dv-border-box-13" style="">
                        <svg class="dv-border-svg-container" style="margin: -11px 0 0 -5px"> <path fill="transparent" stroke-width="3" stroke-linecap="round" stroke-dasharray="10, 5" stroke="#6586ec" d="M 16 9 L 61 9" ></path> <path fill="transparent" stroke="#2cf7fe" d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"></path> </svg>
                        <el-tabs type="border-card" v-model="activeName2">
                            <el-tab-pane label="监测数据" name="data">
                                <div class="dv-border-box-1">
                                    <svg width="150px" height="150px" class="left-top dv-border" style="margin: -8px 0 0 -8px"> <polygon fill="#4fd2dd" points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63" > <animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite" ></animate> </polygon> <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8"> <animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite" ></animate> </polygon> <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54" > <animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite" ></animate> </polygon> </svg>
                                    <svg width="150px" height="150px" class="right-top dv-border" style="margin: -8px -8px 0 0"> <polygon fill="#4fd2dd" points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63" > <animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite" ></animate> </polygon> <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8"> <animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite" ></animate> </polygon> <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54" > <animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite" ></animate> </polygon> </svg>
                                    <el-table :data="table" style="width: 100%; height: 100%" table-layout="fixed" stripe>
                                        <el-table-column sortable prop="time" label="测量时间" width="340" />
                                        <el-table-column sortable prop="heart" label="心率(bpm)" width="220" />
                                        <el-table-column sortable prop="respire" label="呼吸率(bpm)" width="220" />
                                        <el-table-column label="收缩压/舒张压(mmHg)">
                                            <template #default="scope">
                                                <div style="display: flex; align-items: center">
                                                    <span style="margin-left: 10px"> {{ scope.row.sbp }} / {{ scope.row.dbp }} </span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <svg width="150px" height="150px" class="left-bottom dv-border" style="margin: 0 0 -8px -8px"> <polygon fill="#4fd2dd" points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63" > <animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite" ></animate> </polygon> <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8"> <animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite" ></animate> </polygon> <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54" > <animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite" ></animate> </polygon> </svg>
                                    <svg width="150px" height="150px" class="right-bottom dv-border" style="margin: 0 -8px -8px 0"> <polygon fill="#4fd2dd" points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63" > <animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite" ></animate> </polygon> <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8"> <animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite" ></animate> </polygon> <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54" > <animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite" ></animate> </polygon> </svg>
                                </div>
                            </el-tab-pane>
                            
                            <el-tab-pane label="心率" name="heart_rate" style="display: flex; justify-content: center">
                                <Echarts v-if="item.signs" :option="getLineOption(item.signs.heart, 'heart')" :style="{ height: '60vh', width: '80vw' }" :refresh="1000" />
                            </el-tab-pane>

                            <el-tab-pane label="呼吸率" name="respiratory_rate" style="display: flex; justify-content: center">
                                <Echarts
                                    v-if="item.signs"
                                    :option="getLineOption(item.signs.respire, 'respire',true, 'green')"
                                    :style="{ height: '60vh', width: '80vw' }"
                                    :refresh="1000"
                                />
                            </el-tab-pane>
                            
                            <el-tab-pane label="血压" name="pressure" style="display: flex; justify-content: center">
                                <Echarts
                                    v-if="item.signs"
                                    :option="getDoubleLineOption(item.signs.sbp, item.signs.dbp)"
                                    :style="{ height: '60vh', width: '80vw' }"
                                    :refresh="1000"
                                />
                            </el-tab-pane>

                            <el-tab-pane label="拟合ECG" name="predict" style="display: flex; justify-content: center">
                                <Echarts
                                    v-if="item.signs"
                                    :option="getLineOption(item.signs.ecg, 'ecg',true, 'yellow')"
                                    :style="{ height: '60vh', width: '80vw' }"
                                    :refresh="1000"
                                />
                            </el-tab-pane> 

                            <el-tab-pane label="健康档案" name="archive" style="font-size: 20px; color: #b5bbc0; margin: 0 50px;" :lazy="true">
                                <LlmReport :item="item" :llm="llmJson"></LlmReport>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import type { Person } from '@/components/interface'
import { useRoute, useRouter } from 'vue-router'
import { getLineOption, getDoubleLineOption } from '@/components/getTestData'
import { getSigns, getMembers, getSignsTable } from '@/components/request'

import Echarts from '@/components/Recharts.vue'
import LlmReport from '@/components/LlmReport.vue'
import OpenAI from 'openai'
import { ElLoading } from 'element-plus'

// 展示条数
const count = ref(50)
const options = [
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
const table = ref([])
const backroom = ref<string>('')

var query = reactive({
    num: 0
})

// 存放大模型返回的json数据
const llmJson = ref()
const currentItem = ref()

// kimi api
const client = new OpenAI({
    apiKey: 'sk-pdXAkGGIaE5mif4GDC7T9k4faBgsT9sP2V3Ba1VpnDe5S98Y',
    dangerouslyAllowBrowser: true,
    baseURL: 'https://api.moonshot.cn/v1'
})

let history = [
    { role: 'system', content: '你是我的智能医疗助理，负责回答各项医疗问题。' },
    { role: 'system', content: '回答用json格式的字符串表示，且json的key用英文表示，value用中文表示，例如:"treatment": \'治疗手段\', "possible_disease": \'可能的疾病\' ' },
    { role: 'system', content: 'json还需包括如下字段，"hrAnalyze": \'心率状态分析\', "rrAnalyze": \'呼吸率状态分析\', "bpAnalyze": \'血压状态分析\'' }
]

async function chat(prompt: string) {
    history.push({
        role: 'user',
        content: prompt
    })
    const completion = await client.chat.completions.create({
        model: 'moonshot-v1-8k',
        messages: history as any
    })
    history.push(completion.choices[0].message as { role: string; content: string })
    return completion.choices[0].message.content
}

function promptBuilder(heartRate: number, respireRate: number, SBP: number, DBP: number, pauseCount: number, isNormalECG: Boolean) {
    let ecgString = ''
    let pauseString = ''
    let hrString = `最大静息心率${heartRate.toString()}次每分钟,`
    let rrString = `呼吸率${respireRate.toString()}次每分钟,`
    let sbpString = `收缩压150mmHg,`
    let dbpString = `舒张压100mmHg,`
    let endString = `分析一下他可能患有什么疾病（仅限最可能的一条），分析一下当前心率状态、呼吸率状态、血压状态，及如何治疗。`
    if (isNormalECG) {
        ecgString = `我的一位患者心电图数据表现正常,`
    } else {
        ecgString = `我的一位患者心电图数据表现异常,`
    }
    if (pauseCount) {
        pauseString = `伴有每晚${pauseCount.toString()}次的呼吸暂停,`
    }
    return ecgString + hrString + rrString + sbpString + dbpString + pauseString + endString
}
// "我的一位患者心电图数据表现异常，最大静息心率120次每分钟，呼吸率30次每分钟，收缩压150mmHg，舒张压100mmHg，伴有每晚10次的呼吸暂停，分析一下他可能患有什么疾病（仅限最可能的一条），分析一下当前心率状态、呼吸率状态、血压状态，及如何治疗。"
async function main(heartRate: number, respireRate: number, SBP: number, DBP: number, pauseCount: number, isNormalECG: Boolean) {
    let reply = (await chat(promptBuilder(heartRate, respireRate, SBP, DBP, pauseCount, isNormalECG))) as string
    console.log(reply)
    let jsonReply
    jsonReply = JSON.parse(reply)
    console.log(jsonReply)
    console.log(history)
    return jsonReply
}

onMounted(async () => {
})

var refresh: any
onMounted(async () => {
    persons.value = await getMembers(query)
    console.log(persons.value);
    
    activeName.value = persons.value[0].info.id
    backroom.value = persons.value[0].info.room
    currentItem.value = persons.value[0]
    table.value = await getSignsTable(activeName.value, count.value)
    
    refresh = async () => {
        if (activeName2.value == 'data')
            table.value = await getSignsTable(activeName.value, count.value)
        else if(activeName2.value == 'archive' && !llmJson.value){
            
            const loadingInstance = ElLoading.service({
                lock: true,
                text: 'AI 分析中',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            llmJson.value = await main(
                currentItem.value.signs.heart[currentItem.value.signs.heart.length-1].data, 
                currentItem.value.signs.respire[currentItem.value.signs.respire.length-1].data, 
                currentItem.value.signs.sbp[currentItem.value.signs.sbp.length-1].data, 
                currentItem.value.signs.dbp[currentItem.value.signs.dbp.length-1].data, 
                10, 
                false
            )
            llmJson.value['heart'] = currentItem.value.signs.heart[currentItem.value.signs.heart.length-1].data
            llmJson.value['respire'] = currentItem.value.signs.respire[currentItem.value.signs.respire.length-1].data
            llmJson.value['sbp'] = currentItem.value.signs.sbp[currentItem.value.signs.sbp.length-1].data
            llmJson.value['dbp'] = currentItem.value.signs.heart[currentItem.value.signs.dbp.length-1].data
            await nextTick(() => {
                loadingInstance.close()
            })

        }
        else {
            var person_idx = persons.value?.findIndex(ele => ele.info.id === activeName.value)!
            persons.value![person_idx].signs = await getSigns(activeName.value, count.value)
        }
        if(route.path === '/health_record') setTimeout(refresh, 2000)      
    }
    refresh()

    const id = route.query.id as string
    if (id) {
        activeName.value = parseInt(id)
    }
})

watch(
    () => activeName.value,
    async (newValue) => {
        table.value = await getSignsTable(newValue, count.value)
        var person_idx = persons.value?.findIndex(ele => ele.info.id === activeName.value)!
        persons.value![person_idx].signs = await getSigns(activeName.value, count.value)
    }
)

const route = useRoute()
const router = useRouter()
const onBack = () => {
    router.push({ path: '/person_info', query: { room: backroom.value } })
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

.el-row.compact{
    margin-bottom: 0;
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
    border: 2px solid #2667ab;
}

/* 里面的 */
.el-tabs--border-card > .el-tabs__content,
#pane-3 > div > div > div.el-tabs__content {
    background-image: linear-gradient(rgba(9, 18, 34, 0.9), rgba(9, 18, 34, 1)), url('../assets/background.jpg');
    background-color: #091222;
    padding: 10px;
}

/* 外面的 */
#app > section > section > main > section > main > div > div.el-tabs__content {
    background-color: #141414;
}

div.el-tabs__content,
div > div > div.el-tabs__header > div > div {
    /* border: 1px solid #546db9; */
    background-color: #091222;
}

.el-table {
    --el-table-header-bg-color: #091222;
    --el-fill-color-lighter: #151c31;
    --el-bg-color: #0d1328;
    --el-table-border: 0px;
    --el-table-border-color: #2667ab;
    --el-table-tr-bg-color: #0b11258c;
}

.el-table thead {
    color: #ffffff;
}

.dv-border-box-1 .dv-border {
    position: absolute;
    display: block;
    z-index: 10;
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
