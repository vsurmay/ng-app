import {IngridientModel} from "../shared/ingridient.model";

export class RecipeModel {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: IngridientModel[]

  constructor(id: number, name: string, description: string, imagePath: string, ingredients: IngridientModel[] ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.id = id;
    this.ingredients = ingredients;
  }
}
