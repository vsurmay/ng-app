import {Component, Input} from '@angular/core';
import {IRecipe} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  constructor() {
  }

  @Input() recipe: IRecipe;

}
