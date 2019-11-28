import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { DetailComponent } from './detail/detail.component';
import { FilterComponent } from './filter/filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
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
  declarations: [ListPage, DetailComponent, FilterComponent,CommentComponent],
  entryComponents: [
    ListPage, DetailComponent, FilterComponent,CommentComponent
  ],
})
export class ListPageModule { }
