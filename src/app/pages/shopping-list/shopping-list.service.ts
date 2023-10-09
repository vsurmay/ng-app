import {map, Subject, tap} from "rxjs";
import {IIngredient} from "../../shared/ingridient.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../shared/environment";

@Injectable()
export class ShoppingListService {

  ingredientChanged = new Subject<IIngredient[]>();
  activeIngredient = new Subject<IIngredient | null>();

  private ingredients: IIngredient[] = [
  ];

  constructor(
    private http: HttpClient
  ) {
  }

  getIngredientsList() {
    return this.http.get<{[key: string]: IIngredient}>(`${environment.dataBasePath}/ingredients.json`).pipe(map(res => {
      const ingredients: IIngredient[] = [];
      for (let key in res) {
        const item = res[key];
        ingredients.push({...item, id: key});
      }
      return ingredients;
    }), tap(res => {
      this.ingredients = [...res];
      this.ingredientChanged.next([...this.ingredients]);
    }))
  }

  addedIngredient(ingredient: IIngredient) {
    return this.http.post<{name: string}>(`${environment.dataBasePath}/ingredients.json`, ingredient).pipe(tap(res => {
      this.ingredients.push({...ingredient, id: res.name});
      this.ingredientChanged.next([...this.ingredients]);
    }))
  }

  addedIngredients(ingredients: IIngredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next([...this.ingredients]);
  }

  editIngredient(ingredient: IIngredient) {
    return this.http.put<IIngredient>(`${environment.dataBasePath}/ingredients/${ingredient.id}.json`, ingredient).pipe(tap(res => {
      this.ingredients = this.ingredients.map(el => {
        if (el.id !== res.id) return el;
        return {...res};
      })
      this.ingredientChanged.next([...this.ingredients]);
    }))
  }

  deleteIngredient(id: string) {
    return this.http.delete<null>(`${environment.dataBasePath}/ingredients/${id}.json`).pipe(tap(res => {
      this.ingredients = this.ingredients.filter(el => el.id !== id);
      this.ingredientChanged.next([...this.ingredients]);
    }))
  }

}
