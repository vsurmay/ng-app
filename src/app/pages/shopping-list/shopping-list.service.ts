import {map, Subject, tap} from "rxjs";
import {IIngredient} from "../../shared/ingridient.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../shared/environment";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ShoppingListService {

  ingredientChanged = new Subject<IIngredient[]>();
  activeIngredient = new Subject<IIngredient | null>();

  private ingredients: IIngredient[] = [
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getIngredientsList() {
    const user = this.authService.getUserWithLocaleStorage();
    return this.http.get<{[key: string]: IIngredient}>(`${environment.dataBasePath}/ingredients/${user?.localId}.json`).pipe(map(res => {
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
    const user = this.authService.getUserWithLocaleStorage()
    return this.http.post<{name: string}>(`${environment.dataBasePath}/ingredients/${user?.localId}.json`, ingredient).pipe(tap(res => {
      this.ingredients.push({...ingredient, id: res.name});
      this.ingredientChanged.next([...this.ingredients]);
    }))
  }

  addedIngredients(ingredients: IIngredient[]) {
    const user = this.authService.getUserWithLocaleStorage();
    for (let ingredient of ingredients) {
     this.http.post<{name: string}>(`${environment.dataBasePath}/ingredients/${user?.localId}.json`, ingredient).pipe(tap(res => {
        this.ingredients.push({...ingredient, id: res.name});
        this.ingredientChanged.next([...this.ingredients]);
      })).toPromise();
    }
  }

  editIngredient(ingredient: IIngredient) {
    const user = this.authService.getUserWithLocaleStorage();
    return this.http.put<IIngredient>(`${environment.dataBasePath}/ingredients/${user?.localId}/${ingredient.id}.json`, ingredient).pipe(tap(res => {
      this.ingredients = this.ingredients.map(el => {
        if (el.id !== res.id) return el;
        return {...res};
      })
      this.ingredientChanged.next([...this.ingredients]);
    }))
  }

  deleteIngredient(id: string) {
    const user = this.authService.getUserWithLocaleStorage();
    return this.http.delete<null>(`${environment.dataBasePath}/ingredients/${user?.localId}/${id}.json`).pipe(tap(res => {
      this.ingredients = this.ingredients.filter(el => el.id !== id);
      this.ingredientChanged.next([...this.ingredients]);
    }))
  }

}
