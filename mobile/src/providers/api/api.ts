import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private URL = "http://supersustente.com.br/ss_api/public/api/v1/";

  constructor(public http: Http) { }

  login(email, pass) {
    return this.http.post(`${this.URL}users/login`, {email: email, password: pass});
  }

  check(token) {
    return this.http.post(`${this.URL}users/check`, {token: token});
  }

  logout() {
    return this.http.post(`${this.URL}users/logout`, {});
  }

  createUser(user) {
    return this.http.post(`${this.URL}users`, user);
  }

  getUsers() {
    return this.http.get(`${this.URL}users`);
  }

  getUser(id) {
    return this.http.get(`${this.URL}users/${id}`);
  }

  editUser(id, user) {
    return this.http.put(`${this.URL}users/${id}`, user);
  }

  deleteUser(id) {
    return this.http.delete(`${this.URL}users/${id}`);
  }

  getSituations() {
    return this.http.get(`${this.URL}situations`);
  }

  createRegister(register) {
    return this.http.post(`${this.URL}registers`, register);
  }

  getRegisters() {
    return this.http.get(`${this.URL}registers`);
  }

  getMyRegisters(id) {
    return this.http.get(`${this.URL}registers/users/${id}`);
  }

  getRegister(id) {
    return this.http.get(`${this.URL}registers/${id}`);
  }

  destroyAccount(id) {
    return this.http.delete(`${this.URL}users/${id}`);
  }

  updateImage(image, id) {
    return this.http.post(`${this.URL}users/image/${id}`, image);
  }

  destroyImage(id) {
    return this.http.get(`${this.URL}registers/image/${id}`);
  }

  destroyVideo(id) {
    return this.http.get(`${this.URL}registers/video/${id}`);
  }

  destroyRegister(id) {
    return this.http.delete(`${this.URL}registers/${id}`);
  }

  editRegister(id, register) {
    return this.http.put(`${this.URL}registers/${id}`, register);
  }

}
