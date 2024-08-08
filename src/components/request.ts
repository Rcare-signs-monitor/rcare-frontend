import axios from 'axios'
import type { Person, Result, Sign, Signs } from './interface'

const sign_sort = (signs: Signs) => {
    if (!signs.heart || !signs.respire || !signs.dbp || !signs.sbp ||!signs.temper || !signs.ecg) return signs
    signs.heart = signs.heart.sort((a, b) => (new Date(a.time) > new Date(b.time) ? 1 : -1))
    signs.respire = signs.respire.sort((a, b) => (new Date(a.time) > new Date(b.time) ? 1 : -1))
    signs.dbp = signs.dbp.sort((a, b) => (new Date(a.time) > new Date(b.time) ? 1 : -1))
    signs.sbp = signs.sbp.sort((a, b) => (new Date(a.time) > new Date(b.time) ? 1 : -1))
    signs.temper = signs.temper.sort((a, b) => (new Date(a.time) > new Date(b.time) ? 1 : -1))
    signs.ecg = signs.ecg.sort((a, b) => (new Date(a.time) > new Date(b.time) ? 1 : -1))

    signs.respire.forEach((e: Sign) => {
        e.data = parseFloat(e.data.toFixed(2))
    })
    signs.heart.forEach((e: Sign) => {
        e.data = parseFloat(e.data.toFixed(2))
    })
    signs.dbp.forEach((e: Sign) => {
        e.data = parseFloat(e.data.toFixed(2))
    })
    signs.sbp.forEach((e: Sign) => {
        e.data = parseFloat(e.data.toFixed(2))
    })
    signs.temper.forEach((e: Sign) => {
        e.data = parseFloat(e.data.toFixed(2))
    })
    signs.ecg.forEach((e: Sign) => {
        e.data = parseFloat(e.data.toFixed(2))
    })
    return signs
}

export const getBeds = async () => {
    const url = import.meta.env.VITE_API_BASE_URL + '/rooms'
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log(response.data)
        const data = response.data
        Object.keys(data).forEach((room) => {
            data[room].forEach((bed: any) => {
                bed.heart = bed.heart?parseFloat(bed.heart.toFixed(2)):0
                bed.respire = bed.respire?parseFloat(bed.respire.toFixed(2)):0
                bed.dbp = bed.dbp?parseFloat(bed.dbp.toFixed(2)):0
                bed.sbp = bed.sbp?parseFloat(bed.sbp.toFixed(2)):0
                bed.temper = bed.temper?parseFloat(bed.temper.toFixed(2)):0
            })
        })        
        return data
    } else {
        throw Error('getSigns code: 0')
    }
}

export const getMembers = async (param?: {
    room?: string | null
    num?: number | null
}): Promise<Person[]> => {
    const url = import.meta.env.VITE_API_BASE_URL + '/members'

    const response = (await axios.get(url, { params: param })).data as Result
    if (response.code === 1) {
        const data = response.data
        data.forEach((item: Person) => {
            if(item.signs) item.signs = sign_sort(item.signs)
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
        data.forEach((element: { dbp: number; heart: number; respire: number; sbp: number; temper: number }) => {
            element.dbp = parseFloat(element.dbp.toFixed(2))
            element.heart = parseFloat(element.heart.toFixed(2))
            element.respire = parseFloat(element.respire.toFixed(2))
            element.sbp = parseFloat(element.sbp.toFixed(2))
            element.temper = parseFloat(element.temper.toFixed(2))
        })
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

/*
硬件控制 ver1
*/
export const initRadar = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/init`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('init radar succussfully')
    } else {
        throw Error('failed to init radar(init.bat)')
    }
}

export const runRadar = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/collect`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('init radar succussfully')
    } else {
        throw Error('failed to run radar(collect.bat)')
    }
}

export const stopRadar = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/stop`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('stop radar succussfully')
    } else {
        throw Error('failed to stop radar(signal.bat)')
    }
}

/*
表情异常警报
*/
export const getFace = async () => {
    // TODO：现在只检测 id = 3 的病患表情识别异常
    const url = `${import.meta.env.VITE_API_BASE_URL}/face/3`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        return response.data == 1
    } else {
        throw Error('get isFaceWarning code: 0')
    }
}

export const cancelFace = async () => {
    // TODO: 现在只实现 id = 3 的病患
    const url = `${import.meta.env.VITE_API_BASE_URL}/face`
    const response = (
        await axios.post(url, {
            id: 3,
            data: 0
        })
    ).data as Result

    if (response.code === 1) {
        return response.data
    } else {
        throw Error('post isFaceWarning code: 0')
    }
}

/*
呼叫警报
*/
export const getCalling = async () => {
    // TODO：现在只检测 id = 3 的病患是否呼救
    const url = `${import.meta.env.VITE_API_BASE_URL}/calling/3`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        return response.data == 1
    } else {
        throw Error('get isCalling code: 0')
    }
}

export const cancelCalling = async () => {
    // TODO: 现在只实现 id = 3 的病患
    const url = `${import.meta.env.VITE_API_BASE_URL}/calling`
    const response = (
        await axios.post(url, {
            id: 3,
            data: 0
        })
    ).data as Result

    if (response.code === 1) {
        return response.data
    } else {
        throw Error('post isCalling code: 0')
    }
}

/*
硬件控制ver2
*/
export const command1 = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/command1`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('command1 succussfully')
    } else {
        throw Error('failed to run command1')
    }
}

export const command2 = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/command2`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('command2 succussfully')
    } else {
        throw Error('failed to run command2')
    }
}

export const command3 = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/command3`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('command3 succussfully')
    } else {
        throw Error('failed to run command3')
    }
}

export const command4 = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/command4`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('command4 succussfully')
    } else {
        throw Error('failed to run command4')
    }
}

export const command5 = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/command5`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('command5 succussfully')
    } else {
        throw Error('failed to run command5')
    }
}

export const command6 = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/command6`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('command6 succussfully')
    } else {
        throw Error('failed to run command6')
    }
}

export const command7 = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/command7`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('command7 succussfully')
    } else {
        throw Error('failed to run command7')
    }
}

export const command8 = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/command8`
    const response = (await axios.get(url)).data as Result

    if (response.code === 1) {
        console.log('command8 succussfully')
    } else {
        throw Error('failed to run command8')
    }
}
