import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRegistersPage } from './my-registers';

@NgModule({
  declarations: [
    MyRegistersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRegistersPage),
  ],
})
export class MyRegistersPageModule {}
