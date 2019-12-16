import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bmi-calc',
  templateUrl: './bmi-calc.component.html',
  styleUrls: ['./bmi-calc.component.scss'],
})
export class BmiCalcComponent implements OnInit {
  bmiForm: FormGroup;
  bmiResult: any;
  constructor(public navCtrl: NavController, private _fb: FormBuilder) { }

  ngOnInit() {
    this.bmiForm = this._fb.group({
      height: new FormControl(170, [Validators.required]),
      weight: new FormControl(60, [Validators.required]),
    })
    this.calculateBMI();
  }
  calculateBMI() {
    const height = this.bmiForm.get('height').value;
    const weight = this.bmiForm.get('weight').value;
    this.bmiResult = {};
    if (weight > 0 && height > 0) {
      let bmi = parseFloat((weight / (height / 100 * height / 100)).toFixed(2));
      this.bmiResult.bmiValue = bmi;
      this.setBMIMessage(this.bmiResult);
    }
  }
  calculateBmiMetric(obj) {
    var weight = obj.weight;
    var height = obj.height;
    if (weight > 0 && height > 0) {
      var finalBmi = weight / (height / 100 * height / 100);
      obj.bmiValue = parseFloat(finalBmi.toFixed(2));
      this.setBMIMessage(obj);
      return obj
    }
  };
  setBMIMessage(obj) {
    if (obj.bmiValue < 18.5) {
      obj.bmiMessage = "Underweight";
      obj.color = 'blue';
    }
    if (obj.bmiValue > 18.5 && obj.bmiValue < 25) {
      obj.bmiMessage = "Normal";
      obj.color = 'green';

    }
    if (obj.bmiValue >= 25 && obj.bmiValue < 30) {
      obj.bmiMessage = "Overweight";
      obj.color = 'rgba(255, 0, 0, 0.5)';

    }
    if (obj.bmiValue >= 30) {
      obj.bmiMessage = "Obese";
      obj.color = 'red';

    }
  }
  backToList() {
    this.navCtrl.back()
  }
}
