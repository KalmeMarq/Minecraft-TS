export default class Exception {
  public constructor(message: string, name: string = 'Exception', type: any = Exception) {
    const error = Error(message)
    error.name = name
    Error.captureStackTrace(error, type)
    return error
  }
}