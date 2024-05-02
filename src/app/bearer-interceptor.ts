import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
  } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, lastValueFrom, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Auth } from '@angular/fire/auth';
  
  //https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc
  // needs to add this function because getting the token is async
  const addBearerToken = async (
    req: HttpRequest<any>,
    next: HttpHandlerFn,
  ): Promise<HttpEvent<any>> => {
    const firebaseAuth = inject(Auth)
    const firebaseUser = await firebaseAuth.currentUser;
    const token = await firebaseUser?.getIdToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return lastValueFrom(next(req));
  };
  
  export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
    // only add the bearer token to requests to the backend
    if (req.url.startsWith(environment.backendUrl)) {
      return from(addBearerToken(req, next));
    } else {
      return next(req);
    }
  };