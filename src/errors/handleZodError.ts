import { ZodError, ZodIssue } from 'zod';
import { IGenricErrorResponse } from '../interface/common';
import { IGenricErrorMessage } from '../interface/error';

const handleZodError = (error: ZodError): IGenricErrorResponse => {
  const errors: IGenricErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Vaildation Error',
    errorMessage: errors,
  };
};

export default handleZodError;
