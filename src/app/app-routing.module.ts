import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { AuthGuard } from './auth/auth-guard';
import { BlogEditComponent } from './blogs/blog-detail/blog-edit/blog-edit.component';
import { AccessGuard } from './shared/guards/access-guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed',  loadChildren: () => import('./blogs/blog.module').then((m)=> m.BlogModule)},
  {
    path: 'blog',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: BlogDetailComponent
      },
      {
        path:':id/edit',
        canActivate: [AccessGuard],
        component: BlogEditComponent
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
