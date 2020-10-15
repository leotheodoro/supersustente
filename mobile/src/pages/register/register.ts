import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: any = {
    name: "",
    email: "",
    password: "",
    gender: "",
    image: File,
  }

  imagePath: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  register() {
    let data = new FormData();

    data.append('name', this.user.name);
    data.append('email', this.user.email);
    data.append('password', this.user.password);
    data.append('gender', this.user.gender);
    data.append('image', this.user.image);

    this.api.createUser(data).subscribe(data => {
      const res = JSON.parse((data as any)._body);
      localStorage.setItem("token", res.remember_token);
      localStorage.setItem("id", res.id);
      localStorage.setItem("name", res.name);
      this.navCtrl.push(HomePage);
      this.showToast("Registrado com sucesso");
    }, error => {
      console.log(error);
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.user.image = file;
    this.getBase64(file);
  }

  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () => {
      this.imagePath =  reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
