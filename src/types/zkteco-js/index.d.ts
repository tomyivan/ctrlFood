
declare module "zkteco-js" {
    export default class ZKteco {
        constructor(ip: string, port: number, timeout: number, retryInterval: number);
        createSocket(): Promise<void>;
        enableDevice(): Promise<void>;
        getInfo(): Promise<any>;
        getVersion(): Promise<string>;
        getUsers(): Promise< { data: {
             uid: number,
        role: number,
        password: string,
        name: string,
        cardno: number,
        userId: string} []
        }>;
        setUser(uid: number, userid: string, name: string, password: string, role?: number, cardno?: number): Promise<any>;
        setTime(date: Date): Promise<any>;
        getAttendances(): Promise<any[]>;
        getRealTimeLogs(callback: (data: {
            ok: boolean;
            userId: string, 
            attTime:Date
        }) => void): void;
        clearAttendanceLog(): Promise<void>;
        disconnect(): Promise<void>;
        voiceTest(index?:number): Promise<void>;
    }
}