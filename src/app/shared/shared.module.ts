import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NoBlogsComponent } from './no-blogs/no-blogs.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent, NoBlogsComponent
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    NoBlogsComponent
  ],
})
export class SharedModule {}
