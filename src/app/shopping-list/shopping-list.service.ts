import {IngredientModel} from "../shared/ingridient.model";

import {Subject} from "rxjs";

export class ShoppingListService {

  ingredientChanged = new Subject<IngredientModel[]>();
  activeIngredient = new Subject<IngredientModel | null>();

  private ingredients: IngredientModel[] = [
    new IngredientModel("Test", 10),
    new IngredientModel("Test2", 2)
  ];

  getIngredientsList() {
    return [...this.ingredients];
  }

  addedIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next([...this.ingredients]);
  }

  addedIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next([...this.ingredients]);
  }

  editIngredient(ingredient: IngredientModel) {
    // this.ingredients = this.ingredients.map(el => {
    //   if (el.id !== ingredient.id)   return el;
    //   return {...ingredient};
    // })
    this.ingredientChanged.next([...this.ingredients]);
  }

  deleteIngredient(id: string) {
    // this.ingredients = this.ingredients.filter(el => el.id !== id);
    this.ingredientChanged.next([...this.ingredients]);
  }

}
