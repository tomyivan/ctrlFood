export interface UserDTO {
    role: number,
    password: string,
    name: string,
    dni: string,
    userId: string
}

export interface User {
    userId: number,
    dni: string,
    name: string,
    pass?: number,
}
