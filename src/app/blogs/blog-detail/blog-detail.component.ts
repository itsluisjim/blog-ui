import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { environment } from 'src/env/environment';
import { Blog } from '../blog-list/blog.model';
import { BlogService, ResponseData } from '../blog.service';
import { CommentResponseData, CommentService } from '../comment.service';
import { Comment } from 'src/app/shared/comment.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blog: Blog;
  url_blog_id: string;
  isLoading = true;
  showDeleteConfirmation = false;
  comments: Comment[];

  user: User;
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private blogService: BlogService,
    private commentService: CommentService
  ) {}

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
            this.comments = blog.comments;

            if (blog.isPublished === false) {
              this.isLoading = false;
              this.router.navigate(['/feed']);
            } else {
              this.isLoading = false;
            }
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

  confirmDelete() {
    this.showDeleteConfirmation = true;
  }

  deleteConfirmed(deleteBlogForm: NgForm) {
    this.showDeleteConfirmation = false;
    this.submitForm(deleteBlogForm);
  }

  deleteCancel() {
    this.showDeleteConfirmation = false;
  }

  submitForm(deleteBlogForm: NgForm) {
    if (!deleteBlogForm.valid) {
      return;
    }

    const postId = deleteBlogForm.form.value.postId;

    if (postId !== this.url_blog_id) {
      return;
    }

    this.blogService.deleteBlog(postId).subscribe((data: ResponseData) => {
      this.router.navigate(['/feed']);
    });
  }

  submitComment(createCommentForm: NgForm) {
    if (!createCommentForm.valid) {
      return;
    }

    const { authorId, postId, comment } = createCommentForm.form.value;

    this.commentService
      .createComment(authorId, postId, comment)
      .pipe(
        tap((response: CommentResponseData) => {
          this.comments.push(response.comment);
        })
      )
      .subscribe();
      // console.log(this.user)
      
      createCommentForm.reset();
      console.log(this.user)
  }

  deleteComment(commentId: string, postId: string){
    this.commentService.deleteCommentById(commentId, postId).subscribe();

    this.comments = this.comments.filter((comment: Comment) => comment._id !== commentId);
  }
}
