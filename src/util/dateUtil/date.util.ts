export class DateUtil {
    static convertDate( data: Date ): string {
        return data.toISOString().split("T")[0];
    }

    static convertHour( data: Date ): string {
        return data.toISOString().split("T")[1].split(".")[0];
    }

    static isInRange( start: Date, end: Date, check: Date ): boolean {
        return check >= start && check <= end;
    }

    static isInRangeHour( start: Date, end: Date, check: Date ): boolean {
        const startHour = DateUtil.convertHour(start);
        const endHour = DateUtil.convertHour(end);
        const checkHour = DateUtil.convertHour(check);

        console.log(`checkHour: ${checkHour}, startHour: ${startHour}, endHour: ${endHour}`);
        return checkHour >= startHour && checkHour <= endHour;
    }

    static exactDate( date: Date ): Date {
        return new Date(date.getTime() - 4 * 60 * 60 * 1000);
    }

    static getCurrentDate(): Date {
        return new Date();
    }

}