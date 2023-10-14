import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IRecipe} from "./recipe.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {RecipeService} from "./recipe.service";

@Injectable()
export class RecipeItemResolverService implements Resolve<IRecipe> {
  constructor(private recipeService: RecipeService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipe> | IRecipe {
    return this.recipeService.getRecipeById(route.params["id"]);
  }
}
