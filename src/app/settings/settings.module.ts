import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsPage } from './settings.page';
import { PartnerPreferenceComponent } from './partner-preference/partner-preference.component';
import { PasswordComponent } from './password/password.component';
import { ProfilePicComponent } from './profile-pic/profile-pic.component';
import { MyQRComponent } from './my-qr/my-qr.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'partnerPreference',
    component: PartnerPreferenceComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: 'profilePic',
    component: ProfilePicComponent
  },{
    path: 'qrCode',
    component: MyQRComponent
  },{
    path: 'editProfile',
    component: EditProfileComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsPage,PartnerPreferenceComponent,PasswordComponent,ProfilePicComponent,MyQRComponent,EditProfileComponent],
  entryComponents: [SettingsPage,PartnerPreferenceComponent,PasswordComponent,ProfilePicComponent,MyQRComponent,EditProfileComponent],
})
export class SettingsPageModule {}
