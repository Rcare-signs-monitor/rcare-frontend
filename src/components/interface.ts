interface Sign {
    heartRate: number
    respiratoryRate: number
    systolicPressure: number
    diastolicPressure: number
    detectTime: string
}

interface BasePerson {
    id: number
    name: string
    gender: number
    age: number
    address: string
    image: string
    openid: string
}

interface Person extends BasePerson {
    sign: Sign
}

interface Result {
    code: number
    msg: string
    data: any
}

export type { Sign, Person, BasePerson, Result }
