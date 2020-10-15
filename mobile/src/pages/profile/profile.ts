import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  edit: boolean = false;

  user: any = {
    name: "",
    email: "",
    gender: "",
    image: "",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, public alertCtrl: AlertController) {
    this.edit = false;
  }

  ionViewDidLoad() {
    this.api.getUser(localStorage.getItem("id")).subscribe(data => {
      const res = JSON.parse((data as any)._body);
      this.user.name = res.name;
      this.user.email = res.email;
      this.user.gender = res.gender;
      this.user.image = res.image;
      console.log(this.user);
    }, error => {
      console.log(error);
    });
  }

  destroyAccount() {
    const confirm = this.alertCtrl.create({
      title: 'Deseja mesmo desativar sua conta?',
      message: 'Ao desativar, você não poderá mais acessar o aplicativo com essa conta',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.api.destroyAccount(localStorage.getItem("id")).subscribe(data => {
              this.api.logout();
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              this.navCtrl.push(LoginPage);
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  onFileChanged(event) {
    let data = new FormData();
    data.append("image", event.target.files[0]);
    this.api.updateImage(data, localStorage.getItem("id")).subscribe(data => {
      const res = JSON.parse((data as any)._body);
      this.user.image = res.image;
    });
  }

  storeEdit() {
    this.api.editUser(localStorage.getItem("id"), this.user).subscribe(res => {
      this.api.getUser(localStorage.getItem("id")).subscribe(data => {
        const res = JSON.parse((data as any)._body);
        this.user.name = res.name;
        this.user.email = res.email;
        this.user.gender = res.gender;
        this.user.image = res.image;
        this.edit = false;
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

}
