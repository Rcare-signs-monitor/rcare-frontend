<template>
    <el-container>
        <el-header>
            <el-page-header @back="onBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 欢迎 </span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)"> Homepage </span>
                    </div>
                </template>

                <el-descriptions :column="3" size="small" class="mt-4">
                    <el-descriptions-item label="工号">
                        <el-tag size="small">1234567890</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="用户名">
                        <el-tag size="small">admin</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="当前区域">
                        <el-tag size="small">Area1</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-page-header>
        </el-header>

        <el-main>
            <el-row style="margin-top: 30px">
                <el-col :span="24">
                    <el-card>
                        <div style="font-size: 40px">欢迎使用 VitalWave！</div>
                        <div style="width: 80%; margin: 40px auto 20px">
                            <el-row :gutter="80" justify="space-evenly">
                                <el-button :icon="Setting" size="large" plain @click="command1"> 数据采集 </el-button>
                                <el-button :icon="Setting" size="large" plain @click="command2"> 数据分析 </el-button>
                                <el-button :icon="Setting" size="large" plain @click="command3"> 停止采集 </el-button>
                                <el-button :icon="Setting" size="large" plain @click="command4"> 停止分析 </el-button>
                            </el-row>
                            <el-row :gutter="80" justify="space-evenly">
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-card>
                        <el-row>
                            <el-col :span="16">
                                <el-icon size="4em" color="rgba(255, 255, 255, .7)"><Monitor /></el-icon>
                            </el-col>
                            <el-col :span="8" style="text-align: right">监测区域数量<br />4</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">当前区域</el-col>
                            <el-col :span="8" style="text-align: right">Area1</el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        <el-row>
                            <el-col :span="16">
                                <el-icon size="4em" color="rgba(255, 255, 255, .7)"><User /></el-icon>
                            </el-col>
                            <el-col :span="8" style="text-align: right">成员数量<br />20</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">当前区域成员</el-col>
                            <el-col :span="8" style="text-align: right">4</el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        <el-row>
                            <el-col :span="16">
                                <el-icon size="4em" color="rgba(255, 255, 255, .7)"><Cloudy /></el-icon>
                            </el-col>
                            <el-col :span="8" style="text-align: right">数据记录收集<br />200.4k</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">昨日新增</el-col>
                            <el-col :span="8" style="text-align: right">213</el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        <el-row>
                            <el-col :span="16">
                                <el-icon size="4em" color="rgba(255, 255, 255, .7)"><Cpu /></el-icon>
                            </el-col>
                            <el-col :span="8" style="text-align: right">雷达运行状态<br />ON</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">雷达运行时间</el-col>
                            <el-col :span="8" style="text-align: right">1D 10:12:00</el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { User, Setting, Monitor, Cpu, Cloudy } from '@element-plus/icons-vue'
import { ElNotification as notify } from 'element-plus'
import { command1, command2, command3, command4 } from '@/components/request'

const onBack = () => {
    notify('Back')
}
</script>

<style scoped>
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

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

/* .item {
    margin-bottom: 18px;
} */

.box-card {
    width: 480px;
}
</style>
