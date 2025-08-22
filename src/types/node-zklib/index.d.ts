declare module "node-zklib" {
  export default class ZKLib {
    ip: string;
    port: number;
    timeout: number;
    inport: number;

    constructor(ip: string, port: number, timeout?: number, inport?: number);

    createSocket(): Promise<boolean>;
    getUsers(): Promise<{ data: {
      uid: number,
      role: number,
      password: string,
      name: string,
      cardno: number,
      userId: string    
    }[],
    err: string | null
  }>;
    getAttendances(): Promise<{ data: {
      userSn: number,
      deviceUserId: string,
      recordTime: Date
      ip: string
    }[],
    err: string | null }>;
    disconnect(): Promise<void>;
    freeData(): Promise<void>;
    getVersion(): Promise<{
      version: string | null;
      error?: string | null;
    }>;
    getRealTimeLogs(callback: (data: any) => void): void;
    // Si necesitas más métodos, los agregas aquí:
    // clearAttendanceLog(): Promise<void>;
    enableDevice(): Promise<void>;
    getInfo(): Promise<any>;
  }
}
