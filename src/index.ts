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

const init = (): void => {
  checkIn().then(response => {
    console.info(`[Check In]: ${JSON.stringify(response)}`)
    void sendWebHookMessage(response.message)
  }).catch(reason => {
    throw new Error(reason)
  })

  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      completeTask(i).then(response => {
        console.info(`[Complete Task]: ${JSON.stringify(response)}`)
      }).catch(reason => {
        throw new Error(reason)
      })

      claimAward(i).then(response => {
        console.info(`[Claim Award]: ${JSON.stringify(response)}`)
      }).catch(reason => {
        throw new Error(reason)
      })
    }, i * 3 * 1000)
  }

  setTimeout(() => {
    reCheckIn().then(response => {
      console.info(`[Re Check In]: ${JSON.stringify(response)}`)
      void sendWebHookMessage(response.message)
    }).catch(reason => {
      throw new Error(reason)
    })
  }, 12 * 1000)
}

init()

setInterval(init, 24 * 60 * 60 * 1000)
