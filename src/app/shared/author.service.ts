import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/env/environment';
import { Observable } from "rxjs";
import { Author } from "./author.model";


@Injectable({
    providedIn: "root"
})
export class AuthorService {

    private url = `${environment.BASE_URL}/${environment.API_VERSION}`;

    constructor(private http: HttpClient){}

    getAllAuthors(): Observable<Author[]>{
        return this.http.get<Author[]>(`${this.url}/authors/`);
    }

    deleteAuthorById(authorId: string): Observable<any>{
        return this.http.delete(`${this.url}/authors/${authorId}/delete`, {
            body: {
                authorId
            }
        })
    }
}