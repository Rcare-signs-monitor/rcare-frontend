<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import {
    Menu as IconMenu,
    PieChart,
    Setting,
    ArrowRightBold,
    ArrowLeftBold,
    List,
    Operation,
    LocationFilled
} from '@element-plus/icons-vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const isCollapse = ref(true)
const activeIndex = ref('1')

const route = useRoute()
watch(
    () => route.path,
    (newValue, preValue) => {
        // 修复侧边 active 与路径不同步
        // console.log(newValue);
        const pathList = ['', '/', '/person_info', '/health_record', '/paras', '/logs', '/settings']
        activeIndex.value = pathList.findIndex((item) => item === newValue).toString()
    }
)
</script>

<template>
    <el-container class="layout-container-demo">
        <el-aside width="collapse">
            <el-scrollbar>
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    background-color="#F0F0F2"
                    text-color="#96969b"
                    :collapse-transition="true"
                >
                    <div>
                        <div style="height: 8px"></div>
                        <RouterLink to="/">
                            <el-menu-item index="1">
                                <el-icon size="30"><icon-menu /></el-icon>
                                <template #title>首页</template>
                            </el-menu-item>
                        </RouterLink>
                        <RouterLink to="/person_info">
                            <el-menu-item index="2">
                                <el-icon size="30"><LocationFilled /></el-icon>
                                <template #title>个人信息</template>
                            </el-menu-item>
                        </RouterLink>
                        <RouterLink to="/health_record">
                            <el-menu-item index="3">
                                <el-icon size="30"><PieChart /></el-icon>
                                <template #title>健康档案</template>
                            </el-menu-item>
                        </RouterLink>
                        <RouterLink to="/paras">
                            <el-menu-item index="4">
                                <el-icon size="30"><Setting /></el-icon>
                                <template #title>参数配置</template>
                            </el-menu-item>
                        </RouterLink>
                        <RouterLink to="/logs">
                            <el-menu-item index="5">
                                <el-icon size="30"><List /></el-icon>
                                <template #title>监测日志</template>
                            </el-menu-item>
                        </RouterLink>
                    </div>
                    <div>
                        <el-menu-item @click="isCollapse = !isCollapse">
                            <el-icon size="30">
                                <ArrowRightBold v-if="isCollapse" />
                                <ArrowLeftBold v-else />
                            </el-icon>
                            <template #title>{{ isCollapse ? '展开' : '收起' }}</template>
                        </el-menu-item>
                        <RouterLink to="/settings">
                            <el-menu-item index="6">
                                <el-icon size="30"><Operation /></el-icon>
                                <template #title>设置</template>
                            </el-menu-item>
                        </RouterLink>
                    </div>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-main>
                <RouterView />
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
</style>
