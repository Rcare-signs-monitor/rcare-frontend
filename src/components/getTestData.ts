import type { Person, Sign } from "./interface"
import type { EChartsOption } from "echarts";
import axios from 'axios'

/*
export const getMembers = () => {
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
            image: 'https://img.moegirl.org.cn/common/thumb/a/a3/Gbp-soyo.png/300px-Gbp-soyo.png'
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

    _data.map(item => {
        item.sign = {
            detectTime: new Date().toISOString(),
            heartRate: 0,
            respiratoryRate: 0,
            systolicPressure: 0,
            diastolicPressure: 0
        } as Sign
    })
    return _data
}

export const getSigns = (id: number, num?: number) => {
    var data = []
    for (let i = 0; i < num!; i++) {
        const systolic_pressure = Number((Math.random() * 100).toFixed(2))
        data.push({
            "detectTime": (new Date(1708418869329 + Math.random() * 10000000)).toISOString(),
            "heartRate": Number((Math.random() * 100).toFixed(2)),
            "respiratoryRate": Number((Math.random() * 100).toFixed(2)),
            "systolicPressure": systolic_pressure,
            "diastolicPressure": Number((systolic_pressure + Math.random() * 100).toFixed(2)),
        } as Sign)
    }
    return data.sort((a, b) => {
        return (new Date(a.detectTime)).getTime() - (new Date(b.detectTime)).getTime();
    });
}

export const getLastSign = (person: Person) => {
    person.sign = getSigns(person.id, 1)[0]
    return person
}
*/

export const getLineOption = (data: Sign[], label:'heartRate'|'respiratoryRate', title:string, smooth = false) => {
    const dateList = data.map(item => item['detectTime'])
    const valueList = data.map(item => item[label])

    const option = {
        title: { text: title },
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 100
        }],
        tooltip: { trigger: 'axis' },
        xAxis: [{ data: dateList }],
        yAxis: [{}],
        series: [{
            type: 'line',
            showSymbol: false,
            smooth: smooth,
            data: valueList
        }]
    } as EChartsOption
    return option
}

export const getPressureOption = (data: Sign[]) => {
    const dateList = data.map(item => item['detectTime'])
    const pressure1 = data.map(item => item['systolicPressure'])
    const pressure2 = data.map(item => item['diastolicPressure'] - item['systolicPressure'])

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
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: dateList
        }],
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
            },
        ]
    } as EChartsOption;
    return option
}

export const expectancy = async () => {
  const { data } = await axios.get('/life-expectancy-table.json')
  var symbolSize = 2.5;
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
  } as EChartsOption;
  return option
}

export const nebula = async () => {
  const dataURL = '/fake-nebula.bin';
  const response = await axios.get(dataURL, {
    responseType: 'arraybuffer',
  });
  const rawData = new Float32Array(response.data);
  const option = {
    grid: {
      right: 70,
      bottom: 70
    },
    xAxis: [{}],
    yAxis: [{}],
    animation: false,
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
  } as EChartsOption;
  return option
}