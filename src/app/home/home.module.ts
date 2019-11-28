import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'details/:id',
        component: DashboardDetailComponent
      },
    ])
  ],
  declarations: [HomePage,DashboardDetailComponent]
})
export class HomePageModule {}
