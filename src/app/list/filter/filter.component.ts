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
    this.selectedAgeRange={ lower: 19, upper: 45 };
    this.selectedHeightRange={ lower: 101, upper: 170 };
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
    this.navCtrl.back()
  }
}
