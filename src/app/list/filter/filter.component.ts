import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common-service.service';
import { IUserPrefs } from 'src/app/_models/user';
import { MasterFieldsService } from 'src/app/services/master-fields/master-fields.service';
import { AppConstants } from 'src/app/constants/config.constants';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(public navCtrl: NavController, 
              private commonService: CommonService,
              private _restService: RestService, 
              private masterFieldsService: MasterFieldsService) { }
  selectedGender:any;
  selectedMaritalStatus;
  selectedEducation;
  selectedCaste;
  selectedReligion;
  selectedFamilyStatus;
  selectedFamilyType;
  selectedFamilyValues;
  selectedAgeRange;
  selectedHeightRange;
  selectedMinSalary;
  selectedMaxDistance;
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
  ngOnInit() {
    if (Object.entries(this.commonService.getFilter()).length >0) {
      this.assignFilterValues();
    } else {
      this.selectedAgeRange = { lower: 19, upper: 45 };
      this.selectedHeightRange = { lower: 101, upper: 170 };
    }
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
  assignFilterValues(){
    let postObj:any = this.commonService.getFilter();
    this.selectedGender=postObj.gender;
    this.selectedAgeRange={};
    this.selectedHeightRange={};
    this.selectedAgeRange.lower=postObj.ageFrom;
    this.selectedAgeRange.upper=postObj.ageTo;
    this.selectedHeightRange.lower=postObj.heightFrom;
    this.selectedHeightRange.upper=postObj.heightTo;
    this.selectedEducation=postObj.education;
    this.selectedMaritalStatus=postObj.maritalstatus;
    this.selectedMinSalary=postObj.salaryFrom;
    this.selectedCaste=postObj.caste;
    this.selectedReligion=postObj.religion;
    this.selectedFamilyStatus=postObj.familyStatus;
    this.selectedFamilyType=postObj.familyType;
    this.selectedFamilyValues=postObj.familyValues;
    this.selectedMaxDistance=postObj.distance;
  }
  backToList(){
    this.navCtrl.back()
  }

  applyFilters(){
    console.log(this.selectedHeightRange.lower, this.selectedHeightRange.upper);
    console.log(this.selectedAgeRange+" "+this.selectedCaste+" "+this.selectedEducation+" "+this.selectedFamilyStatus+" "+this.selectedFamilyType+" "+this.selectedFamilyValues+" "+this.selectedGender+" "+this.selectedHeightRange.lower+" "+this.selectedHeightRange.upper+" "+this.selectedMaritalStatus+" "+this.selectedMaxDistance+" "+this.selectedMinSalary+" "+this.selectedReligion);
    let postObj:any = {};
    postObj.gender=this.selectedGender;
    postObj.ageFrom=this.selectedAgeRange.lower;
    postObj.ageTo=this.selectedAgeRange.upper;
    postObj.heightFrom=this.selectedHeightRange.lower;
    postObj.heightTo=this.selectedHeightRange.upper;
    postObj.education=this.selectedEducation;
    postObj.maritalstatus=this.selectedMaritalStatus;
    postObj.salaryFrom=this.selectedMinSalary;
    postObj.caste=this.selectedCaste;
    postObj.religion=this.selectedReligion;
    postObj.familyStatus=this.selectedFamilyStatus;
    postObj.familyType=this.selectedFamilyType;
    postObj.familyValues=this.selectedFamilyValues;
    postObj.distance=this.selectedMaxDistance;
    this.commonService.setFilter(postObj);
    // this.navCtrl.back()
    this.navCtrl.navigateForward(`/list`);
  }
  clearFilters(){
  this.selectedGender= null;
  this.selectedMaritalStatus=null;
  this.selectedEducation=null;
  this.selectedCaste=null;
  this.selectedReligion=null;
  this.selectedFamilyStatus=null;
  this.selectedFamilyType=null;
  this.selectedFamilyValues=null;
  this.selectedMinSalary=null;
  this.selectedMaxDistance=null;
  this.selectedAgeRange={ lower: 19, upper: 45 };
    this.selectedHeightRange={ lower: 101, upper: 170 };
  }
}
