import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface Payload {
    dni: string;
    nickname: string;
    rol: number;
    area: number;
    sys: string; 
    city: number;
    permition1?: number;
    permition2?: number;
    permition3?: number;
    userName: string;
}

export const generateJWT = (dni: string, nickname: string, userName: string, rol: number, area: number, sys: string, city: number, permition1: number, permition2: number, permition3: number): Promise<string> => {
    return new Promise(( resolve, reject ) => {
        const payload: Payload = { dni, nickname, rol, area, sys, city, permition1, permition2, permition3, userName };
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED as string,
            {
                expiresIn: '5h',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }
                resolve(token as string);
            }
        );
    });
};