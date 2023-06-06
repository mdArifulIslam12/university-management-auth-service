import mongoose from 'mongoose'
import { IGenricErrorResponse } from '../interface/common'
import { IGenricErrorMessage } from '../interface/error'

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenricErrorResponse => {
  const errors: IGenricErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  }
}

export default handleValidationError
