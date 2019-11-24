import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  public login(){
    this.navCtrl.navigateForward('/home');
}

}
