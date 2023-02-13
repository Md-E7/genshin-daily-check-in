import { act_id, cookie, discord_webhook_url } from '../config.json'
import { ofetch } from 'ofetch'
import { WebhookClient } from 'discord.js'

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

const webhookClient: WebhookClient | null = discord_webhook_url.length !== 0 ? new WebhookClient({ url: discord_webhook_url }) : null

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

const init = (): void => {
  void checkIn().then(async response => {
    console.info(response.message)
    await sendWebHookMessage(response.message)
  }).catch(reason => {
    throw new Error(reason)
  })

  void reCheckIn().then(async response => {
    console.info(response.message)
    await sendWebHookMessage(response.message)
  }).catch(reason => {
    throw new Error(reason)
  })
}

init()

setInterval(init, 24 * 60 * 60 * 1000)
