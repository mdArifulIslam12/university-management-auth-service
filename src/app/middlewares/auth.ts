import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelper } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorization'
        );
      }
      let verifyUser = null;

      verifyUser = jwtHelper.verifyedToken(token, config.jwt.secret as Secret);

      req.user = verifyUser;

      // role check
      if (requiredRoles.length && !requiredRoles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are Forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
