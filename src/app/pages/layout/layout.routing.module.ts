import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth-guard.service";
import {LayoutComponent} from "./layout.component";

const routes: Routes = [
  {
    path: "", canActivate: [AuthGuard], component: LayoutComponent, children: [
      {path: "", redirectTo: "recipes", pathMatch: "full"},
      {path: "recipes", loadChildren: () => import("../recipes/recipe.module"). then(m => m.RecipeModule)},
      {path: "shopping-list", loadChildren: () => import("../shopping-list/shopping-list.module").then(m => m.ShoppingListModule)}
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule {}
