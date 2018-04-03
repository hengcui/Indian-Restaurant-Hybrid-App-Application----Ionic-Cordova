import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

import 'rxjs/add/operator/map';
/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: HttpClient,
              private dishService : DishProvider,
              private storage : Storage,
              private localNotifications : LocalNotifications) {
              storage.get('favorites').then(favs => {
                if(favs){
                  this.favorites = favs;
                }else{
                  this.favorites = [];
                }
              });
  }

  addFavorite(id : number) : boolean{
    if(!this.isFavorite(id)){
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites);
      this.localNotifications.schedule({
        id : id,
        text : "Dish" + id + "has been successfully added to Favorites."
      });
    }
    return true;
  }

  removeFavorite(id: number) : boolean{
    if(this.isFavorite(id)){
      let index = this.favorites.indexOf(id);
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites);
      this.localNotifications.schedule({
        id : id,
        text : "Dish" + id + "has been successfully removed from Favorites."
      });
    }
    return false;
  }

  getFavorites() : Observable<Dish[]>{
    return this.dishService.getDishes().map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorites(id: number) : Observable<Dish[]>{
    let index = this.favorites.indexOf(id);
    if(index >= 0){
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    }else{
      return Observable.throw("Deleting non-existing favorites " + id);
    }
  }

  isFavorite(id: number) : boolean{
    return this.favorites.some(el => el === id);
  }
}
