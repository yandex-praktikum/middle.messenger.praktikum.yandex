const weekDay: Array<string> = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const dateZeroAdd = (date: number | string): string => {
    const string = String(date);
    if (string.length < 2) return `0${string}`;
    return string;
};

export const getDateLastMessage = (obj: string): string => {
    if (!obj) return '';
    const date = new Date(obj);
    const currentDate = new Date();
    if (currentDate.setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)) return `${dateZeroAdd(date.getHours())}:${dateZeroAdd(date.getMinutes())}`;
    if ((getWeekNumber(date) === getWeekNumber(currentDate)) && (date.getFullYear() === currentDate.getFullYear())) return weekDay[date.getDay()];
    return `${dateZeroAdd(date.getDate())}.${dateZeroAdd(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const formattedDate = (inDate: string, inTime = '00:00'): Date => {
    const date: Array<string> = inDate.split('.');
    const time: Array<string> = inTime.split(':');
    const day = Number(date[0]);
    const month: number = Number(date[1]) - 1;
    const year = Number(date[2]);
    const hours = Number(time[0]);
    const minutes = Number(time[1]);
    return new Date(year, month, day, hours, minutes, 0);
};

export const getCurrentNumberWeek = (date: Date): number => {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const today: number = new Date(year, month, 0).getTime();
    const now: number = date.getTime();
    const week: number = Math.round((now - today) / (1000 * 60 * 60 * 24 * 7));
    return week;
};

function getWeekNumber(d: Date) {
    const date: any = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart: Date | any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

export function getParseDate(dateString: string | number): { date: string, time: string } {
    const date = new Date(dateString);
    const obj = { date: '00.00.0000', time: '00:00' };
    obj.date = `${dateZeroAdd(date.getDate())}.${dateZeroAdd(date.getMonth() + 1)}.${date.getFullYear()}`;
    obj.time = `${dateZeroAdd(date.getHours())}:${dateZeroAdd(date.getMinutes())}`;
    return obj;
}
