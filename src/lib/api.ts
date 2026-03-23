// эти типы пусть с бэка сверят со своим swagger
export type RegistrationPayload = {
  email: string
  username: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type ProfileAttributes = {
  id: string
  username: string
  avatar: string
  created_at: string
}

const API_PREFIX = '/uevent/v1' // базовая префиксация, докер потом подменит env

type JsonApiPayload<T> = {
  data: {
    type: 'account'
    attributes: T
  }
}

async function request<TResponse>(
  path: string,
  payload: JsonApiPayload<RegistrationPayload | LoginPayload>,
): Promise<TResponse | null> {
  // простейший фетч, дальше подключим react-query/rtk когда появится прод бэк
  const response = await fetch(`${API_PREFIX}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = `Request failed with ${response.status}`
    try {
      const data = await response.json()
      message = data?.errors?.[0]?.detail ?? message
    } catch {
      // ignore
    }
    throw new Error(message)
  }

  const raw = await response.text()
  if (!raw) {
    return null
  }

  return JSON.parse(raw) as TResponse
}

export async function registerAccount(payload: RegistrationPayload) {
  await request('/account/registration', {
    data: {
      type: 'account',
      attributes: payload,
    },
  })
}

export async function loginAccount(
  payload: LoginPayload,
): Promise<ProfileAttributes> {
  const json = await request<{ data: { type: string; attributes: ProfileAttributes } }>(
    '/account/login',
    {
      data: {
        type: 'account',
        attributes: payload,
      },
    },
  )

  if (!json?.data?.attributes) {
    throw new Error('Unexpected response structure from login endpoint')
  }

  return json.data.attributes
}
