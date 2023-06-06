import { IGenricErrorMessage } from './error'

export type IGenricErrorResponse = {
  statusCode: number
  message: string
  errorMessage: IGenricErrorMessage[]
}
