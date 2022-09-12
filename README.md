# Zephyr Scale upload GitHub Action

This action can be used to upload Zephyr Scale test results to a self-hosted [Zephyr Scale Server](https://support.smartbear.com/zephyr-scale-server/docs/welcome.html).
If you use Maven and JUnit 4 test results can be generated using [Zephyr Scale Junit Integration plugin](https://github.com/SmartBear/zephyr-scale-junit-integration).

# Inputs
`jiraBaseUrl`: Base URL of Jira

`projectKey`: Jira project key

`testCycleKey`: Test Cycle key for which Test Executions should be created

`bearerToken`: Bearer token of Jira user that is allowed to edit Zephyr Scale items (test plans, test cases etc.)

`zephyrScaleReportPaths`: Glob expression to Zephyr Scale report paths. Default: ***/zephyrscale_result.json*

# Usage
In your GitHub Workflow add the following block as a Step:

```yaml
    - uses: actions/ips-cortex-zephyr-scale-upload@v1
      with:
        jiraBaseUrl: 'https://jira.my-company.com'
        projectKey: 'PRJCT'
        testCycleKey: 'RPJCT-C1'
        bearerToken: ${{ secrets.JIRA_TOKEN }}
        zephyrScaleReportPaths: '**/zephyrscale_result.json'
```

and replace the values as needed. 
