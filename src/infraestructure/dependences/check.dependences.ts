import { ChecksApplication } from "../../app";
import { ChecksController } from "../http-api";
import { ChecksRepository } from "../repository";
import { FormatExcel } from "../../app/checks/excel.service";
import { prisma } from "../../helper/prisma.helper";

const checksRepository = new ChecksRepository(prisma);
const checksExcel = new FormatExcel();
const checksApplication = new ChecksApplication(checksRepository, checksExcel);
const ChecksClt = () => new ChecksController(checksApplication);

export { ChecksClt };