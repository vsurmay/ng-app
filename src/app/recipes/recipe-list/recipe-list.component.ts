import {Component, OnDestroy, OnInit} from '@angular/core';
import {IRecipe} from "../recipe.service";
import {RecipeService} from "../recipe.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes: IRecipe[] = []
  recipeListSubscription: Subscription

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.recipeService.setRecipeList();
    this.recipeListSubscription = this.recipeService.recipeListChanged.subscribe(recipes => {
      this.recipes = recipes;
    })
  }

  clickOnAddedRecipe() {
    this.router.navigate(["recipes/new"])
  }

  ngOnDestroy() {
    this.recipeListSubscription.unsubscribe();
  }

}
