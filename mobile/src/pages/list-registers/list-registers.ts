import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UniqueRegisterPage } from '../unique-register/unique-register';

/**
 * Generated class for the ListRegistersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-registers',
  templateUrl: 'list-registers.html',
})
export class ListRegistersPage {

  registers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {
  }

  ionViewDidEnter() {
    this.listRegisters();
  }

  listRegisters() {
    this.api.getRegisters().subscribe(data => {
      const res = JSON.parse((data as any)._body);
      this.registers = res;
      console.log(this.registers);
    }, error => {
      console.log(error);
    });
  }

  formatDate(d) {
    let dmy = d.split(' ')[0];
    let hms = d.split(' ')[1];
    hms = hms.split(':');
    hms.pop();

    return dmy.split('-').reverse().join('/') + ' ' + hms.join(':');
  }

  openDetails(id) {
    this.navCtrl.push(UniqueRegisterPage, {id: id});
  }

}
