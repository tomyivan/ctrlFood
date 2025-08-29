import { Response as expressResponse } from "express";
export class ResponseApi {
    static successResponse( res: expressResponse,  msg: string, data: any) {
        return res.status(200).json({
            status: 200,
            ok: true,
            body: {
                msg,
                data
            }
        });
    }
    static errorResponse(res: expressResponse, msg:string, data: any) {
        return res.status(500).json({
            status: 500,
            ok:false,  
            body: {
                msg,
                data
            }
        });
    }
    static notFoundResponse(res: expressResponse, msg:string, data: any, status = 422) {
        return res.status(status).json({
            ok: false,
            status: status,
            body: {
                msg,
                data
            }
        });
    }
}