export default function convertDate(dateString) {
  const date = new Date(dateString);

  const moscowOffset = 3 * 60;
  date.setMinutes(date.getMinutes() + moscowOffset);

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setHours(0, 0, 0, 0 - (today.getDay() * 24 * 60 * 60 * 1000));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Moscow'});
  }
  else if (date >= weekStart && date <= weekEnd) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
  }
  else {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Moscow' };
    const formattedDate = date.toLocaleDateString('ru-RU', options);
    return formattedDate.replace(/\sг\.$/, '');
  }
}
