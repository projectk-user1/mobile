import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(public navCtrl: NavController, private commonService: CommonService) { }
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
  ngOnInit() {}

  backToList(){
    this.navCtrl.back()
  }

  applyFilters(){
    console.log(this.selectedHeightRange.lower, this.selectedHeightRange.upper);
    console.log(this.selectedAgeRange+" "+this.selectedCaste+" "+this.selectedEducation+" "+this.selectedFamilyStatus+" "+this.selectedFamilyType+" "+this.selectedFamilyValues+" "+this.selectedGender+" "+this.selectedHeightRange.lower+" "+this.selectedHeightRange.upper+" "+this.selectedMaritalStatus+" "+this.selectedMaxDistance+" "+this.selectedMinSalary+" "+this.selectedReligion);
    this.commonService.setFilter(this.selectedGender);
    this.navCtrl.back()
  }
}
