import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { MasterFieldsService } from '../services/master-fields/master-fields.service';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';
import { AppConstants } from '../constants/config.constants';
import { isNumber } from 'util';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  profileId;
  profile: any;
  constructor(public navCtrl: NavController,

    
    private _restService: RestService,
    private masterFieldsService: MasterFieldsService,
    public toastService: ToastService,
    public loading: LoadingService) { }

  ngOnInit() {
    if (!this.masterFieldsService.userPrefs) {
      this.loading.present();
      this._restService.httpGetServiceCall(AppConstants.mstrFieldsEndPoint).subscribe((res: any) => {
        this.masterFieldsService.createMstrFieldMap(res);
        this.masterFieldsService.userPrefs = res;
        this.loading.dismiss();
      }, error => {
        this.loading.dismiss();
        
      });
    }
  }

  search() {
    console.log(this.profileId);
    this.loading.present();
    this.profile ;
    this._restService.httpGetServiceCall(AppConstants.searchByIdEndPoint + "/" + this.profileId).subscribe((res: any) => {
      this.loading.dismiss();
      if (res != null) {
        let response = this.parseSearchResults(res)
        this.profile = response;
        this.profile.sharableLink = 'https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ'
      } else {
        this.toastService.presentToast('Profile not found');
      }
    }, error => {
      this.loading.dismiss();
      this.toastService.presentToast('Profile not found');
    });
  }
  parseSearchResults(obj) {
    return this.masterFieldsService.parseSearchResults(obj);
  }
  formatCurrency(number){
    if(isNumber(number))
    return number.toLocaleString('en-IN', {
      maximumFractionDigits: 0, 
      minimumFractionDigits: 0,
       style: 'currency',
       currency: 'INR'
   });
   }
   showProfile(item:any){
    this.navCtrl.navigateForward(`/list/details/${item.userId}`);
  }
}
