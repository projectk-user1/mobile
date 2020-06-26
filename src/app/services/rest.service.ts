import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../constants/config.constants';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiEndPoint = AppConstants.apiEndpoint;

  constructor(private _httpClient: HttpClient) { }

  


  getHttpHeaders(serviceUrl) {
    return new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', '*')
      .set('Access-Control-Allow-Methods', '*')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer' + localStorage.getItem('jwt'));
  }

  httpGetServiceCall(serviceUrl) {
    if (AppConstants.useMockData || localStorage.getItem('useMock')=='Y') {
      serviceUrl = '/' + serviceUrl.split('/').join('_');
      serviceUrl = serviceUrl.split('?').join('_');
      serviceUrl = serviceUrl.split('=').join('_');
      serviceUrl = serviceUrl.split('&').join('_');
      if (serviceUrl.startsWith('_')) {
        serviceUrl = serviceUrl.substring(1);
      }
      const restURL = 'assets/mockData' + serviceUrl;
      return this._httpClient.get(`${restURL}.json`).pipe(map(res => res));
    }
    if(localStorage.getItem('host')){
      this.apiEndPoint='';
      this.apiEndPoint=localStorage.getItem('host')+'/ProjectK/rest';
    }
    return this._httpClient.get(`${this.apiEndPoint + '/' + serviceUrl}`, { headers: this.getHttpHeaders(serviceUrl) })
      .pipe(map(res => res));

  }

  httpPostCall(serviceUrl, param) {
    // alert('Inside Post call');
    if (localStorage.getItem('useMock')=='Y') {
      const restURL = 'assets/mockData' + '/' + serviceUrl.split('/').join('_');
      return this._httpClient.get(`${restURL}.json`).pipe(map(res => res));
    }
    
    if(localStorage.getItem('host')){
      this.apiEndPoint='';
      this.apiEndPoint=localStorage.getItem('host')+'/ProjectK/rest';
    }
    // alert(`${this.apiEndPoint + '/' + serviceUrl}`);
    // alert(JSON.stringify(param));
    // alert(JSON.stringify(this.getHttpHeaders(serviceUrl)));
    return this._httpClient.post(`${this.apiEndPoint + '/' + serviceUrl}`, JSON.stringify(param), { headers: this.getHttpHeaders(serviceUrl) })
      .pipe(map(res => res));
  }
}
