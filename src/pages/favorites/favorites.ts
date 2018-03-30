import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
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
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(){
    this.favoriteService.getFavorites().subscribe(fav => this.favorites = fav,
                                                  error => this.errMess = error);
  }

  deleteFavorite(id : number, item: ItemSliding){
    this.favoriteService.deleteFavorites(id).subscribe(fav => this.favorites = fav,
                                                       error => this.errMess = error);
    item.close();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
}
