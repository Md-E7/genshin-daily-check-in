import type { Config } from '../types'
import { readFileSync } from 'fs'

export const configData: Config = JSON.parse(readFileSync('./config.json', 'utf-8'))
