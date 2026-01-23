import { HttpInterceptorFn } from '@angular/common/http';
import { getStoredToken } from '../utils/token-storage';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getStoredToken();

  if (!token) {
    return next(req);
  }

  const authorizedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authorizedReq);
};
