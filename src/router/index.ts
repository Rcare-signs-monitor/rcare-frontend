import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HealthRecordView from '../views/HealthRecordView.vue'
import PersonalInfoView from '../views/PersonalInfoView.vue'
import ParaConfigView from '../views/ParaConfigView.vue'
import SettingView from '../views/SettingView.vue'
import LogView from '../views/LogView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/health_record',
            name: 'health_record',
            component: HealthRecordView
        },
        {
            path: '/person_info',
            name: 'person_info',
            component: PersonalInfoView
        },
        {
            path: '/logs',
            name: 'log',
            component: LogView
        },
        {
            path: '/paras',
            name: 'paras',
            component: ParaConfigView
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingView
        }
    ]
})

export default router
