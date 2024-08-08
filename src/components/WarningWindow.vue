<script setup lang="ts">
import { BorderBox9 as DvBorderBox9 } from '@kjgl77/datav-vue3'
</script>

<template>
    <el-dialog width="700" height="500" align-center center :show-close="false">
        <template #header>
            <div class="my-header">
                <img src="../assets/warning.png" style="width: 100%" />
            </div>
        </template>
        <dv-border-box9 :color="['#B00302', '#E18A3B']">
            <div class="body">
                <slot name="body"></slot>
            </div>
        </dv-border-box9>

        <template #footer>
            <div class="dialog-footer">
                <slot name="button"></slot>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
/* 定义闪烁动画 */
@keyframes blink {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}

.my-header img {
    width: 100%;
    animation: blink 1s infinite;
}

.body {
    height: 220px;
    margin-top: -10px;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(255 72 74);
}
</style>
