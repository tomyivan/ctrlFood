import { checkTimeBioDTO, UserBioDTO, UserBio } from "./biometric";
export interface IBiometric {
    getUser(): Promise<UserBioDTO[]>;
    getRealTimeLogs(callback: (log: checkTimeBioDTO) => void): Promise<void>;
    setUser(user: UserBio): Promise<any>;
    voiceTest(voice?: number): Promise<void>;
    refreshTime(): Promise<void>;
}