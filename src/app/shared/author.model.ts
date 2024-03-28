export class Author {
    public _id: string;
    public username: string;
    public first: string;
    public last: string;
    
    constructor(id: string, username: string, first: string, last: string) {
        this._id = id;
        this.username = username;
        this.first = first;
        this.last = last;
    }
}