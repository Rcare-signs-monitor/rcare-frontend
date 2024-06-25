export interface Sign {
    time: string
    data: number
}

export interface Status {
    chestPain: number // 胸痛
    exerciseAngina: number // 心绞痛
    heartDisease: number // 心脏病
}

export interface Signs {
    heart: Sign[]
    respire: Sign[]
    sbp: Sign[]
    dbp: Sign[]
    ecg: Sign[]
    status: Status
}

export interface BasePerson {
    room: string
    bed: string
    id: number
    name: string
    gender: number
    age: number
    doctor: string
    day: number
    result: string
    allergy: string
    healing: string
    contact: string
    attention: string
    image: string
    openid: string
}

export interface Person {
    info: BasePerson
    signs: Signs
}

export interface Result {
    code: number
    msg: string
    data: any
}
