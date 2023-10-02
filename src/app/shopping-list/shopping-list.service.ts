import {IngridientModel} from "../shared/ingridient.model";

import {Subject} from "rxjs";

export class ShoppingListService {

  ingredientChanged = new Subject<IngridientModel[]>();

  private ingredients: IngridientModel[] = [
    new IngridientModel("Test", 10),
    new IngridientModel("Test2", 2)
  ];

  getIngredientsList() {
    return [...this.ingredients];
  }

  addedIngredient(ingredient: IngridientModel) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next([...this.ingredients]);
  }

  addedIngredients(ingredients: IngridientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next([...this.ingredients]);
  }

}
