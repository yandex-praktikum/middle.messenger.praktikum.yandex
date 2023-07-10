import TimeTemplate from './time.hbs';
import './time.css';

export function Time({ date }) {
  const time = new Date(date);
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return TimeTemplate({ time: `${hours}:${minutes}` });
}
