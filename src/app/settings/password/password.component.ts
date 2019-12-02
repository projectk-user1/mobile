import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { UserSession } from 'src/app/_models/UserSession';
import { AppConstants } from 'src/app/constants/config.constants';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  myProfilePwdForm:FormGroup;
  pwdUpdateObj: any;
  constructor(public navCtrl: NavController,private _fb: FormBuilder, private _restService: RestService,public toastService: ToastService) { }

  ngOnInit() {
    this.myProfilePwdForm=this._fb.group({
      currentPwd:'',
      newPwd:'',
      confirmPwd:''
    });
  }
  pwdUpdate(){
    this.pwdUpdateObj= {};
    this.pwdUpdateObj.loginId=UserSession.getUserSession().userInfo.userId;
    this.pwdUpdateObj.password=this.myProfilePwdForm.get('currentPwd').value;
    this.pwdUpdateObj.newPassword=this.myProfilePwdForm.get('newPwd').value;
    console.log(this.pwdUpdateObj);
    this._restService.httpPostCall(AppConstants.updatePwdEndPoint, this.pwdUpdateObj).subscribe((result) => {
      console.log(result);
      this.toastService.presentToast('Password updated Successfully');
    },error =>{
      this.toastService.presentToast('Password updation Failed');
    })
  }
  backToList(){
    this.navCtrl.back()
  }
}
