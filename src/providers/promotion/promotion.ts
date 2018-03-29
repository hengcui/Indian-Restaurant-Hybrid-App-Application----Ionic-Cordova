import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../shared/baseurl';
import { Promotion } from '../../shared/promotion';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

import 'rxjs/add/operator/catch';
/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: HttpClient,
              private processHttpmsg : ProcessHttpmsgProvider) {
  }

  getPromotions() : Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + "promotions")
                    .catch(error => { return this.processHttpmsg.handleError(error)});
  }

  getPromotion(id: number) : Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + "promotions/" + id)
                    .catch(error => { return this.processHttpmsg.handleError(error)});
  }

  getFeaturedPromotion() : Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + "promotions?featured=true")
                    .catch(error=> { return this.processHttpmsg.handleError(error)});
  }
}
