import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {PipeComponent} from "./pipe/pipe.component";
import {PostsComponent} from "./posts/posts.component";
import {RecipesResolverService} from "./recipes/recipes-resolver.service";
import {RecipeItemResolverService} from "./recipes/recipe-item-resolver.service";
import {LayoutComponent} from "./layout/layout.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth-guard.service";

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
      {path: "shopping-list", component: ShoppingListComponent},
      {path: "pipe", component: PipeComponent},
      {path: "posts", component: PostsComponent}
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
