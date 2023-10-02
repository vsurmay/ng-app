import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{

  recipes: RecipeModel[] = []

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipesList();
  }

  clickOnAddedRecipe() {
    this.router.navigate(["recipes/new"])
  }

}
