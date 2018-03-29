import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../shared/baseurl';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

import 'rxjs/add/operator/catch';
/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: HttpClient,
              private processHttpmsg : ProcessHttpmsgProvider) {
  }

  getDishes() : Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + "dishes")
                    .catch(error => { return this.processHttpmsg.handleError(error)});
  }

  getDish(id: number) : Observable<Dish>{
    return this.http.get<Dish>(baseURL + "dishes/" + id)
                    .catch(error => { return this.processHttpmsg.handleError(error)});
  }

  getFeaturedDish() : Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + "dishes?featured=true")
                    .catch(error=> { return this.processHttpmsg.handleError(error)});
  }
}
