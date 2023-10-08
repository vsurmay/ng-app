import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {NgOptimizedImage} from "@angular/common";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {PipeComponent} from './pipe/pipe.component';
import {PostsComponent} from './posts/posts.component';

import {DropDownDirective} from "./shared/drop-down.directive";

import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {RecipeService} from "./recipes/recipe.service";

import {ShortenPipe} from "./shorten.pipe";
import {ReversePipe} from './reverse.pipe';
import {SortPipe} from './sort.pipe';
import {PostsService} from "./posts/posts.service";
import {AuthComponent} from "./auth/auth.component";
import {LayoutComponent} from './layout/layout.component';
import {RouterOutlet} from "@angular/router";
import {AuthService} from "./auth/auth.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
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
    PipeComponent,
    ShortenPipe,
    ReversePipe,
    SortPipe,
    PostsComponent,
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
  }, ShoppingListService, RecipeService, PostsService, AuthService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
