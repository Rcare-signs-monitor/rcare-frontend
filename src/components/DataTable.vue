<template>
    <div class="dv-border-box-1">
        <svg width="150px" height="150px" class="left-top dv-border" style="margin: -8px 0 0 -8px">
            <polygon
                fill="#4fd2dd"
                points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
            >
                <animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
            <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8">
                <animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
            <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54">
                <animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
        </svg>
        <svg width="150px" height="150px" class="right-top dv-border" style="margin: -8px -8px 0 0">
            <polygon
                fill="#4fd2dd"
                points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
            >
                <animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
            <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8">
                <animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
            <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54">
                <animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
        </svg>
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
        <svg width="150px" height="150px" class="left-bottom dv-border" style="margin: 0 0 -8px -8px">
            <polygon
                fill="#4fd2dd"
                points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
            >
                <animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
            <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8">
                <animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
            <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54">
                <animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
        </svg>
        <svg width="150px" height="150px" class="right-bottom dv-border" style="margin: 0 -8px -8px 0">
            <polygon
                fill="#4fd2dd"
                points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
            >
                <animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
            <polygon fill="#235fa7" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8">
                <animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
            <polygon fill="#4fd2dd" points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54">
                <animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </polygon>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps(['table'])
</script>
