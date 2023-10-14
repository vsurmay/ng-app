import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IRecipe} from "./recipe.service";
import {RecipeService} from "./recipe.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class RecipesResolverService implements Resolve<IRecipe[]> {
  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipe[]> | IRecipe[] {
    return this.recipeService.getRecipesList();
  }
}
