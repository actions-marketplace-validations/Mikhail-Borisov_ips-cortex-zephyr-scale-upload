export type PlainTextTestScript = {
  type: 'PLAIN_TEXT'
  text?: string
}

export type TestScriptStep = {
  index: number
  description?: string
  testData?: string
  expectedResult?: string
  testCaseKey?: string
}

export type StepByStepTestScript = {
  type: 'STEP_BY_STEP'
  steps?: TestScriptStep[]
}

export type TestCase = {
  key?: string
  projectKey: string
  name: string
  objective?: string
  precondition?: string
  folder?: string
  status?: string
  priority?: string
  component?: string
  owner?: string
  estimatedTime?: number
  labels?: string[]
  issueLinks?: string[]
  customFields?: {[customFieldName: string]: string}
  testScript: PlainTextTestScript | StepByStepTestScript
  parameters?: any // TODO
}

export type TestCaseAttachment = {
  id: number
  url: string
  filename: string
  filesize: number
}
