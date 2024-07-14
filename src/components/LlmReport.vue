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
        <el-col :span="6" v-if="llmJson.possible_disease"><span class="bold-font">AI诊断</span>: {{ llmJson.possible_disease }}</el-col>
    </el-row>
    <el-divider />
    <el-carousel :loop="false" indicator-position="outside" height="auto">
        <el-carousel-item name="page1" style="display: flex; flex-direction: column; justify-content: center; ">
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
        <el-carousel-item name="page2" class="container" style="background-image: url('/image3.webp'); background-size: 100% 100%">
            <el-card body-class="page-card" id="span1" v-if="llmJson.hrAnalyze"
                ><span
                    ><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600" content-position="left">HEART RATE</el-divider>
                    <span class="result" @click="open(llmJson.hrAnalyze)">
                        &#12288;&#12288;{{ llmJson.hrAnalyze }}
                    </span>
                    <el-divider style="margin: 10px 0 -3px 0" /></span
            ></el-card>
            <el-card body-class="page-card" id="span2" v-if="llmJson.rrAnalyze"
                ><span
                    ><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600" content-position="right">RESIRATORY RATE</el-divider>
                    <span class="result" @click="open(llmJson.rrAnalyze)">
                        &#12288;&#12288;{{ llmJson.rrAnalyze }}
                    </span>
                    <el-divider style="margin: 10px 0 -3px 0" /></span
            ></el-card>
            <el-card body-class="page-card" id="span3" v-if="llmJson.bpAnalyze"
                ><span
                    ><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600" content-position="left">BLOOD PRESSURE</el-divider>
                    <span class="result" @click="open(llmJson.bpAnalyze)">
                        &#12288;&#12288;{{ llmJson.bpAnalyze }}
                    </span>
                    <el-divider style="margin: 10px 0 -3px 0" /></span
            ></el-card>
            <el-card body-class="page-card" id="span4" v-if="llmJson.ecgAnalyze"
                ><span
                    ><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600" contentf-position="right">ECG</el-divider>
                    <span class="result" @click="open(llmJson.ecgAnalyze)">
                        &#12288;&#12288;{{ llmJson.ecgAnalyze }}
                    </span>
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
import { ElMessageBox } from 'element-plus'
import type { Status } from './interface'
import { ref, watch } from 'vue';

let props = defineProps(['item', 'llm'])

// const props = defineProps<{
//     item: any,
//     llm: {
//         possible_disease?: string,
//         hrAnalyze?: string,
//         rrAnalyze?: string,
//         bpAnalyze?: string
//     }
// }>()

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

const llmJson = ref({
    hrAnalyze: "",
    bpAnalyze: "",
    rrAnalyze: "",
    ecgAnalyze: "",
    possible_disease: ""
});

watch(props, (newProps)=>{
    llmJson.value.possible_disease = newProps.llm.possible_disease
    llmJson.value.hrAnalyze = newProps.llm.hrAnalyze
    llmJson.value.bpAnalyze = newProps.llm.bpAnalyze
    llmJson.value.rrAnalyze = newProps.llm.rrAnalyze
    llmJson.value.ecgAnalyze = newProps.llm.ecgAnalyze
})

const open = (text: string) => {
    ElMessageBox.alert(`<span style="font-size: 30px; line-height: 1.5em;">&#12288;&#12288;${text}</span>`,  {
    confirmButtonText: 'OK',
    callback: () => {},
    dangerouslyUseHTMLString: true,
  })
}
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
    padding: 20px; /* Example: add padding to contain spans */
    width: 100%;
    height: 0;
    padding-bottom: 45%; /* 高度设置为宽度的一半 */
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

.result {
    display: block;
    max-height: 10.5em; /* 设置行高的倍数来限制行数 */
    overflow: hidden;
    position: relative;
    line-height: 1.5em; /* 设置行高 */
}

.result::before {
    content: "|展开|";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: right;
    color: #FFBBA7;
    background: #001B32;
}

.result::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 1.5em; /* 设置行高 */
    position: absolute;
    bottom: 0;
    left: 0;
}
</style>

<style>
@import url('../assets/healthrecord.css');
.el-divider__text {
    background-color: #00000000;
    color: #cfc5a7;
}

.el-message-box {
    max-width: 50%;
    border: 2px solid #F0B481;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.36), 0px 8px 20px #FEFBF1;
}
</style>
