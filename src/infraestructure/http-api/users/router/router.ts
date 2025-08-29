import { UsersClt } from "../../../dependences/users.dependences";
import { Router } from "express";
import { CredentialMiddleware } from "../../../../common";
import { validationField } from "../../../../util";
import { check } from "express-validator";
const routerUsers = Router();

routerUsers.get("/", CredentialMiddleware.validationJWT,
    CredentialMiddleware.checkRole([1]),
    UsersClt().getAll.bind(UsersClt())
)

routerUsers.post("/add", CredentialMiddleware.validationJWT,
    CredentialMiddleware.checkRole([1]),
    [
        check("user.userId").notEmpty().isNumeric().withMessage("El ID de usuario es obligatorio"),
        check("user.dni").notEmpty().isString().withMessage("El DNI es obligatorio"),
        check("user.name").notEmpty().isString().withMessage("El nombre es obligatorio"),
    ],
    UsersClt().add.bind(UsersClt())
)

export {
    routerUsers
}