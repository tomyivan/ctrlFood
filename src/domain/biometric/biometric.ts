export interface UserBioDTO {
    uid: number,
    role: number,
    password: string,
    name: string,
    cardno: number,
    userId: string
}

export interface UserBio {
    uid: number,
    userId: number,
    name: string,
    password: string,
    role: number,
    cardno: number
}


export interface checkTimeBioDTO {
    userId: string,
    attTime: Date,
    ok: boolean,
    description?:string,
    employee?:string
}