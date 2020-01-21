import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ToastController, ModalController } from '@ionic/angular';
import { DetailComponent } from './detail/detail.component';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common-service.service';
import { MasterFieldsService } from '../services/master-fields/master-fields.service';
import { RestService } from '../services/rest.service';
import { IUserPrefs } from '../_models/user';
import { AppConstants } from '../constants/config.constants';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UserSession } from '../_models/UserSession';
import { CommentComponent } from './comment/comment.component';
import { ToastService } from '../services/toast.service';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  
  searchResults: any;
  searchResultsCnt: any;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 1000;
  postObj: any;
  resultsFrom = 0;
  resultsSize = 10;
  userPrefs: IUserPrefs = {
    CASTE: [],
    COMPLEXION: [],
    EDUCATION: [],
    FAMILY_STATUS: [],
    FAMILY_TYPE: [],
    FAMILY_VALUES: [],
    GOTRAM: [],
    OCCUPATION: [],
    RASI: [],
    RELIGION: [],
    STAR: [],
    MARITAL_STATUS: [],
    TAG: [],
    MSGTMPLT:[]
  };
  filterCnt:any = 0;
  // filterValueChangedSubscription: Subscription;
  commentAppliedSubscription: Subscription;

  constructor(public navCtrl: NavController,
              private route: ActivatedRoute,
              private commonService:CommonService,
              private _restService: RestService, 
              private masterFieldsService: MasterFieldsService,
              private socialSharing: SocialSharing,
              // public popoverController: PopoverController,
              public modalController: ModalController,
              public toastService: ToastService,
              public loading: LoadingService) {
    
  }
  ionViewWillEnter() {
    // console.log(this.route.snapshot.paramMap.get('id'));
    if (this.masterFieldsService.userPrefs) {
      this.userPrefs = this.masterFieldsService.userPrefs;
      this.masterFieldsService.createMstrFieldMap(this.userPrefs);
    } else {
      this._restService.httpGetServiceCall(AppConstants.mstrFieldsEndPoint).subscribe((res: any) => {
        this.userPrefs = res;
        this.masterFieldsService.createMstrFieldMap(res);
        this.masterFieldsService.userPrefs = res;
      }, error => {

      });
    }
    this.postObj = Object.assign({},this.commonService.getFilter()) || {};
    // this.filterCnt = Object.entries(this.postObj).length ;
    this.checkNoOfFiltersApplied(this.postObj);
    this.search();
    
    this.commentAppliedSubscription = this.commonService.commentApplied.subscribe(res => {
      console.log(res);
      this.updateCommentEvent(res);
    },
      errror => {
        console.warn("something went wrong", errror);
      })
    
  }
  ngOnInit() {
    
  }
  ngOnDestroy() {
    this.commonService.setFilter({});
    // this.filterValueChangedSubscription.unsubscribe();
    this.commentAppliedSubscription.unsubscribe();
}
  
  showProfile(item:any){
    this.navCtrl.navigateForward(`/list/details/${item.userId}`);
  }

  navigateTofilter(){
    this.navCtrl.navigateForward(`/list/filter`);
  }
  
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  // showDetail(item:any){
  //   // const nav = document.querySelector('ion-nav');
  //   // nav.push('detail', { item });
  //   item.title="Mahesh";
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //         item: JSON.stringify(item)
  //     }
  // };
  //   // this.navCtrl.navigateForward('/list/detail',navigationExtras);
  //   // this.router.navigate(['/list/detail', item]);
  //   this.navCtrl.navigateForward(`/list/details/${item.profileId}`);
  // }
  search() {
    this.loading.present();
    this.searchResults = [];
    this.postObj.pageSize = this.resultsSize;
    this.resultsFrom = 0;
    this.postObj.from = 0;
    this._restService.httpPostCall(AppConstants.fetchProfilesCntEndPoint, this.postObj).subscribe((result) => {
      this.searchResultsCnt = result;
    })
    this.loadData();
  }

  checkNoOfFiltersApplied(postObj:any){
    let filterCnt=0;
    if(postObj.gender){
      filterCnt=filterCnt+1;
    }if(postObj.ageFrom && postObj.ageTo){
      filterCnt=filterCnt+1;
    } if(postObj.heightFrom && postObj.heightTo){
      filterCnt=filterCnt+1;
    } if(postObj.education){
      filterCnt=filterCnt+1;
    } if(postObj.maritalstatus){
      filterCnt=filterCnt+1;
    } if(postObj.salaryFrom){
      filterCnt=filterCnt+1;
    } if(postObj.caste){
      filterCnt=filterCnt+1;
    } if(postObj.religion){
      filterCnt=filterCnt+1;
    } if(postObj.familyStatus){
      filterCnt=filterCnt+1;
    } if(postObj.familyType){
      filterCnt=filterCnt+1;
    } if(postObj.familyValues){
      filterCnt=filterCnt+1;
    } if(postObj.distance){
      filterCnt=filterCnt+1;
    }
    this.filterCnt=filterCnt;
  }

  loadData() {
    this.postObj.pageSize = this.resultsSize;
    this.postObj.from = this.resultsFrom;
    let url = 'user/fetchProfiles';
    this._restService.httpPostCall(url, this.postObj).subscribe((result: any) => {
      this.resultsFrom = this.resultsFrom + this.resultsSize;
      result.forEach((obj) => {
        this.parseSearchResults(obj);
        this.loading.dismiss();
      })
      this.searchResults = this.searchResults.concat(result);
    })
  }

  parseSearchResults(obj) {
    return this.masterFieldsService.parseSearchResults(obj);
  }

  onScrollDown(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.resultsFrom < this.searchResultsCnt) {
        this.loadData();
      }else{
        event.target.disabled = true;
      }
    }, 500);
  }
  sendShare(user:any) {
    this.socialSharing.share(user.userId, user.userId, null, user.photoLink);
  } 

  formatCurrency(number){
    return number.toLocaleString('en-IN', {
      maximumFractionDigits: 0, 
      minimumFractionDigits: 0,
       style: 'currency',
       currency: 'INR'
   });
   }

   updateFavouriteEvent(userInfo: any) {
    this.loading.present();
    console.log('on Update Event' + userInfo);
    let eventModeUrl = "/create";
    this.postObj = {};
    userInfo.eventLogs.forEach(element => {
      if (element.eventType == 3) {
        this.postObj.id = element.id;
        eventModeUrl = "/deleteEventLog"
      }
    });
    this.postObj.clntId = userInfo.clientId;
    this.postObj.toUserId = userInfo.userId;
    this.postObj.fromUserId = UserSession.getUserSession().userInfo.userId
    this.postObj.eventType = 3;
    this._restService.httpPostCall('/events' + eventModeUrl, this.postObj).subscribe((result) => {
      if (eventModeUrl == "/deleteEventLog") {
        userInfo.favorite = "medium";
        userInfo.eventLogs.forEach(element => {
          if (element.eventType == 3) {
            const index: number = userInfo.eventLogs.indexOf(element);
            if (index !== -1) {
              userInfo.eventLogs.splice(index, 1);
            }
          }
        });
      } else {
        userInfo.favorite = "primary";
        let eventLog: any = {};
        eventLog.id = result;
        eventLog.clntId = userInfo.clientId;
        eventLog.eventType = 3;
        userInfo.eventLogs.push(eventLog);
      }
      this.loading.dismiss();
    })
  }
  updateLikeEvent(userInfo: any) {
    this.loading.present();
    console.log('on Update Event' + userInfo);
    let eventModeUrl = "/create";
    this.postObj = {};
    userInfo.eventLogs.forEach(element => {
      if (element.eventType == 1) {
        this.postObj.id = element.id;
        eventModeUrl = "/deleteEventLog"
      }
    });
    this.postObj.clntId = userInfo.clientId;
    this.postObj.toUserId = userInfo.userId;
    this.postObj.fromUserId = UserSession.getUserSession().userInfo.userId
    this.postObj.eventType = 1;
    console.log(userInfo.eventLogs);
    this._restService.httpPostCall('/events' + eventModeUrl, this.postObj).subscribe((result) => {
      if (eventModeUrl == "/deleteEventLog") {
        userInfo.likeColor = "medium";
        userInfo.eventLogs=userInfo.eventLogs.filter(item => item.eventType !=1);
      } else {
        userInfo.likeColor = "primary";
        let eventLog: any = {};
        eventLog.id = result;
        eventLog.clntId = userInfo.clientId;
        eventLog.eventType = 1;
        userInfo.eventLogs.push(eventLog);
      }
    })
    this.loading.dismiss();
  }
  selectedUser:any;
  async openMessageBox(ev: any) {
    console.log(ev);
    this.selectedUser=ev;
    // const popover = await this.popoverController.create({
    //     component: CommentComponent,
    //     event: ev,
    //     animated: true,
    //     showBackdrop: true,
    //     cssClass: 'pop-over-style'
    // });
    // return await popover.present();
    const modal = await this.modalController.create({
      component: CommentComponent
    });
    return await modal.present();
}

updateCommentEvent(selctedMsgTmplt:any){
  console.log('on Update Event' + this.selectedUser);
  let eventModeUrl = "/create";
  this.postObj = {};
  this.postObj.clntId = this.selectedUser.clientId;
  this.postObj.toUserId = this.selectedUser.userId;
  this.postObj.fromUserId = UserSession.getUserSession().userInfo.userId
  this.postObj.eventType = 2;
  this.postObj.message=selctedMsgTmplt;
  console.log(this.selectedUser.eventLogs);
  this._restService.httpPostCall('/events' + eventModeUrl, this.postObj).subscribe((result) => {
    console.log(result);
    let eventLog: any = {};
    eventLog.id = result;
    eventLog.clntId = this.selectedUser.clientId;
    eventLog.eventType = 2;
    this.selectedUser.eventLogs.push(eventLog);
    this.selectedUser.commentsCnt=this.selectedUser.commentsCnt+1;
    this.toastService.presentToast('Message Sent Successfully');
  })
  
}
// async dismissPopover() {
//   await this.popoverController.dismiss();
// }

}
