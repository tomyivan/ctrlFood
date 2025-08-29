import { IUser, User, UserDTO } from "../../domain";
export class UserApplication {
    constructor( private readonly _userRepo: IUser) {}

    getAll(): Promise<UserDTO[]> {
        return this._userRepo.getAll();
    }

    add(data: User): Promise<number> {
        return this._userRepo.add(data);
    }

}