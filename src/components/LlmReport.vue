<template>
    <el-row>
        <el-col style="font-size: 25px; text-align: center;">用户健康报告单</el-col>
    </el-row>
    <el-row class="compact">
        <el-col :span="8"><span class="bold-font">病人编号</span>: {{ 'P3591' }}</el-col>
        <el-col :span="8"><span class="bold-font">报告编号</span>: {{ 'UCT20240623' }}</el-col>
        <el-col :span="8"><span class="bold-font">报告生成日期</span>: {{ '2024/06/23' }}</el-col>
    </el-row>
    <el-divider/>
    <el-row class="compact">
        <el-col :span="6"><span class="bold-font">姓名</span>: {{ 'AAA' }}</el-col>
        <el-col :span="6"><span class="bold-font">性别</span>: {{ '男' }}</el-col>
        <el-col :span="6"><span class="bold-font">年龄</span>: {{ '78岁' }}</el-col>
        <el-col :span="6"><span class="bold-font">主治医生</span>: {{ '李医生' }}</el-col>
    </el-row>
    <el-row>
        <el-col :span="6"><span class="bold-font">病房</span>: {{ '101室' }}</el-col>
        <el-col :span="6"><span class="bold-font">床号</span>: {{ '01号' }}</el-col>
        <el-col :span="6"><span class="bold-font">住院天数</span>: {{ '12' }}</el-col>
        <el-col :span="6" v-if="llmJson"><span class="bold-font">AI诊断</span>: {{ llmJson.possible_disease}}</el-col>
    </el-row>
    <el-divider />
    <el-carousel :loop="false" indicator-position="outside" motion-blur height="auto">
        <el-carousel-item name="page1" style="height: 500px">
            <el-row style="margin:-10px 0 -20px">
                <el-col :span="24" style="display: flex; justify-content: center">
                    <img src="/image.png" width="90%" style="filter: drop-shadow(#9cc0c67a 0px 0px 20px);">
                </el-col>
            </el-row>
            <el-row :gutter="24" style="font-size: 24px; color:#fff">
                <el-col :span="8">
                    <dv-border-box11 ref="dvBorder1" title="胸&#12288;痛">
                        <div class="status"
                        :class="{ risk: item.signs.status && item.signs.status['chestPain'] != 0 }">
                            {{ mapStatus(item.signs.status)[0] }}
                        </div>
                    </dv-border-box11>
                </el-col>
                <el-col :span="8">
                    <dv-border-box11 ref="dvBorder2" title="心绞痛">
                        <div class="status"
                        :class="{ risk: item.signs.status && item.signs.status['exerciseAngina'] != 0 }">
                            {{ mapStatus(item.signs.status)[1] }}
                        </div>
                    </dv-border-box11>
                </el-col>
                <el-col :span="8">
                    <dv-border-box11 ref="dvBorder3" title="心脏病">
                        <div class="status"
                        :class="{ risk: item.signs.status && item.signs.status['heartDisease'] != 0 }">
                            {{ mapStatus(item.signs.status)[2] }}
                        </div>
                    </dv-border-box11>
                </el-col>
            </el-row>
        </el-carousel-item>
        <el-carousel-item name="page2" class="container" style="height: 650px; background-image: url('/image3.png'); background-size: 100% 100%;">
            <el-card body-class="page-card" id="span1" v-if="llmJson"><span><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600;" content-position="left">HEART RATE</el-divider>
                患者的心率处于[心率区间]。正常成年人的心率通常在60至100次/分钟之间。根据患者的心率数据，我们发现{{llmJson.hrAnalyze}} [可能包括心率过快、过慢、不规律等情况]。建议患者在日常生活中避免过度劳累和情绪波动，并密切关注心率变化。如有必要，可以考虑进一步的心电图监测或咨询心脏专家。
            <el-divider style="margin: 10px 0 -3px 0"/></span></el-card>
            <el-card body-class="page-card" id="span2" v-if="llmJson"><span><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600;" content-position="right">RESIRATORY RATE</el-divider>
                患者的呼吸率在[呼吸率区间]。成人的正常呼吸率一般在12至20次/分钟之间。根据患者的呼吸率数据，我们发现{{llmJson.rrAnalyze}} [可能包括呼吸过快、过慢、浅表等情况]。建议患者保持良好的呼吸习惯，避免吸入有害气体和粉尘，并及时就医处理任何呼吸不适症状。
            <el-divider style="margin: 10px 0 -3px 0"/></span></el-card>
            <el-card body-class="page-card" id="span3" v-if="llmJson"><span><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600;" content-position="left">BLOOD PRESSURE</el-divider>
                最新的血压测量显示收缩压为[收缩压区间] mmHg，舒张压为[舒张压区间] mmHg。成人的理想血压应维持在收缩压120 mmHg以下和舒张压80mmHg以下。根据患者的血压数据，我们发现{{llmJson.bpAnalyze}} [可能包括高血压、低血压等情况]。建议患者采取健康的生活方式，如控制饮食、适度运动、减少饮酒和戒烟，以维持血压在正常范围内。对于高血压患者，可能需要进一步的药物治疗和定期监测。
            <el-divider style="margin: 10px 0 -3px 0"/></span></el-card>
            <el-card body-class="page-card" id="span4" v-if="llmJson"><span><el-divider style="margin: -3px 0 15px 0; background-color: #9cc0c600;" contentf-position="right">ECG</el-divider>
                最新的ECG数据显示[ECG状态分析结果]。ECG是评估心脏健康的重要工具，它可以检测心律失常、心肌缺血、心肌梗死等情况。根据患者的ECG数据分析，我们发现[可能包括正常的窦性心律、房颤、心房扑动等情况]。建议患者在医生的指导下进行进一步的心电图监测和评估，以确定是否需要采取进一步的治疗措施。
            <el-divider style="margin: 10px 0 -3px 0"/></span></el-card>
        </el-carousel-item>
    </el-carousel>
    <el-row>
        此诊断报告仅供参考，具体的治疗和管理方案应由专业医务人员根据患者个体情况进行制定。如果需要进一步的咨询或有任何疑问，请及时联系医疗专家。
    </el-row>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { defineEmits } from 'vue'
import type { Status } from './interface';
import OpenAI from 'openai';

// 存放大模型返回的json数据
const llmJson = ref([]);

// 双向绑定runFlag限制一次只请求一次kimi
let props = defineProps({
    item:{},
    runFlag:{}
})

let $emit = defineEmits(['update:runFlag'])

const changeFlag = () => {
    const Flag = false
    $emit('update:runFlag', Flag)
  }

// kimi api
const client = new OpenAI({
    apiKey: "sk-pdXAkGGIaE5mif4GDC7T9k4faBgsT9sP2V3Ba1VpnDe5S98Y",  
    dangerouslyAllowBrowser: true,  
    baseURL: "https://api.moonshot.cn/v1",
});
 
let history = [{"role": "system", "content": "你是我的智能医疗助理，负责回答各项医疗问题。"},
{"role": "system", "content": "回答用json格式的字符串表示，且json的key用英文表示，value用中文表示，例如:\"treatment\": '治疗手段', \"possible_disease\": '可能的疾病' "},
{"role": "system", "content": "json还需包括如下字段，\"hrAnalyze\": '心率状态分析', \"rrAnalyze\": '呼吸率状态分析', \"bpAnalyze\": '血压状态分析'"},
]
 
async function chat(prompt) {
    history = history.concat([{
        role: "user", content: prompt
    }])
    const completion = await client.chat.completions.create({
        model: "moonshot-v1-8k",         
        messages: history,
    });
    history = history.concat(completion.choices[0].message)
    return completion.choices[0].message.content;
}

function promptBuilder(heartRate: int, respireRate: int, SBP: int, DBP: int, pauseCount: int, isNormalECG: Boolean) {
    let ecgString = '';
    let pauseString = '';
    let hrString = `最大静息心率${heartRate.toString()}次每分钟,`
    let rrString = `呼吸率${respireRate.toString()}次每分钟,`
    let sbpString = `收缩压150mmHg,`
    let dbpString = `舒张压100mmHg,`
    let endString = `分析一下他可能患有什么疾病（仅限最可能的一条），分析一下当前心率状态、呼吸率状态、血压状态，及如何治疗。`
    if (isNormalECG)
    {
        ecgString = `我的一位患者心电图数据表现正常,`
    }
    else{
        ecgString = `我的一位患者心电图数据表现异常,`
    }
    if (pauseCount)
    {
        pauseString = `伴有每晚${pauseCount.toString()}次的呼吸暂停,`
    }
    return ecgString + hrString + rrString + sbpString + dbpString + pauseString + endString
}
// "我的一位患者心电图数据表现异常，最大静息心率120次每分钟，呼吸率30次每分钟，收缩压150mmHg，舒张压100mmHg，伴有每晚10次的呼吸暂停，分析一下他可能患有什么疾病（仅限最可能的一条），分析一下当前心率状态、呼吸率状态、血压状态，及如何治疗。"
async function main(heartRate: int, respireRate: int, SBP: int, DBP: int, pauseCount: int, isNormalECG: Boolean) {
    console.log(props.runFlag)
    if (props.runFlag)
    {
        await changeFlag();
        let reply = await chat(promptBuilder(heartRate, respireRate, SBP, DBP, pauseCount, isNormalECG))
        console.log(reply);
        let jsonReply;
        try {
            jsonReply = JSON.parse(reply)
        } catch (error) {
            
        }
        console.log(jsonReply);
        console.log(history); 
        // runFlag.value = false; 
        return jsonReply;
    }
    
}

onMounted(async () => {
    llmJson.value = await main(120, 30, 150, 100, 10, false);
    console.log(llmJson)
});
// defineProps(['item'])


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


</script>

<style scoped>
.bold-font{
    font-weight: bold; 
    color:#e6e6e6;
}

.status {
    display: flex; 
    padding-top: 65px; 
    height: 130px; 
    width: 100%; 
    justify-content: center;
}

.compact{
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
    background-color: #001B32;
    border: 1px solid #bec9f9;
}

/* Top left corner */
.container #span1 {
    top: 10px;
    left: 10px;
    width: 25%; font-size: 15px;
}

/* Top right corner */
.container #span2 {
    top: 10px;
    right: 10px;
    width: 25%; font-size: 15px;
}

/* Bottom left corner */
.container #span3 {
    bottom: 10px;
    left: 10px;
    width: 25%; font-size: 15px;
}

/* Bottom right corner */
.container #span4 {
    bottom: 10px;
    right: 10px;
    width: 25%; font-size: 15px;
}
</style>

<style>
@import url('../assets/healthrecord.css');
.el-divider__text {
    background-color: #00000000;
    color: #cfc5a7;
}
</style>