import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  isEditMode: boolean = false;
  recipeId: number | null = null;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params["id"]);
      if (params["id"]) {
        this.recipeId = +params["id"];
        this.isEditMode = true;
      } else {
        this.recipeId = null;
        this.isEditMode = false;
      }

    })
  }

}
