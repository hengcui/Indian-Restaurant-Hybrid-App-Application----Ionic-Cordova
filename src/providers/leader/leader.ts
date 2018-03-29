import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../shared/baseurl';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

import 'rxjs/add/operator/catch';
/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: HttpClient,
              private processHttpmsg : ProcessHttpmsgProvider) {
  }

  getLeaders() : Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + "leaders")
                    .catch(error => { return this.processHttpmsg.handleError(error)});
  }

  getLeader(id: number) : Observable<Leader>{
    return this.http.get<Leader>(baseURL + "leaders/" + id)
                    .catch(error => { return this.processHttpmsg.handleError(error)});
  }

  getFeaturedLeader() : Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + "leaders?featured=true")
                    .catch(error=> { return this.processHttpmsg.handleError(error)});
  }
}
