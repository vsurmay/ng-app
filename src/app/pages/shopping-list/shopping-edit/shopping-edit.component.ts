import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {IIngredient} from "../../../shared/ingridient.model";
import {AlertService} from "../../../alert/alert.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  ingredientForm: FormGroup;
  activeIngredient: IIngredient | null;
  subscriptionForActiveIngredient: Subscription;
  editMode: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private alertService: AlertService
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
      "amount": new FormControl(this.activeIngredient && this.activeIngredient.amount || null, [Validators.required, Validators.min(1), Validators.max(99)])
    })
  }

  save() {
    if (this.ingredientForm?.invalid || !this.ingredientForm?.touched) return;

    if (this.activeIngredient) {
      this.shoppingListService.editIngredient({...this.ingredientForm.getRawValue(), id: this.activeIngredient.id}).subscribe(() => {
        this.clear();
        this.alertService.setCurrentAlert("An ingredient was updated successfully", true);
      }, error => {
        this.clear();
        this.alertService.setCurrentAlert("Something went wrong", false);
        });
    } else {
      this.shoppingListService.addedIngredient({...this.ingredientForm.getRawValue()}).subscribe(() => {
        this.clear();
        this.alertService.setCurrentAlert("An ingredient was added successfully", true);
      }, error => {
        this.clear();
        this.alertService.setCurrentAlert("Something went wrong", false);
      });
    }

  }

  clear() {
    this.ingredientForm?.reset();
    this.shoppingListService.activeIngredient.next(null);
    this.activeIngredient = null;
    this.editMode = false;
  }

  onDelete(id: string | undefined) {
    if (!id) return;
    this.shoppingListService.deleteIngredient(id).subscribe(() => {
      this.alertService.setCurrentAlert("An ingredient was deleted successfully", true);
    }, error => {
      this.alertService.setCurrentAlert("Something went wrong", false);
    })
    this.clear();
  }

}
