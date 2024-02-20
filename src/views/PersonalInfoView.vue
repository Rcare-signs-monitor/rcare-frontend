<template>
    <el-container>
        <el-header>
            <el-page-header @back="onBack">
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3"> 个人信息 </span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                            Personal Information
                        </span>
                    </div>
                </template>
            </el-page-header>
        </el-header>

        <el-main>
            <el-row style="margin-bottom: 40px">
                <el-button plain :icon="Search" @click="dialog = true">条件查询成员列表</el-button>
                <el-button plain :icon="Edit" @click="dialog2 = true">新增成员信息</el-button>
            </el-row>
            <el-row v-if="data.length !== 0" :gutter="24" id="main-page">
                <el-col :span="12" v-for="item in data">
                    <el-card body-style="padding: 30px;">
                        <el-row>
                            <span>
                                <el-avatar
                                    style="height: 120px; width: 120px"
                                    shape="square"
                                    :src="item.image === '' ? '/avatar.png' : item.image"
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
                                    <RouterLink
                                        :to="{ path: '/health_record', query: { id: item.id } }"
                                        style="margin-right: 10px"
                                        ><el-button type="primary">详情</el-button>
                                    </RouterLink>
                                    <el-button @click="setForm(item)">编辑信息</el-button>
                                    <el-button @click="deleteMember(item.id)">删除成员</el-button>
                                </el-row>
                                <el-row justify="end">
                                    <el-card
                                        body-style="background-color: #37D376; color: white; display:flex; align-items: center;"
                                    >
                                        <el-icon size="30"><Sunny /></el-icon
                                        ><span>某些状态信息说明</span>
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
                                        <span style="font-size: 18px">
                                            心率
                                            <el-tooltip content="参考值" placement="top">
                                                <el-icon
                                                    style="top: -10px; left: -5px; opacity: 0.5"
                                                    :size="12"
                                                >
                                                    <Warning />
                                                </el-icon>
                                            </el-tooltip>
                                        </span>
                                    </span>
                                    <span
                                        ><span style="font-size: 30px">{{
                                            item.sign.heartRate
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
                                            src="../assets/shousuoya.svg"
                                            style="margin-right: 20px"
                                        />
                                        <span style="font-size: 18px">
                                            收缩压
                                            <el-tooltip content="参考值" placement="top">
                                                <el-icon
                                                    style="top: -10px; left: -5px; opacity: 0.5"
                                                    :size="12"
                                                >
                                                    <Warning />
                                                </el-icon>
                                            </el-tooltip>
                                        </span>
                                    </span>
                                    <span
                                        ><span style="font-size: 30px">{{
                                            item.sign.systolicPressure
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
                                        <span style="font-size: 18px">
                                            呼吸率
                                            <el-tooltip content="参考值" placement="top">
                                                <el-icon
                                                    style="top: -10px; left: -5px; opacity: 0.5"
                                                    :size="12"
                                                >
                                                    <Warning />
                                                </el-icon>
                                            </el-tooltip>
                                        </span>
                                    </span>
                                    <span
                                        ><span style="font-size: 30px">{{
                                            item.sign.respiratoryRate
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
                                        <span style="font-size: 18px">
                                            舒张压
                                            <el-tooltip content="参考值" placement="top">
                                                <el-icon
                                                    style="top: -10px; left: -5px; opacity: 0.5"
                                                    :size="12"
                                                >
                                                    <Warning />
                                                </el-icon>
                                            </el-tooltip>
                                        </span>
                                    </span>
                                    <span
                                        ><span style="font-size: 30px">{{
                                            item.sign.diastolicPressure
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

    <!-- 表单 -->
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
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="null">全选</el-radio>
                    </el-radio-group>
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
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelForm3">取消</el-button>
                <el-button type="primary" :loading="loading" @click="handleClose3">{{
                    loading ? '更新中 ...' : '更新'
                }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElDrawer, ElMessageBox } from 'element-plus'
import { Edit, Search, Sunny, Warning } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import type { Person } from '../components/interface'
// import { getLastSign, getMembers } from '../components/getTestData'
import { useRouter } from 'vue-router'
import { getLastSign, getMembers, addMember, delMember } from '@/components/request'

const data = ref<Person[]>([])

const router = useRouter()

const onBack = () => {
    router.push({ path: '/' })
}

onMounted(async () => {
    data.value = await getMembers()
    // setInterval(() => {
    data.value.map(async (item) => {
        await getLastSign(item)
    })
    // }, 1000)
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

const handleClose = () => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('确定提交查询？').then(() => {
        loading.value = true
        timer = setTimeout(async () => {
            loading.value = false
            dialog.value = false
            setTimeout(() => {
                loading.value = false
            }, 400)
            console.log(form)
            data.value = await getMembers(
                form.name,
                form.gender,
                form.ageBegin,
                form.ageEnd,
                form.address
            )
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
    address: null as null | string
})

const handleClose2 = () => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('确定新增信息？').then(() => {
        loading.value = true
        timer = setTimeout(async () => {
            loading.value = false
            dialog2.value = false
            setTimeout(() => {
                loading.value = false
            }, 400)
            console.log(form2)
            await addMember({
                name: form2.name,
                gender: form2.gender,
                age: form2.age,
                address: form2.address,
                image: ''
            })
            data.value = await getMembers()
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

/* 修改表单 */

const dialogFormVisible = ref(false)
const formLabelWidth2 = '50px'

const form3 = reactive({
    name: '',
    gender: 0,
    age: 0,
    address: null as null | string
})

const handleClose3 = () => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('确定更新信息？').then(() => {
        loading.value = true
        timer = setTimeout(() => {
            loading.value = false
            dialogFormVisible.value = false
            setTimeout(() => {
                loading.value = false
            }, 400)
        }, 2000)
    })
}

const cancelForm3 = () => {
    loading.value = false
    dialogFormVisible.value = false
    clearTimeout(timer)
}

const setForm = (item: Person) => {
    dialogFormVisible.value = true
    form3.name = item.name
    form3.gender = item.gender
    form3.age = item.age
    form3.address = item.address
}

/* 删除成员 */
const deleteMember = async (id: number) => {
    await delMember(id)
    data.value = await getMembers()
}
</script>

<style scoped>
#main-page > .is-guttered {
    padding-bottom: 24px;
}

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
