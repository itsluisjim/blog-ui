import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Blog } from '../../blog-list/blog.model';
import { BlogService, ResponseData } from '../../blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss'],
})
export class BlogEditComponent implements OnInit, OnDestroy {
  blog: Blog;
  url_blog_id: string;
  isLoading = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private blogService: BlogService
  ) {}

  user: User;
  private userSubscription: Subscription;
  isAuthenticated = false;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.url_blog_id = params['id'];
      this.blogService
        .getBlogById(this.url_blog_id)
        .pipe(
          take(1),
          map((blog: Blog) => {
            if (blog == null) {
              return null;
            }

            return {
              ...blog,
              author: {
                _id: blog.author._id,
                username: blog.author.username,
                first: blog.author.first,
                last: blog.author.last,
              },
            };
          }),
          tap((blog: Blog) => {
            this.blog = blog;
            this.isLoading = false;
          })
        )
        .subscribe();
    });

    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;

      if (this.isAuthenticated) {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  submitForm(editForm: NgForm) {
    if (!editForm.valid) {
      return;
    }

    if (this.user._id !== this.blog.author._id) {
      this.router.navigate(['/feed']);
    }

    const { authorId, title, content, published } = editForm.form.value;

    this.blogService
      .updateBlog(this.url_blog_id, authorId, title, content, published)
      .subscribe((data: ResponseData) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
