import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DishProvider } from '../../providers/dish/dish';
import { Dish } from '../../shared/dish';
import { LeaderProvider } from '../../providers/leader/leader';
import { Leader } from '../../shared/leader';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Promotion } from '../../shared/promotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  dish : Dish;
  dishErrMess : string;
  leader : Leader;
  leaderErrMess: string;
  promotion: Promotion;
  promoErrMess: string;

  constructor(public navCtrl: NavController,
              private dishService : DishProvider,
              private leaderService : LeaderProvider,
              private promotionService : PromotionProvider,
              @Inject('BaseURL') private BaseURL) {

  }
  
  ngOnInit(){
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish[0],
                                                 error => this.dishErrMess = error);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader[0],
                                                 error => this.leaderErrMess = error);                                       
    this.promotionService.getFeaturedPromotion().subscribe(promo => this.promotion = promo[0],
                                                  error => this.promoErrMess = error);                                       
  }
}
