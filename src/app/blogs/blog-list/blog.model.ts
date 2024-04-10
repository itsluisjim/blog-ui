import { Comment } from "src/app/shared/comment.model";
import { Author } from "../../shared/author.model";


export class Blog {
    public _id: string;
    public author: Author;
    public createdAt: Date;
    public title: string;
    public content: string;
    public isPublished: boolean;
    public comments: Comment[];

    constructor(id: string, author: Author, createdAt: Date, title: string, content: string, isPublished: boolean, comments: Comment[]){
        this._id = id;
        this.author = author;
        this.createdAt = createdAt;
        this.title = title;
        this.content = content
        this.isPublished = isPublished;
        this.comments = comments;
    }
}