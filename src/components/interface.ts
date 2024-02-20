interface Sign {
    heartRate: number
    respiratoryRate: number
    systolicPressure: number
    diastolicPressure: number
    detectTime: string
}
// {
//     "detect_time": "2024-01-01 01:01:01",
//     "heart_rate": 96,
//     "respiratory_rate": 24,
//     "systolic_pressure": 120,
//     "diastolic_pressure": 78
// }

interface BasePerson {
    id: number
    name: string
    gender: number
    age: number
    address: string
    image: string
}

interface Person extends BasePerson {
    sign: Sign
}

interface Result{
    code: number
    msg: string
    data: any
}

export type { Sign, Person, BasePerson, Result }
