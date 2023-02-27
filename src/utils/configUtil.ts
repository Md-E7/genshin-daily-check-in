import type { Config } from '../types'
import { readFileSync, writeFileSync } from 'fs'

const getConfig = (): Config => {
  const data = readFileSync('./config.json', 'utf-8')

  return JSON.parse(data)
}

const addAccount = (name: string, act_id: string, cookie: string): void => {
  const config: Config = getConfig()

  config.accounts?.push({
    name,
    act_id,
    cookie
  })

  writeFileSync('./config.json', JSON.stringify(config))
}

const removeAccount = (name: string): void => {
  const config: Config = getConfig()

  const filteredAccount = config.accounts?.filter(object => object.name !== name)

  if (filteredAccount == null || filteredAccount.length === config.accounts?.length) {
    throw new Error(`Account ${name} not found`)
  }

  config.accounts = filteredAccount

  writeFileSync('./config.json', JSON.stringify(config))
}

export {
  getConfig,
  addAccount,
  removeAccount
}
