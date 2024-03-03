<template>
    <el-row style="align-items: center;">
        <span class="dot grey"></span> 空闲:9
        <span class="dot blue"></span> 占用:14
        <span class="dot red"></span> 风险:1
        <div style="display: flex; flex-grow: 1;"></div>
        <dv-decoration7 style="width:200px;height:30px;">
            <div font-300 style="margin: 0 10px;">
                病床占用一览
            </div>
        </dv-decoration7>
        <div style="display: flex; flex-grow: 1;"></div>
        <dv-decoration1 style="width:200px;height:30px;margin-right: 10px;" />
    </el-row>
    <el-row
        :gutter="5"
        v-for="(items, idx1) in tableData"
        style="width: 100%; margin-bottom: 5px"
    >
        <el-col :span="4" v-for="(item, idx2) in items">
            <dv-border-box12 style="overflow: hidden" v-if="item">
                <el-card style="margin: 10px">
                    <template #footer>
                        <div
                            v-if="risky(item)"
                            style="
                                background-color: #E21018;
                                padding: 7px;
                                text-align: center;
                                font-weight: bolder;
                            "
                        >
                            {{ 101 + parseInt((idx1 * 6 + idx2) / 3) }} - {{ idx1 * 6 + idx2 + 1 }}
                        </div>
                        <div
                            v-else
                            style="
                                background-color: rgb(50 176 227);
                                padding: 7px;
                                text-align: center;
                                font-weight: bolder;
                            "
                        >
                            {{ 101 + parseInt((idx1 * 6 + idx2) / 3) }} - {{ idx1 * 6 + idx2 + 1 }}
                        </div>
                    </template>
                    <div style="display: flex; align-items: center">
                        <div v-if="risky(item)" 
                            class="bed-icon" style="background-color: #E21017">
                            <img height="60px" width="60px" src="../assets/床位 患者.svg" />
                        </div>
                        <div v-else class="bed-icon"  style="background-color: #2186f0">
                            <img height="60px" width="60px" src="../assets/床位 患者.svg" />
                        </div>
                        <el-row style="height: 80px; width: 50%">
                            <el-col>姓名：{{ item.name }}</el-col>
                            <el-col>心率：{{ item.heart }} </el-col>
                            <el-col>呼吸：{{ item.breath }} </el-col>
                        </el-row>
                    </div>
                </el-card>
            </dv-border-box12>
            <dv-border-box12 style="overflow: hidden" v-else>
                <el-card style="margin: 10px">
                    <template #footer>
                        <div
                            style="
                                background-color: #a0a0a0;
                                padding: 7px;
                                text-align: center;
                                font-weight: bolder;
                            "
                        >
                            {{ 101 + parseInt((idx1 * 6 + idx2) / 3) }} - {{ idx1 * 6 + idx2 + 1 }}
                        </div>
                    </template>
                    <div style="display: flex; align-items: center">
                        <div class="bed-icon" style="background-color: #a0a0a0">
                            <img height="60px" width="60px" src="../assets/床位 空床.svg" />
                        </div>
                        <el-row style="height: 80px; width: 50%">
                            <el-col>姓名：-</el-col>
                            <el-col>心率：-</el-col>
                            <el-col>呼吸：-</el-col>
                        </el-row>
                    </div>
                </el-card>
            </dv-border-box12>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'

const risky = (item)=>{
    return item.heart > 100 || item.heart < 60 || item.breath < 16 || item.breath > 20
}

const tableData = [
    [
        {
            name: 'AAA',
            heart: 70,
            breath: 17
        },
        {
            name: 'BBB',
            heart: 80,
            breath: 17
        },
        {
            name: 'CCC',
            heart: 77,
            breath: 17
        },
        null,
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        null
    ],
    [
        null,
        null,
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        {
            name: 'Tom',
            heart: 110,
            breath: 17
        }
    ],
    [
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        null,
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        null
    ],
    [
        null,
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        null,
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        {
            name: 'Tom',
            heart: 77,
            breath: 17
        },
        null
    ]
]
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
    margin: 20px;
    height: 78px;
    width: 78px;
}

.dot {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    margin-right: 5px;
    margin-left: 10px;
}

.grey {
    background-color: #A0A0A0;
}
.blue {
    background-color: #32B0E3;
}
.red {
    background-color: #E21018;
}
</style>
