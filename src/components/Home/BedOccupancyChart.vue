<template>
    <el-row style="align-items: center; margin-bottom: -20px">
        <span class="dot grey"></span> 空闲:{{ empty_num }} <span class="dot blue"></span> 占用:{{ occupied_num }} <span class="dot red"></span> 风险:
        {{ risk_num }}
        <div style="display: flex; flex-grow: 1"></div>
        <dv-decoration7 style="width: 200px; height: 30px">
            <div font-300 style="margin: 0 10px">病床占用一览</div>
        </dv-decoration7>
        <div style="display: flex; flex-grow: 1"></div>
        <dv-decoration1 style="width: 200px; height: 30px; margin-right: 10px" />
    </el-row>
    <el-row :gutter="5" style="width: 100%">
        <el-col :span="12" v-for="(items, idx1) in tableData" :key="idx1">
            <dv-border-box11 :title="`${idx1} 号`">
                <el-row style="padding: 20px; padding-top: 60px">
                    <el-col :span="8" v-for="(item, idx2) in items" :key="idx2">
                        <dv-border-box12 style="overflow: hidden" v-if="item.id">
                            <el-card style="margin: 10px" @click="jump(item.room, item.id)">
                                <template #footer>
                                    <div :class="risky(item) ? 'risk' : 'normal'">{{ idx1 }} - {{ item.bed }}</div>
                                </template>
                                <div style="display: flex; align-items: center" :class="risky(item) ? 'risk3' : ''">
                                    <div :style="risky(item) ? 'background-color: #e21017;' : 'background-color: #2186f0;'" class="bed-icon">
                                        <img height="40px" width="40px" src="@/assets/床位 患者.svg" />
                                    </div>
                                    <el-row style="height: 80px; width: 50%; font-size: 14px; margin: 10px 0">
                                        <el-col style="height: 12px">姓名：{{ item.name }}</el-col>
                                        <el-col style="height: 12px">心率：{{ item.heart }} </el-col>
                                        <el-col style="height: 12px">呼吸：{{ item.respire }} </el-col>
                                        <el-col style="height: 12px"
                                            >血压：{{ item.sbp.toFixed(0) }} / {{ item.dbp.toFixed(0) }}
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-card>
                        </dv-border-box12>
                        <dv-border-box12 style="overflow: hidden" v-else>
                            <el-card style="margin: 10px">
                                <template #footer>
                                    <div style="background-color: #a0a0a0; padding: 5px; text-align: center; font-weight: bolder">
                                        {{ idx1 }} - {{ item.bed }}
                                    </div>
                                </template>
                                <div style="display: flex; align-items: center">
                                    <div class="bed-icon" style="background-color: #a0a0a0">
                                        <img height="42px" width="42px" src="@/assets/床位 空床.svg" />
                                    </div>
                                    <el-row style="height: 80px; width: 50%; font-size: 14px; margin: 10px 0">
                                        <el-col style="height: 12px">姓名：-</el-col>
                                        <el-col style="height: 12px">心率：- </el-col>
                                        <el-col style="height: 12px">呼吸：- </el-col>
                                        <el-col style="height: 12px">血压：- / - </el-col>
                                    </el-row>
                                </div>
                            </el-card>
                        </dv-border-box12>
                    </el-col>
                </el-row>
            </dv-border-box11>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
// 红 or 蓝？
import { BorderBox11 as DvBorderBox11, BorderBox12 as DvBorderBox12, 
    Decoration7 as DvDecoration7, Decoration1 as DvDecoration1 } from '@kjgl77/datav-vue3'
const risky = (item: any) => {
    if (!item) return false
    return (
        (item.heart && (item.heart > 120 || item.heart < 60)) ||
        (item.respire && (item.respire < 12 || item.respire > 27)) ||
        (item.sbp && (item.sbp < 80 || item.sbp > 120)) ||
        (item.dbp && (item.dbp < 120 || item.dbp > 160))
    )
}

const risk_num = computed(() => {
    var count = 0
    Object.keys(tableData.value).forEach((room) => {
        tableData.value[room].forEach((bed) => {
            count += risky(bed)
        })
    })
    return count
})

const occupied_num = computed(() => {
    var count = 0
    Object.keys(tableData.value).forEach((room) => {
        tableData.value[room].forEach((bed) => {
            count += bed.id ? 1 : 0
        })
    })
    console.log(tableData.value)
    return count - risk_num.value
})

const empty_num = computed(() => {
    return 24 - occupied_num.value - risk_num.value
})

import { computed, onMounted, ref } from 'vue'
// 修正组件间锚点跳转
import { useRoute, useRouter } from 'vue-router'
import { getBeds } from '../request'
const router = useRouter()
const jump = (room: string, id: number|null) => {
    if (!id) return
    router.push({
        path: `/person_info`,
        query: {
            room: `${room}`,
            id: `${id}`
        }
    })
}

const tableData = ref<{
    [roomid: string]: [
        {
            room: string
            bed: string
            id: number | null
            name: string | null
            heart: number
            respire: number
            sbp: number
            dbp: number
        }
    ]
}>({})

// 测试用 床位占用数据
var refresh: any
const route = useRoute()
onMounted(async () => {
    tableData.value = await getBeds()
    refresh = async () => {
        tableData.value = await getBeds()
        if (route.path === '/') setTimeout(refresh, 2000)
    }
    refresh()
})
</script>

<style scoped>
.el-card {
    --el-card-padding: 0px;
    background-color: #232c46;
}

.bed-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    margin: 13px 17px;
    height: 70px;
    width: 70px;
}

.dot {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    margin-right: 5px;
    margin-left: 10px;
}

.grey {
    background-color: #a0a0a0;
}
.blue {
    background-color: #32b0e3;
}
.red {
    background-color: #e21018;
}

.risk {
    background-color: #e21018;
    padding: 7px;
    text-align: center;
    font-weight: bolder;
}
.normal {
    background-color: rgb(50 176 227);
    padding: 7px;
    text-align: center;
    font-weight: bolder;
}

.risk3 {
    animation: blink 0.8s infinite;
}
@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
