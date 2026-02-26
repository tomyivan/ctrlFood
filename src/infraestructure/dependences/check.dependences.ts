import { ChecksApplication } from "../../app";
import { ChecksController } from "../http-api";
import { ChecksRepository } from "../repository";
import { CheckGroupMapper } from "../mappers";
import { FormatExcel } from "../../app/checks/excel.service";
import { prisma } from "../../helper/prisma.helper";

const checksRepository = new ChecksRepository(prisma);
const checksExcel = new FormatExcel();
const checksApplication = new ChecksApplication(checksRepository, checksExcel);
const checkGroupMapper = new CheckGroupMapper();
const ChecksClt = () => new ChecksController(checksApplication, checkGroupMapper);

export { ChecksClt };