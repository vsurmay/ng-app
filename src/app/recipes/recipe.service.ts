import {Injectable} from "@angular/core";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {IngredientModel} from "../shared/ingridient.model";
import {map, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../shared/environment";
import {AlertService} from "../alert/alert.service";

export interface IRecipe {
  id: string;
  name: string,
  description: string,
  imagePath: string,
  ingredients: IngredientModel[]
}

@Injectable()
export class RecipeService {

  private recipes: IRecipe[] = [];

  recipeListChanged = new Subject<IRecipe[]>()

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  getRecipesList() {
    return this.http.get<{
      [key: string]: IRecipe
    }>(`${environment.dataBasePath}/recipes.json`)
      .pipe(map(response => {
        const recipesArray: IRecipe[] = [];
        for (let key in response) {
          const item = response[key];
          recipesArray.push({
            ...item,
            id: key
          })
        }
        return recipesArray;
      }))
  }

  setRecipeList() {
    this.getRecipesList().subscribe(res => {
      this.recipes = [...res];
      this.recipeListChanged.next([...this.recipes]);
    })
  }

  addedRecipeItem(recipe: IRecipe) {
    this.http.post<{
      name: string
    }>(`${environment.dataBasePath}/recipes.json`, recipe)
      .subscribe(response => {
        this.alertService.setCurrentAlert("Added an recipe successfully", true)
        this.recipes.push({...recipe, id: response.name});
        this.recipeListChanged.next([...this.recipes]);
      }, error => {
        this.alertService.setCurrentAlert("Something went wrong", false)
      })
  }

  updateRecipeItem(recipe: IRecipe) {
    this.http.put<IRecipe>(`${environment.dataBasePath}/recipes/${recipe.id}.json`, recipe)
      .subscribe(res => {
        this.alertService.setCurrentAlert("The recipe was updated successfully", true)
        this.recipes = this.recipes.map(el => {
          if (el.id !== res.id) return el;
          return res;
        });
        this.recipeListChanged.next([...this.recipes]);
      }, error => {
        this.alertService.setCurrentAlert("Something went wrong", false)
      })

  }

  deleteRecipe(id: string) {
    this.http.delete<null>(`${environment.dataBasePath}/recipes/${id}.json`)
      .subscribe(res => {
        this.alertService.setCurrentAlert("The recipe was deleted successfully", true)
        this.recipes = this.recipes.filter(el => el.id !== id);
        this.recipeListChanged.next([...this.recipes]);
      }, error => {
        this.alertService.setCurrentAlert("Something went wrong", false)
      });
  }

  addedIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addedIngredients(ingredients);
  }

  getRecipeById(id: string) {
    return this.http.get<IRecipe>(`${environment.dataBasePath}/recipes/${id}.json`)
      .pipe(map(recipe => {
        return {...recipe, id};
      }));
  }

}
