import { UserApplication } from "../../app";
import { UsersController } from "../http-api";
import { UsersRepository } from "../repository";
import { prisma } from "../../helper/prisma.helper"

const usersRepository = new UsersRepository(prisma);
const userApplication = new UserApplication(usersRepository);
const UsersClt = () => new UsersController(userApplication);
export {
    UsersClt
}
