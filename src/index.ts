import { act_id, cookie } from '../config.json'
import { ofetch } from 'ofetch'

interface CheckInResponse {
  data: any
  message: string
  retcode: number
}

interface ReCheckInResponse {
  data: any
  message: string
  retcode: number
}

const checkIn = async (): Promise<boolean> => {
  const response = await ofetch<CheckInResponse>(' https://sg-hk4e-api.hoyolab.com/event/sol/sign', {
    method: 'POST',
    query: {
      act_id
    },
    headers: {
      cookie
    }
  }).catch(reason => {
    throw new Error(reason)
  })

  if (response.message === 'OK') {
    console.info(response)

    return true
  }

  console.error(response)

  return false
}

const reCheckIn = async (): Promise<boolean> => {
  const response = await ofetch<ReCheckInResponse>(' https://sg-hk4e-api.hoyolab.com/event/sol/resign', {
    method: 'POST',
    query: {
      act_id
    },
    headers: {
      cookie
    }
  }).catch(reason => {
    throw new Error(reason)
  })

  if (response.message === 'OK') {
    console.info(response)

    return true
  }

  console.error(response)

  return false
}

const init = (): void => {
  void checkIn()

  setTimeout(() => {
    void reCheckIn()
  }, 3 * 1000)
}

init()

setInterval(init, 24 * 60 * 60 * 1000)
