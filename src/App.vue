<script lang="ts" setup>
import { 
    BorderBox10 as DvBorderBox10, 
    Button as DvButton
} from '@kjgl77/datav-vue3'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Menu as IconMenu, PieChart, Setting, ArrowRightBold, ArrowLeftBold, List, Operation, LocationFilled } from '@element-plus/icons-vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { cancelCalling, getCalling } from './components/request'
import Warning from './components/WarningWindow.vue'

const isCollapse = ref(true)
const activeIndex = ref('1')

const route = useRoute()
watch(
    () => route.path,
    (newValue) => {
        // 修复侧边 active 与路径不同步
        // console.log(newValue);
        const pathList = ['', '/', '/person_info', '/health_record', '/paras', '/logs', '/settings']
        activeIndex.value = pathList.findIndex((item) => item === newValue).toString()
    }
)

const isCalling = ref(false) // 只检测 id = 3 的病患
var refresh_global: any
onMounted(async () => {
    isCalling.value = await getCalling()
    refresh_global = async () => {
        isCalling.value = await getCalling()
        setTimeout(refresh_global, 2000)
    }
    refresh_global()
})
onBeforeUnmount(() => {
    clearTimeout(refresh_global)
})

const confirm = async () => {
    isCalling.value = await cancelCalling()
}

import { useRouter } from 'vue-router'
const router = useRouter()
const handleLeftClick = () => {
    router.push('/settings')
}
const handleRightClick = () => {
    router.push('/settings2')
}

const name = ref<string>(import.meta.env.WARNING_PATIENT_NAME)
</script>

<template>
    <Warning v-model="isCalling">
        <template #body>
            <span>
                101病房 1号病床 <br />
                患者 {{ name }} 发起呼叫
            </span>
        </template>
        <template #button>
            <dv-button
                    @click="confirm"
                    border="Border3"
                    color="#c8161d"
                    font-color="#e18a3b"
                    style="height: 60px; display: flex; align-items: center; justify-content: center"
                >
                    <span style="font-size: 40px">确认</span>
                </dv-button>
        </template>
    </Warning>
    
    <el-container class="layout-container-demo">
        <el-aside width="collapse">
            <el-scrollbar>
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    background-color="#141414"
                    text-color="#96969b"
                    :collapse-transition="true"
                >
                    <div>
                        <div style="height: 8px"></div>
                        <RouterLink to="/">
                            <el-menu-item index="1">
                                <el-icon size="30" style="margin-right: 20px"><icon-menu /></el-icon>
                                <template #title><span>主页</span></template>
                            </el-menu-item>
                        </RouterLink>

                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon size="30" style="margin-right: 20px"><LocationFilled /></el-icon>
                                <span>病房信息</span>
                            </template>
                            <el-menu-item-group style="margin-top: -10px">
                                <dv-border-box10>
                                    <RouterLink :to="{ path: '/person_info', query: { room: 101 } }">
                                        <el-menu-item index="1-1" style="color: rgb(255 255 255 / 82%)">101 号病房</el-menu-item>
                                    </RouterLink>
                                    <RouterLink :to="{ path: '/person_info', query: { room: 102 } }">
                                        <el-menu-item index="1-2" style="color: rgb(255 255 255 / 82%)">102 号病房</el-menu-item>
                                    </RouterLink>
                                    <RouterLink :to="{ path: '/person_info', query: { room: 103 } }">
                                        <el-menu-item index="1-3" style="color: rgb(255 255 255 / 82%)">103 号病房</el-menu-item>
                                    </RouterLink>
                                    <RouterLink :to="{ path: '/person_info', query: { room: 104 } }">
                                        <el-menu-item index="1-4" style="color: rgb(255 255 255 / 82%)">104 号病房</el-menu-item>
                                    </RouterLink>
                                </dv-border-box10>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <RouterLink to="/health_record">
                            <el-menu-item index="3">
                                <el-icon size="30" style="margin-right: 20px"><PieChart /></el-icon>
                                <template #title>个人档案</template>
                            </el-menu-item>
                        </RouterLink>
                        <RouterLink to="/paras">
                            <el-menu-item index="4">
                                <el-icon size="30" style="margin-right: 20px"><Setting /></el-icon>
                                <template #title>参数配置</template>
                            </el-menu-item>
                        </RouterLink>
                        <RouterLink to="/logs">
                            <el-menu-item index="5">
                                <el-icon size="30" style="margin-right: 20px"><List /></el-icon>
                                <template #title>监测日志</template>
                            </el-menu-item>
                        </RouterLink>
                    </div>
                    <div>
                        <el-menu-item @click="isCollapse = !isCollapse">
                            <el-icon size="30" style="margin-right: 20px">
                                <ArrowRightBold v-if="isCollapse" />
                                <ArrowLeftBold v-else />
                            </el-icon>
                            <template #title>{{ isCollapse ? '展开' : '收起' }}</template>
                        </el-menu-item>
                        <RouterLink to="/settings" @click="handleLeftClick" @contextmenu.prevent="handleRightClick">
                            <el-menu-item index="6">
                                <el-icon size="30" style="margin-right: 20px"><Operation /></el-icon>
                                <template #title>设置</template>
                            </el-menu-item>
                        </RouterLink>
                    </div>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-main>
                <RouterView :key="$route.fullPath" />
            </el-main>
        </el-container>
    </el-container>
</template>

<style>
.el-menu-vertical-demo {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /* color: #96969b; */
}
.el-dialog {
    --el-bg-color: #010101 !important;
    border: azure 1px solid;
}
</style>

<style scoped>
.el-menu-item.is-active > div > i > svg {
    filter: drop-shadow(2px 2px 6px #409eff);
}
.el-menu-item-group .el-menu-item:hover {
    background-color: rgb(25 48 113 / 52%);
}
</style>
