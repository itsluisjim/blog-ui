import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Blog } from '../blog-list/blog.model';
import { environment } from 'src/env/environment';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit, OnDestroy {
  blog: Blog;
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

  submitForm(createBlogForm: NgForm){
    
    console.log(createBlogForm);

    if(!createBlogForm.valid){
      return;
    }

    this.http.post(`${environment.BASE_URL}${environment.API_VERSION}posts/create`, {
      authorId: createBlogForm.form.value.authorId,
      title: createBlogForm.form.value.title,
      content: createBlogForm.form.value.content,
      published: createBlogForm.form.value.published
    }).subscribe((response: any) => {
      console.log(response);
    });
  }
}
