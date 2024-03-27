export const ValidationsMap: { [index: string]: RegExp } = {
  login: /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/,
  password: /^(?=.*[0-9])(?=.*[A-ZА-ЯЁ]).{6,40}$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  name: /^[A-ZА-ЯЁ][a-zа-яё-]{2,20}$/,
  phone: /^[+]?[\d]{10,15}$/,
}
