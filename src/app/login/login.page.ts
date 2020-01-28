import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../services/rest.service';
import { Errors } from '../constants/errors';
import { UserSession } from '../_models/UserSession';
import { AppConstants } from '../constants/config.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  signInForm: FormGroup;
  errorType = null;
  loading = false;
  constructor(public navCtrl: NavController, 
              private _formBuilder: FormBuilder, 
              private _restService: RestService,
              private menu: MenuController) { }

  ngOnInit() {
    this.reset();
  }

  reset(){
    this.signInForm = this._formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required],
      host:[''],
      useMock:['']
    });
  }
  public login() {
    // alert('login');
    localStorage.removeItem('host');
    localStorage.removeItem('useMock');
    if(this.signInForm.get('host') && this.signInForm.get('host').value){
      localStorage.setItem('host', this.signInForm.get('host').value);
    }
    if(this.signInForm.get('useMock') && this.signInForm.get('useMock').value){
      localStorage.setItem('useMock', this.signInForm.get('useMock').value);
    }
    
    if (this.signInForm.valid) {
      this.loading = true;
      // alert('Form Valid');
      this._restService.httpPostCall(AppConstants.loginEndPoint, this.signInForm.value).subscribe(
        (data: any) => {
          this.loading = false;
          if (data) {
            UserSession.createUserSession(data.data);
            if (UserSession.getUserSession().userInfo.userRole === 'U') {
              localStorage.setItem('jwt', data.data);
              this.menu.enable(true);
              this.navCtrl.navigateForward('/home');
            }
            this.reset();
          } else {
            this.errorType = Errors.AUTHENTICATION_ERROR;
          }
        }, 
        error => {
          this.loading = false;
          this.errorType = Errors.SERVER_ERROR;
          alert(error);
        }
      );
    }
  }

}
