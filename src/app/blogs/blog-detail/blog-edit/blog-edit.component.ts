import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from '../../blog-list/blog.model';
import { User } from 'src/app/auth/user.model';
import { Subscription, map, take, tap } from 'rxjs';
import { environment } from 'src/env/environment';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  blog: Blog;
  blog_id_url: string;
  isLoading = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  user: User;
  private userSubscription: Subscription;
  isAuthenticated = false;


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.blog_id_url = params['id'];
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

  submitForm(editForm: NgForm){

    console.log(editForm)

    if(!editForm.valid){
      return;
    }

    if(this.user._id !== this.blog.author._id){
      this.router.navigate(['/feed']);
    }

    this.http.put(`${environment.BASE_URL}${environment.API_VERSION}posts/${this.blog_id_url}/update`, {
      authorId: editForm.form.value.authorId,
      title: editForm.form.value.title,
      content: editForm.form.value.content,
      published: editForm.form.value.published
    }).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['../'], {relativeTo: this.route});
    });

  }

}
