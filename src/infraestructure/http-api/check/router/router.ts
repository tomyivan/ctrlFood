import { Router } from "express";
import { ChecksClt } from "../../../dependences/check.dependences";
import { validationField } from "../../../../util";
import { query } from "express-validator";
const routerChk = Router();
const checksController = ChecksClt();
routerChk.get("/", checksController.getAll.bind(checksController));
routerChk.get("/count", [
    query("date").notEmpty().withMessage("La fecha es obligatoria"),
    validationField
],checksController.checkCount.bind(checksController));
export { routerChk };