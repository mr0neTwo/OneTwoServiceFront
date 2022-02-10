import store from '../store'

export function getRequestConfig(body = {}) {

  const state = store.getState()

  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.data.token}`,
      Accept: 'application/json',
    },
    body: JSON.stringify(body)
  }
}

export function bad_request(massage='') {
    sessionStorage.clear()
    console.warn(massage)
    return { type: 'LOGUOT' }
}