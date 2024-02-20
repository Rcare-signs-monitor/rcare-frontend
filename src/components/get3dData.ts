import axios from "axios";
import type { EChartsOption } from "echarts";

const get3dData = async () => {
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
    } as unknown as EChartsOption;
    return option
}

const get2dData = async ()=>{
    const dataURL = '/fake-nebula.bin';
    const response = await axios.get(dataURL, {
        responseType: 'arraybuffer',
    });
    const rawData = new Float32Array(response.data);
    const option = {
        title: {
          left: 'center',
        //   text: '1,000,000 Points',
          subtext: 'Fake data'
        },
        tooltip: {},
        toolbox: {
          right: 20,
          feature: {
            dataZoom: {}
          }
        },
        grid: {
          right: 70,
          bottom: 70
        },
        xAxis: [{}],
        yAxis: [{}],
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider',
            showDataShadow: false,
            handleIcon:
              'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%'
          },
          {
            type: 'inside',
            orient: 'vertical'
          },
          {
            type: 'slider',
            orient: 'vertical',
            showDataShadow: false,
            handleIcon:
              'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%'
          }
        ],
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

export { get3dData, get2dData }