import { SchdlCtrl, SchMddl } from "../../../dependences/schedule.dependences";
import { Router } from "express";
import { CredentialMiddleware } from "../../../../common";
import { check, query } from "express-validator";
import { validationField } from "../../../../util";
const routerSchdl = Router();
routerSchdl.get("/", 
     SchdlCtrl().getAllFood.bind(SchdlCtrl()));

routerSchdl.put("/updateFood", CredentialMiddleware.validationJWT,
    CredentialMiddleware.checkRole([1]),[
        check('schedule.idSchedule', 'El id del horario es obligatorio').not().isEmpty(),
        check('schedule.startTime', 'La hora de inicio es obligatoria').not().isEmpty(),
        check('schedule.endTime', 'La hora de fin es obligatoria').not().isEmpty(),
        check('schedule.description', 'La descripción es obligatoria').not().isEmpty(),
    ],
    SchdlCtrl().update.bind(SchdlCtrl())
)
 
routerSchdl.post("/addSchedule", CredentialMiddleware.validationJWT,
    CredentialMiddleware.checkRole([1]), [
        check('schedules', 'Los horarios son obligatorios').isArray().notEmpty(),
        check('schedules.*.userId', 'El id del usuario es obligatorio').not().isEmpty(),
        check('schedules.*.idSchedule', 'El id del horario es obligatorio').not().isEmpty(),
        check('schedules.*.date', 'La fecha de inicio es obligatoria').not().isEmpty(),
        validationField
    ],
    // SchMddl().validateSchedule.bind(SchMddl()),
    SchdlCtrl().addSchedule.bind(SchdlCtrl())
);

routerSchdl.get("/all", CredentialMiddleware.validationJWT,
    CredentialMiddleware.checkRole([1]),[
        query('userId').optional().isInt().withMessage('El id del usuario debe ser un número entero'),
        query('idSchedule').optional().isInt().withMessage('El id del horario debe ser un número entero'),
        query('date').optional().isString().withMessage('La fecha debe ser una cadena'),
        query('dni').optional().isString().withMessage('El DNI debe ser una cadena'),
    ],

    SchdlCtrl().getAllSchedule.bind(SchdlCtrl())
);

routerSchdl.post("/copySchedule", CredentialMiddleware.validationJWT,
    CredentialMiddleware.checkRole([1]),[
        check('copy.fromDate.year', 'El año de origen es obligatorio').not().isEmpty().isInt().withMessage('El año de origen debe ser un número entero'),
        check('copy.fromDate.month', 'El mes de origen es obligatorio').not().isEmpty().isInt().withMessage('El mes de origen debe ser un número entero'),
        check('copy.toDate.year', 'El año de destino es obligatorio').not().isEmpty().isInt().withMessage('El año de destino debe ser un número entero'),
        check('copy.toDate.month', 'El mes de destino es obligatorio').not().isEmpty().isInt().withMessage('El mes de destino debe ser un número entero'),
    ],
    SchdlCtrl().copySchedules.bind(SchdlCtrl())
);



export {
    routerSchdl
}