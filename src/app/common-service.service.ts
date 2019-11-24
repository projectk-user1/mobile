import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  filterValueChanged: Subject<any> = new Subject<any>();

  setFilter(obj:any){
    this.filterValueChanged.next(obj);
  }
}
