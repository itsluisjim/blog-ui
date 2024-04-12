import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BlogService } from '../blogs/blog.service';
import { User } from '../auth/user.model';
import { Subscription, map, tap } from 'rxjs';
import { Blog } from '../blogs/blog-list/blog.model';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.scss'],
})
export class MyBlogsComponent implements OnInit, OnDestroy {
  isLoading = true;
  public list_of_blogs: Blog[] = [];

  user: User;
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;

      if (this.isAuthenticated) {
        this.user = user;
      }
    });

    this.blogService
      .getAllBlogsByAuthor(this.user._id)
      .pipe(
        map((blogs: Blog[]) => {
          if (blogs == null) {
            return [];
          }
          return blogs;
        }),
        tap((blogs: Blog[]) => {
          this.isLoading = false;
          this.list_of_blogs = blogs;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
