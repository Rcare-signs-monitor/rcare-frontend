<template>
    <el-container>
        <el-header>
            <el-page-header @back="onBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 参数配置 </span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                            Parameter Configure
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
        <el-main style="display: flex; justify-content: center; margin-top: 20px">
            <div style="width: 45vw">
                <el-row>
                    <el-text style="font-size: 20px; font-weight: bold">基础设置</el-text>
                    <div style="flex-grow: 1"></div>
                    <el-button @click="update"
                        ><el-icon style="margin-right: 7px"><MagicStick /></el-icon
                        >保存更新</el-button
                    >
                </el-row>
                <el-divider />
                <el-row class="row-bg" justify="space-between" style="align-items: center">
                    <el-col :span="10">
                        <el-row><el-text tag="b" size="large">radar.para1</el-text></el-row>
                        <el-row><el-text size="small">参数1(阿巴阿巴)</el-text></el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="para1" placeholder="Please input" />
                    </el-col>
                </el-row>
                <el-divider />
                <el-row class="row-bg" justify="space-between" style="align-items: center">
                    <el-col :span="10">
                        <el-row><el-text tag="b" size="large">radar.para2</el-text></el-row>
                        <el-row><el-text size="small">参数2(阿巴阿巴阿巴)</el-text></el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="para2" placeholder="Please input" />
                    </el-col>
                </el-row>
                <el-divider />
                <el-row class="row-bg" justify="space-between" style="align-items: center">
                    <el-col :span="10">
                        <el-row><el-text tag="b" size="large">radar.para3</el-text></el-row>
                        <el-row><el-text size="small">参数3</el-text></el-row>
                    </el-col>
                    <el-col :span="6" size="large" style="text-align: right">
                        <el-switch />
                    </el-col>
                </el-row>
                <el-divider />
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { getParas, setParas } from '@/components/request'
import { MagicStick } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onBack = () => {
    router.push({ path: '/' })
}

const para1 = ref('')
const para2 = ref('')

onMounted(async () => {
    var paras = await getParas()
    para1.value = paras.para1
    para2.value = paras.para2
})

const update = async () => {
    const data = {
        para1: para1.value,
        para2: para2.value
    }
    await setParas(data)
}
</script>
