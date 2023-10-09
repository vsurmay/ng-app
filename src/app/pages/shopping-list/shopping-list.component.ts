import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {IIngredient} from "../../shared/ingridient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: IIngredient[] = [];
  onChangeIngredientsSubscription: Subscription;
  onChangeActiveIngredientSubscription: Subscription;
  getIngredientsSub: Subscription;
  activeIngredient: IIngredient | null;

  constructor(
    private shoppingListService: ShoppingListService,
  ) {}

  ngOnInit() {
    this.getIngredientsSub = this.shoppingListService.getIngredientsList().subscribe();
    this.onChangeIngredientsSubscription = this.shoppingListService.ingredientChanged.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
    this.onChangeActiveIngredientSubscription = this.shoppingListService.activeIngredient.subscribe(ingredient => {
      this.activeIngredient = ingredient ? {...ingredient} : null;
    })
  }

  onClickListItem(ingredient: IIngredient) {
    this.shoppingListService.activeIngredient.next(ingredient);
  }

  ngOnDestroy() {
    this.onChangeIngredientsSubscription.unsubscribe();
    this.onChangeActiveIngredientSubscription.unsubscribe();
    this.getIngredientsSub.unsubscribe();
  }

}
