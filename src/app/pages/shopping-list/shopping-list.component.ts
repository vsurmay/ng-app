import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {IIngredient} from "../../shared/ingridient.model";
import {Store} from "@ngrx/store";
import {ShoppingListSelector} from "./store/shopping-list.selector";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  onChangeActiveIngredientSubscription: Subscription;
  getIngredientsSub: Subscription;
  activeIngredient: IIngredient | null;
  ingredients$ = this.store.select(ShoppingListSelector.ingredients);
  loader$ = this.store.select(ShoppingListSelector.loader);
  error$ = this.store.select(ShoppingListSelector.error);

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store
  ) {}

  ngOnInit() {
    this.getIngredientsSub = this.shoppingListService.getIngredientsList().subscribe();
    this.onChangeActiveIngredientSubscription = this.shoppingListService.activeIngredient.subscribe(ingredient => {
      this.activeIngredient = ingredient ? {...ingredient} : null;
    })
  }

  onClickListItem(ingredient: IIngredient) {
    this.shoppingListService.activeIngredient.next(ingredient);
  }

  ngOnDestroy() {
    this.onChangeActiveIngredientSubscription.unsubscribe();
    this.getIngredientsSub.unsubscribe();
  }

}
