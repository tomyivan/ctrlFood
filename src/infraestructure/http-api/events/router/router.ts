import { Router } from "express";
import { startSee } from "../../../dependences/biometric.dependences";
const routerSee = Router();
routerSee.get("/", startSee().sendEvent.bind(startSee()));
// startSee().realTimeLogs.bind(startSee);
export { routerSee }

 
