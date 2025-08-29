import { ScheduleFoodDTO } from "../../domain";
export class ScheduleCached {
    private static cache: Map<string, ScheduleFoodDTO[]> = new Map();

    static setCache(key: string, data: ScheduleFoodDTO[]) {
        this.cache.set(key, data);
    }

    static getCache(key: string): ScheduleFoodDTO[] | undefined {
        return this.cache.get(key);
    }

    static clearCache() {
        this.cache.clear();
    }
}