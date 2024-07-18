import type { Sign } from './interface'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

export const getLineOption = (data: Sign[], type: string, smooth: boolean = false, color: string = 'blue') => {
    let dateList: string[] = []
    let valueList: number[] = []
    if (data) {
        dateList = data.map((item) => item.time)
        valueList = data.map((item) => item.data)
    }

    const thresh: { [type: string]: number[] } = {
        heart: [60, 120],
        respire: [12, 27],
        sbp: [80, 120],
        dbp: [120, 160],
        ecg: [60, 120]
    }

    const color_table: { [color: string]: string[] } = {
        blue: ['#4BA0C3', 'rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)'],
        green: ['#12DBDB', '#5ED1C1', 'rgba(109,171,169, 0)'],
        yellow: ['#F6D96D', '#F2D765', 'rgba(244,217,105, 0)']
    }

    const option = {
        grid: {
            left: 40,
            right: 25,
            bottom: 20,
            top: 20
        },
        tooltip: { trigger: 'axis' },
        xAxis: [{ data: dateList }],
        yAxis: [{}],

        series: [
            {
                type: 'line',
                itemStyle: {
                    color: color_table[color][0]
                },
                smooth: smooth,
                data: valueList,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: color_table[color][1]
                        },
                        {
                            offset: 1,
                            color: color_table[color][2]
                        }
                    ])
                },
                endLabel: {
                    show: true,
                    formatter: function (params: any) {
                        return params.value[0]
                    }
                }
            }
        ]
    } as EChartsOption

    const end = valueList.findLastIndex((item) => item < thresh[type][0] || item > thresh[type][1])
    const start = valueList.findLastIndex((item, index) => item >= thresh[type][0] && item <= thresh[type][1] && index < end)

    if (start === -1 && end !== -1) {
        option['visualMap'] = {
            show: false,
            dimension: 0,
            pieces: [
                {
                    lt: end,
                    color: color_table[color][0]
                },
                {
                    gte: start,
                    lte: dateList.length - 1,
                    color: 'red'
                }
            ]
        }
    } else if (start !== -1 && end !== -1) {
        option['visualMap'] = {
            show: false,
            dimension: 0,
            pieces: [
                {
                    lt: start + 1,
                    color: color_table[color][0]
                },
                {
                    gte: start,
                    lte: end,
                    color: 'red'
                },
                {
                    gt: end,
                    color: color_table[color][0]
                }
            ]
        }
    }

    return option
}

export const getDoubleLineOption = (data1: Sign[], data2: Sign[]) => {
    let dateList1: string[] = [] // 假设收缩压和舒张压是同时测量的
    let valueList1: number[] = []
    // let dateList2: string[] = []
    let valueList2: number[] = []

    if (data1 && data2) {
        dateList1 = data1.map((item) => item.time)
        // dateList2 = data2.map(item => item.time)
        valueList1 = data1.map((item) => item.data)
        // valueList2 = data2.map((item) => item.data)
        valueList2 = []
        for(let i=0; i<data2.length; i++){
            valueList2.push(data2[i].data - valueList1[i])
        }
    }

    const option = {
        color: ['#9A6599', '#9A6599'],
        grid: {
            left: 40,
            right: 50,
            bottom: 20,
            top: 20
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: { backgroundColor: '#6a7985' }
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: dateList1
            }
        ],
        yAxis: [{ type: 'value' }],
        series: [
            {
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 2, color: '#AD84AB' },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#9373C2'
                        },
                        {
                            offset: 1,
                            color: '#379ADA'
                        }
                    ])
                },
                emphasis: { focus: 'series' },
                data: valueList1,
                endLabel: {
                    show: true,
                    formatter: function (params: any) {
                        return params.value[0]
                    }
                }
            },
            {
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 1, color: '#DFBFFF' },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#7862AE'
                        },
                        {
                            offset: 1,
                            color: '#382E5C'
                        }
                    ])
                },
                emphasis: { focus: 'series' },
                data: valueList2,
                endLabel: {
                    show: true,
                    formatter: function (params: any) {
                        return params.value[0]
                    }
                }
            }
        ]
    } as EChartsOption
    return option
}