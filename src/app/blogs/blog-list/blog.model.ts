import { Author } from "../../shared/author.model";


export class Blog {
    public _id: string;
    public author: Author;
    public createdAt: Date;
    public title: string;
    public content: string;
    public isPublished: boolean

    constructor(id: string, author: Author, createdAt: Date, title: string, content: string, isPublished: boolean){
        this._id = id;
        this.author = author;
        this.createdAt = createdAt;
        this.title = title;
        this.content = content
        this.isPublished = isPublished;
    }
}