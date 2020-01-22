import { createParamDecorator } from '@nestjs/common';
import { jwtConstants } from '../auth/constants';
import * as jwt from 'jsonwebtoken';

export const User = createParamDecorator((data, req) => {
  // if route is protected, there is a user set in auth.module
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers.authorization
    ? (req.headers.authorization as string).split(' ')
    : null;
  console.log(token);
  if (token && token[1]) {
    const decoded: any = jwt.verify(token[1], jwtConstants.secret);
    return !!data ? decoded[data] : decoded.user;
  }
});
