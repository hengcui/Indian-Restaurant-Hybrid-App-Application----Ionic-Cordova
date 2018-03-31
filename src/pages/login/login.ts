import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../../shared/user';
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
  loginForm : FormGroup;
  user : User = {username: '', password: '', remember: false};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl : ViewController,
              private fb : FormBuilder,
              private storage : Storage) {
                storage.get('user').then(user => {
                  if(user){
                    this.user = user;
                    this.loginForm.patchValue({
                      'username': this.user.username,
                      'password': this.user.password
                    })
                  }else{
                    console.log("user not defined");
                  }
                });

                this.loginForm = this.fb.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required],
                  remember: true
                });      
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSubmit(){
    this.user = this.loginForm.value;
    if(this.user.remember){
      this.storage.set('user', this.user);
    }else{
      this.storage.remove('user');
    }

    this.viewCtrl.dismiss();
  }
}
