import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: RecipeModel | undefined;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.recipe = this.recipeService.getRecipeById(+param["id"]);
    })
  }

  toShoppingList(recipe: RecipeModel) {
    this.recipeService.addedIngredientsToShoppingList(recipe.ingredients);
  }

}
