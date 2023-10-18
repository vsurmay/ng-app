import {NgModule} from "@angular/core";
import {LayoutRoutingModule} from "./layout.routing.module";
import {LayoutComponent} from "./layout.component";
import {HeaderComponent} from "../../header/header.component";
import {DropDownDirective} from "../../shared/drop-down.directive";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {RecipeService} from "../recipes/recipe.service";
import {FirstLetterPipe} from "../../pipes/first-letter.pipe";
import {LoaderComponent} from "../../shared/loader/loader.component";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    DropDownDirective,
    FirstLetterPipe,
    LoaderComponent
  ],
  imports: [
    LayoutRoutingModule,
  ],
  exports: [
    DropDownDirective,
    FirstLetterPipe,
    LoaderComponent
  ],
  providers: [
    RecipeService,
    ShoppingListService
  ]
})

export class LayoutModule {}
