import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit{
  favorites : Dish[];
  errMess : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private favoriteService : FavoriteProvider,
              private toastCtrl : ToastController,
              private loadingCtrl : LoadingController,
              private alertCtrl : AlertController,
              @Inject('BaseURL') public BaseURL) {
  }

  ngOnInit(){
    this.favoriteService.getFavorites().subscribe(fav => this.favorites = fav,
                                                  error => this.errMess = error);
  }

  deleteFavorite(id : number, item: ItemSliding){
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete Dish ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Deleting'
            });
            let toast = this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully',
              duration: 2000
            });

            loading.present();
            
            this.favoriteService.deleteFavorites(id).subscribe(fav => {this.favorites = fav; loading.dismiss(); toast.present()},
                                                               error => {this.errMess = error; loading.dismiss()});
          }
        }
      ]
    });
    alert.present();
    item.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
}
