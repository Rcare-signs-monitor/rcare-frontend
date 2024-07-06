<template>
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
                        <dv-button :fontSize="13" style="width: 100%; margin-bottom: 5px" @click="setForm(item.info)" border="Border6" color="#615ea8"
                            >编辑信息</dv-button
                        >
                    </el-col>
                </el-row>
            </span>
        </el-row>
        <el-row :gutter="50">
            <el-col :span="24">
                <dv-border-box9 style="background-color: #13161b">
                    <div style="display: flex; align-items: center; justify-content: space-evenly; height: 19vh">
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
                    <div style="display: flex; align-items: center; justify-content: space-evenly; height: 19vh">
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
                    <div style="display: flex; align-items: center; justify-content: space-evenly; height: 19vh">
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
</template>

<script setup lang="ts">
import { 
    BorderBox12 as DvBorderBox12, 
    BorderBox8 as DvBorderBox8, 
    BorderBox9 as DvBorderBox9 ,
    Button as DvButton
} from '@kjgl77/datav-vue3'
import { Edit, Warning } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage, type UploadProps, type UploadInstance, genFileId, type UploadRawFile } from 'element-plus'
import { inject, reactive, ref } from 'vue'
import type { BasePerson, Result } from './interface'
import { delMember } from '@/components/request'
const base_url = import.meta.env.VITE_API_BASE_URL
defineProps(['item'])

const setForm = (item: BasePerson) => {
    dialogFormVisible.value = true
    form3.id = item.id
    form3.name = item.name
    form3.gender = item.gender
    form3.age = item.age
    dialogImageUrl.value = item.image ? item.image : '/avatar.png'
}

const dialogFormVisible = ref(false)
const formLabelWidth2 = '50px'
const loading = ref(false)
let timer: string | number | NodeJS.Timeout | undefined
const updateMember = inject('updateMember') as Function
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
                    await updateMember()
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

const form3 = reactive({
    id: 0,
    name: '',
    gender: 0,
    age: 0,
    address: null as null | string,
    image: null as null | string
})

const handleAvatarSuccess2: UploadProps['onSuccess'] = (response: Result) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    dialogImageUrl.value = import.meta.env.VITE_API_BASE_URL + '/images/' + response.data
    form3.image = import.meta.env.VITE_API_BASE_URL + '/images/' + response.data
}

/* 删除成员 */
const getMember = inject('getMember') as Function
const deleteMember = async (id: number) => {
    ElMessageBox.confirm('确定删除成员信息？', '警告', {
        type: 'warning'
    })
        .then(async () => {
            await delMember(id)
            await getMember()
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

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
</script>

<style scoped>
@import url('../assets/personalinfo.css');
</style>
