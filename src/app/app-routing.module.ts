import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout/layout.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {AuthGuard} from "./pages/auth/auth-guard.service";
import {RecipesComponent} from "./pages/recipes/recipes.component";
import {RecipesResolverService} from "./pages/recipes/recipes-resolver.service";
import {RecipeStartComponent} from "./pages/recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./pages/recipes/recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./pages/recipes/recipe-detail/recipe-detail.component";
import {RecipeItemResolverService} from "./pages/recipes/recipe-item-resolver.service";
import {ShoppingListComponent} from "./pages/shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {
    path: "", canActivate: [AuthGuard], component: LayoutComponent, children: [
      {path: "", redirectTo: "recipes", pathMatch: "full"},
      {
        path: "recipes", component: RecipesComponent, resolve: {RecipesResolverService}, children: [
          {path: "", component: RecipeStartComponent},
          {path: "new", component: RecipeEditComponent},
          {path: ":id", component: RecipeDetailComponent, resolve: {RecipeItemResolverService}},
          {path: ":id/edit", component: RecipeEditComponent, resolve: {RecipeItemResolverService}}
        ]
      },
      {path: "shopping-list", component: ShoppingListComponent}
    ],
  },
  {path: "auth", component: AuthComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
