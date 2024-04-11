import { NgModule } from "@angular/core";
import { BlogsComponent } from "./blogs.component";
import { RouterModule } from "@angular/router";
import { BlogsRoutingModule } from "./blog-routing.module";
import { CommonModule } from "@angular/common";
import { BlogListComponent } from "./blog-list/blog-list.component";
import { SharedModule } from "../shared/shared.module";
import { BlogDetailComponent } from "./blog-detail/blog-detail.component";
import { BlogEditComponent } from "./blog-detail/blog-edit/blog-edit.component";
import { FormsModule } from "@angular/forms";
import { BlogCreateComponent } from "./blog-create/blog-create.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        BlogsComponent,
        BlogListComponent,
        BlogDetailComponent,
        BlogEditComponent,
        BlogCreateComponent
    ],
    imports: [
        RouterModule,
        BlogsRoutingModule,
        CommonModule,
        SharedModule,
        FormsModule,
        FontAwesomeModule,
    ]
})
export class BlogModule{}