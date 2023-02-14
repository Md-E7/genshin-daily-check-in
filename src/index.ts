import { act_id, cookie, discord_webhook_url } from '../config.json'
import { ofetch } from 'ofetch'
import { WebhookClient } from 'discord.js'

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

const webhookClient: WebhookClient | null = discord_webhook_url.length !== 0 ? new WebhookClient({ url: discord_webhook_url }) : null

const delay = async (ms: number): Promise<unknown> => await new Promise(resolve => setTimeout(resolve, ms))

const sendWebHookMessage = async (message: string): Promise<any> => {
  return await webhookClient?.send({
    content: `> **${message}**`
  })
}

const checkIn = async (): Promise<CheckInResponse> => {
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

const completeTask = async (id: number): Promise<CompleteTaskResponse> => {
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

const claimAward = async (id: number): Promise<AwardResponse> => {
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

const reCheckIn = async (): Promise<ReCheckInResponse> => {
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
  const checkInResponse = await checkIn().catch(reason => {
    throw new Error(reason)
  })

  console.info(`[Check In]: ${JSON.stringify(checkInResponse)}`)
  void sendWebHookMessage(checkInResponse.message)

  await delay(3 * 1000)

  for (let i = 1; i <= 3; i++) {
    await delay(3 * 1000)

    const completeTaskResponse = await completeTask(i).catch(reason => {
      throw new Error(reason)
    })

    console.info(`[Complete Task]: ${JSON.stringify(completeTaskResponse)}`)

    const claimAwardResponse = await claimAward(i).catch(reason => {
      throw new Error(reason)
    })

    console.info(`[Claim Award]: ${JSON.stringify(claimAwardResponse)}`)
  }

  await delay(3 * 1000)

  const reCheckInResponse = await reCheckIn().catch(reason => {
    throw new Error(reason)
  })

  console.info(`[Re Check In]: ${JSON.stringify(reCheckInResponse)}`)
  void sendWebHookMessage(reCheckInResponse.message)

  await delay(3 * 1000)

  console.log('Auto daily check in will be repeat in 24 hours')
  void sendWebHookMessage('Genshin impact auto daily check in will be repeat in 24 hours')
}

void init()

setInterval(() => {
  void init()
}, 24 * 60 * 60 * 1000)
