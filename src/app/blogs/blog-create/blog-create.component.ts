import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Blog } from '../blog-list/blog.model';
import { BlogService, ResponseData } from '../blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent implements OnInit, OnDestroy {
  blog: Blog;
  isLoading = true;

  user: User;
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;

      if (this.isAuthenticated) {
        this.user = user;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  submitForm(createBlogForm: NgForm) {
    if (!createBlogForm.valid) {
      return;
    }

    const { authorId, title, content, published } = createBlogForm.form.value;

    this.blogService
      .createBlog(authorId, title, content, published)
      .subscribe((response: ResponseData) => {
        const blogId = response.post._id;
        this.router.navigate([`/blog/${blogId}`]);
      });
  }
}
