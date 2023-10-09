import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {NgOptimizedImage} from "@angular/common";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from "./pages/recipes/recipes.component";
import {RecipeListComponent} from "./pages/recipes/recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./pages/recipes/recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./pages/recipes/recipe-list/recipe-item/recipe-item.component";
import {ShoppingListComponent} from "./pages/shopping-list/shopping-list.component";
import {ShoppingEditComponent} from "./pages/shopping-list/shopping-edit/shopping-edit.component";
import {RecipeStartComponent} from "./pages/recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./pages/recipes/recipe-edit/recipe-edit.component";

import {DropDownDirective} from "./shared/drop-down.directive";

import {ShoppingListService} from "./pages/shopping-list/shopping-list.service";
import {RecipeService} from "./pages/recipes/recipe.service";

import {AuthComponent} from "./pages/auth/auth.component";
import {LayoutComponent} from './layout/layout.component';
import {RouterOutlet} from "@angular/router";
import {AuthService} from "./pages/auth/auth.service";
import {AuthInterceptorService} from "./pages/auth/auth-interceptor.service";
import { AlertComponent } from './alert/alert.component';
import {AlertService} from "./alert/alert.service";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LayoutComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    HttpClientModule,
    RouterOutlet
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, ShoppingListService, RecipeService, AuthService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
