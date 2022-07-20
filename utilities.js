import { ClientFunction, userVariables } from 'testcafe';

export const getLocation = ClientFunction(() => document.location.href)

export function randomString(length=10, chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  var result = ''
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

export function baseUrl() {
  return process.env.SHOWCASE_SITE_URL || userVariables.baseURL
}

export function isAscending() {
  var isAscending = a => a.slice(1).every((e,i) => e > a[i])
  return isAscending
}

export function isDescending() {
  var isDescending= a => a.slice(1).every((e,i) => e < a[i])
  return isDescending
}
