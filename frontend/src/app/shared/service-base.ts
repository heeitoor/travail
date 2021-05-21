import axios from 'axios-observable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { get as getCookie } from 'js-cookie';

export default abstract class ServiceBase {
  instance: axios;

  constructor() {
    const accessToken = getCookie('access_token');

    this.instance = axios.create({
      baseURL: env.apiUrl,
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    });
  }

  protected get<T>(url: string): Observable<T> {
    return this.instance.get<T>(url).pipe(map(({ data }) => data as T));
  }

  protected post<T>(path: string, data: any): Observable<T> {
    return this.instance.post(path, data).pipe(map(({ data }) => data as T));
  }
}
