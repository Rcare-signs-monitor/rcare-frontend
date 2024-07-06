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
                        <el-button plain :icon="Edit" @click="dialog2 = true">新增成员信息</el-button>
                    </el-row>
                </template>
            </el-page-header>
        </el-header>

        <el-main>
            <el-tabs v-for="(item, idx) in data" :id="item.info.id" :key="idx">
                <span v-if="activeName[item.info.id]">
                    <div v-if="data.length !== 0">
                        <el-row :gutter="24" class="main-page">
                            <el-col :span="8">
                                <PersonInfoLeft :item="item"></PersonInfoLeft>
                            </el-col>
                            <el-col :span="16">
                                <PersonInfoRight :item="item"></PersonInfoRight>
                            </el-col>
                        </el-row>
                    </div>
                    <el-empty v-else :image-size="200" />
                </span>
            </el-tabs>
        </el-main>
    </el-container>

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

    <el-dialog v-model="dialogVisible" style="height: 80vh">
        <img style="max-width: 100%; max-height: 100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import { ElDrawer, ElMessageBox, ElMessage } from 'element-plus'
import { onMounted, provide, reactive, ref } from 'vue'
import type { Person, Result } from '../components/interface'
import { getMembers, addMember, updateMember } from '@/components/request'

import PersonInfoLeft from '../components/PersonInfoLeft.vue'
import PersonInfoRight from '../components/PersonInfoRight.vue'

const base_url = import.meta.env.VITE_API_BASE_URL
const data = ref<Person[]>([])

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const onBack = () => {
    router.push({ path: '/' })
}

const activeName = ref<{ [idx: number]: boolean }>([])

var refresh: any
onMounted(async () => {
    query.room = route.query.room as string
    form.room = route.query.room as string

    data.value = await getMembers(query)

    data.value.forEach(async (item) => {
        activeName.value[item.info.id] = true
    })
    const comment = route.query.id as string
    if (comment) {
        let target = document.getElementById(comment)

        if (target) {
            target.scrollIntoView(true)
        }
        data.value.forEach((item) => {
            if (item.info.id.toString() !== comment) activeName.value[item.info.id] = false
        })
    }
    refresh = async () => {
        data.value = await getMembers(query)
        if (route.path === '/person_info') setTimeout(refresh, 2000)
    }
    refresh()
})

/* 查询表单 */
const formLabelWidth = '80px'
let timer: string | number | NodeJS.Timeout | undefined

const loading = ref(false)

const form = reactive({
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
                data.value = await getMembers(query)
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

const updateMemberImpl = async (form3: any) => {
    await updateMember(form3)
    data.value = await getMembers(query)
}
provide('updateMember', updateMemberImpl)
const getMember = async () => {
    data.value = await getMembers(query)
}
provide('getMember', getMember)
</script>

<style scoped>
@import url('../assets/personalinfo.css');
</style>
