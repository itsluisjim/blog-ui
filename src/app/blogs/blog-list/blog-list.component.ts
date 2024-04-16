import { Component, OnInit } from '@angular/core';
import { Blog } from './blog.model';
import { map, tap } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  isLoading = true;

  constructor(private blogService: BlogService) {}

  public list_of_blogs: Blog[] = [];

  ngOnInit() {

    this.blogService.getAllBlogs()
      .pipe(
        map((blogs: Blog[]) => {
          if (blogs == null) {
            return [];
          }

          return blogs.map((blog: Blog) => {

            return {
              ...blog,
              author: {
                _id: blog.author._id,
                username: blog.author.username,
                first: blog.author.first,
                last: blog.author.last,
              },
            };
          }).filter((blog) => {
            return blog.isPublished
          });
        })
        ,
        tap((blogs: Blog[]) => {
          this.isLoading = false;
          this.list_of_blogs = blogs;
        })
      )
      .subscribe();
  }
}
