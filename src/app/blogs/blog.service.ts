import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog-list/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  // Get blog details by ID
  getBlogById(blogId: string): Observable<Blog> {
    console.log("Inside getBlogById()")
    return this.http.get<Blog>(`http://localhost:3000/api/v1/posts/${blogId}`);
  }

  // Create a new blog
//   createBlog(blog: Blog): Observable<Blog> {
//     return this.http.post<Blog>('/api/blogs', blog);
//   }

  // Update an existing blog
//   updateBlog(blogId: string, updatedBlog: Blog): Observable<Blog> {
//     return this.http.put<Blog>(`/api/blogs/${blogId}`, updatedBlog);
//   }

  // Delete a blog
//   deleteBlog(blogId: string): Observable<void> {
//     return this.http.delete<void>(`/api/blogs/${blogId}`);
//   }

  // Get blog author ID by blog ID
  static getBlogAuthorId(blogId: string): string {
    // This is a placeholder method.
    // You may implement logic to fetch blog author ID from the server.
    // For demonstration purposes, assume the author ID is stored along with the blog.
    // You may also cache blog author IDs to avoid repeated API calls.
    // Replace this with your actual implementation.
    return 'author123'; // Return a hardcoded author ID for demonstration
  }
}
