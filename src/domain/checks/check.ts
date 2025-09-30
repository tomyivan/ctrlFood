export interface CheckFilter {
    userId?: number;
    date?: string;
    idSchedule?: number;
    startDate?: string;
    endDate?: string;
}
export interface Checks {
    idCheck?: number,
    userId: number,
    checkTime: Date,
    idSchedule: number,
}

export interface ChecksDTO {
    idCheck: number,
    userId: number,
    checkTime: Date,
    checkDate: Date,
    description: string,
    employee:string,
    area: string | null
}

export interface CheckCount {
    breakfast: number,
    lunch: number,
    tea: number,
    dinner: number
}
