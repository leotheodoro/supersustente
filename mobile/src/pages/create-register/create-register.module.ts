import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateRegisterPage } from './create-register';

@NgModule({
  declarations: [
    CreateRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateRegisterPage),
  ],
})
export class CreateRegisterPageModule {}
