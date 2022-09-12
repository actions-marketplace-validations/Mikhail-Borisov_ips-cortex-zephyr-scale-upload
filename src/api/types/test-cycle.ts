export type TestCycleTestCase = {
  testCaseKey: string
  environment?: string
  userKey?: string
  executedBy?: string
}

export type TestCycle = {
  projectKey: string
  name: string
  testPlanKey?: string
  issueKey?: string
  customFields?: {[customFieldName: string]: string}
  status?: string
  folder?: string
  iteration?: string
  version?: string
  owner?: string
  plannedStartDate?: Date
  plannedEndDate?: Date
  items?: TestCycleTestCase[]
}
