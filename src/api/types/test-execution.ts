export type TestScriptResult = {
  index: number
  status: string
  comment?: string
}

// TODO TestExecution
export type TestExecution = {
  projectKey: string
  testCaseKey: string
  status?: string
  environment?: string
  comment?: string

  userKey?: string
  executedBy?: string

  executionTime?: number

  executionDate?: Date
  actualEndDate?: Date

  scriptResults?: TestScriptResult[]
}
