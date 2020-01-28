import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  // filterValueChanged: Subject<any> = new Subject<any>();
  commentApplied: Subject<any> = new Subject<any>();
  private filterObj: any = {};
  private loggedInUserObj:any;
  setFilter(obj:any){
    this.filterObj=obj;
    // this.filterValueChanged.next(obj);
  }
  getFilter(){
    return this.filterObj;
  }
  saveSelectedComment(obj:any){
    this.commentApplied.next(obj);
  }
  
  setLoggedInUserObj(obj:any){
    this.loggedInUserObj=obj;
  }
  getLoggedInUserObj(){
    return this.loggedInUserObj;
  }
}
