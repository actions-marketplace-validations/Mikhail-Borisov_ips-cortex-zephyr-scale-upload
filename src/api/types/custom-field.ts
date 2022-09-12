export type CustomFieldCategory =
  | 'TEST_PLAN'
  | 'TEST_RUN'
  | 'TEST_STEP'
  | 'TEST_EXECUTION'
  | 'TEST_CASE'
  | 'FOLDER'

export type CustomFieldType =
  | 'SINGLE_LINE_TEXT'
  | 'MULTI_LINE_TEXT'
  | 'NUMBER'
  | 'DATE'
  | 'SINGLE_CHOICE_SELECT_LIST'
  | 'CHECKBOX'
  | 'DECIMAL'
  | 'MULTI_CHOICE_SELECT_LIST'
  | 'USER_LIST'

export type CustomField = {
  projectKey: string
  name: string
  description?: string
  required?: boolean // default 'false'
  type: CustomFieldType
  category: CustomFieldCategory
}

export type CustomFieldOption = {
  id?: number
  name: string
}
