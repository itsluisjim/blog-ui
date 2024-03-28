export class User {
    constructor(
      public username: string,
      public _id: string,
      private _token: string,
      public first: string,
      public last: string,
      public email: string,
      public admin: boolean
    ) {}
  
    get token() {
      if(!this._token){
          return null;
      }
      return this._token;
    }
  }
  