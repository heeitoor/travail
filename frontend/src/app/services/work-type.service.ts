import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ServiceBase from '../shared/service-base';
import { CookieService } from 'ngx-cookie-service';
import { SelectListItem } from '../shared/models';
import { map } from 'rxjs/operators';
import { capitalizeFirstLetter } from '../shared/functions';

@Injectable({
  providedIn: 'root',
})
export class WorkTypeService extends ServiceBase {
  constructor(protected readonly cookieService: CookieService) {
    super(cookieService);
  }

  getForSelect(query: string = '%20'): Observable<SelectListItem[]> {
    return this.get<SelectListItem[]>(`/work-type/${query}`).pipe(
      map((items) =>
        items.map((item) => {
          item.name = capitalizeFirstLetter(item.name.toLowerCase());
          return item;
        })
      )
    );
  }
}
