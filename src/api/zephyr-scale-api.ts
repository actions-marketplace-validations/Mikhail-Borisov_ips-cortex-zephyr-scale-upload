import {
  NotFoundError,
  UnauthorizedError,
  UnknownError,
  WrongParametersError
} from './errors'
import {TestCase, TestCycle, TestExecution, TestPlan} from './types'
import axios, {AxiosInstance} from 'axios'

/**
 * [Zephyr Scale API Documentation]{@link https://support.smartbear.com/zephyr-scale-server/api-docs/v1/}
 */
export class ZephyrScaleApi {
  private readonly baseUrl: string
  private readonly projectKey: string
  private axios: AxiosInstance

  constructor(
    jiraBaseUrl: string,
    version: string,
    projectKey: string,
    bearerToken: string
  ) {
    this.baseUrl = `${jiraBaseUrl}/rest/atm/${version}`
    this.projectKey = projectKey
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: 'application/json'
      }
    })
  }

  // TEST CASE
  async postTestCase(testCase: TestCase): Promise<{key: string}> {
    const response = await this.axios.post('/testcase', testCase)
    switch (response.status) {
      case 201:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  async getTestCase(testCaseKey: string): Promise<TestCase> {
    const response = await this.axios.get(`/testcase/${testCaseKey}`)
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Case', testCaseKey)
      default:
        throw new UnknownError()
    }
  }

  async putTestCase(testCaseKey: string, testCase: TestCase): Promise<void> {
    const response = await this.axios.put(`/testcase/${testCaseKey}`, testCase)
    switch (response.status) {
      case 200:
        return
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  async deleteTestCase(testCaseKey: string): Promise<void> {
    const response = await this.axios.delete(`/testcase/${testCaseKey}`)
    switch (response.status) {
      case 204:
        return
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Case', testCaseKey)
      default:
        throw new UnknownError()
    }
  }

  async getLatestTestExecution(testCaseKey: string): Promise<TestExecution> {
    const response = await this.axios.get(
      `/testcase/${testCaseKey}/testresult/latest`
    )
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Case', testCaseKey) // Or Test Case has no results
      default:
        throw new UnknownError()
    }
  }

  async getTestCasesForIssue(issueKey: string): Promise<TestCase[]> {
    const response = await this.axios.get(`issuelink/${issueKey}/testcases`)
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Issue', issueKey)
      default:
        throw new UnknownError()
    }
  }

  async searchTestCases(
    query: string,
    startAt?: number,
    maxResults?: number
  ): Promise<TestCase[]> {
    const response = await this.axios.get(`/testcase/search`, {
      params: {query, startAt, maxResults}
    })
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  // TEST CYCLE
  async postTestCycle(testCycle: TestCycle): Promise<{key: string}> {
    const response = await this.axios.post('/testrun', testCycle)
    switch (response.status) {
      case 201:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  async getTestCycle(testCycleKey: string): Promise<TestCycle> {
    const response = await this.axios.get(`/testrun/${testCycleKey}`)
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Cycle', testCycleKey)
      default:
        throw new UnknownError()
    }
  }

  async deleteTestCycle(testCycleKey: string): Promise<void> {
    const response = await this.axios.delete(`/testrun/${testCycleKey}`)
    switch (response.status) {
      case 204:
        return
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Cycle', testCycleKey)
      default:
        throw new UnknownError()
    }
  }

  async searchTestCycles(
    query: string,
    startAt?: number,
    maxResults?: number
  ): Promise<TestCycle[]> {
    const response = await this.axios.get(`/testrun/search`, {
      params: {query, startAt, maxResults}
    })
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  // Test Result
  async postTestExecutionsForTestCycle(
    testCycleKey: string,
    testResults: TestExecution[]
  ): Promise<{id: number}[]> {
    const response = await this.axios.post(
      `/testrun/${testCycleKey}/testresults`,
      testResults
    )
    switch (response.status) {
      case 201:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  async getTestExecutionsForTestCycle(
    testCycleKey: string
  ): Promise<TestExecution[]> {
    const response = await this.axios.get(
      `/testrun/${testCycleKey}/testresults`
    )
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Cycle', testCycleKey)
      default:
        throw new UnknownError()
    }
  }

  async postTestExecutionForTestCycleAndTestCase(
    testCycleKey: string,
    testCaseKey: string,
    testResult: TestExecution
  ): Promise<{id: number}> {
    const response = await this.axios.post(
      `/testrun/${testCycleKey}/testcase/${testCaseKey}/testresult`,
      testResult
    )
    switch (response.status) {
      case 201:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  async putTestExecutionForTestCycleAndTestCase(
    testCycleKey: string,
    testCaseKey: string,
    testResult: TestExecution
  ): Promise<{id: number}> {
    const response = await this.axios.put(
      `/testrun/${testCycleKey}/testcase/${testCaseKey}/testresult`,
      testResult
    )
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  async postTestExecution(testResult: TestExecution): Promise<{id: number}> {
    const response = await this.axios.post('/testresult', testResult)
    switch (response.status) {
      case 201:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  // FOLDER

  // ENVIRONMENTS

  // TEST PLAN
  async postTestPlan(testPlan: TestPlan): Promise<{key: string}> {
    const response = await this.axios.post('/testplan', testPlan)
    switch (response.status) {
      case 201:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }

  async getTestPlan(testPlanKey: string): Promise<TestPlan> {
    const response = await this.axios.get(`/testplan/${testPlanKey}`)
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Plan', testPlanKey)
      default:
        throw new UnknownError()
    }
  }

  async putTestPlan(testPlanKey: string, testPlan: TestPlan): Promise<void> {
    const response = await this.axios.put(`/testplan/${testPlanKey}`, testPlan)
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Plan', testPlanKey)
      default:
        throw new UnknownError()
    }
  }

  async deleteTestPlan(testPlanKey: string): Promise<void> {
    const response = await this.axios.delete(`/testplan/${testPlanKey}`)
    switch (response.status) {
      case 204:
        return
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 404:
        throw new NotFoundError('Test Plan', testPlanKey)
      default:
        throw new UnknownError()
    }
  }

  async searchTestPlans(
    query: string,
    startAt?: number,
    maxResults?: number
  ): Promise<TestPlan[]> {
    const response = await this.axios.get(`/testplan/search`, {
      params: {query, startAt, maxResults}
    })
    switch (response.status) {
      case 200:
        return response.data
      case 401:
        throw new UnauthorizedError(response.data.status.message)
      case 400:
        throw new WrongParametersError(response.data.errorMessages)
      default:
        throw new UnknownError()
    }
  }
}
