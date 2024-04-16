import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { Blog } from '../blogs/blog-list/blog.model';
import { BlogService } from '../blogs/blog.service';
import { Author } from '../shared/author.model';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  selectedTab: string = 'authors';

  blogs: Blog[];
  authors: Author[];

  constructor(private blogService: BlogService, private authorService: AuthorService) {}
  
  ngOnInit(): void {
    this.blogService
      .getAllBlogs()
      .pipe(
        map((blogs: Blog[]) => {
          if (blogs == null) {
            return [];
          }
  
          return blogs;
        })
        ,
        tap((blogs: Blog[]) => {
          this.blogs = blogs;
          console.log(this.blogs)
        })
      )
      .subscribe();
    
      this.authorService
        .getAllAuthors()
        .pipe(
          map((authors: Author[]) => {
            if (authors == null) {
              return [];
            }
  
            return authors;
          })
          ,
          tap((authors: Author[]) => {
            this.authors = authors;
            console.log(this.authors)
          })
        )
        .subscribe();
  }

  deleteAuthor(authorId: string){
    this.authorService.deleteAuthorById(authorId).subscribe();
    this.authors = this.authors.filter((author: Author) => author._id !== authorId);
  }
}
