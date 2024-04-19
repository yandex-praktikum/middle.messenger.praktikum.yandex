export default (resourceURL: string) => {
  const url = resourceURL.replaceAll('/', '%2F')
  return `https://ya-praktikum.tech/api/v2/resources/${url}`
}
