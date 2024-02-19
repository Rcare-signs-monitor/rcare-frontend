<template>
    <el-container>
        <el-header>
            <el-page-header @back="onBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 个人信息 </span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                            personal information
                        </span>
                    </div>
                </template>
            </el-page-header>
        </el-header>

        <el-main>
            <el-row style="margin-bottom: 40px">
                <el-button plain :icon="Search" @click="dialog = true">条件查询成员列表</el-button>
                <el-button plain :icon="Edit" @click="dialog2 = true">新增成员信息</el-button>
                <div style="flex-grow: 1"></div>
                <span style="margin-right: 0">
                    <el-pagination
                        v-model:current-page="currentPage4"
                        v-model:page-size="pageSize4"
                        :page-sizes="[5, 10, 15, 20]"
                        :small="small"
                        :disabled="disabled"
                        :background="background"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </span>
            </el-row>

            <el-drawer
                v-model="dialog"
                title="条件查询成员列表"
                :before-close="cancelForm"
                direction="ltr"
                class="demo-drawer"
            >
                <div class="demo-drawer__content">
                    <el-form :model="form">
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <el-checkbox v-model="gender0" label="男" />
                            <el-checkbox v-model="gender1" label="女" />
                        </el-form-item>
                        <el-form-item label="年龄" :label-width="formLabelWidth">
                            <el-input-number
                                v-model="form.ageBegin"
                                :min="0"
                                :max="100"
                                @change="handleChange1"
                                controls-position="right"
                            />
                            <el-text class="mx-1"> - </el-text>
                            <el-input-number
                                v-model="form.ageEnd"
                                :min="0"
                                :max="100"
                                @change="handleChange2"
                                controls-position="right"
                            />
                        </el-form-item>
                        <el-form-item label="地址" :label-width="formLabelWidth">
                            <el-input v-model="form.address" autocomplete="off" />
                        </el-form-item>
                    </el-form>
                    <div class="demo-drawer__footer" style="display: flex; justify-content: center">
                        <el-button @click="cancelForm">取消</el-button>
                        <el-button type="primary" :loading="loading" @click="handleClose">{{
                            loading ? '查询中 ...' : '查询'
                        }}</el-button>
                    </div>
                </div>
            </el-drawer>
            <el-drawer
                v-model="dialog2"
                title="新增成员信息"
                :before-close="cancelForm2"
                direction="ltr"
                class="demo-drawer"
            >
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
                    </el-form>
                    <div class="demo-drawer__footer" style="display: flex; justify-content: center">
                        <el-button @click="cancelForm2">取消</el-button>
                        <el-button type="primary" :loading="loading" @click="handleClose2">{{
                            loading ? '提交中 ...' : '提交'
                        }}</el-button>
                    </div>
                </div>
            </el-drawer>
            <el-row v-if="data.length !== 0" v-for="item in data">
                <el-col :span="24">
                    <el-card body-style="padding: 30px;">
                        <el-row>
                            <span>
                                <el-avatar
                                    style="height: 120px; width: 120px"
                                    shape="square"
                                    :src="
                                        item.image === ''
                                            ? 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
                                            : item.image
                                    "
                                />
                            </span>
                            <span style="margin-left: 30px">
                                <div style="font-size: 20px; font-weight: bold">
                                    {{ item.name }}
                                </div>
                                <div>性别：{{ item.gender == 1 ? '男' : '女' }}</div>
                                <div>年龄：{{ item.age }}岁</div>
                                <div>地址：{{ item.address }}</div>
                            </span>
                            <div style="flex-grow: 1"></div>
                            <span style="margin-right: 0">
                                <el-row>
                                    <el-button type="primary">详情</el-button>
                                    <el-button>编辑信息</el-button>
                                    <el-button>删除成员</el-button>
                                </el-row>
                                <el-row justify="end">
                                    <el-card body-style="background-color: #37D376; color: white">
                                        某些状态信息说明
                                    </el-card>
                                </el-row>
                            </span>
                        </el-row>
                        <el-row :gutter="50">
                            <el-col :span="12">
                                <el-card
                                    shadow="none"
                                    body-style="display: flex; align-items: center; justify-content: space-evenly;"
                                >
                                    <span style="display: flex; align-items: center">
                                        <img
                                            class="sign-icon"
                                            src="../assets/xinlv.svg"
                                            style="margin-right: 20px"
                                        />
                                        <span style="font-size: 20px">心率</span>
                                    </span>
                                    <span
                                        ><span style="font-size: 40px">{{
                                            item.sign.heart_rate
                                        }}</span
                                        >bpm</span
                                    >
                                    <!-- TODO: 展示参考值大小 -->
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card
                                    shadow="none"
                                    body-style="display: flex; align-items: center; justify-content: space-evenly;"
                                >
                                    <span style="display: flex; align-items: center">
                                        <img
                                            class="sign-icon"
                                            src="../assets/shousuoya.svg"
                                            style="margin-right: 20px"
                                        />
                                        <span style="font-size: 20px">收缩压</span>
                                    </span>
                                    <span
                                        ><span style="font-size: 40px">{{
                                            item.sign.systolic_pressure
                                        }}</span
                                        >mmHg</span
                                    >
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="50">
                            <el-col :span="12">
                                <el-card
                                    shadow="none"
                                    body-style="display: flex; align-items: center; justify-content: space-evenly;"
                                >
                                    <span style="display: flex; align-items: center">
                                        <img
                                            class="sign-icon"
                                            src="../assets/huxilv.svg"
                                            style="margin-right: 20px"
                                        />
                                        <span style="font-size: 20px">呼吸率</span>
                                    </span>
                                    <span
                                        ><span style="font-size: 40px">{{
                                            item.sign.respiratory_rate
                                        }}</span
                                        >bpm</span
                                    >
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card
                                    shadow="none"
                                    body-style="display: flex; align-items: center; justify-content: space-evenly;"
                                >
                                    <span style="display: flex; align-items: center">
                                        <img
                                            class="sign-icon"
                                            src="../assets/shuzhangya.svg"
                                            style="margin-right: 20px"
                                        />
                                        <span style="font-size: 20px">舒张压</span>
                                    </span>
                                    <span
                                        ><span style="font-size: 40px">{{
                                            item.sign.diastolic_pressure
                                        }}</span
                                        >mmHg</span
                                    >
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
            <el-empty v-else :image-size="200" />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ElNotification as notify } from 'element-plus'
import { ElDrawer, ElMessageBox } from 'element-plus'
import { Edit, Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, watch } from 'vue'
import type { Person, Sign } from '../components/interface'

const data = ref<Person[]>([])

const onBack = () => {
    notify('Back')
}

const getTestData = () => {
    var _data = [
        {
            id: 1,
            name: '高松灯',
            gender: 0,
            age: 18,
            address: 'abccc',
            image: 'https://img.moegirl.org.cn/common/thumb/2/24/Gbp-tomori.png/300px-Gbp-tomori.png'
        },
        {
            id: 2,
            name: '千早爱音',
            gender: 0,
            age: 18,
            address: 'dddddccc',
            image: 'https://img.moegirl.org.cn/common/thumb/5/53/Gbp-anon.png/300px-Gbp-anon.png'
        },
        {
            id: 3,
            name: '要乐奈',
            gender: 0,
            age: 18,
            address: 'dddddccc',
            image: 'https://img.moegirl.org.cn/common/thumb/7/7d/Gbp-rana.png/300px-Gbp-rana.png'
        },
        {
            id: 4,
            name: '长崎爽世',
            gender: 0,
            age: 18,
            address: 'dddddccc',
            image: 'https://img.moegirl.org.cn/common/thumb/7/7d/Gbp-rana.png/300px-Gbp-rana.png'
        },
        {
            id: 5,
            name: '椎名立希',
            gender: 0,
            age: 18,
            address: 'dddddccc',
            image: 'https://img.moegirl.org.cn/common/thumb/0/0b/Gbp-taki.png/300px-Gbp-taki.png'
        }
    ] as Person[]
    _data.map((item) => {
        item.sign = {
            detect_time: '',
            heart_rate: 0,
            respiratory_rate: 0,
            systolic_pressure: 0,
            diastolic_pressure: 0
        }
    })
    return _data
}

onMounted(() => {
    data.value = getTestData()
    setInterval(() => {
        data.value.forEach((item) => {
            const new_sign = {
                detect_time: new Date().toString(),
                heart_rate: Number((Math.random() * 100).toFixed(2)),
                respiratory_rate: Number((Math.random() * 100).toFixed(2)),
                systolic_pressure: Number((Math.random() * 100).toFixed(2)),
                diastolic_pressure: Number((Math.random() * 100).toFixed(2))
            } as Sign
            item.sign = new_sign
        })
    }, 1000)
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
    address: ''
})

// 性别选择
const gender0 = ref<boolean>(true)
const gender1 = ref<boolean>(true)

watch(
    () => [gender0.value, gender1.value],
    (newValue, prevValue) => {
        if (newValue[0] && newValue[1]) form.gender = null
        else if (newValue[0]) form.gender = 0
        else if (newValue[1]) form.gender = 1
        else {
            gender0.value = prevValue[0]
            gender1.value = prevValue[1]
            notify({
                title: '通知',
                message: '至少选择一个性别',
                type: 'info'
            })
        }
    }
)

const handleClose = () => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('确定提交查询？').then(() => {
        loading.value = true
        timer = setTimeout(() => {
            loading.value = false
            dialog.value = false
            setTimeout(() => {
                loading.value = false
            }, 400)
        }, 2000)
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
    address: ''
})

const handleClose2 = () => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('确定新增信息？').then(() => {
        loading.value = true
        timer = setTimeout(() => {
            loading.value = false
            dialog2.value = false
            setTimeout(() => {
                loading.value = false
            }, 400)
        }, 2000)
    })
}

const cancelForm2 = () => {
    loading.value = false
    dialog2.value = false
    clearTimeout(timer)
}

// 年龄限制
const handleChange1 = (cur: number, old: number) => {
    if (form.ageEnd && cur > form.ageEnd) form.ageBegin = old
}
const handleChange2 = (cur: number, old: number) => {
    if (form.ageBegin && cur < form.ageBegin) form.ageEnd = old
}

/* 分页 */
const currentPage4 = ref(2)
const pageSize4 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
}
.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}

.el-card.is-always-shadow {
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.05);
}

.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}

.sign-icon {
    height: 50px;
    width: 50px;
}

.el-empty {
    --el-empty-padding: 20% 0;
}
</style>
