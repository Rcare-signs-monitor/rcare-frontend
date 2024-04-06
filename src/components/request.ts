import axios from 'axios'
import type { Person, Result, Signs } from './interface'

const sign_sort = (signs:Signs)=>{
    if(!signs.heart || !signs.respire || !signs.dbp || !signs.sbp || !signs.ecg) return signs
    signs.heart = signs.heart.sort((a,b)=>new Date(a.time)>new Date(b.time)?1:-1)
    signs.respire = signs.respire.sort((a,b)=>new Date(a.time)>new Date(b.time)?1:-1)
    signs.dbp = signs.dbp.sort((a,b)=>new Date(a.time)>new Date(b.time)?1:-1)
    signs.sbp = signs.sbp.sort((a,b)=>new Date(a.time)>new Date(b.time)?1:-1)
    signs.ecg = signs.ecg.sort((a,b)=>new Date(a.time)>new Date(b.time)?1:-1)
    return signs
}

export const getBeds = async () => {
    const url = import.meta.env.VITE_API_BASE_URL + '/rooms'
    const response = (await axios.get(url)).data as Result
    return response.data
}

export const getMembers = async (param?: {
    name?: string | null
    gender?: number | null
    ageBegin?: number | null
    ageEnd?: number | null
    room?: string | null
    num?: number | null
}): Promise<Person[]> => {
    const url = import.meta.env.VITE_API_BASE_URL + '/members'

    const response = (await axios.get(url, { params: param })).data as Result
    if (response.code === 1) {
        const data = response.data
        data.forEach((item: Person)  => {
            item.signs = sign_sort(item.signs)
        })
        return data
    } else {
        throw Error('getMembers code: 0')
    }
}

export const addMember = async (data: { name: string; gender: number; age: number; image: string | null }) => {
    const response = (await axios.post(import.meta.env.VITE_API_BASE_URL + '/members', data)).data as Result
    return response
}

export const updateMember = async (data: { id: number; name: string; gender: number; age: number; image: string | null }) => {
    const response = (await axios.put(import.meta.env.VITE_API_BASE_URL + '/members', data)).data as Result
    return response
}

export const delMember = async (id: number) => {
    const response = (await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/members/${id}`)).data as Result
    return response
}

export const getSignsTable = async (id: number, num?: number) => {
    let url = `${import.meta.env.VITE_API_BASE_URL}/signs/${id}`
    if (num) url += `?num=${num}&table=true`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        const data = response.data
        data.forEach((element: { dbp: number; ecg: number; heart: number; respire: number; sbp: number }) => {
            element.dbp = parseFloat(element.dbp.toFixed(2))
            element.ecg = parseFloat(element.ecg.toFixed(2))
            element.heart = parseFloat(element.heart.toFixed(2))
            element.respire = parseFloat(element.respire.toFixed(2))
            element.sbp = parseFloat(element.sbp.toFixed(2))
        });
        return data
    } else {
        throw Error('getSigns code: 0')
    }
}

export const getSigns = async (id: number, num?: number) => {
    let url = `${import.meta.env.VITE_API_BASE_URL}/signs/${id}`
    if (num) url += `?num=${num}`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        let data = response.data as Signs
        data = sign_sort(data)
        console.log(data)
        return data
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

export const initRadar = async ()=>{
    const url = `${import.meta.env.VITE_API_BASE_URL}/init`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('init radar succussfully');
        
    } else {
        throw Error('failed to init radar(init.bat)')
    }
}

export const runRadar = async ()=>{
    const url = `${import.meta.env.VITE_API_BASE_URL}/collect`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('init radar succussfully');
        
    } else {
        throw Error('failed to run radar(collect.bat)')
    }
}

export const stopRadar = async ()=>{
    const url = `${import.meta.env.VITE_API_BASE_URL}/stop`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('stop radar succussfully');
        
    } else {
        throw Error('failed to stop radar(signal.bat)')
    }
}