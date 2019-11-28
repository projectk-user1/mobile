import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IUserPrefs, IFieldMap } from '../_models/user';
import { RestService } from '../services/rest.service';
import { MasterFieldsService } from '../services/master-fields/master-fields.service';
import { AppConstants } from '../constants/config.constants';
import { UserSession } from '../_models/UserSession';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  userInfo;
  loading = true;
  myProfileForm: FormGroup;
  postObj: any;
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
  tagMap: Map<number,String> =new Map<number,String>();
  rasiStarMap: any;
  editProfileStarArr:IFieldMap [];
  constructor(private _fb: FormBuilder,private _restService: RestService,
    private masterFieldsService: MasterFieldsService) { }

  ngOnInit() {
    this.myProfileForm = this._fb.group({
      id: [],
      email: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      complexion: new FormControl(null, [Validators.required]),
      education: new FormControl(null, [Validators.required]),
      occupation: new FormControl(null, [Validators.required]),
      maritalstatus: new FormControl(null, [Validators.required]),
      activeInd:new FormControl(null, [Validators.required]),
      paternalGotram: new FormControl(null, [Validators.required]),
      maternalGotram: new FormControl(null, [Validators.required]),
      star: new FormControl(null, [Validators.required]),
      rasi: new FormControl(null, [Validators.required]),
      aboutSelf: [''],
      salary: new FormControl(null, [Validators.required]),
      mobileno: new FormControl(null, [Validators.required]),
      address: [''],
      gender: new FormControl('', [Validators.required]),
      caste: new FormControl(null, [Validators.required]),
      religion: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      familyStatus: new FormControl(null, [Validators.required]),
      familyType: new FormControl(null, [Validators.required]),
      familyValues: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required]),
      latitude: new FormControl(null, [Validators.required]),
      tags:[],
    });
    if (this.masterFieldsService.userPrefs) {
      this.userPrefs = this.masterFieldsService.userPrefs;
      this.masterFieldsService.createMstrFieldMap(this.userPrefs);
      this.getUserDetails();
    } else {
      this._restService.httpGetServiceCall(AppConstants.mstrFieldsEndPoint).subscribe((res: any) => {
        this.userPrefs = res;
        this.masterFieldsService.createMstrFieldMap(res);
        this.masterFieldsService.userPrefs = res;
        this.getUserDetails();
      }, error => {
      });
    }
  }

  getUserDetails(){
    forkJoin([
      this._restService.httpGetServiceCall(AppConstants.rasiStarMapEndPoint),
      this._restService.httpGetServiceCall(AppConstants.searchByIdEndPoint + '/' + UserSession.getUserSession().userInfo.userId)])
      .subscribe(response => {
        this.rasiStarMap = response[0];
        let data:any=response[1];
        this.loading = false;
        this.userInfo = data;
        var _tag = [];
        data.tags.forEach(element => {
          _tag.push(this.masterFieldsService.tagMap.get(element));
        });
        let _rasiStarVal = this.rasiStarMap[this.userInfo.rasi];
        this.editProfileStarArr = [];
        _rasiStarVal.forEach(element => {
          this.editProfileStarArr.push(this.masterFieldsService.starMap.get(element));
        });
        //DD/MM/YYYY HH:mm
        this.myProfileForm = this._fb.group({
          firstname: new FormControl({value: this.userInfo.firstname, disabled: true}),
          lastname: new FormControl({value: this.userInfo.lastname, disabled: true}),
          email: this.userInfo.email,
          dob: new Date(this.userInfo.dob).toISOString(),
          height: this.userInfo.height.cms,
          complexion: this.userInfo.complexion,
          education: this.userInfo.education,
          occupation: this.userInfo.occupation,
          maritalstatus: this.userInfo.maritalstatus,
          activeInd:this.userInfo.activeInd,
          paternalGotram: this.userInfo.paternalGotram,
          maternalGotram: this.userInfo.maternalGotram,
          star: this.userInfo.star,
          rasi: this.userInfo.rasi,
          aboutSelf: this.userInfo.aboutSelf,
          salary: this.userInfo.salary,
          mobileno: this.userInfo.mobileno,
          address: this.userInfo.address,
          gender: this.userInfo.gender,
          caste: this.userInfo.caste,
          religion: this.userInfo.religion,
          weight: this.userInfo.weight,
          familyStatus: this.userInfo.familyStatus,
          familyType: this.userInfo.familyType,
          familyValues: this.userInfo.familyValues,
          longitude:this.userInfo.longitude,
          latitude:this.userInfo.latitude,
          tags:[_tag],
          
        });
        
      },
      error => {
        this.loading = false;
      }
    );
    
  }

  applyUpdates(){
    console.log("Form Values "+this.myProfileForm.value);
    if (this.myProfileForm.invalid) {
      return;
    }
    this.postObj = this.myProfileForm.getRawValue();
    // this.postObj.firstname=this.myProfileForm.get('firstname').value;
    this.postObj.height = {};
    this.postObj.height.cms = this.myProfileForm.get('height').value;
    this.postObj.userId = this.userInfo.userId;
    this.postObj.dob = Date.parse(this.postObj.dob);
    console.log(this.postObj);
    this._restService.httpPostCall(AppConstants.updateUserEndPoint, this.postObj).subscribe((result) => {
      console.log(result);
    })
  }
}
