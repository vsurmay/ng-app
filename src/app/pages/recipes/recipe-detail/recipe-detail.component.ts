import {Component, OnDestroy, OnInit} from '@angular/core';
import {IRecipe} from "../recipe.service";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  animations: [
    trigger("recipeItemAnimation", [
      state("closed", style({
        opacity: 0,
        transform: 'translateX(-400px)',
        scale: 0.3
      })),
      state("open", style({
        opacity: 1,
        transform: "translateX(0)",
        scale: 1
      })),
      transition('closed => open', [
        animate('1s')
      ]),
      transition("open => closed", [
        animate("0.2s", style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: IRecipe | undefined;
  isOpen: "open" | "closed" = "closed";

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.isOpen = "closed";
      setTimeout(() => {
        this.isOpen = "open";
        this.recipe = data["RecipeItemResolverService"];
      }, 500)
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

  ngOnDestroy() {
    this.isOpen = "closed";
  }

}
