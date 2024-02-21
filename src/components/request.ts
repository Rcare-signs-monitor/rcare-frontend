import axios from 'axios'
import type { Person, Result, Sign } from './interface'

export const getMembers = async (data?: {
    name?: string | null,
    gender?: number | null,
    ageBegin?: number | null,
    ageEnd?: number | null,
    address?: string | null
}): Person[] => {
    var url = 'http://localhost:8080/members'
    const response = (await axios.get(url, { params: data })).data as Result
    if (response.code === 1) {
        var data: Person[] = response.data
        data.map((item) => {
            item.sign = {
                detectTime: new Date().toISOString(),
                heartRate: 0,
                respiratoryRate: 0,
                systolicPressure: 0,
                diastolicPressure: 0
            } as Sign
        })
        return data
    } else {
        throw Error('getMembers code: 0')
    }
}

export const addMember = async (data: {
    name: string
    gender: number
    age: number
    address: string | null
    image: string | null
}) => {
    var response = (await axios.post('http://localhost:8080/members', data)).data as Result
    // console.log(response);
}

export const updateMember = async (data: {
    id: number
    name: string
    gender: number
    age: number
    address: string | null
    image: string | null
}) => {
    console.log(data)

    var response = (await axios.put('http://localhost:8080/members', data)).data as Result
    // console.log(response);
}

export const delMember = async (id: number) => {
    var response = (await axios.delete(`http://localhost:8080/members/${id}`)).data as Result
    // console.log(response);
}

export const getSigns = async (id: number, num?: number) => {
    var url = `http://localhost:8080/signs/${id}`
    if (num) url += `?num=${num}`
    var response = (await axios.get(url)).data as Result
    if (response.code === 1) {
        var data: Sign[] = response.data
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

export const getLastSign = async (person: Person) => {
    const signs = await getSigns(person.id, 1)
    if (signs.length > 0) person.sign = signs[0]
    else
        person.sign = {
            detectTime: new Date().toISOString(),
            heartRate: 0,
            respiratoryRate: 0,
            systolicPressure: 0,
            diastolicPressure: 0
        }
    return person
}

export const getParas = async () => {
    const response = (await axios.get('http://localhost:8080/paras')).data as Result
    if (response.code === 1) return response.data
    else throw Error('getParas code: 0')
}

export const setParas = async (data: { para1: string; para2: string }) => {
    var response = (await axios.post('http://localhost:8080/paras', data)).data as Result
    // console.log(response);
}
