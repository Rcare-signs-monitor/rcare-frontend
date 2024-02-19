<template>
    <el-container>
        <el-header>
            <el-page-header @back="onBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 日志 </span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                            Logs
                        </span>
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
        <el-main style="background-color: #24292F; margin-top: 30px;">
            <!-- <el-skeleton :rows="20" /> -->
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ElNotification as notify } from 'element-plus'

const onBack = () => {
    notify('Back')
}
</script>

<style scoped>
.el-container.is-vertical{
    height: calc(100vh - 70px);
}
</style>
