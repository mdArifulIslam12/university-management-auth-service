import mongoose from 'mongoose';
import { IGenricErrorMessage } from '../interface/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenricErrorMessage[] = [
    {
      path: error?.path,
      message: 'invaild id',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessage: errors,
  };
};

export default handleCastError;
