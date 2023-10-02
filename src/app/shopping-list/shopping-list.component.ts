import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngridientModel} from "../shared/ingridient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: IngridientModel[] = [];
  onChangeIngredientsSubscription: Subscription | undefined;

  constructor(
    private shoppingListService: ShoppingListService,
  ) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredientsList();
    this.onChangeIngredientsSubscription = this.shoppingListService.ingredientChanged.subscribe(ingredients => {
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy() {
    this.onChangeIngredientsSubscription?.unsubscribe();
  }

}
