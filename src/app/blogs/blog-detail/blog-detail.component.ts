import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../blog-list/blog.model';
import { Author } from 'src/app/shared/author.model';
import { HttpClient } from '@angular/common/http';
import { Subscription, map, take, tap } from 'rxjs';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { environment } from 'src/env/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blog: Blog;
  blog_id_url: string;
  isLoading = true;

  user: User;
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.blog_id_url = params['id'];
      console.log('inside on init method');

      // Make HTTP request inside the params subscription block
      this.http
        .get<Blog>(`${environment.BASE_URL}${environment.API_VERSION}posts/${this.blog_id_url}`)
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

            console.log('Inside tap -Blog Detail');
            console.log(blog);

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

  submitForm(deleteBlogForm: NgForm) {

    const postId = deleteBlogForm.form.value.postId;
    
    if(!deleteBlogForm.valid){
      return;
    }

    if(postId !== this.blog_id_url){
      return;
    }

    this.http.delete(`${environment.BASE_URL}${environment.API_VERSION}posts/${postId}/delete`, {
      body: {
        postId: postId
      }
    })
    .subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/feed']);
    });
  }
}
