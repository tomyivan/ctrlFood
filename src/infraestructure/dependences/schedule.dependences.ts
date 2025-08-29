import { ScheduleApplication } from "../../app";
import { ScheduleController, ScheduleMiddleware } from "../http-api";
import { ScheduleRepository } from "../repository";
import { ScheduleService } from "../../app/schedule/schedule.service";
import { prisma } from "../../helper/prisma.helper";
const schdlRepo = new ScheduleRepository(prisma);
const schdlService = new ScheduleService(schdlRepo);
const schdlApp = new ScheduleApplication(schdlRepo, schdlService);
const SchdlCtrl = () => new ScheduleController(schdlApp);
const SchMddl = () => new ScheduleMiddleware(schdlApp);
export {
    SchdlCtrl,
    SchMddl
}
