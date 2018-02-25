export class QueryStrings{
  search: string;
  offset: number;
  ratings: string[];

  constructor(){
    this.search = '';
    this.offset = 0;
    this.ratings = ['G'];
  }
}
