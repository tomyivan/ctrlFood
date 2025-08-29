import type { checkTimeBioDTO, IBiometric, IUser, User, UserBio } from "../../domain";
import type { ScheduleService } from "../schedule/schedule.service";
import type { ChecksService } from "../checks/checks.service";
import { DateUtil } from "../../util";
import { ErrorCustom } from "../../common/error/error.custom";
export class BiometricApplication {
    constructor(private readonly _bio: IBiometric,
        private readonly _scheduleSrv: ScheduleService,
        private readonly _checksSrv: ChecksService,
        private readonly _userRepo: IUser
    ) {}

    getUsers() {
        return this._bio.getUser();
    }

    async setUser(user: UserBio & User) {
        const data = await this._bio.getUser();
        const lastUid = data[data.length - 1]?.uid || 0;
        const userExists = data.find(u => u.userId === String(user.userId));
        if (userExists) {
            throw new ErrorCustom('Usuario ya existe', 409, { userId: user.userId });
        }
        await this._userRepo.add({
            dni: user.dni,
            name: user.name,
            userId: user.userId
        });
        return this._bio.setUser({
            ...user,
            name: user.name.split(" ")[0].substring(0, 20),
            password: '',
            uid: lastUid + 1
        });
    }

    getRealTimeLogs( callback: ( log: checkTimeBioDTO ) => void ) {   
        let idCheck = 0;
        return this._bio.getRealTimeLogs(async (data) => {
            if( data.ok ) {
                const newDate = DateUtil.exactDate( data.attTime );
                const schdlFood = await this._scheduleSrv.validationSchedule({ userId: Number(data.userId), date: DateUtil.convertDate(newDate) }, newDate);                
                if( schdlFood ) {
                    idCheck = await this._checksSrv.addCheck({
                        userId: Number(data.userId),
                        checkTime: newDate,
                        idSchedule: schdlFood.idSchedule
                    });                  
                }
                callback({
                    ok: idCheck > 0,
                    attTime: newDate,
                    userId: data.userId,
                    description: !schdlFood ? "Fuera de rango" : schdlFood.description,
                    employee: !schdlFood ? "Desconocido" : schdlFood.employee
                })
                
            }else{
                callback({
                    ok: false,
                    attTime: DateUtil.exactDate(DateUtil.getCurrentDate()),
                    userId: "-1",
                    description: "No tiene permisos",
                    employee: "Desconocido"
                });
            }
        });
    }

    refreshTime() {
        return this._bio.refreshTime();
    }
}