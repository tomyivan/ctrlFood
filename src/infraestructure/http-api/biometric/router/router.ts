import { bioClt } from "../../../dependences/biometric.dependences";
import { Router } from "express";
import { validationField } from "../../../../util";
import { check } from "express-validator";
import { CredentialMiddleware } from "../../../../common";
const routerBio = Router();
routerBio.get("/users", 
    
    CredentialMiddleware.validationJWT,

    CredentialMiddleware.checkRole([1]) ,
    bioClt().getUsers.bind(bioClt())
)
routerBio.post("/add", CredentialMiddleware.validationJWT,
        CredentialMiddleware.checkRole([1])
    ,[
    check("users.userId", "El userId es obligatorio").not().isEmpty(),
    check("users.name", "El nombre es obligatorio").not().isEmpty(),
    check("users.dni", "El dni es obligatorio").not().isEmpty(),
    validationField],
    bioClt().setUser.bind(bioClt())
)

// routerBio.use(bioClt().getRealTimeLogs.bind(bioClt()))
export {
    routerBio
}