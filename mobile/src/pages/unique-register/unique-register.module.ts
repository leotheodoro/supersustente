import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniqueRegisterPage } from './unique-register';

@NgModule({
  declarations: [
    UniqueRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(UniqueRegisterPage),
  ],
})
export class UniqueRegisterPageModule {}
