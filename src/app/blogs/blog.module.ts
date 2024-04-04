import { NgModule } from "@angular/core";
import { BlogsComponent } from "./blogs.component";
import { RouterModule } from "@angular/router";
import { BlogsRoutingModule } from "./blog-routing.module";
import { CommonModule } from "@angular/common";
import { BlogListComponent } from "./blog-list/blog-list.component";
import { HeaderComponent } from "../header/header.component";
import { SharedModule } from "../shared/shared.module";
import { BlogDetailComponent } from "./blog-detail/blog-detail.component";
import { BlogEditComponent } from "./blog-detail/blog-edit/blog-edit.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        BlogsComponent,
        BlogListComponent,
        BlogDetailComponent,
        BlogEditComponent
    ],
    imports: [
        RouterModule,
        BlogsRoutingModule,
        CommonModule,
        SharedModule,
        FormsModule
    ]
})
export class BlogModule{}