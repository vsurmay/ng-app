import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterLink, RouterOutlet} from "@angular/router";

import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";
import {LayoutModule} from "../layout/layout.module";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    ShoppingListRoutingModule,
    LayoutModule
  ],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent
  ]
})
export class ShoppingListModule {
}
