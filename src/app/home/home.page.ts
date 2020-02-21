import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { RestService } from '../services/rest.service';
import { UserDashboardDetails } from '../_models/user/user-dashboard';
import { forkJoin } from 'rxjs';
import { EventConfig } from '../_models/user/user-event.config';
import { MasterFieldsService } from '../services/master-fields/master-fields.service';
import { AppConstants } from '../constants/config.constants';
import { LoadingService } from '../services/loading.service';
import { UserSession } from '../_models/UserSession';
import { CommonService } from '../common-service.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  
  

  eventCards = UserDashboardDetails.eventDetails;
  userEvents = [];
  loggedInUser:any;
  loggedInUserPic:any;
  loggedInUserInfo:any;
  constructor(public navCtrl: NavController,
              private _restService: RestService,
              private masterFieldsService: MasterFieldsService,
              private commonService:CommonService,
              public loading: LoadingService,
              public toastService: ToastService) { }
    ngOnInit() {

    }
    ionViewWillEnter() {
    this.loading.present();
    this.loggedInUser=UserSession.getUserSession().userInfo.userId;
    this.loggedInUserInfo=UserSession.getUserSession().userInfo;
    this.eventCards.forEach(card => {
      forkJoin([
        this._restService.httpGetServiceCall(`events/myEventsCnt/sent/${card.id}`),
        this._restService.httpGetServiceCall(`events/myEventsCnt/received/${card.id}`)])
        .subscribe(sentReceived => {
          card.body = sentReceived[0] + '/' + sentReceived[1];
        })
    })
    if (!this.masterFieldsService.userPrefs) {
      forkJoin([
      this._restService.httpGetServiceCall(AppConstants.mstrFieldsEndPoint),
      this._restService.httpGetServiceCall('events/myEvents'),
      this._restService.httpGetServiceCall(AppConstants.searchByIdEndPoint + "/" + UserSession.getUserSession().userInfo.userId)])  
      .subscribe((res: any) => {
        this.masterFieldsService.createMstrFieldMap(res[0]);
        this.masterFieldsService.userPrefs = res[0];
        this.addAdditionalDetails(res[1]);
        this.commonService.setLoggedInUserObj(this.masterFieldsService.parseSearchResults(res[2]));
        this.loggedInUserPic=this.commonService.getLoggedInUserObj().photoLink;
        this.loading.dismiss();
      }, error => {
        this.loading.dismiss();
        this.toastService.presentToast('Error while fetching data');
      });
    }else{
      forkJoin([
        this._restService.httpGetServiceCall('events/myEvents'),
        this._restService.httpGetServiceCall(AppConstants.searchByIdEndPoint + "/" + UserSession.getUserSession().userInfo.userId)])  
        .subscribe((res: any) => {
        this.addAdditionalDetails(res[0]);
        this.commonService.setLoggedInUserObj(this.masterFieldsService.parseSearchResults(res[1]));
        this.loggedInUserPic=this.commonService.getLoggedInUserObj().photoLink;
        this.loading.dismiss();
      }, error =>{
        this.loading.dismiss();
        this.toastService.presentToast('Error while fetching data');
      })
    }
  }

  addAdditionalDetails(events) {
    events.forEach(event => {
      if(event.eventType ==2){
        event.message=this.masterFieldsService.messageTemplateMap.get(event.message).fieldName;
      }
      Object.keys(EventConfig).forEach(i => {
        let config = EventConfig[i]
        if (event.eventType === config.id) {
          this.userEvents.push({ ...event, ...config });
        }
      })
      
    })

  }
  showDetails(type:any) {
    this.navCtrl.navigateForward(`/home/details/${type}`);
  }
  showProfile(userId:any){
    this.navCtrl.navigateForward(`/list/details/${userId}`);
  }
  showMyProfile(){
    this.navCtrl.navigateForward(`/settings`);
  }
  showMySearchPage(){
    this.navCtrl.navigateForward(`/search`);
  }
}
