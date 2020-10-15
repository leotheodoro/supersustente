import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: string;
  pass: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, public toastCtrl: ToastController) {
    if(localStorage.getItem("token")) {
      this.api.check(localStorage.getItem("token")).subscribe(data => {
        const res = JSON.parse((data as any)._body);
        if(res.token == localStorage.getItem("token")) {
          this.navCtrl.push(HomePage);
        }
      }, error => {
        console.log(error);
      });
    }
  }

  ionViewDidLoad() {

  }

  login() {
    this.api.login(this.user, this.pass).subscribe(data => {
      const res = JSON.parse((data as any)._body);
      localStorage.setItem("token", res.remember_token);
      localStorage.setItem("id", res.id);
      localStorage.setItem("name", res.name);
      this.navCtrl.push(HomePage);
      this.showToast("Logado com sucesso");
    }, error => {
      console.log(error);
    });
  }

  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
