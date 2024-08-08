<template>
    <el-container>
        <el-header>
            <div>
                <div style="display: flex; width: 100%">
                    <dv-decoration-10 style="width: 26%; height: 5px" />
                    <dv-decoration8 style="width: 12%; height: 50px" :color="['#757FB1', 'rgba(0,0,0,0)']" />
                    <div style="display: flex; flex-grow: 1"></div>
                    <dv-decoration8 :reverse="true" style="width: 12%; height: 50px" :color="['#757FB1', 'rgba(0,0,0,0)']" />
                    <dv-decoration-10 style="width: 26%; height: 5px; transform: rotateY(180deg)" />
                </div>
                <div style="display: flex; width: 100%; margin-top: -10px">
                    <div class="box"><span style=""></span></div>
                    <div class="box2" style="transform: skew(45deg)"></div>
                    <div class="title">
                        <div style="font-size: 20px; margin-bottom: 5px">智慧医疗系统</div>
                        <dv-decoration6 style="width: 270px; height: 7px" />
                    </div>
                    <div class="box2" style="transform: skew(-45deg)"></div>
                    <div class="box" style="transform: rotateY(180deg)"></div>
                </div>
            </div>
        </el-header>

        <el-main>
            <dv-border-box13 style="margin-top: 10px" backgroundColor="#060C1E">
                <div style="padding: 20px; height: 86vh">
                    <BedOccupancyChart></BedOccupancyChart>
                </div>
            </dv-border-box13>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import BedOccupancyChart from '../components/Home/BedOccupancyChart.vue'
import { BorderBox13 as DvBorderBox13, 
    Decoration10 as DvDecoration10, 
    Decoration8 as DvDecoration8, 
    Decoration6 as DvDecoration6 
} from '@kjgl77/datav-vue3'
</script>

<style scoped>
.item {
    margin-bottom: 18px;
}

.box {
    width: 25%;
    height: 0;
    border-right: 40px solid transparent;
    border-bottom: 40px solid #151e3e;
}

.box span {
    font-size: 15px;
    position: relative;
    top: 3px;
    left: 10px;
    color: rgb(219 219 219 / 84%);
}

.box2 {
    width: 10%;
    height: 40px;
    background-color: #151e3e;
}

.title {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    margin: -30px 50px;
}
</style>
