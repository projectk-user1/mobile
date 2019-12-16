import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UtilitiesPage } from './utilities.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateDiffCalcComponent } from './date-diff-calc/date-diff-calc.component';
import { BmiCalcComponent } from './bmi-calc/bmi-calc.component';

const routes: Routes = [
  {
    path: '',
    component: UtilitiesPage
  },
  {
    path: 'dateDiffCal',
    component: DateDiffCalcComponent
  },
  {
    path: 'bmi',
    component: BmiCalcComponent
  }
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
  declarations: [UtilitiesPage,DateDiffCalcComponent,BmiCalcComponent],
  entryComponents: [UtilitiesPage,DateDiffCalcComponent,BmiCalcComponent],
})
export class UtilitiesPageModule {}
