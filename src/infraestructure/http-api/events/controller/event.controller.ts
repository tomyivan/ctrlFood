import { Response, Request } from "express";
import { SendEvent } from "../../../../common";
import type { BiometricApplication } from "../../../../app";

export class StartSee {
    constructor(private readonly _bioApp: BiometricApplication
    ) {}
    sendEvent(req: Request, res: Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        SendEvent.addClient(res);
        res.write(`data: {"msg":"Conexión establecida"}\n\n`);
        this._bioApp.getRealTimeLogs((log) => {        
            // res.write('data: ' + JSON.stringify(log) + '\n\n');
            SendEvent.sendToAdmin(log);
        });
        req.on('close', () => {
            console.log('Cliente desconectado');
        });
    }

}