import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  constructor(public navCtrl: NavController,private route: ActivatedRoute,private socialSharing: SocialSharing) { }

  item:any;
  sub:any;
  profileId:any;
  profile:any;
  selected  = 'Info';
  ngOnInit() {

  //   this.route.queryParams.subscribe(params => {
     
  //     this.item = JSON.parse(params["item"]);
  // });
  // this.sub = this.route.params.subscribe(params => {
  //   this.item = params; 
  // });
console.log(this.route.snapshot.paramMap.get('profileId'));
this.profileId=this.route.snapshot.paramMap.get('profileId');
this.fetchProfile();
  }

  fetchProfile(){
    this.profile={};
    this.profile.profileId= this.profileId,
    this.profile.aboutSelf="Now that your app has been created, you'll want to start building out features and components. Check out some of the resources below for next steps."
    this.profile.firstName='Mahesh',
    this.profile.age ='26 yrs.',
    this.profile.height='5 ft 3 in',
    this.profile.weight='53 kgs / 123 lbs',
    this.profile.complexion='Wheatish'
    this.profile.maritalStatus='unmarried',
    this.profile.occupation='Software Engineer',
    this.profile.education='B. Tech',
    this.profile.distance='180 km',
    this.profile.gunacount='24',
    this.profile.salary='100000',
    this.profile.photoLink='https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ',
    this.profile.sharableLink='https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ'
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
 
  }
  sendShare() {
    this.socialSharing.share(this.profile.profileId, this.profile.profileId, null, this.profile.sharableLink);
  }  
}
