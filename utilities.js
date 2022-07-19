import { ClientFunction, userVariables } from 'testcafe'

export const getLocation = ClientFunction(() => document.location.href)

export function randomString() {
  return (
    'test-' +
    new Date().getTime().toString()
  )
}

export function baseUrl() {
  return process.env.SHOWCASE_SITE_URL || userVariables.baseURL
}
