<template>
    <el-row>
        <el-col style="font-size: 25px; text-align: center">用户健康报告单</el-col>
    </el-row>
    <el-row class="compact">
        <el-col :span="8"><span class="bold-font">病人编号</span>: {{ 'P3591' }}</el-col>
        <el-col :span="8"><span class="bold-font">报告编号</span>: {{ 'UCT20240623' }}</el-col>
        <el-col :span="8"><span class="bold-font">报告生成日期</span>: {{ (new Date()).toLocaleDateString() }}</el-col>
    </el-row>
    <el-divider />
    <el-row class="compact">
        <el-col :span="6"><span class="bold-font">姓名</span>: {{ props.item.info.name }}</el-col>
        <el-col :span="6"><span class="bold-font">性别</span>: {{ props.item.info.gender==1?'男':'女' }}</el-col>
        <el-col :span="6"><span class="bold-font">年龄</span>: {{ props.item.info.age }} 岁</el-col>
        <el-col :span="6"><span class="bold-font">主治医生</span>: {{ props.item.info.doctor }}</el-col>
    </el-row>
    <el-row>
        <el-col :span="6"><span class="bold-font">病房</span>: {{ props.item.info.room }} 室</el-col>
        <el-col :span="6"><span class="bold-font">床号</span>: 0{{ props.item.info.bed }} 床</el-col>
        <el-col :span="6"><span class="bold-font">住院天数</span>: {{ '12' }} 天</el-col>
        <el-col :span="6" v-if="llmJson"><span class="bold-font">AI诊断</span>: {{ llmJson.possible_disease }}</el-col>
    </el-row>
    <el-divider />
    <el-carousel :loop="false" indicator-position="outside" height="auto">
        <el-carousel-item name="page1" style="height: 500px">
            <el-row style="margin: -10px 0 -20px">
                <el-col :span="24" style="display: flex; justify-content: center">
                    <img src="/image.webp" width="90%" style="filter: drop-shadow(#9cc0c67a 0px 0px 20px)" />
                </el-col>
            </el-row>
            <el-row :gutter="24" style="font-size: 24px; color: #fff">
                <el-col :span="8">
                    <dv-border-box11 ref="dvBorder1" title="胸&#12288;痛">
                        <div class="status" :class="{ risk: props.item.signs && props.item.signs.status['chestPain'] != 0 }">
                            {{ props.item.signs?mapStatus(props.item.signs.status)[0]:"-" }}
                        </div>
                    </dv-border-box11>
                </el-col>
                <el-col :span="8">
                    <dv-border-box11 ref="dvBorder2" title="心绞痛">
                        <div class="status" :class="{ risk: props.item.signs && props.item.signs.status['exerciseAngina'] != 0 }">
                            {{ props.item.signs?mapStatus(props.item.signs.status)[1]:"-" }}
                        </div>
                    </dv-border-box11>
                </el-col>
                <el-col :span="8">
                    <dv-border-box11 ref="dvBorder3" title="心脏病">
                        <div class="status" :class="{ risk: props.item.signs && props.item.signs.status['heartDisease'] != 0 }">
                            {{ props.item.signs?mapStatus(props.item.signs.status)[2]:"-" }}
                        </div>
                    </dv-border-box11>
                </el-col>
            </el-row>
        </el-carousel-item>
        <el-carousel-item name="page2" class="container" style="height: 650px; background-image: url('/image3.webp'); background-size: 100% 100%">
            <el-card body-class="page-card" id="span1" v-if="llmJson"
                ><span
                    ><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600" content-position="left">HEART RATE</el-divider>
                    患者的心率处于 {{ (llmJson['heart']-10).toFixed(2) }}-{{ (llmJson['heart']+12.34).toFixed(2) }}。正常成年人的心率通常在60至100次/分钟之间。根据患者的心率数据，我们发现{{
                        llmJson.hrAnalyze
                    }}
                    [可能包括心率过快、过慢、不规律等情况]。建议患者在日常生活中避免过度劳累和情绪波动，并密切关注心率变化。如有必要，可以考虑进一步的心电图监测或咨询心脏专家。
                    <el-divider style="margin: 10px 0 -3px 0" /></span
            ></el-card>
            <el-card body-class="page-card" id="span2" v-if="llmJson"
                ><span
                    ><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600" content-position="right">RESIRATORY RATE</el-divider>
                    患者的呼吸率在 {{ (llmJson['respire']-10).toFixed(2) }}-{{ (llmJson['respire']+12.34).toFixed(2) }}。成人的正常呼吸率一般在12至20次/分钟之间。根据患者的呼吸率数据，我们发现{{
                        llmJson.rrAnalyze
                    }}
                    [可能包括呼吸过快、过慢、浅表等情况]。建议患者保持良好的呼吸习惯，避免吸入有害气体和粉尘，并及时就医处理任何呼吸不适症状。
                    <el-divider style="margin: 10px 0 -3px 0" /></span
            ></el-card>
            <el-card body-class="page-card" id="span3" v-if="llmJson"
                ><span
                    ><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600" content-position="left">BLOOD PRESSURE</el-divider>
                    最新的血压测量显示收缩压为 {{ (llmJson['sbp']-10).toFixed(2) }}-{{ (llmJson['sbp']+12.34).toFixed(2) }} mmHg，舒张压为 {{ (llmJson['dbp']-10).toFixed(2) }}-{{ (llmJson['dbp']+12.34).toFixed(2) }} mmHg。
                    成人的理想血压应维持在收缩压120mmHg以下和舒张压80mmHg以下。根据患者的血压数据，我们发现{{
                        llmJson.bpAnalyze
                    }}
                    [可能包括高血压、低血压等情况]。建议患者采取健康的生活方式，如控制饮食、适度运动、减少饮酒和戒烟，以维持血压在正常范围内。对于高血压患者，可能需要进一步的药物治疗和定期监测。
                    <el-divider style="margin: 10px 0 -3px 0" /></span
            ></el-card>
            <el-card body-class="page-card" id="span4" v-if="llmJson"
                ><span
                    ><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600" contentf-position="right">ECG</el-divider>
                    最新的ECG数据显示[ECG状态分析结果]。ECG是评估心脏健康的重要工具，它可以检测心律失常、心肌缺血、心肌梗死等情况。根据患者的ECG数据分析，我们发现[可能包括正常的窦性心律、房颤、心房扑动等情况]。建议患者在医生的指导下进行进一步的心电图监测和评估，以确定是否需要采取进一步的治疗措施。
                    <el-divider style="margin: 10px 0 -3px 0" /></span
            ></el-card>
        </el-carousel-item>
    </el-carousel>
    <el-row>
        此诊断报告仅供参考，具体的治疗和管理方案应由专业医务人员根据患者个体情况进行制定。如果需要进一步的咨询或有任何疑问，请及时联系医疗专家。
    </el-row>
</template>

<script setup lang="ts">
import { BorderBox11 as DvBorderBox11 } from '@kjgl77/datav-vue3'
import type { Status } from './interface'
import { ref, watch } from 'vue';

let props = defineProps(['item', 'llm'])

const tableStaus: { [key: string]: string[] } = {
    chestPain: [
        '无显著不适或症状', // asymptomatic 无症状
        '非心绞痛型胸痛', // non-anginal 非心绞痛型胸痛
        '非典型心绞痛型胸痛', // atypical angina 非典型心绞痛型胸痛
        '典型心绞痛型胸痛' // typical angina 典型心绞痛型胸痛
    ],
    exerciseAngina: [
        '无显著不适或症状', // 无症状
        '运动引起的心绞痛' // 运动引起的心绞痛
    ],
    heartDisease: [
        '无显著不适或症状', // 无症状
        '冠状动脉心脏病' // 心脏病
    ]
}
const mapStatus = (status: Status) => {
    if (!status) return ['无症状', '无症状', '无症状']
    return Object.entries(status).map(([key, value]) => tableStaus[key][value])
}

const llmJson = ref()
watch(props, (nweProps)=>{
    llmJson.value = nweProps.llm
})
</script>

<style scoped>
.bold-font {
    font-weight: bold;
    color: #e6e6e6;
}

.status {
    display: flex;
    padding-top: 65px;
    height: 130px;
    width: 100%;
    justify-content: center;
}

.compact {
    margin: -20px 0;
}

/* Common styles for the parent div */
.container {
    position: relative; /* Ensure child spans are positioned relative to this */
    width: 100%;
    height: 100vh; /* Example: full viewport height */
    padding: 20px; /* Example: add padding to contain spans */
}

/* Common styles for all spans */
.container .el-card {
    position: absolute;
    background-color: #001b32;
    border: 1px solid #bec9f9;
}

/* Top left corner */
.container #span1 {
    top: 10px;
    left: 10px;
    width: 25%;
    font-size: 15px;
}

/* Top right corner */
.container #span2 {
    top: 10px;
    right: 10px;
    width: 25%;
    font-size: 15px;
}

/* Bottom left corner */
.container #span3 {
    bottom: 10px;
    left: 10px;
    width: 25%;
    font-size: 15px;
}

/* Bottom right corner */
.container #span4 {
    bottom: 10px;
    right: 10px;
    width: 25%;
    font-size: 15px;
}
</style>

<style>
@import url('../assets/healthrecord.css');
.el-divider__text {
    background-color: #00000000;
    color: #cfc5a7;
}
</style>
