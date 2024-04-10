import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/env/environment';
import { Comment } from "../shared/comment.model";

export interface CommentResponseData {
    message: string,
    comment: Comment
  }

@Injectable({
    providedIn: "root"
})
export class CommentService {
    private url = `${environment.BASE_URL}/${environment.API_VERSION}`;


    constructor(private http: HttpClient){}

    getAllCommentsFromBlog(): Observable<Comment[]>{
        return this.http.get<Comment[]>(`${this.url}/comments/`);
    }

    createComment(authorId: string, postId: string, comment: string): Observable<CommentResponseData>{
        return this.http.post<CommentResponseData>(`${this.url}/comments/create`, {
            authorId,
            comment,
            postId
        });
    }

    deleteCommentById(commentId: string, postId: string): Observable<any>{
        return this.http.delete(`${this.url}/comments/${commentId}/delete`, {
            body: {
                commentId,
                postId
            }
        })
    }
}