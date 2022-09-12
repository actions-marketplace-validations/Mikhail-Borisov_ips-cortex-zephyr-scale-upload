import * as core from '@actions/core'
import * as fs from 'fs'
import {NotSupportedVersionError} from '../api/errors'

export type ExecutionResult = 'Passed' | 'Failed'

export type Execution = {
  source: string
  result: ExecutionResult
  testCase: {
    key: string
    name?: string
  }
}

export type ZephyrScaleResult = {
  version: number
  executions: Execution[]
}

export async function readZephyrScaleResult(
  path: string
): Promise<ZephyrScaleResult> {
  return new Promise<ZephyrScaleResult>((resolve, reject) => {
    fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

export async function collectExecutions(paths: string[]): Promise<Execution[]> {
  const executions: Execution[] = []
  for (const path of paths) {
    core.info(`Reading test report: ${path}`)
    const testReport = await readZephyrScaleResult(path)
    if (testReport.version !== 1) {
      throw new NotSupportedVersionError(testReport.version)
    } else {
      for (const execution of testReport.executions) {
        executions.push(execution)
      }
    }
  }
  return executions
}
