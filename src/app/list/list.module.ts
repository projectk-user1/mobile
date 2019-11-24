import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { DetailComponent } from './detail/detail.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      },
      {
        path: 'details/:profileId',
        component: DetailComponent
      },
      {
        path: 'filter',
        component: FilterComponent
      }
    ])
  ],
  declarations: [ListPage, DetailComponent, FilterComponent],
  entryComponents: [
    ListPage, DetailComponent, FilterComponent
  ],
})
export class ListPageModule { }
