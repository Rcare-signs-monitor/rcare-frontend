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
        <el-main style="background-color: #24292f; margin-top: 30px">
            <code v-html="makeColorful(log)" 
                style="white-space: pre-wrap;color: #dfdcdc; font-family: 'Helvetica Neue';">
            </code>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onBack = () => {
    router.push({ path: '/' })
}

const log = ref(`2024-02-19 13:26:10 [S] system 开始采集
2024-02-19 13:26:10 [I] apply 正在检查数据……
2024-02-19 13:26:13 [E] Info Error: Element ".main-thread" not found.
                at async Info (/lib/parseLinkInfo.js:39:19) 
                at async sendMessages (/lib/index.js:139:36)
                at async Timeout.interval [as _onTimeout] (/lib/index.js:173:9) 
2024-02-19 13:26:13 [I] apply 采集时间：6.11s
2024-02-19 13:31:00 [S] apply 采集完成！
2024-02-19 13:31:08 [I] apply 开始识别
2024-02-19 13:31:08 [I] apply 解析数据中……
2024-02-19 13:33:57 [W] adapter Session timed out, will retry in 5s...
2024-02-19 13:34:02 [I] adapter connect to server
2024-02-19 13:36:00 [I] apply 正在循环 2024/2/19 13:36:00`)

const makeColorful = (log:string)=>{
    var result = log.replaceAll(/^(\d\d\d\d-\d\d-\d\d\s\d\d:\d\d:\d\d)/gm, 
                            '<span style="color:#5E5D5B">$1</span>')
                            .replaceAll(/\[S\]\s(\S*)\s/gm,
                            ' [ S ]  <span style="color:#94F166">$1</span> ')
                            
                            .replaceAll(/\[I\]\s(\S*)\s/gm,
                            ' [ I ]  <span style="color:#BDE901">$1</span>  ')
                            
                            .replaceAll(/\[E\]\s(\S*)\s/gm,
                            ' [ E ]  <span style="color:#ff6d6d">$1</span> ')
                            
                            .replaceAll(/\[W\]\s(\S*)\s/gm,
                            ' [ W ]  <span style="color:#03DAD9">$1</span> ')
    return result
}
</script>

<style scoped>
.el-container.is-vertical {
    height: calc(100vh - 70px);
}
</style>
