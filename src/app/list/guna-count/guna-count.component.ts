import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserSession } from 'src/app/_models/UserSession';
import { RestService } from 'src/app/services/rest.service';
import { MasterFieldsService } from 'src/app/services/master-fields/master-fields.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConstants } from 'src/app/constants/config.constants';

@Component({
  selector: 'app-guna-count',
  templateUrl: './guna-count.component.html',
  styleUrls: ['./guna-count.component.scss'],
})
export class GunaCountComponent implements OnInit {

  constructor(public navCtrl: NavController,
    private route: ActivatedRoute,
    private _restService: RestService,
    private masterFieldsService: MasterFieldsService,
    public loading: LoadingService) { }
  profileId: any;
  loggedInUser: any;
  gunaMatchResults: any;

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('profileId');
    this.loggedInUser = UserSession.getUserSession().userInfo.userId;

    if (!this.gunaMatchResults) {
      if (typeof this.loggedInUser === 'undefined') {
        this.loggedInUser = '';
      }
      this.loading.present();
      this._restService.httpGetServiceCall(AppConstants.gunaCountForProfile + "?loggedInProfileId=" + this.loggedInUser + "&selectedProfile=" + this.profileId).subscribe((result) => {
        this.gunaMatchResults = result;
        console.log(result);
        this.gunaMatchResults.brideStar = this.masterFieldsService.starMap.get(this.gunaMatchResults.brideStar).fieldName;
        this.gunaMatchResults.groomStar = this.masterFieldsService.starMap.get(this.gunaMatchResults.groomStar).fieldName;
        this.gunaMatchResults.groomRasi = this.masterFieldsService.rasiMap.get(this.gunaMatchResults.groomRasi).fieldName;
        this.gunaMatchResults.brideRasi = this.masterFieldsService.rasiMap.get(this.gunaMatchResults.brideRasi).fieldName;
        this.loading.dismiss();
      })
    }
  }
  navigateBack(){
    this.navCtrl.back();
  }
}
