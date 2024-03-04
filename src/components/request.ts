import axios from 'axios'
import type { Person, Result, Sign } from './interface'

export const getMembers = async (param?: { name?: string | null; gender?: number | null; ageBegin?: number | null; ageEnd?: number | null; address?: string | null }): Promise<Person[]> => {
    const url = import.meta.env.VITE_API_BASE_URL + '/members'

    const response = (await axios.get(url, { params: param })).data as Result
    if (response.code === 1) {
        const data: Person[] = response.data

        data.map((item) => {
            item.sign = item.sign
                ? ({
                      detectTime: item.sign.detectTime,
                      heartRate: Math.floor(item.sign.heartRate * 100) / 100,
                      respiratoryRate: Math.floor(item.sign.respiratoryRate * 100) / 100,
                      systolicPressure: Math.floor(item.sign.systolicPressure * 100) / 100,
                      diastolicPressure: Math.floor(item.sign.diastolicPressure * 100) / 100
                  } as Sign)
                : ({
                      detectTime: new Date().toISOString(),
                      heartRate: 0.0,
                      respiratoryRate: 0,
                      systolicPressure: 0,
                      diastolicPressure: 0
                  } as Sign)
        })
        return data
    } else {
        throw Error('getMembers code: 0')
    }
}

export const addMember = async (data: { name: string; gender: number; age: number; address: string | null; image: string | null }) => {
    const response = (await axios.post(import.meta.env.VITE_API_BASE_URL + '/members', data)).data as Result
    // console.log(response);
    return response
}

export const updateMember = async (data: { id: number; name: string; gender: number; age: number; address: string | null; image: string | null }) => {
    console.log(data)

    const response = (await axios.put(import.meta.env.VITE_API_BASE_URL + '/members', data)).data as Result
    // console.log(response);
    return response
}

export const delMember = async (id: number) => {
    const response = (await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/members/${id}`)).data as Result
    // console.log(response);
    return response
}

export const getSigns = async (id: number, num?: number) => {
    let url = `${import.meta.env.VITE_API_BASE_URL}/signs/${id}`
    if (num) url += `?num=${num}`
    const response = (await axios.get(url)).data as Result
    if (response.code === 1) {
        const data: Sign[] = response.data
        if (data.length == 0) return []
        data.map((item) => {
            item.heartRate = Number(item.heartRate.toFixed(2))
            item.respiratoryRate = Number(item.respiratoryRate.toFixed(2))
            item.systolicPressure = Number(item.systolicPressure.toFixed(2))
            item.diastolicPressure = Number(item.diastolicPressure.toFixed(2))
        })
        return data.sort((a, b) => {
            return new Date(a.detectTime).getTime() - new Date(b.detectTime).getTime()
        })
    } else {
        throw Error('getSigns code: 0')
    }
}

export const getParas = async () => {
    const response = (await axios.get(import.meta.env.VITE_API_BASE_URL + '/paras')).data as Result
    if (response.code === 1) return response.data
    else throw Error('getParas code: 0')
}

export const setParas = async (data: { para1: string; para2: string }) => {
    const response = (await axios.post(import.meta.env.VITE_API_BASE_URL + '/paras', data)).data as Result
    // console.log(response);
    return response
}
