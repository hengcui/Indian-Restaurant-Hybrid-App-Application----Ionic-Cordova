import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  Comment : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl : ViewController,
              private fb : FormBuilder) {
                this.Comment = this.fb.group({
                  author: ['', Validators.required],
                  rating: 5,
                  comment: '',
                  date: ''
                });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSubmit(){
    this.Comment.value.date = new Date().toISOString();
    this.viewCtrl.dismiss(this.Comment.value);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}
