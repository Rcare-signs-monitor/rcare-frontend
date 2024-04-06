<template>
    <el-container>
        <el-header>
            <el-page-header @back="onBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 病人信息 </span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)"> Personal Information </span>
                    </div>
                </template>
                <el-descriptions size="large">
                    <el-descriptions-item label="当前病房">
                        <el-tag size="small">{{ query.room }} 号</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="病床占用">
                        <el-tag size="small">{{ data.length }} / 6</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
                <template #extra>
                    <el-row>
                        <el-button plain :icon="Search" @click="dialog = true">条件查询成员列表</el-button>
                        <el-button plain :icon="Edit" @click="dialog2 = true">新增成员信息</el-button>
                    </el-row>
                </template>
            </el-page-header>
        </el-header>

        <el-main>
            <el-tabs v-model="activeName[item.info.id]" v-for="(item, idx) in data" :id="item.info.id" :key="idx">
                <el-tab-pane label="生命体征信息" name="first">
                    <el-row v-if="data.length !== 0" :gutter="24" class="main-page">
                        <el-col :span="8">
                            <!-- <el-card body-style="padding: 30px;"> -->
                            <dv-border-box12 style="padding: 30px">
                                <el-row style="margin-bottom: 15px">
                                    <span>
                                        <dv-border-box8>
                                            <el-avatar
                                                style="height: 100px; width: 100px; margin: 5px; opacity: 0.7"
                                                shape="square"
                                                :src="item.info.image ? item.info.image : '/avatar.png'"
                                            />
                                        </dv-border-box8>
                                    </span>
                                    <span style="margin-left: 30px; color: white">
                                        <div style="font-size: 20px; font-weight: bold; display: flex; align-items: center">
                                            {{ item.info.name }}
                                            <el-tag type="success" style="margin-left: 20px">{{ item.info.bed }} 号床</el-tag>
                                        </div>
                                        <div>性别：{{ item.info.gender == 1 ? '男' : '女' }}</div>
                                        <div>年龄：{{ item.info.age }}岁</div>
                                        <div>主治医生：{{ item.info.doctor }}</div>
                                    </span>
                                    <span style="display: flex; flex-grow: 1"></span>
                                    <span style="width: 100px">
                                        <el-row>
                                            <el-col style="margin-bottom: 10px">
                                                <RouterLink :to="{ path: '/health_record', query: { id: item.info.id } }">
                                                    <dv-button :fontSize="13" style="width: 100%; margin-bottom: 5px">个人档案</dv-button>
                                                </RouterLink>
                                            </el-col>
                                            <el-col>
                                                <dv-button
                                                    :fontSize="13"
                                                    style="width: 100%; margin-bottom: 5px"
                                                    @click="setForm(item.info)"
                                                    border="Border6"
                                                    color="#615ea8"
                                                    >编辑信息</dv-button
                                                >
                                            </el-col>
                                        </el-row>
                                    </span>
                                </el-row>
                                <el-row :gutter="50">
                                    <el-col :span="24">
                                        <dv-border-box9 style="background-color: #13161b">
                                            <div style="display: flex; align-items: center; justify-content: space-evenly; height: 14vh">
                                                <span style="display: flex; align-items: center">
                                                    <img class="sign-icon" src="../assets/xinlv.svg" style="margin-right: 20px" />
                                                    <span style="font-size: 18px">
                                                        心率
                                                        <el-tooltip content="参考值: 60-120次/分" placement="top">
                                                            <el-icon style="top: -10px; left: -5px; opacity: 0.5" :size="12">
                                                                <Warning />
                                                            </el-icon>
                                                        </el-tooltip>
                                                    </span>
                                                </span>
                                                <span>
                                                    <span
                                                        style="font-size: 25px"
                                                        :class="[
                                                            item.signs.heart &&
                                                            (item.signs.heart[item.signs.heart.length - 1].data > 120 ||
                                                                item.signs.heart[item.signs.heart.length - 1].data < 60)
                                                                ? 'warning-font'
                                                                : 'normal-font'
                                                        ]"
                                                    >
                                                        {{ item.signs.heart ? item.signs.heart[item.signs.heart.length - 1].data : 0 }} </span
                                                    >bpm
                                                </span>
                                            </div>
                                        </dv-border-box9>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="50">
                                    <el-col :span="24">
                                        <dv-border-box9 style="background-color: #13161b">
                                            <div style="display: flex; align-items: center; justify-content: space-evenly; height: 14vh">
                                                <span style="display: flex; align-items: center">
                                                    <img class="sign-icon" src="../assets/呼吸.svg" style="margin-right: 20px" />
                                                    <span style="font-size: 18px">
                                                        呼吸率
                                                        <el-tooltip content="参考值：12-27次/分" placement="top">
                                                            <el-icon style="top: -10px; left: -5px; opacity: 0.5" :size="12">
                                                                <Warning />
                                                            </el-icon>
                                                        </el-tooltip>
                                                    </span>
                                                </span>
                                                <span
                                                    ><span
                                                        style="font-size: 25px"
                                                        :class="[
                                                            item.signs.respire &&
                                                            (item.signs.respire[item.signs.respire.length - 1].data > 27 ||
                                                                item.signs.respire[item.signs.respire.length - 1].data < 12)
                                                                ? 'warning-font'
                                                                : 'normal-font'
                                                        ]"
                                                        >{{ item.signs.respire ? item.signs.respire[item.signs.respire.length - 1].data : 0 }}</span
                                                    >bpm</span
                                                >
                                            </div>
                                        </dv-border-box9>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="50">
                                    <el-col :span="24">
                                        <dv-border-box9 style="background-color: #13161b">
                                            <div style="display: flex; align-items: center; justify-content: space-evenly; height: 14vh">
                                                <span style="display: flex; align-items: center">
                                                    <img class="sign-icon" src="../assets/xinlv.svg" style="margin-right: 20px" />
                                                    <span style="font-size: 18px">
                                                        ECG
                                                        <el-tooltip content="参考值: 60-120次/分" placement="top">
                                                            <el-icon style="top: -10px; left: -5px; opacity: 0.5" :size="12">
                                                                <Warning />
                                                            </el-icon>
                                                        </el-tooltip>
                                                    </span>
                                                </span>
                                                <span>
                                                    <span
                                                        style="font-size: 25px"
                                                        :class="[
                                                            item.signs.ecg &&
                                                            (item.signs.ecg[item.signs.ecg.length - 1].data > 120 ||
                                                                item.signs.ecg[item.signs.ecg.length - 1].data < 60)
                                                                ? 'warning-font'
                                                                : 'normal-font'
                                                        ]"
                                                    >
                                                        {{ item.signs.ecg ? item.signs.ecg[item.signs.ecg.length - 1].data : 0 }} </span
                                                    >bpm
                                                </span>
                                            </div>
                                        </dv-border-box9>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="50">
                                    <el-col :span="24">
                                        <dv-border-box9 style="background-color: #13161b">
                                            <div style="display: flex; align-items: center; justify-content: space-evenly; height: 14vh">
                                                <span style="display: flex; align-items: center">
                                                    <img class="sign-icon" src="../assets/血压.svg" style="margin-right: 13px" />
                                                    <span style="font-size: 18px">
                                                        DBP / SBP
                                                        <el-tooltip content="参考值: 80-120 / 120-160" placement="top">
                                                            <el-icon style="top: -10px; left: -5px; opacity: 0.5" :size="12">
                                                                <Warning />
                                                            </el-icon>
                                                        </el-tooltip>
                                                    </span>
                                                </span>
                                                <span
                                                    ><span
                                                        style="font-size: 25px"
                                                        :class="[
                                                            item.signs.sbp &&
                                                            item.signs.dbp &&
                                                            (item.signs.sbp[item.signs.sbp.length - 1].data > 120 ||
                                                                item.signs.sbp[item.signs.sbp.length - 1].data < 80 ||
                                                                item.signs.dbp[item.signs.dbp.length - 1].data > 160 ||
                                                                item.signs.dbp[item.signs.dbp.length - 1].data < 120)
                                                                ? 'warning-font'
                                                                : 'normal-font'
                                                        ]"
                                                        >{{
                                                            item.signs && item.signs.dbp
                                                                ? `${item.signs.sbp[item.signs.sbp.length - 1].data} / ${item.signs.dbp[item.signs.dbp.length - 1].data}`
                                                                : '0 / 0'
                                                        }}</span
                                                    >mmHg</span
                                                >
                                            </div></dv-border-box9
                                        >
                                    </el-col>
                                </el-row>
                            </dv-border-box12>
                            <!-- </el-card> -->
                        </el-col>
                        <el-col :span="16">
                            <dv-border-box6 style="background-color: #091222; border-radius: 10px; padding: 10px">
                                <el-row style="height: 110px; color: rgb(199 202 212)">
                                    <el-col :span="13"
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
                                                    <span style="color: #a790f5">患者病历</span>
                                                    <el-icon :size="22" style="margin-left: 7px; color: #148ac8"><Postcard /></el-icon>
                                                </div>
                                            </div> </dv-border-box5
                                    ></el-col>
                                    <el-col :span="11"
                                        ><dv-border-box5 :reverse="true">
                                            <div style="display: flex; padding: 25px">
                                                <div style="padding: 40px 0 0 30px; display: flex; align-items: center; font-size: 20px">
                                                    <el-icon :size="20" style="margin-right: 7px; color: #148ac8"><Grid /></el-icon>
                                                    <span style="color: #fc7cad">病情预测</span>
                                                </div>
                                                <div style="display: flex; flex-grow: 1"></div>
                                                <div>
                                                    <div><span style="color: #feb768">胸&#12288;痛：</span>{{ mapStatus(item.signs.status)[0] }}</div>
                                                    <div><span style="color: #fea77b">心绞痛：</span>{{ mapStatus(item.signs.status)[1] }}</div>
                                                    <div><span style="color: #fd9095">心脏病：</span>{{ mapStatus(item.signs.status)[2] }}</div>
                                                </div>
                                            </div>
                                        </dv-border-box5></el-col
                                    >
                                </el-row>
                                <el-row>
                                    <Echarts
                                        :option="getLineOption(item.signs.heart, 'heart', false, 'blue')"
                                        :style="{ height: '15vh', width: '58vw' }"
                                        :refresh="1000"
                                    />
                                </el-row>
                                <el-row>
                                    <Echarts
                                        :option="getLineOption(item.signs.respire, 'respire', true, 'green')"
                                        :style="{ height: '15vh', width: '58vw' }"
                                        :refresh="1000"
                                    />
                                </el-row>
                                <el-row>
                                    <Echarts
                                        :option="getLineOption(item.signs.ecg, 'ecg', true, 'yellow')"
                                        :style="{ height: '15vh', width: '58vw' }"
                                        :refresh="1000"
                                    />
                                </el-row>
                                <el-row>
                                    <Echarts
                                        :option="getDoubleLineOption(item.signs.sbp, item.signs.dbp)"
                                        :style="{ height: '15vh', width: '58vw' }"
                                        :refresh="1000"
                                    />
                                </el-row>
                            </dv-border-box6>
                        </el-col>
                    </el-row>
                    <el-empty v-else :image-size="200" />
                </el-tab-pane>
                <el-tab-pane label="中间过程" name="second">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <div class="dv-border-box-13" style="">
                                <svg class="dv-border-svg-container" style="margin: -11px 0 0 -5px">
                                    <path
                                        fill="transparent"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-dasharray="10, 5"
                                        stroke="#6586ec"
                                        d="M 16 9 L 61 9"
                                    ></path>
                                    <path fill="transparent" stroke="#2cf7fe" d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"></path>
                                </svg>
                                <el-card shadow="hover" style="margin-top: 10px">
                                    <template #header>
                                        <div class="card-header">
                                            <span style="font-weight: bold; display: flex; align-items: center; font-size: 20px">
                                                <el-icon style="margin-right: 10px" color="#63D2C3" :size="20"><Stopwatch /></el-icon>
                                                距离角度图
                                            </span>
                                            <svg
                                                width="250px"
                                                height="35px"
                                                style="transform: scale(0.833333, 0.857143); opacity: 0.8; filter: hue-rotate(37deg)"
                                            >
                                                <rect fill="#7acaec" x="8.038461538461538" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="19.576923076923077" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="31.115384615384613" y="8.166666666666666" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="10.5051921084767919s"
                                                        begin="0.3404219594310478"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="42.65384615384615" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="54.19230769230769" y="8.166666666666666" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.3812326756107645s"
                                                        begin="1.6955934216220923"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="65.73076923076923" y="8.166666666666666" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.715153140014483s"
                                                        begin="0.3594127908320366"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="77.26923076923077" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="88.8076923076923" y="8.166666666666666" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.1781091417544567s"
                                                        begin="1.3440929348444768"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="100.34615384615384" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="111.88461538461539" y="8.166666666666666" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.6872871824275972s"
                                                        begin="1.686974870004015"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="123.42307692307692" y="8.166666666666666" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.4993158713075814s"
                                                        begin="1.6154923252036943"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="134.96153846153845" y="8.166666666666666" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.6967905679659898s"
                                                        begin="1.9796202886310514"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="146.5" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="158.03846153846155" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="169.57692307692307" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="181.1153846153846" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="192.65384615384616" y="8.166666666666666" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.223277204830762s"
                                                        begin="0.5762921556259273"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="204.19230769230768" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="215.73076923076923" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="227.26923076923077" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="238.8076923076923" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="250.34615384615384" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="261.88461538461536" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="273.4230769230769" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="284.96153846153845" y="8.166666666666666" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="8.038461538461538" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="19.576923076923077" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.0535460960200869s"
                                                        begin="1.211430481116238"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="31.115384615384613" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="42.65384615384615" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="54.19230769230769" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="65.73076923076923" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.5388847412728763s"
                                                        begin="0.0029475765521975728"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="77.26923076923077" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.6322282293649133s"
                                                        begin="0.3567719074303768"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="88.8076923076923" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="100.34615384615384" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.691046811347737s"
                                                        begin="1.199319131031968"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="111.88461538461539" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="123.42307692307692" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.6528321412925486s"
                                                        begin="0.11111253073463989"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="134.96153846153845" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="146.5" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.6836706217836162s"
                                                        begin="0.7722532434805796"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="158.03846153846155" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.3431764823182903s"
                                                        begin="0.051590866030526206"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="169.57692307692307" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.5167331913025386s"
                                                        begin="1.1057654859643318"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="181.1153846153846" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.9389528677833914s"
                                                        begin="0.23080764875533433"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="192.65384615384616" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.0304667490707065s"
                                                        begin="0.8941722295945524"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="204.19230769230768" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="215.73076923076923" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="227.26923076923077" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="238.8076923076923" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.7891971061151235s"
                                                        begin="0.7488513904680578"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="250.34615384615384" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="261.88461538461536" y="19.833333333333332" width="7" height="7"><!----></rect>
                                                <rect fill="#7acaec" x="273.4230769230769" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.9153807313386566s"
                                                        begin="1.568932728429866"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                                <rect fill="#7acaec" x="284.96153846153845" y="19.833333333333332" width="7" height="7">
                                                    <animate
                                                        attributeName="fill"
                                                        values="#7acaec;transparent"
                                                        dur="1.3957865821820916s"
                                                        begin="0.5963067884912354"
                                                        repeatCount="indefinite"
                                                    ></animate>
                                                </rect>
                                            </svg>
                                        </div>
                                    </template>
                                    <Echarts :option="option" :style="{ height: '59vh', width: '40vw' }" :refresh="1000" />
                                </el-card>
                            </div>
                        </el-col>
                        <el-col :span="12" style="margin: 0 2px 0 -2px">
                            <div style="height: 0; width: calc(100% + 10px); margin: 2px 0 0 -5px; display: flex; justify-content: space-between">
                                <svg class="dv-border-svg-container" width="30" height="30">
                                    <defs>
                                        <filter
                                            id="borderr-box-12-filterId-70b5911d2308484b9e86c41845d582c7"
                                            height="150%"
                                            width="150%"
                                            x="-25%"
                                            y="-25%"
                                        >
                                            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"></feMorphology>
                                            <feGaussianBlur in="thicken" stdDeviation="2" result="blurred"></feGaussianBlur>
                                            <feFlood flood-color="rgba(124,231,253,0.7)" result="glowColor">
                                                <animate
                                                    attributeName="flood-color"
                                                    values=" rgba(124,231,253,0.7); rgba(124,231,253,0.3); rgba(124,231,253,0.7); "
                                                    dur="3s"
                                                    begin="0s"
                                                    repeatCount="indefinite"
                                                ></animate>
                                            </feFlood>
                                            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored"></feComposite>
                                            <feMerge>
                                                <feMergeNode in="softGlowColored"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <path
                                        stroke-width="2"
                                        fill="transparent"
                                        stroke-linecap="round"
                                        filter="url(#borderr-box-12-filterId-70b5911d2308484b9e86c41845d582c7)"
                                        stroke="#7ce7fd"
                                        d="M 20 5 L 15 5 Q 5 5 5 15 L 5 20"
                                    ></path>
                                </svg>
                                <svg class="dv-border-svg-container" width="30" height="30" style="transform: rotateY(180deg)">
                                    <defs>
                                        <filter
                                            id="borderr-box-12-filterId-70b5911d2308484b9e86c41845d582c7"
                                            height="150%"
                                            width="150%"
                                            x="-25%"
                                            y="-25%"
                                        >
                                            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"></feMorphology>
                                            <feGaussianBlur in="thicken" stdDeviation="2" result="blurred"></feGaussianBlur>
                                            <feFlood flood-color="rgba(124,231,253,0.7)" result="glowColor">
                                                <animate
                                                    attributeName="flood-color"
                                                    values=" rgba(124,231,253,0.7); rgba(124,231,253,0.3); rgba(124,231,253,0.7); "
                                                    dur="3s"
                                                    begin="0s"
                                                    repeatCount="indefinite"
                                                ></animate>
                                            </feFlood>
                                            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored"></feComposite>
                                            <feMerge>
                                                <feMergeNode in="softGlowColored"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <path
                                        stroke-width="2"
                                        fill="transparent"
                                        stroke-linecap="round"
                                        filter="url(#borderr-box-12-filterId-70b5911d2308484b9e86c41845d582c7)"
                                        stroke="#7ce7fd"
                                        d="M 20 5 L 15 5 Q 5 5 5 15 L 5 20"
                                    ></path>
                                </svg>
                            </div>

                            <el-card shadow="hover" style="margin-top: 8px">
                                <template #header>
                                    <div class="card-header">
                                        <span style="font-weight: bold; display: flex; align-items: center; font-size: 20px">
                                            <el-icon :size="20" style="margin-right: 10px" color="#63D2C3"><Sunrise /></el-icon>
                                            定位图
                                        </span>
                                        <!-- <el-button :icon="ZoomIn" ></el-button> -->
                                        <dv-button :bg="false" @click="dialogTableVisible2 = true">
                                            <div style="display: flex; align-items: center">
                                                <el-icon :size="20" style="margin-right: 10px"><ZoomIn /></el-icon>
                                                <span style="font-size: 20px">全屏</span>
                                            </div>
                                        </dv-button>
                                    </div>
                                </template>
                                <Echarts :option="option3" :style="{ height: '59vh', width: '40vw' }" />
                            </el-card>
                            <div
                                style="
                                    width: calc(100% + 10px);
                                    margin: -24px 0 0 -5px;
                                    display: flex;
                                    justify-content: space-between;
                                    background-color: transparent;
                                "
                            >
                                <svg class="dv-border-svg-container" width="30" height="30" style="transform: rotateX(180deg)">
                                    <defs>
                                        <filter
                                            id="borderr-box-12-filterId-70b5911d2308484b9e86c41845d582c7"
                                            height="150%"
                                            width="150%"
                                            x="-25%"
                                            y="-25%"
                                        >
                                            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"></feMorphology>
                                            <feGaussianBlur in="thicken" stdDeviation="2" result="blurred"></feGaussianBlur>
                                            <feFlood flood-color="rgba(124,231,253,0.7)" result="glowColor">
                                                <animate
                                                    attributeName="flood-color"
                                                    values=" rgba(124,231,253,0.7); rgba(124,231,253,0.3); rgba(124,231,253,0.7); "
                                                    dur="3s"
                                                    begin="0s"
                                                    repeatCount="indefinite"
                                                ></animate>
                                            </feFlood>
                                            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored"></feComposite>
                                            <feMerge>
                                                <feMergeNode in="softGlowColored"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <path
                                        stroke-width="2"
                                        fill="transparent"
                                        stroke-linecap="round"
                                        filter="url(#borderr-box-12-filterId-70b5911d2308484b9e86c41845d582c7)"
                                        stroke="#7ce7fd"
                                        d="M 20 5 L 15 5 Q 5 5 5 15 L 5 20"
                                    ></path>
                                </svg>
                                <svg class="dv-border-svg-container" width="30" height="30" style="transform: rotate(180deg)">
                                    <defs>
                                        <filter
                                            id="borderr-box-12-filterId-70b5911d2308484b9e86c41845d582c7"
                                            height="150%"
                                            width="150%"
                                            x="-25%"
                                            y="-25%"
                                        >
                                            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"></feMorphology>
                                            <feGaussianBlur in="thicken" stdDeviation="2" result="blurred"></feGaussianBlur>
                                            <feFlood flood-color="rgba(124,231,253,0.7)" result="glowColor">
                                                <animate
                                                    attributeName="flood-color"
                                                    values=" rgba(124,231,253,0.7); rgba(124,231,253,0.3); rgba(124,231,253,0.7); "
                                                    dur="3s"
                                                    begin="0s"
                                                    repeatCount="indefinite"
                                                ></animate>
                                            </feFlood>
                                            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored"></feComposite>
                                            <feMerge>
                                                <feMergeNode in="softGlowColored"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <path
                                        stroke-width="2"
                                        fill="transparent"
                                        stroke-linecap="round"
                                        filter="url(#borderr-box-12-filterId-70b5911d2308484b9e86c41845d582c7)"
                                        stroke="#7ce7fd"
                                        d="M 20 5 L 15 5 Q 5 5 5 15 L 5 20"
                                    ></path>
                                </svg>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>

    <!-- 表单 -->
    <el-drawer v-model="dialog" title="条件查询成员列表" :before-close="cancelForm" direction="ltr" class="demo-drawer">
        <div class="demo-drawer__content">
            <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="null">全选</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input-number v-model="form.ageBegin" :min="0" :max="100" @change="handleChange1" controls-position="right" />
                    <el-text class="mx-1"> - </el-text>
                    <el-input-number v-model="form.ageEnd" :min="0" :max="100" @change="handleChange2" controls-position="right" />
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer" style="display: flex; justify-content: center">
                <el-button @click="cancelForm">取消</el-button>
                <el-button type="primary" :loading="loading" @click="handleClose">{{ loading ? '查询中 ...' : '查询' }}</el-button>
            </div>
        </div>
    </el-drawer>
    <el-drawer v-model="dialog2" title="新增成员信息" :before-close="cancelForm2" direction="ltr" class="demo-drawer">
        <div class="demo-drawer__content">
            <el-form :model="form2">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form2.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="form2.gender" :label="1">男</el-radio>
                    <el-radio v-model="form2.gender" :label="0">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input-number v-model="form2.age" :min="0" :max="100" />
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form2.address" autocomplete="off" />
                </el-form-item>
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <el-upload
                        ref="upload"
                        :action="base_url + '/upload'"
                        method="post"
                        name="image"
                        list-type="picture-card"
                        accept=".jpg, .png, .webp"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :on-success="handleAvatarSuccess"
                        :limit="1"
                    >
                        <el-icon><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer" style="display: flex; justify-content: center">
                <el-button @click="cancelForm2">取消</el-button>
                <el-button type="primary" :loading="loading" @click="handleClose2">{{ loading ? '提交中 ...' : '提交' }}</el-button>
            </div>
        </div>
    </el-drawer>
    <el-dialog v-model="dialogFormVisible" title="更新成员信息" width="500">
        <el-form :model="form3">
            <el-form-item label="姓名" :label-width="formLabelWidth2">
                <el-input v-model="form3.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth2">
                <el-radio v-model="form3.gender" :label="1">男</el-radio>
                <el-radio v-model="form3.gender" :label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth2">
                <el-input-number v-model="form3.age" :min="0" :max="100" />
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth2">
                <el-input v-model="form3.address" autocomplete="off" />
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth2">
                <el-row style="align-items: flex-end">
                    <el-avatar style="height: 120px; width: 120px" shape="square" :src="dialogImageUrl === '' ? '/avatar.png' : dialogImageUrl" />
                    <el-upload
                        ref="upload"
                        :action="base_url + '/upload'"
                        method="post"
                        name="image"
                        accept=".jpg, .png, .webp"
                        :show-file-list="false"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :on-success="handleAvatarSuccess2"
                        :limit="1"
                    >
                        <el-icon :size="20" style="margin-left: 14px">
                            <Edit />
                        </el-icon>
                    </el-upload>
                </el-row>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer" style="display: flex">
                <el-button type="warning" @click="deleteMember(form3.id)">删除成员</el-button>
                <div style="display: flex; flex-grow: 1"></div>
                <el-button @click="cancelForm3">取消</el-button>
                <el-button type="primary" :loading="loading" @click="handleClose3">{{ loading ? '更新中 ...' : '更新' }}</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible" style="height: 80vh">
        <img style="max-width: 100%; max-height: 100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>

    <!-- 全屏 -->
    <el-dialog v-model="dialogTableVisible2" title="定位图" :fullscreen="true">
        <Echarts :option="option3" :style="{ height: '90vh', width: '90vw' }" />
    </el-dialog>
</template>

<script setup lang="ts">
import { ZoomIn, Sunrise, Stopwatch, Edit, Search, Warning, Grid, Postcard } from '@element-plus/icons-vue'
import { ElDrawer, ElMessageBox, ElMessage } from 'element-plus'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import type { BasePerson, Person, Result, Status } from '../components/interface'
import { getMembers, addMember, delMember, updateMember } from '@/components/request'
import { angle_time, getLineOption, getDoubleLineOption, nebula } from '@/components/getTestData'
import { BorderBox12 as DvBorderBox12 } from '@kjgl77/datav-vue3'

import Echarts from '@/components/Recharts.vue'
const base_url = import.meta.env.VITE_API_BASE_URL
const data = ref<Person[]>([])

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const option = ref({})
const option3 = ref({})
const dialogTableVisible2 = ref(false)

const onBack = () => {
    router.push({ path: '/' })
}

const activeName = ref<{ [idx: number]: string }>([])

onMounted(async () => {
    option.value = await angle_time()
    option3.value = await nebula()
})


const table: { [key: string]: string[] } = {
    "chestPain": [
        '无显著不适或症状',     // asymptomatic 无症状
        '非心绞痛型胸痛',       // non-anginal 非心绞痛型胸痛
        '非典型心绞痛型胸痛',   // atypical angina 非典型心绞痛型胸痛
        '典型心绞痛型胸痛',     // typical angina 典型心绞痛型胸痛
    ],
    "exerciseAngina": [
        '无显著不适或症状',  // 无症状
        '运动引起的心绞痛'   // 运动引起的心绞痛
    ],
    "heartDisease": [
        '无显著不适或症状',   // 无症状
        '冠状动脉心脏病'      // 心脏病
    ]
};
const mapStatus = (status: Status)=>{
    if (!status) return ['无症状', '无症状', '无症状']
    return Object.entries(status).map(([key, value])=>table[key][value])
}


var refresh: any
onMounted(async () => {
    query.room = route.query.room as string
    form.room = route.query.room as string

    data.value = await getMembers(query)

    data.value.forEach(async (item) => {
        activeName.value[item.info.id] = 'first'
    })
    const comment = route.query.id as string
    if (comment) {
        let target = document.getElementById(comment)

        if (target) {
            target.scrollIntoView(true)
        }
        data.value.forEach((item) => {
            if (item.info.id.toString() !== comment) activeName.value[item.info.id] = ''
        })
    }
    refresh = async () => {
        data.value = await getMembers(query)
        setTimeout(refresh, 2000)
    }
})

onBeforeUnmount(() => {
    clearTimeout(refresh)
})

/* 查询表单 */
const formLabelWidth = '80px'
let timer: string | number | NodeJS.Timeout | undefined

const dialog = ref(false)
const loading = ref(false)

const form = reactive({
    name: '',
    gender: null as number | null,
    ageBegin: null as number | null,
    ageEnd: null as number | null,
    room: '',
    num: 20
})

var query = reactive({
    name: '',
    gender: null as number | null,
    ageBegin: null as number | null,
    ageEnd: null as number | null,
    room: '',
    num: 20
})

const handleClose = async () => {
    query = form
    data.value = await getMembers(query)
    ElMessage({
        type: 'success',
        message: 'Update completed'
    })
}

const cancelForm = () => {
    loading.value = false
    dialog.value = false
    clearTimeout(timer)
}

/* 新增表单 */
const dialog2 = ref(false)

const form2 = reactive({
    name: '',
    gender: 0,
    age: 0,
    address: null as null | string,
    image: ''
})

const handleClose2 = () => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('确定新增信息？')
        .then(() => {
            loading.value = true
            timer = setTimeout(async () => {
                loading.value = false
                dialog2.value = false
                setTimeout(() => {
                    loading.value = false
                }, 400)
                await addMember(form2)
                data.value = await getMembers()
                ElMessage({
                    type: 'success',
                    message: 'Update completed'
                })
            }, 2000)
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Update canceled'
            })
        })
}

const cancelForm2 = () => {
    loading.value = false
    dialog2.value = false
    clearTimeout(timer)
}

// 图片上传
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadInstance, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'

const upload = ref<UploadInstance>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response: Result) => {
    form2.image = import.meta.env.VITE_API_BASE_URL + '/images/' + response.data
}

// 年龄限制
const handleChange1 = (cur: number, old: number) => {
    if (form.ageEnd && cur > form.ageEnd) form.ageBegin = old
}
const handleChange2 = (cur: number, old: number) => {
    if (form.ageBegin && cur < form.ageBegin) form.ageEnd = old
}

/* 修改表单 */

const dialogFormVisible = ref(false)
const formLabelWidth2 = '50px'

const form3 = reactive({
    id: 0,
    name: '',
    gender: 0,
    age: 0,
    address: null as null | string,
    image: null as null | string
})

const handleClose3 = () => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('确定更新信息？')
        .then(() => {
            loading.value = true
            timer = setTimeout(() => {
                loading.value = false
                dialogFormVisible.value = false
                setTimeout(async () => {
                    loading.value = false
                    await updateMember(form3)
                    data.value = await getMembers()
                    ElMessage({
                        type: 'success',
                        message: 'Update completed'
                    })
                }, 400)
            }, 2000)
        })
        .catch(() => {
            dialogFormVisible.value = false
            ElMessage({
                type: 'info',
                message: 'Update canceled'
            })
        })
}

const cancelForm3 = () => {
    loading.value = false
    dialogFormVisible.value = false
    clearTimeout(timer)
}

const setForm = (item: BasePerson) => {
    dialogFormVisible.value = true
    form3.id = item.id
    form3.name = item.name
    form3.gender = item.gender
    form3.age = item.age
    dialogImageUrl.value = item.image ? item.image : '/avatar.png'
}

const handleAvatarSuccess2: UploadProps['onSuccess'] = (response: Result) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    dialogImageUrl.value = import.meta.env.VITE_API_BASE_URL + '/images/' + response.data
    form3.image = import.meta.env.VITE_API_BASE_URL + '/images/' + response.data
}

/* 删除成员 */
const deleteMember = async (id: number) => {
    ElMessageBox.confirm('确定删除成员信息？', '警告', {
        type: 'warning'
    })
        .then(async () => {
            await delMember(id)
            data.value = await getMembers()
            ElMessage({
                type: 'success',
                message: 'Delete completed'
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled'
            })
        })
}
</script>

<style scoped>
.el-main {
    margin-top: 20px;
}

.main-page > .is-guttered {
    padding-bottom: 24px;
}

.el-card {
    border: 1px solid #546db9;
}
.el-card.is-always-shadow {
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.05);
}

.el-row {
    margin-bottom: 10px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}

.sign-icon {
    height: 40px;
    width: 40px;
}

.el-empty {
    --el-empty-padding: 20% 0;
}

.warning-font {
    color: red;
}

.normal-font {
    color: white;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}

#pane-second > div > div > div,
#pane-second > div > div > div > div {
    background-color: #091222;
}
</style>
