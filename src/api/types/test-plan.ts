export type TestPlan = {
  projectKey: string
  name: string
  objective?: string
  folder?: string
  status?: string
  owner?: string
  labels?: string[]
  issueLinks?: string[]
  testRunKeys?: string[]
  customFields: {[customFieldName: string]: string}
}
