import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  myProfileForm: FormGroup;
  constructor(private _fb: FormBuilder) { }

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
  }

  applyUpdates(){
    console.log("Form Values "+this.myProfileForm.value);
  }
}
