import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { RestService } from '../services/rest.service';
import { UserDashboardDetails } from '../_models/user/user-dashboard';
import { forkJoin } from 'rxjs';
import { EventConfig } from '../_models/user/user-event.config';
import { MasterFieldsService } from '../services/master-fields/master-fields.service';
import { AppConstants } from '../constants/config.constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  eventCards = UserDashboardDetails.eventDetails;
  loading = true;
  userEvents = [];
  
  constructor(public navCtrl: NavController,private _restService: RestService,private masterFieldsService: MasterFieldsService) { }

  ngOnInit() {
    this.eventCards.forEach(card => {
      forkJoin([
        this._restService.httpGetServiceCall(`events/myEventsCnt/sent/${card.id}`),
        this._restService.httpGetServiceCall(`events/myEventsCnt/received/${card.id}`)])
        .subscribe(sentReceived => {
          card.body = sentReceived[0] + '/' + sentReceived[1];
          this.loading = false;
        })
    })
    if (!this.masterFieldsService.userPrefs) {
      forkJoin([
      this._restService.httpGetServiceCall(AppConstants.mstrFieldsEndPoint),
      this._restService.httpGetServiceCall('events/myEvents')])  
      .subscribe((res: any) => {
        this.masterFieldsService.createMstrFieldMap(res[0]);
        this.masterFieldsService.userPrefs = res[0];
        this.addAdditionalDetails(res[1]);
      }, error => {

      });
    }else{
      this._restService.httpGetServiceCall('events/myEvents').subscribe((events) => {
        this.addAdditionalDetails(events);
        this.loading = false;
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
}
