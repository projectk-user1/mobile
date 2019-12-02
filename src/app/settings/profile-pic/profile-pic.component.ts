import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserSession } from 'src/app/_models/UserSession';
import { AppConstants } from 'src/app/constants/config.constants';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {
  myProfilePicForm: FormGroup;
  picUpdatePostObj: any;
  constructor(public navCtrl: NavController,private _fb: FormBuilder, private _restService: RestService,public toastService: ToastService,public loading: LoadingService) { }

  ngOnInit() {
    this.loading.present();
    this.myProfilePicForm = this._fb.group({
      photoLink: '',
      videoLink: ''
    });
    this.getUserDetails();
  }
  getUserDetails(){
      this._restService.httpGetServiceCall(AppConstants.searchByIdEndPoint + '/' + UserSession.getUserSession().userInfo.userId)
      .subscribe(response => {
        let data:any=response;
        this.myProfilePicForm = this._fb.group({
          photoLink: data.photoLink,
          videoLink: data.videoLink
        });
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
      }
    );
    
  }
  picUpdate() {
    this.picUpdatePostObj = this.myProfilePicForm.value;
    this.picUpdatePostObj.userId = UserSession.getUserSession().userInfo.userId;
    this.picUpdatePostObj.clientId = UserSession.getUserSession().userInfo.clientId;
    console.log(this.picUpdatePostObj);
    this._restService.httpPostCall(AppConstants.updateUserPicEndPoint, this.picUpdatePostObj).subscribe((result) => {
      console.log(result);
      this.toastService.presentToast('Profile Updates sent for approval Successfully');
    },error => {
      this.toastService.presentToast('Preference updation Failed');
    })
  }
  backToList(){
    this.navCtrl.back()
  }
}
