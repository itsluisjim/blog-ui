import { Author } from "../../shared/author.model";


export class Blog {
    public _id: string;
    public author: Author;
    public createdAt: Date;
    public title: string;
    public content: string;

    constructor(id: string, author: Author, createdAt: Date, title: string, content: string){
        this._id = id;
        this.author = author;
        this.createdAt = createdAt;
        this.title = title;
        this.content = content
    }
}