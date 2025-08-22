export {}
declare global {
    namespace Express {
        export interface Request {
            dni?: string;
            nickname?: string;
            rol?: number;
            area?: number;
            city?: number;
            sys?: string;
            permition1?: number;
            permition2?: number;
            permition3?: number;
            userName?: string,            
            existEmployee? : boolean;
        }
    }
}