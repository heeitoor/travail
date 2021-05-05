import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ServiceBase from '../shared/service-base';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { TravailJwtToken, UserLoginRequest } from '../models/security';
import { CreateModel } from '../modules/security/models';

@Injectable({
  providedIn: 'root',
})
export class SecurityService extends ServiceBase {
  get isAuthenticated(): boolean {
    return !!this.cookieService.get(this.accessTokenName);
  }

  private get accessTokenName(): string {
    return 'access_token';
  }

  constructor(protected readonly cookieService: CookieService) {
    super(cookieService);
  }

  login(model: UserLoginRequest): Observable<string> {
    return super.post<string>('/user/login', model).pipe(
      map((jwt: string) => {
        this.cookieService.set(this.accessTokenName, jwt, {
          expires: 1,
          secure: env.useSsl,
        });
        const decodedJwt = jwtDecode<TravailJwtToken>(jwt);
        localStorage.setItem('userName', decodedJwt.name);
        return decodedJwt.name;
      })
    );
  }

  signup(model: CreateModel): Observable<boolean> {
    return super.post<boolean>('/user', model);
  }
}
