import {catchError, map, of, Subject, tap} from "rxjs";
import {IIngredient} from "../../shared/ingridient.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../shared/environment";
import {AuthService} from "../auth/auth.service";
import {Store} from "@ngrx/store";
import {ShoppingListActions} from "./store/shopping-list.actions";

@Injectable()
export class ShoppingListService {

  activeIngredient = new Subject<IIngredient | null>();
  changedIngredientList = new Subject<{action: "deleted" | "added" | "edited", id: string}>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store
  ) {
  }

  getIngredientsList() {
    this.store.dispatch(ShoppingListActions.changeLoaderValue({loaderValue: true}));
    this.store.dispatch(ShoppingListActions.changeErrorValue({errorValue: ""}));
    const user = this.authService.getUserWithLocaleStorage();
    return this.http.get<{
      [key: string]: IIngredient
    }>(`${environment.dataBasePath}/ingredients/${user?.localId}.json`)
      .pipe(map(res => {
        const ingredients: IIngredient[] = [];
        for (let key in res) {
          const item = res[key];
          ingredients.push({...item, id: key});
        }
        return ingredients;
      }), tap(res => {
        this.store.dispatch(ShoppingListActions.getShoppingList({ingredients: res}));
        this.store.dispatch(ShoppingListActions.changeLoaderValue({loaderValue: false}));
      }), catchError(err => {
        this.store.dispatch(ShoppingListActions.changeErrorValue({errorValue: err.message}));
        this.store.dispatch(ShoppingListActions.changeLoaderValue({loaderValue: false}));
        return of(err.message);
      }))
  }

  addedIngredient(ingredient: IIngredient) {
    const user = this.authService.getUserWithLocaleStorage()
    return this.http.post<{
      name: string
    }>(`${environment.dataBasePath}/ingredients/${user?.localId}.json`, ingredient)
      .pipe(tap(res => {
        this.changedIngredientList.next({action: "added", id: res.name})
        this.store.dispatch(ShoppingListActions.addedToShoppingList(
          {
            ingredient: {...ingredient, id: res.name}
          }
        ));
      }))
  }

  addedIngredients(ingredients: IIngredient[]) {
    const user = this.authService.getUserWithLocaleStorage();
    for (let ingredient of ingredients) {
      this.http.post<{
        name: string
      }>(`${environment.dataBasePath}/ingredients/${user?.localId}.json`, ingredient)
        .pipe(tap(res => {
        })).toPromise();
    }
  }

  editIngredient(ingredient: IIngredient) {
    const user = this.authService.getUserWithLocaleStorage();
    return this.http.put<IIngredient>(`${environment.dataBasePath}/ingredients/${user?.localId}/${ingredient.id}.json`, ingredient)
      .pipe(tap(res => {
        if (res.id) this.changedIngredientList.next({action: "edited", id: res.id});
        this.store.dispatch(ShoppingListActions.updateShoppingListItem({ingredient: res}));
      }))
  }

  deleteIngredient(id: string) {
    const user = this.authService.getUserWithLocaleStorage();
    return this.http.delete<null>(`${environment.dataBasePath}/ingredients/${user?.localId}/${id}.json`)
      .pipe(tap(res => {
        this.store.dispatch(ShoppingListActions.deleteFromShoppingList({id}));
      }))
  }

}
