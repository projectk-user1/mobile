import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  showPasswordPage(){
    this.navCtrl.navigateForward(`/settings/password`);
  }
  showPartnerPreferencePage(){
    this.navCtrl.navigateForward(`/settings/partnerPreference`);
  }
  showProfilePicPage(){
    this.navCtrl.navigateForward(`/settings/profilePic`);
  }
  showQRCodePage(){
    this.navCtrl.navigateForward(`/settings/qrCode`);
  }
}
