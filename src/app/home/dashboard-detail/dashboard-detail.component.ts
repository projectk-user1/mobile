import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppConstants } from 'src/app/constants/config.constants';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UserDashboardDetails } from 'src/app/_models/user/user-dashboard';
import { MasterFieldsService } from 'src/app/services/master-fields/master-fields.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
})
export class DashboardDetailComponent implements OnInit {
  private selectedItem: any;
  events = {
    sent: {
      key: 'sent',
      data: [],
      text: 'By You'
    },
    received: {
      key: 'received',
      data: [],
      text: 'By Others'
    }
  };

  eventsAsArray;
  eventType;
  sentEvents:any[];
  receivedEvents:any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _restService: RestService, 
    private masterFieldsService: MasterFieldsService,
    public navCtrl: NavController,
    public loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.present();
    if (!this.masterFieldsService.userPrefs) {
      this._restService.httpGetServiceCall(AppConstants.mstrFieldsEndPoint).subscribe((res: any) => {
        this.masterFieldsService.createMstrFieldMap(res);
        this.masterFieldsService.userPrefs = res;
      }, error => {
        console.log('Error');
      });
    }
    this.eventsAsArray = Object.keys(this.events);
    let id = this.route.snapshot.paramMap.get('id');
    this.eventType = UserDashboardDetails.eventDetails.find(event => event.id === +id)
    // this.eventsAsArray.forEach(event => {
    //   this._restService.httpGetServiceCall(`events/myEvents/${this.events[event].key}/${id}`).subscribe(profiles => {
    //     this.events[event].data = <any[]>profiles;
    //     console.log(this.events[event].data);
    //    this.events[event].data.forEach((obj) => {
    //     obj=this.parseSearchResults(obj);
    //   })
    //   this.loading.dismiss();
    //   });
    // });
    this._restService.httpGetServiceCall(`events/myEvents/sent/${id}`).subscribe(profiles => {
      this.sentEvents = <any[]>profiles;
      this.sentEvents.forEach((obj) => {
        obj = this.parseSearchResults(obj);
      });
      this.loading.dismiss();
    });
    this._restService.httpGetServiceCall(`events/myEvents/received/${id}`).subscribe(profiles => {
      this.receivedEvents = <any[]>profiles;
      this.receivedEvents.forEach((obj) => {
        obj = this.parseSearchResults(obj);
      });
    });
  }

  parseSearchResults(obj) {
    return this.masterFieldsService.parseSearchResults(obj);
  }
  backToDashboard(){
    this.navCtrl.back()
  }
  showProfile(item:any){
    this.navCtrl.navigateForward(`/list/details/${item.userId}`);
  }
  
  formatCurrency(number){
    return number.toLocaleString('en-IN', {
      maximumFractionDigits: 0, 
      minimumFractionDigits: 0,
       style: 'currency',
       currency: 'INR'
   });
   }
}
