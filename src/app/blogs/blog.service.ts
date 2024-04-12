import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog-list/blog.model';
import { environment } from 'src/env/environment';

export interface ResponseData {
  message: string,
  post: Blog
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = `${environment.BASE_URL}/${environment.API_VERSION}`;

  constructor(private http: HttpClient) { }

  // Get all Blogs
  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.url}/posts/`);
  };

  getAllBlogsByAuthor(authorId: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.url}/posts/${authorId}/my-posts`);
  }

  // Get blog details by ID
  getBlogById(blogId: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.url}/posts/${blogId}`);
  }

  // Create a new blog
  createBlog(authorId: string, title: string, content: string, published: boolean): Observable<ResponseData> {
    return this.http.post<ResponseData>(`${this.url}/posts/create`, {
      authorId,
      title,
      content,
      published
    })
  }

  // Update an existing blog
  updateBlog(url_blog_id: string, authorId: string, title: string, content: string, published: boolean): Observable<ResponseData> {
    return this.http.put<ResponseData>(`${this.url}/posts/${url_blog_id}/update`, {
      authorId,
      title,
      content,
      published
    });
  }

  // Delete a blog
  deleteBlogById(postId: string): Observable<any> {
    return this.http
    .delete(
      `${this.url}/posts/${postId}/delete`,
      {
        body: {
          postId: postId,
        },
      }
    );
  }
}
