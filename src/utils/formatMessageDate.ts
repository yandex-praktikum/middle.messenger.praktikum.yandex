export default (date: string) => {
  const millisecondsInHour = 3600000
  const now = Math.floor(new Date().getTime() / millisecondsInHour)
  const messageDate = Math.floor(new Date(date).getTime() / millisecondsInHour)
  const offset = now - messageDate

  let options: Intl.DateTimeFormatOptions

  if (offset < 24) {
    options = {
      hour: 'numeric',
      minute: 'numeric',
    }
  } else if (offset < 168) {
    options = {
      weekday: 'short'
    }
  } else {
    options = {
      month: 'short',
      day: 'numeric'
    }
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date))
}
