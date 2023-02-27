interface Config {
  accounts: Array<{
    name: string | null
    act_id: string | null
    cookie: string | null
  }> | null
}

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

interface ClaimAwardResponse {
  data: any
  message: string
  retcode: number
}

interface ReCheckInResponse {
  data: any
  message: string
  retcode: number
}

export type {
  Config,
  CheckInResponse,
  CompleteTaskResponse,
  ClaimAwardResponse,
  ReCheckInResponse
}
