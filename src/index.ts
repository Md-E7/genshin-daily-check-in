import { accounts } from '../config.json'
import { ofetch } from 'ofetch'

interface CheckInResponse {
  data: any
  message: string
  retcode: number
}

interface CompleteTaskResponse {
  data: any
  message: string
  retcode: number
}

interface AwardResponse {
  data: any
  message: string
  retcode: number
}

interface ReCheckInResponse {
  data: any
  message: string
  retcode: number
}

const delay = async (ms: number): Promise<unknown> => await new Promise(resolve => setTimeout(resolve, ms))

const checkIn = async (act_id: string, cookie: string): Promise<CheckInResponse> => {
  return await ofetch<CheckInResponse>(' https://sg-hk4e-api.hoyolab.com/event/sol/sign', {
    method: 'POST',
    query: {
      act_id
    },
    headers: {
      cookie
    }
  })
}

const completeTask = async (id: number, act_id: string, cookie: string): Promise<CompleteTaskResponse> => {
  return await ofetch<CompleteTaskResponse>('https://sg-hk4e-api.hoyolab.com/event/sol/task/complete', {
    method: 'POST',
    query: {
      act_id,
      id
    },
    headers: {
      cookie
    }
  })
}

const claimAward = async (id: number, act_id: string, cookie: string): Promise<AwardResponse> => {
  return await ofetch<AwardResponse>('https://sg-hk4e-api.hoyolab.com/event/sol/task/award', {
    method: 'POST',
    query: {
      act_id,
      id
    },
    headers: {
      cookie
    }
  })
}

const reCheckIn = async (act_id: string, cookie: string): Promise<ReCheckInResponse> => {
  return await ofetch<ReCheckInResponse>(' https://sg-hk4e-api.hoyolab.com/event/sol/resign', {
    method: 'POST',
    query: {
      act_id
    },
    headers: {
      cookie
    }
  })
}

const init = async (): Promise<void> => {
  for (const account of accounts) {
    const checkInResponse = await checkIn(account.act_id, account.cookie).catch(reason => {
      throw new Error(reason)
    })

    console.info(`[${account.name}] Check-in: ${JSON.stringify(checkInResponse)}`)

    await delay(500)

    for (let i = 1; i <= 3; i++) {
      await delay(500)

      const completeTaskResponse = await completeTask(i, account.act_id, account.cookie).catch(reason => {
        throw new Error(reason)
      })

      console.info(`[${account.name}] Complete Task: ${JSON.stringify(completeTaskResponse)}`)

      const claimAwardResponse = await claimAward(i, account.act_id, account.cookie).catch(reason => {
        throw new Error(reason)
      })

      console.info(`[${account.name}] Claim Award: ${JSON.stringify(claimAwardResponse)}`)
    }

    await delay(500)

    const reCheckInResponse = await reCheckIn(account.act_id, account.cookie).catch(reason => {
      throw new Error(reason)
    })

    console.info(`[${account.name}] Re-check-in: ${JSON.stringify(reCheckInResponse)}`)

    await delay(500)

    console.info(`[${account.name}] Genshin impact auto daily check in will be repeat in 24 hours`)
  }
}

void init()

setInterval(() => {
  void init()
}, 24 * 60 * 60 * 1000)
