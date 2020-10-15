import { HomePage } from './../home/home';
import { LocaleProvider } from './../../providers/locale/locale';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the UniqueRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unique-register',
  templateUrl: 'unique-register.html',
})
export class UniqueRegisterPage {
  situations: any;
  id = 0;
  register: any = {
    id: "",
    title: "",
    user_id: "",
    description: "",
    situation_id: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    lat: "",
    lon: "",
    created_at: "",
    updated_at: "",
    user: {},
    images: [],
    videos: [],
    comments: [],
    situation: {},
  };

  editInformation: boolean = false;
  editLocal: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, private locale: LocaleProvider , private alertCtrl: AlertController) {
    this.getSituations();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.getRegister(this.id);
    console.log(this.id);
  }



  getRegister(id) {
    this.api.getRegister(id).subscribe(data => {
      const res = JSON.parse((data as any)._body);
      this.register = res;
      if(this.register.lat != "" && this.register.lon != "" && this.register.address == null) {
        this.getLocaleByLatLng(this.register.lat, this.register.lon);
      }
      this.register.created_at = this.formatDate(this.register.created_at);
      this.register.updated_at = this.formatDate(this.register.updated_at);
    }, error => {
      console.log(error);
    });
  }

  getLocaleByLatLng(lat, lon) {
    this.locale.getLocaleByLatLng(lat, lon).subscribe(data => {
      const res = JSON.parse((data as any)._body);
      let address = res.results[0].address_components;
      this.register.address = address[1].long_name + ', ' + address[0].long_name;
      this.register.neighborhood = address[2].long_name;
      this.register.city = address[3].long_name;
      this.register.state = address[5].long_name;
      this.register.country = address[6].long_name;
    }, error => {
      console.log(error);
    });
  }

  isOwner() {
    if(localStorage.getItem('id') == this.register.user_id) {
      return true;
    }
    return false;
  }

  destroyImage(id) {
    const confirm = this.alertCtrl.create({
      title: 'Deseja excluir essa imagem?',
      message: 'Ao excluir a imagem, você não poderá recuperar!',
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
            this.api.destroyImage(id).subscribe(data => {
              this.getRegister(this.id);
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
    confirm.present();
  }


  destroyVideo(id) {
    const confirm = this.alertCtrl.create({
      title: 'Deseja excluir esse vídeo?',
      message: 'Ao excluir o vídeo, você não poderá recuperar!',
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
            this.api.destroyVideo(id).subscribe(data => {
              this.getRegister(this.id);
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  destroyRegister() {
    const confirm = this.alertCtrl.create({
      title: 'Deseja excluir esse registro?',
      message: 'Ao excluir o registro, você não poderá recuperar!',
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
            this.api.destroyRegister(this.id).subscribe(data => {
              this.navCtrl.push(HomePage);
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  formatDate(d) {
    let dmy = d.split(' ')[0];
    let hms = d.split(' ')[1];
    hms = hms.split(':');
    hms.pop();

    return dmy.split('-').reverse().join('/') + ' ' + hms.join(':');
  }

  editInfo() {
    this.api.editRegister(this.id, this.register).subscribe(data => {
      const res = JSON.parse((data as any)._body);
      this.getRegister(this.id);
      this.editInformation = false;
      this.editLocal = false;
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  getSituations() {
    this.api.getSituations().subscribe(data => {
      const res = JSON.parse((data as any)._body);
      this.situations = res;
    }, error => {
      console.log(error);
    });
  }
}
