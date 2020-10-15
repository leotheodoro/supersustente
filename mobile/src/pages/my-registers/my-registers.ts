import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UniqueRegisterPage } from '../unique-register/unique-register';

/**
 * Generated class for the MyRegistersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-registers',
  templateUrl: 'my-registers.html',
})
export class MyRegistersPage {

  registers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {

  }

  ionViewDidEnter() {
    this.listRegisters();
  }

  listRegisters() {
    this.api.getMyRegisters(localStorage.getItem("id")).subscribe(data => {
      const res = JSON.parse((data as any)._body);
      this.registers = res;
      console.log(this.registers);
    }, error => {
      console.log(error);
    });
  }

  openDetails(id) {
    this.navCtrl.push(UniqueRegisterPage, {id: id});
  }

}
