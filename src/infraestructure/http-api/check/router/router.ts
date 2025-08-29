import { Router } from "express";
import { ChecksClt } from "../../../dependences/check.dependences";
const routerChk = Router();
const checksController = ChecksClt();
routerChk.get("/", checksController.getAll.bind(checksController));
export { routerChk };