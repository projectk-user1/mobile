import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserSession } from './_models/UserSession';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profiles',
      url: '/list',
      icon: 'contacts'
    },
    {
      title: 'Search By Id',
      url: '/search',
      icon: 'search'
    },
    {
      title: 'My Profile',
      url: '/settings',
      icon: 'person'
    },
    // {
    //   title: 'My Profile',
    //   url: '/myProfile',
    //   icon: 'person'
    // },
    {
      title: 'Utilities',
      url: '/utilities',
      icon: 'build'
    },
    {
      title: 'Contact Us',
      url: '/contact-us',
      icon: 'contact'
    },
    
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
      
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    if(token) {
      UserSession.createUserSession(token);
    }
  }
}
