const weekDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const getDateLastMessage = (obj) => {
    const date = formattedDate(obj.date, obj.time);
    const currentDate = new Date();
    if (currentDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) return obj.time;
    if ((getWeekNumber(date) === getWeekNumber(currentDate)) && (date.getFullYear() === currentDate.getFullYear())) return weekDay[date.getDay()];
    return obj.date;
}


export const formattedDate = (inDate, inTime = '00:00') => {
    const date = inDate.split('.');
    const time = inTime.split(':');
    const day = Number(date[0]);
    const month = Number(date[1]) - 1;
    const year = Number(date[2]);
    const hours = Number(time[0]);
    const minutes = Number(time[1]);
    return new Date(year, month, day, hours, minutes, 0);
}


export const getCurrentNumberWeek = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date(year, month, 0).getTime();
    const now = date.getTime();
    const week = Math.round((now - today) / (1000 * 60 * 60 * 24 * 7));
    return week;
}





function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}
