import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientModel} from "../../shared/ingridient.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  ingredientForm: FormGroup;
  activeIngredient: IngredientModel | null;
  subscriptionForActiveIngredient: Subscription;
  editMode: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.subscriptionForActiveIngredient = this.shoppingListService.activeIngredient.subscribe(ingredient => {
      this.activeIngredient = ingredient ? {...ingredient} : null;
      if (this.activeIngredient) this.editMode = true;
      this.createForm();
    });
  }

  createForm() {
    this.ingredientForm = new FormGroup({
      "name": new FormControl(this.activeIngredient && this.activeIngredient.name || "", Validators.required),
      "amount": new FormControl(this.activeIngredient && this.activeIngredient.amount || 1, Validators.required)
    })
  }

  save() {
    if (this.ingredientForm?.invalid || !this.ingredientForm?.touched) return;

    // if (this.activeIngredient) {
    //   this.shoppingListService.editIngredient({...this.ingredientForm.getRawValue(), id: this.activeIngredient.id});
    // }
    // this.shoppingListService.addedIngredient({...this.ingredientForm.getRawValue(), id: new Date().toString()});
    // this.clear();
  }

  clear() {
    this.ingredientForm?.reset();
    this.shoppingListService.activeIngredient.next(null);
    this.activeIngredient = null;
    this.editMode = false;
  }

  onDelete(id: string | undefined) {
    if (!id) return;
    this.shoppingListService.deleteIngredient(id);
    this.clear();
  }

}
