import type { Person, Sign } from './interface'
import type { EChartsOption } from 'echarts'
import axios from 'axios'

export const getLineOption = (
    data: Sign[],
    label: 'heartRate' | 'respiratoryRate',
    title: string,
    smooth = false
) => {
    const dateList = data.map((item) => item['detectTime'])
    const valueList = data.map((item) => item[label])

    const option = {
        title: { text: title },
        visualMap: [
            {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 100
            }
        ],
        tooltip: { trigger: 'axis' },
        xAxis: [{ data: dateList }],
        yAxis: [{}],
        series: [
            {
                type: 'line',
                showSymbol: false,
                smooth: smooth,
                data: valueList
            }
        ]
    } as EChartsOption
    return option
}

export const getPressureOption = (data: Sign[]) => {
    const dateList = data.map((item) => item['detectTime'])
    const pressure1 = data.map((item) => item['systolicPressure'])
    const pressure2 = data.map((item) => item['diastolicPressure'] - item['systolicPressure'])

    const option = {
        // color: ['#80FFA5', '#00DDFF'],
        title: { text: '收缩压 & 舒张压 (mmHg)' },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: { backgroundColor: '#6a7985' }
            }
        },
        legend: { data: ['收缩压', '舒张压'] },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: dateList
            }
        ],
        yAxis: [{ type: 'value' }],
        series: [
            {
                name: '收缩压',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 1 },
                showSymbol: false,
                areaStyle: { opacity: 0.8 },
                emphasis: { focus: 'series' },
                data: pressure1
            },
            {
                name: '舒张压',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 1 },
                showSymbol: false,
                areaStyle: { opacity: 0.8 },
                emphasis: { focus: 'series' },
                data: pressure2
            }
        ]
    } as EChartsOption
    return option
}

export const expectancy = async () => {
    const { data } = await axios.get('/life-expectancy-table.json')
    var symbolSize = 2.5
    const option = {
        grid3D: {},
        xAxis3D: {
            type: 'category'
        },
        yAxis3D: {},
        zAxis3D: {},
        dataset: {
            dimensions: [
                'Income',
                'Life Expectancy',
                'Population',
                'Country',
                { name: 'Year', type: 'ordinal' }
            ],
            source: data
        },
        series: [
            {
                type: 'scatter3D',
                symbolSize: symbolSize,
                encode: {
                    x: 'Country',
                    y: 'Life Expectancy',
                    z: 'Income',
                    tooltip: [0, 1, 2, 3, 4]
                }
            }
        ]
    } as EChartsOption
    return option
}

export const nebula = async () => {
    const dataURL = '/fake-nebula.bin'
    const response = await axios.get(dataURL, {
        responseType: 'arraybuffer'
    })
    const rawData = new Float32Array(response.data)
    const option = {
        grid: {
            right: 70,
            bottom: 70
        },
        toolbox: {
            right: 20,
            feature: {
                dataZoom: {}
            }
        },
        xAxis: [{}],
        yAxis: [{}],
        animation: false,
        dataZoom: [
            { type: 'inside' },
            {
                type: 'inside',
                orient: 'vertical'
            }
        ],
        series: [
            {
                type: 'scatter',
                data: rawData,
                dimensions: ['x', 'y'],
                symbolSize: 3,
                itemStyle: {
                    opacity: 0.4
                },
                blendMode: 'source-over',
                large: true,
                largeThreshold: 500
            }
        ]
    } as EChartsOption
    return option
}
