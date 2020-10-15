import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListRegistersPage } from './list-registers';

@NgModule({
  declarations: [
    ListRegistersPage,
  ],
  imports: [
    IonicPageModule.forChild(ListRegistersPage),
  ],
})
export class ListRegistersPageModule {}
