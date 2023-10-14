import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: "auth", loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)},
  {path: "", loadChildren: () => import("./pages/layout/layout.module").then(m => m.LayoutModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
