import { Response } from 'express';
// import { notify } from '../../../domain';
export class SendEvent {
    static clients: Response[] = [];

    static addClient(res: Response) {
        this.clients.push(res);
        // res.write('data: {"msg":"Conexion Establecida"}\n\n');
    }

    static sendToAdmin(payload: any) {
        this.clients.forEach(client => {
            client.write('data: ' + JSON.stringify(payload) + '\n\n');
        });
    }
}
// };

// export const sendToAdmin = (payload: any) => {
//     clients.forEach(client => {
//         client.write('data: ' + JSON.stringify(payload) + '\n\n');
//     });
// };
