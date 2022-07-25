import expressJwt from 'express-jwt';
import { baseUrlApi, jwtSecret } from '../config/global';

export default function authJwt() {

  return expressJwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
    path: [
      new RegExp(`${baseUrlApi}documentation(.*)`),
      `${baseUrlApi}usuario/login`,
      `${baseUrlApi}usuario/register`,
    ]
  })
}