import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VALID } from '@angular/forms/src/model';
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
  registerForm : FormGroup;
  image : string = "assets/imgs/logo.png";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb : FormBuilder,
              private camera : Camera,
              private viewCtrl : ViewController) {
                this.registerForm = this.fb.group({
                  firstname : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
                  lastname : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
                  username : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
                  password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
                  telnum : ['', [Validators.required, Validators.pattern]],
                  email : ['', [Validators.required, Validators.email]]
                });
  }

  dismiss(){
    this.viewCtrl.dismiss(true);
  }
  
  getPicture(){
    const options : CameraOptions = {
      quality : 100,
      targetHeight : 100,
      targetWidth : 100,
      correctOrientation : true,
      allowEdit : true,
      sourceType : this.camera.PictureSourceType.CAMERA,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType : this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE,
      cameraDirection : this.camera.Direction.FRONT
    };

    this.camera.getPicture(options)
      .then((imgData) => {
        this.image = 'data:image/jpeg;base64,' + imgData;
        console.log(this.image);
      },
      (err) => {
        console.log('Error obtaining Picture');
      }
    );
  }

  getFromLibrary(){
    const options : CameraOptions = {
      quality : 100,
      targetHeight : 100,
      targetWidth : 100,
      correctOrientation : true,
      allowEdit : true,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType : this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE,
      cameraDirection : this.camera.Direction.FRONT
    };

    this.camera.getPicture(options)
      .then((imgData) => {
        this.image = 'data:image/jpeg;base64,' + imgData;
        console.log(this.image);
      },
      (err) => {
        console.log('Error obtaining Picture');
      }
    );
  }
  
  onSubmit(){
    console.log(this.registerForm.value);
    this.dismiss();
  }

}
