import { Component, OnInit } from '@angular/core';
import { Blog } from './blog.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  isLoading = true;

  constructor(public http: HttpClient) {}

  public list_of_blogs: Blog[] = [];

  ngOnInit() {
    console.log('inside on init method');
    this.http
      .get<Blog[]>('http://localhost:3000/api/v1/posts')
      .pipe(
        map((blogs: Blog[]) => {
          if (blogs == null) {
            console.log('blogs empty!');
            return [];
          }

          return blogs.map((blog: Blog) => {

            console.log(blog);

            return {
              ...blog,
              author: {
                _id: blog.author._id,
                username: blog.author.username,
                first: blog.author.first,
                last: blog.author.last,
              },
            };
          });
        }),
        tap((blogs: Blog[]) => {
          console.log(blogs);
          this.isLoading = false;
          this.list_of_blogs = blogs;
        })
      )
      .subscribe();
  }
}
