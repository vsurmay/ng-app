import {Component, OnInit} from '@angular/core';
import {IngridientModel} from "../shared/ingridient.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: IngridientModel[] = [];

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredientsList();
    this.shoppingListService.ingredientChanged.subscribe(ingredients => {
      this.ingredients = ingredients;
    })
  }
}
