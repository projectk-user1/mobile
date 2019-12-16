import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.page.html',
  styleUrls: ['./utilities.page.scss'],
})
export class UtilitiesPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  showDateDiffCalcPage(){
    this.navCtrl.navigateForward(`/utilities/dateDiffCal`);
  }
  showBmiPage(){
    this.navCtrl.navigateForward(`/utilities/bmi`);
  }
}
