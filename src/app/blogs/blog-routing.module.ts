import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { BlogsComponent } from './blogs.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: BlogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}