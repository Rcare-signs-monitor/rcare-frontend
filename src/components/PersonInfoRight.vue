<template>
    <dv-border-box6 style="background-color: #091222; border-radius: 10px; padding: 10px">
        <el-row style="height: 110px; color: rgb(199 202 212)">
            <el-col :span="11"
                ><dv-border-box5>
                    <div style="display: flex; padding: 25px">
                        <div style="width: fit-content">
                            <div><span style="color: #2ddce4">住院天数：</span>{{ item.info.day }}</div>
                            <div><span style="color: #52c5e9">诊断结果：</span>{{ item.info.result }}</div>
                            <div><span style="color: #7aacef">过敏信息：</span>{{ item.info.allergy }}</div>
                        </div>
                        <div style="display: flex; flex-grow: 1"></div>
                        <!-- <div style="padding-right: 30px"></div> -->
                        <div style="padding: 0 20px 40px 0; display: flex; align-items: center; font-size: 20px">
                            <span style="color: #a790f5">病情</span>
                            <el-icon :size="22" style="margin-left: 7px; color: #148ac8"><Postcard /></el-icon>
                        </div>
                    </div> </dv-border-box5
            ></el-col>
            <el-col :span="13"
                ><dv-border-box5 :reverse="true">
                    <div style="display: flex; padding: 25px">
                        <div style="padding: 40px 0 0 30px; display: flex; align-items: center; font-size: 20px">
                            <el-icon :size="20" style="margin-right: 7px; color: #148ac8"><Grid /></el-icon>
                            <span style="color: #fc7cad">病历</span>
                        </div>
                        <div style="display: flex; flex-grow: 1"></div>
                        <div>
                            <div><span style="color: #feb768">治疗手段：</span>{{ item.info.healing }}</div>
                            <div><span style="color: #fea77b">联系方式：</span>{{ item.info.contact }}</div>
                            <div><span style="color: #fd9095">注意事项：</span>{{ item.info.attention }}</div>
                        </div>
                    </div>
                </dv-border-box5></el-col
            >
        </el-row>
        <el-row>
            <Echarts :option="getLineOption(item.signs.heart, 'heart', false, 'blue')" :style="{ height: '15vh', width: '58vw' }" :refresh="1000" />
        </el-row>
        <el-row>
            <Echarts
                :option="getLineOption(item.signs.respire, 'respire', true, 'green')"
                :style="{ height: '15vh', width: '58vw' }"
                :refresh="1000"
            />
        </el-row>
        <el-row>
            <Echarts :option="getLineOption(item.signs.ecg, 'ecg', true, 'yellow')" :style="{ height: '15vh', width: '58vw' }" :refresh="1000" />
        </el-row>
        <el-row>
            <Echarts :option="getDoubleLineOption(item.signs.sbp, item.signs.dbp)" :style="{ height: '15vh', width: '58vw' }" :refresh="1000" />
        </el-row>
    </dv-border-box6>
</template>

<script setup lang="ts">
import { Grid, Postcard } from '@element-plus/icons-vue'
import { getLineOption, getDoubleLineOption } from '@/components/getTestData'
defineProps(['item'])

import Echarts from '@/components/Recharts.vue'
</script>
