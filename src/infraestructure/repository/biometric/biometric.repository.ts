import  type { checkTimeBioDTO, IBiometric, UserBioDTO, UserBio } from "../../../domain";

import type Zkteco from "zkteco-js";
export class BiometricRepository implements IBiometric {
    constructor(private readonly _device : Zkteco) {
        
    }
    private async connectToDevice() {
        await this._device.createSocket();
    }

    async getUser(): Promise<UserBioDTO[]> {
        await this.connectToDevice();
        const { data } = await this._device.getUsers();
        return data;
    }

    async setUser(user: UserBio): Promise<any> {
        await this.connectToDevice();
        return this._device.setUser(user.uid, String(user.userId), user.name, user.password);
    }

    async getRealTimeLogs(callback: (log: checkTimeBioDTO) => void): Promise<void> {
        await this.connectToDevice();
        await this._device.getRealTimeLogs(callback);
    }

    async refreshTime(): Promise<void> {
        try {
            await this.connectToDevice();
            this._device.setTime(new Date());
        } catch (error) {
            console.error("Error refreshing time:", error);
        }

    }
}