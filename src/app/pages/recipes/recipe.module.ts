import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {RecipeRoutingModule} from "./recipe-routing.module";
import {LayoutModule} from "../layout/layout.module";

import {RecipesComponent} from "./recipes.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeItemResolverService} from "./recipe-item-resolver.service";
import {RecipesResolverService} from "./recipes-resolver.service";
import {AppModule} from "../../app.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipeRoutingModule,
        LayoutModule,
    ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  providers: [
    RecipeItemResolverService,
    RecipesResolverService
  ]
})

export class RecipeModule {
}
