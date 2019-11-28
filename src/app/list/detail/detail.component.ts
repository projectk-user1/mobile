import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { MasterFieldsService } from 'src/app/services/master-fields/master-fields.service';
import { RestService } from 'src/app/services/rest.service';
import { AppConstants } from 'src/app/constants/config.constants';
import { UserSession } from 'src/app/_models/UserSession';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  constructor(public navCtrl: NavController, private route: ActivatedRoute, private socialSharing: SocialSharing,
    private _restService: RestService,
    private masterFieldsService: MasterFieldsService) { }

  item: any;
  sub: any;
  profileId: any;
  profile: any;
  selected = 'Info';
  gunaMatchResults: any;
  loggedInUser: any;
  ngOnInit() {

    //   this.route.queryParams.subscribe(params => {

    //     this.item = JSON.parse(params["item"]);
    // });
    // this.sub = this.route.params.subscribe(params => {
    //   this.item = params; 
    // });
    console.log(this.route.snapshot.paramMap.get('profileId'));
    this.profileId = this.route.snapshot.paramMap.get('profileId');
    this.fetchProfile(this.profileId);
    this.loggedInUser=UserSession.getUserSession().userInfo.userId
  }

  fetchProfile(profileId){
    this.profile={};
    this._restService.httpGetServiceCall(AppConstants.searchByIdEndPoint + "/" + profileId).subscribe((res: any) => {
      if (res != null) {
        let response = this.parseSearchResults(res)
        this.profile=response;
        this.profile.sharableLink='https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ'
      } else {
        
      }
    }, error => {

    });
    
    // this.profile.profileId= this.profileId,
    // this.profile.aboutSelf="Now that your app has been created, you'll want to start building out features and components. Check out some of the resources below for next steps."
    // this.profile.firstName='Mahesh',
    // this.profile.age ='26 yrs.',
    // this.profile.height='5 ft 3 in',
    // this.profile.weight='53 kgs / 123 lbs',
    // this.profile.complexion='Wheatish'
    // this.profile.maritalStatus='unmarried',
    // this.profile.occupation='Software Engineer',
    // this.profile.education='B. Tech',
    // this.profile.distance='180 km',
    // this.profile.gunacount='24',
    // this.profile.salary='100000',
    // this.profile.photoLink='https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ',
    // this.profile.sharableLink='https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ'
  }
  backToList(){
    // const nav = document.querySelector('ion-nav');
    // nav.push('detail', { item });

    // this.navCtrl.navigateBack('\list',{queryParams:{
    //   name: 'anil';
    // }});   
    this.navCtrl.back()
    

  }
  segmentChanged(e){
    console.log(e.detail.value);
    this.selected  = e.detail.value;
    if (e.detail.value=='astrology') {
      if (!this.gunaMatchResults) {
        if (typeof this.loggedInUser === 'undefined') {
          this.loggedInUser='';
      }
        this._restService.httpGetServiceCall(AppConstants.gunaCountForProfile + "?loggedInProfileId=" + this.loggedInUser + "&selectedProfile=" + this.profileId).subscribe((result) => {
          this.gunaMatchResults = result;
          console.log(result);
          this.gunaMatchResults.brideStar = this.masterFieldsService.starMap.get(this.gunaMatchResults.brideStar).fieldName;
          this.gunaMatchResults.groomStar = this.masterFieldsService.starMap.get(this.gunaMatchResults.groomStar).fieldName;
          this.gunaMatchResults.groomRasi = this.masterFieldsService.rasiMap.get(this.gunaMatchResults.groomRasi).fieldName;
          this.gunaMatchResults.brideRasi = this.masterFieldsService.rasiMap.get(this.gunaMatchResults.brideRasi).fieldName;
        })
      }
    }
  }
  sendShare() {
    this.socialSharing.share(this.profile.profileId, this.profile.profileId, null, this.profile.sharableLink);
  }  
  parseSearchResults(obj) {
    return this.masterFieldsService.parseSearchResults(obj);
  }
}
