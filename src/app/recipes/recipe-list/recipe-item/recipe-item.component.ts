import {Component, Input} from '@angular/core';
import {RecipeModel} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  constructor(private recipeService: RecipeService) {
  }

  @Input() recipe: RecipeModel | undefined;

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
