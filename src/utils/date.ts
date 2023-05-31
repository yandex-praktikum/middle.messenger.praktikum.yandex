const weekDay: Array<string> = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];


type TlastMessage = {
    date: string,
    media: string,
    new: boolean,
    read: boolean,
    text: string,
    time: string,
    type: string,
}


export const getDateLastMessage = (obj: TlastMessage): string => {
    const date = formattedDate(obj.date, obj.time);
    const currentDate = new Date();
    if (currentDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) return obj.time;
    if ((getWeekNumber(date) === getWeekNumber(currentDate)) && (date.getFullYear() === currentDate.getFullYear())) return weekDay[date.getDay()];
    return obj.date;
};


export const formattedDate = (inDate: string, inTime: string = '00:00'): Date => {
    const date: Array<string> = inDate.split('.');
    const time: Array<string> = inTime.split(':');
    const day: number = Number(date[0]);
    const month: number = Number(date[1]) - 1;
    const year: number = Number(date[2]);
    const hours: number = Number(time[0]);
    const minutes: number = Number(time[1]);
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
