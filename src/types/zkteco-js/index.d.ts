declare module "zkteco-js" {
    export default class ZKteco {
        constructor(ip: string, port: number, timeout: number, retryInterval: number);
        createSocket(): Promise<void>;
        enableDevice(): Promise<void>;
        getInfo(): Promise<any>;
        getVersion(): Promise<string>;
        getUsers(): Promise<any[]>;
        getAttendances(): Promise<any[]>;
        getRealTimeLogs(callback: (data: any) => void): void;
        clearAttendanceLog(): Promise<void>;
        disconnect(): Promise<void>;
    }
}