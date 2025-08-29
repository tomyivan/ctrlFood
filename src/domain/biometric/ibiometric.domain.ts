import { checkTimeBioDTO, UserBioDTO, UserBio } from "./biometric";
export interface IBiometric {
    getUser(): Promise<UserBioDTO[]>;
    getRealTimeLogs(callback: (log: checkTimeBioDTO) => void): Promise<void>;
    setUser(user: UserBio): Promise<any>;
    refreshTime(): Promise<void>;
}