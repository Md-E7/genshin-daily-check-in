import type { Config } from '../types'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import path from 'path'

const configFilePath = path.join(homedir(), '.genshin-daily-check-in.json')

const createConfigIfNotExist = (): void => {
  if (!existsSync(configFilePath)) {
    writeFileSync(configFilePath, JSON.stringify({
      accounts: []
    }))
  }
}

const getConfig = (): Config => {
  const data = readFileSync(configFilePath, 'utf-8')

  return JSON.parse(data)
}

const addAccount = (name: string, act_id: string, cookie: string): void => {
  const config: Config = getConfig()

  config.accounts?.push({
    name,
    act_id,
    cookie
  })

  writeFileSync(configFilePath, JSON.stringify(config))
}

const removeAccount = (name: string): void => {
  const config: Config = getConfig()

  const filteredAccount = config.accounts?.filter(object => object.name !== name)

  if (filteredAccount == null || filteredAccount.length === config.accounts?.length) {
    throw new Error(`Account ${name} not found`)
  }

  config.accounts = filteredAccount

  writeFileSync(configFilePath, JSON.stringify(config))
}

export {
  createConfigIfNotExist,
  getConfig,
  addAccount,
  removeAccount
}
