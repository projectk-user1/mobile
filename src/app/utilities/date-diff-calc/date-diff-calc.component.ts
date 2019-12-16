import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-date-diff-calc',
  templateUrl: './date-diff-calc.component.html',
  styleUrls: ['./date-diff-calc.component.scss'],
})
export class DateDiffCalcComponent implements OnInit {
  calculatorForm:FormGroup;
  dateDiff:any;
  
  constructor(private _fb: FormBuilder,public navCtrl: NavController) { }

  ngOnInit() {
    this.calculatorForm = this._fb.group({
      fromDate: new FormControl(new Date().toISOString(),[Validators.required]),
      toDate: new FormControl(new Date().toISOString(),[Validators.required])
    })
    this.calculate();
  }
  calculate(){
    console.log(this.calculatorForm.value);
    let fromdt:any=this.calculatorForm.get('fromDate').value;
    let toDt:any=this.calculatorForm.get('toDate').value;
    let fromdtMoment: moment.Moment = moment(Date.parse(fromdt));
    let todtMoment: moment.Moment = moment(Date.parse(toDt));
    
    console.log(moment.duration(todtMoment.diff(fromdtMoment)).humanize());  
    console.log(fromdtMoment.fromNow());
    this.dateDiff=this.difference(fromdt,toDt);
    console.log(this.dateDiff);
  }
  difference(d1, d2) {
    var m = moment(d2);
    var years = m.diff(d1, 'years');
    m.add(-years, 'years');
    var months = m.diff(d1, 'months');
    m.add(-months, 'months');
    var days = m.diff(d1, 'days');
    return {years: years, months: months, days: days};
  }


  backToList() {
    this.navCtrl.back()
  }
}
