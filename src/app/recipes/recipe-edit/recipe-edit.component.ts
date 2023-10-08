import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IRecipe} from "../recipe.service";
import {RecipeService} from "../recipe.service";
import {IngredientModel} from "../../shared/ingridient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  isEditMode: boolean = false;
  recipeForm: FormGroup;
  activeRecipe: IRecipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log("params[\"id\"]", params["id"])
      this.recipeService.getRecipeById(params["id"]).subscribe(res => {
        this.activeRecipe = res;
        this.createForm();
      });
      this.isEditMode = !!params["id"];
      this.createForm();
    })
  }

  createForm() {
    const ingredients: any = this.fb.array([])
    if (this.activeRecipe && this.activeRecipe.ingredients) {
      this.activeRecipe.ingredients.forEach((el: IngredientModel) => {
        return ingredients.push(
          this.fb.group({
            name: [el.name, Validators.required],
            amount: [el.amount, Validators.required],
          })
        );
      });
    }

    this.recipeForm = this.fb.group({
      name: [this.activeRecipe?.name || "", Validators.required],
      imagePath: [this.activeRecipe?.imagePath || "", Validators.required],
      description: [this.activeRecipe?.description || "", Validators.required],
      ingredients: ingredients
    })
  }

  save() {
    if (this.recipeForm.invalid && this.recipeForm.untouched) {
      return;
    }

    if (this.isEditMode && this.activeRecipe) {
      this.recipeService.updateRecipeItem({...this.recipeForm.getRawValue(), id: this.activeRecipe.id});
    } else {
      this.recipeService.addedRecipeItem({...this.recipeForm.getRawValue()});
    }
    this.onCancel();
  }

  addedNewIngredient() {
    const ingredientArray = this.controls;
    ingredientArray.push(
      this.fb.group({
        name: ["", Validators.required],
        amount: [1, Validators.required],
      })
    )
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
