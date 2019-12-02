import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IUserPrefs } from 'src/app/_models/user';
import { RestService } from 'src/app/services/rest.service';
import { MasterFieldsService } from 'src/app/services/master-fields/master-fields.service';
import { AppConstants } from 'src/app/constants/config.constants';
import { LoadingService } from 'src/app/services/loading.service';
import { UserSession } from 'src/app/_models/UserSession';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-partner-preference',
  templateUrl: './partner-preference.component.html',
  styleUrls: ['./partner-preference.component.scss'],
})
export class PartnerPreferenceComponent implements OnInit {

  partnerPreferenceForm:FormGroup
  partnerPreferencePostObj:any;
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
    TAG : [],
    MSGTMPLT:[]
  };
  constructor(private _fb: FormBuilder, private _restService: RestService,
    private masterFieldsService: MasterFieldsService,public loading: LoadingService,
    public toastService: ToastService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.loading.present();
    this.partnerPreferenceForm=this._fb.group({
      gender:'',
      maritalstatus:'',
      caste:'',
      complexion:[],
      education:[],
      occupation:[],
      star:[],
      rasi:[],
      heightFrom:null,
      heightTo:null,
      ageFrom:null,
      ageTo:null,
      id:null

    })
    this._restService.httpGetServiceCall(AppConstants.myPartnerPreferenceEndPoint).subscribe((res: any) => {
     this.partnerPreferenceForm=this._fb.group({
      gender:res.gender,
      maritalstatus:res.maritalstatus,
      caste:[res.caste],
      complexion:[res.complexion],
      education:[res.education],
      occupation:[res.occupation],
      star:[res.star],
      rasi:[res.rasi],
      heightFrom:res.heightFrom,
      heightTo:res.heightTo,
      ageFrom:res.ageFrom,
      ageTo:res.ageTo,
      id:res.id
     }) 
     this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
    });
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
  }
  partnerPreferenceUpdate(){
    this.partnerPreferencePostObj=this.partnerPreferenceForm.value;
    this.partnerPreferencePostObj.userId = UserSession.getUserSession().userInfo.userId;;
    this.partnerPreferencePostObj.clientId = UserSession.getUserSession().userInfo.clientId;
    console.log(this.partnerPreferenceForm.value);
    this._restService.httpPostCall(AppConstants.updateMyPartnerPreferenceEndPoint, this.partnerPreferencePostObj).subscribe((result) => {
      console.log(result);
      this.toastService.presentToast('Preferences updated Successfully');
    },error => {
      this.toastService.presentToast('Preference updation Failed');
    })
  }

  backToList(){
    this.navCtrl.back()
  }
}
