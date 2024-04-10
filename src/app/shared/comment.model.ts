import { Author } from "./author.model";

export class Comment {
    public _id: string;
    public author: Author;
    public createdAt: Date;
    public comment: string;
    public post_id: string;
    
    constructor(_id: string, author: Author, createdAt: Date, comment: string, post_id: string) {
        this._id = _id;
        this.author = author;
        this.createdAt = createdAt;
        this.comment = comment;
        this.post_id = post_id;
    }
}