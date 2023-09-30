import { Component } from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {

  shoppingItem = {
    name: "",
    amount: 0
  }

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  save() {
    console.log(this.shoppingItem);
    this.shoppingListService.addedIngredient(this.shoppingItem);
  }

  clear() {
    this.shoppingItem.name = "";
    this.shoppingItem.amount = 0;
  }

}
