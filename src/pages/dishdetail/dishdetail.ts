import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { baseURL } from '../../shared/baseurl';
/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish : Dish;
  avgStars: string;
  numComments: number;
  favorite : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private favoriteService : FavoriteProvider,
              private toastCtrl : ToastController,
              private actionSheetCtrl : ActionSheetController,
              private modalCtrl : ModalController,
              private socialSharing : SocialSharing,
              @Inject('BaseURL') public BaseURL) {
                this.dish = this.navParams.get('dish');
                this.favorite = this.favoriteService.isFavorite(this.dish.id);
                this.numComments = this.dish.comments.length;
                let total = 0;
                this.dish.comments.forEach(comment => total += comment.rating);
                this.avgStars = (total / this.numComments).toFixed(2);
  }

  addToFavorites(){
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message : 'Dish ' + this.dish.id + ' added as favorite successfully',
      duration : 2000
    }).present();
  }

  removeFromFavorites(){
    this.favorite = this.favoriteService.removeFavorite(this.dish.id);
    this.toastCtrl.create({
      message : 'Dish ' + this.dish.id + ' has been removed from favorite successfully',
      duration : 2000
    }).present();
  }

  openComment(){
    let modal = this.modalCtrl.create(CommentPage);
    modal.present();
    modal.onDidDismiss(data => {
      if(data){
        this.dish.comments.push(data)
      }
    });
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons : [
        {
          text: 'Add to Favorites',
          handler: () => this.addToFavorites()
        },

        {
          text: 'Add Comment',
          handler : () => this.openComment()
        },

        {
          text: 'Share via Facebook',
          handler: () => this.socialSharing.shareViaFacebook(
            this.dish.name + ' -- ' + this.dish.description,
            this.BaseURL + this.dish.image, 
            ''
          ).then(() => console.log('Posted successfully to Facebook'))
           .catch(() => console.log('Failed to post to Facebook'))
        },

        {
          text: 'Share via Twitter',
          handler: () => this.socialSharing.shareViaTwitter(
            this.dish.name + ' -- ' + this.dish.description,
            this.BaseURL + this.dish.image,
            ''
          ).then(() => console.log("Posted successfully to Twitter"))
           .catch(() => console.log("Failed to post to Twitter"))
        },

        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })

    actionSheet.present();
  }
}
