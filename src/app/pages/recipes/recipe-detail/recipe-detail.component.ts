import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../recipe.service";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AlertService} from "../../../alert/alert.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: IRecipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.recipe = data["RecipeItemResolverService"];
    })
  }

  toShoppingList(recipe: IRecipe) {
    this.recipeService.addedIngredientsToShoppingList(recipe.ingredients)
  }

  editRecipe() {
    this.router.navigate([`/recipes/${this.recipe?.id}/edit`]);

  }

  deleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(["../"], {relativeTo: this.route});
  }

}
