export class NotFoundError extends Error {
  constructor(item: string, key: string) {
    super(`No ${item} has been found with the given key: ${key}`)
  }
}

export class NotSupportedVersionError extends Error {
  constructor(version: number) {
    super(
      `Zephyr Scale version ${version} is not supported. Supported versions: 1.0`
    )
  }
}

export class UnauthorizedError extends Error {}

export class UnknownError extends Error {
  constructor(message?: string) {
    super(`Unknown error.${message === undefined ? '' : ` ${message}`}`)
  }
}

export class WrongParametersError extends Error {
  constructor(errorMessages: string[]) {
    super(errorMessages.join('\n'))
  }
}
