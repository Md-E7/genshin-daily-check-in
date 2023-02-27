import { Command } from 'commander'
import { configData } from './utils/configUtil'
import { checkIn, claimAward, completeTask, reCheckIn } from './utils/fetchUtil'
import { delay } from './utils/delayUtil'
import { schedule } from 'node-cron'

const program = new Command()

const { accounts } = configData

const init = async (message: string | null): Promise<void> => {
  if (accounts == null) {
    throw new Error('Invalid config.json structure')
  }

  for (const account of accounts) {
    if (account.name == null || account.act_id == null || account.cookie == null) {
      throw new Error('Invalid config.json structure')
    }

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
  }

  if (message != null) {
    await delay(500)
    console.info(message)
  }
}

program.name('genshin-daily-check-in').version('0.7.0')

program.command('start')
  .description('Run genshin daily check-in once')
  .action(() => {
    void init(null)
  })

program.command('start-forever')
  .description('Run genshin daily check-in forever')
  .action(() => {
    schedule('0 12 * * *', () => {
      void init('genshin-daily-check-in will be repeated tomorrow at 12:00')
    }, { runOnInit: true })
  })

program.parse()
