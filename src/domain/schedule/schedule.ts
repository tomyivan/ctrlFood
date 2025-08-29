export interface ScheduleFood {
    idSchedule: number,
    startTime: Date,
    endTime: Date,
    description: string,
}

export interface ScheduleFoodDTO {
    idSchedule: number,
    startTime: Date,
    endTime: Date,
    description: string,
}

export interface Schedule {
    userId: number,
    idSchedule: number,
    date: string | Date,
}

export interface ScheduleDTO {
    employee: string;
    userId: number;
    date: Date;
    dni: string;
    description: string;
}

export interface ScheduleFilter {
    userId?: number,
    idSchedule?: number,
    date?: string,
    dni?: string   
}