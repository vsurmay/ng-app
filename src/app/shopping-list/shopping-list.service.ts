import {IngridientModel} from "../shared/ingridient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService {

  ingredientChanged = new EventEmitter<IngridientModel[]>();

  private ingredients: IngridientModel[] = [
    new IngridientModel("Test", 10),
    new IngridientModel("Test2", 2)
  ];

  getIngredientsList() {
    return [...this.ingredients];
  }

  addedIngredient(ingredient: IngridientModel) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit([...this.ingredients]);
  }

  addedIngredients(ingredients: IngridientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit([...this.ingredients]);
  }

}
