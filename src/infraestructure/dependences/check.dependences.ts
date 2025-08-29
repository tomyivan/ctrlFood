import { ChecksApplication } from "../../app";
import { ChecksController } from "../http-api";
import { ChecksRepository } from "../repository";
import { prisma } from "../../helper/prisma.helper";

const checksRepository = new ChecksRepository(prisma);
const checksApplication = new ChecksApplication(checksRepository);
const ChecksClt = () => new ChecksController(checksApplication);

export { ChecksClt };