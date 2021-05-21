import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginRequest, TravailJwtToken } from '../models/security';
import ServiceBase from '../shared/service-base';
import jwtDecode from 'jwt-decode';
import { set as setCookie } from 'js-cookie';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityService extends ServiceBase {
  constructor() {
    super();
  }

  gets() {
    super.get('/user').subscribe();
  }

  login(model: UserLoginRequest): Observable<string> {
    return super.post<string>('/user/login', model).pipe(
      map((jwt: string) => {
        setCookie('access_token', jwt, { expires: 1, secure: env.useSsl });
        const decodedJwt = jwtDecode<TravailJwtToken>(jwt);
        localStorage.setItem('userName', decodedJwt.name);
        return decodedJwt.name;
      })
    );
  }
}
