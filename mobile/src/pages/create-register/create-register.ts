import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the CreateRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-register',
  templateUrl: 'create-register.html',
})
export class CreateRegisterPage {

  situations: any;
  mylocale: boolean;
  register: any = {
    user_id: "",
    title: "",
    description: "",
    situation_id: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    lat: "",
    lon: "",
    images: FileList,
    videos: FileList
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider, private geolocation: Geolocation, public toastCtrl: ToastController) {
    this.getSituations();
    this.mylocale = true;
    this.register = {
      user_id: "",
      title: "",
      description: "",
      situation_id: "",
      address: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      lat: "",
      lon: "",
      anonymous: 0,
      images: FileList,
      videos: FileList
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateRegisterPage');
  }

  getSituations() {
    this.api.getSituations().subscribe(data => {
      const res = JSON.parse((data as any)._body);
      this.situations = res;
    }, error => {
      console.log(error);
    });
  }

  storeRegister() {
    this.register.user_id = localStorage.getItem("id");

    let data = new FormData();
    data.append("user_id", this.register.user_id);
    data.append("title", this.register.title);
    data.append("description", this.register.description);
    data.append("situation_id", this.register.situation_id);
    if(this.register.anonymous) {
      data.append("anonymous", '1');
    } else {
      data.append("anonymous", '0');
    }

    let eleImg: HTMLElement | null = document.getElementById('images');
    if(eleImg instanceof HTMLInputElement) {
      this.register.images = eleImg.files;
    }

    let eleVid: HTMLElement | null = document.getElementById('videos');
    if(eleVid instanceof HTMLInputElement) {
      this.register.videos = eleVid.files;
    }

    if(this.register.images != undefined) {
      for(let i = 0; i < this.register.images.length; i++) {
        data.append("images[]", this.register.images[i]);
      }
    }
    if(this.register.videos != undefined) {
      for(let i = 0; i < this.register.videos.length; i++) {
        data.append("videos[]", this.register.videos[i]);
      }
    }

    // If GPS is enabled
    if(this.mylocale == true) {
      this.getCurrentPosition().then( (position) => {
        this.register.lat = position.coords.latitude;
        this.register.lon = position.coords.longitude;
        data.append("lat", this.register.lat);
        data.append("lon", this.register.lon);
        this.api.createRegister(data).subscribe(data => {
          const res = JSON.parse((data as any)._body);
          this.showToast("Registro criado com sucesso!");
          this.navCtrl.push(HomePage);
          console.log(res);
        }, error => {
          console.log(error);
        });
       }, (error) => {
         this.showToast('Localização não encontrada. Por favor, habilite seu GPS!');
       });
    } else {
      console.log('hello here i am');
      data.append("address", this.register.address);
      data.append("neighborhood", this.register.neighborhood);
      data.append("city", this.register.city);
      data.append("state", this.register.state);
      data.append("country", this.register.country);
      this.api.createRegister(data).subscribe(data => {
        const res = JSON.parse((data as any)._body);
        this.showToast("Registro criado com sucesso!");
        this.navCtrl.push(HomePage);
        console.log(res);
      }, error => {
        console.log(error);
      });
    }
  }

  getCurrentPosition() {
    let locationOptions = { timeout: 10000, enableHighAccuracy: true };

    return this.geolocation.getCurrentPosition(locationOptions);
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  onFileChanged(event) {
    // this.register.images = event.target.files;
    // this.register.images.push.apply(this.register.images, event.target.files);
  }

  onVideoChanged(event) {
    // this.register.videos = event.target.files;
  }

  goBack() {
    this.navCtrl.pop();
  }
}
