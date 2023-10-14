import {NgModule} from "@angular/core";
import {LayoutRoutingModule} from "./layout.routing.module";
import {LayoutComponent} from "./layout.component";
import {HeaderComponent} from "../../header/header.component";
import {DropDownDirective} from "../../shared/drop-down.directive";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {RecipeService} from "../recipes/recipe.service";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    DropDownDirective
  ],
  imports: [
    LayoutRoutingModule,
  ],
  exports: [
    DropDownDirective,
  ],
  providers: [
    RecipeService,
    ShoppingListService
  ]
})

export class LayoutModule {}
