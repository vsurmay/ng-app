import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../shared/ingridient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: IngredientModel[] = [];
  onChangeIngredientsSubscription: Subscription;
  onChangeActiveIngredientSubscription: Subscription;
  activeIngredient: IngredientModel | null;

  constructor(
    private shoppingListService: ShoppingListService,
  ) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredientsList();
    this.onChangeIngredientsSubscription = this.shoppingListService.ingredientChanged.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
    this.onChangeActiveIngredientSubscription = this.shoppingListService.activeIngredient.subscribe(ingredient => {
      this.activeIngredient = ingredient ? {...ingredient} : null;
    })
  }

  onClickListItem(ingredient: IngredientModel) {
    this.shoppingListService.activeIngredient.next(ingredient);
  }

  ngOnDestroy() {
    this.onChangeIngredientsSubscription?.unsubscribe();
    this.onChangeActiveIngredientSubscription?.unsubscribe();
  }

}
