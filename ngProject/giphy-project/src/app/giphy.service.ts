import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { QueryStrings } from './queryStrings';
import { Giphy } from './giphy';


@Injectable()
export class GiphyService {

  private readonly API_KEY = 'x7fDhEodCOfGPmMDjB4zJHeMGsOberQh';
  private readonly LIMIT = '25';
  private readonly LANG = 'en';

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  searchEvent = new EventEmitter<QueryStrings>();

  viewSavedGifsEvent = new EventEmitter();

  pageEvent = new EventEmitter<QueryStrings>();

  constructor(private http: HttpClient) {}

  getSearchGiphy(search: string, rating: string, offset=0): Promise<any> {
    let qs = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('q', search)
      .set('rating', rating)
      .set('limit', this.LIMIT)
      .set('lang', this.LANG)
      .set('offset', offset.toString());
      console.log(">>> in here");
    //Returns an observable
    return (
      //search
      //https://api.giphy.com/v1/gifs/search?api_key=x7fDhEodCOfGPmMDjB4zJHeMGsOberQh&q=&limit=25&offset=0&rating=G&lang=en
      this.http.get('https://api.giphy.com/v1/gifs/search', {params: qs})
          //.take(1) //from observable take 1 from the stream
          .toPromise()
        .then((result) => {
          console.log(">>> " + Object.values(result["data"]));
          return (Object.values(result["data"]));
        })
    ); //convert the event to a promise
  }

  getTrendingGiphy(rating: string, offset=0): Promise<any> {
    let qs = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('rating', rating)
      .set('limit', this.LIMIT)
      .set('offset', offset.toString());

    //Returns an observable
    return (
      //trending
      //https://api.giphy.com/v1/gifs/trending?api_key=x7fDhEodCOfGPmMDjB4zJHeMGsOberQh&limit=25&rating=G
      this.http.get('https://api.giphy.com/v1/gifs/trending', {params: qs})
          //.take(1) //from observable take 1 from the stream
          .toPromise()
        .then((result) => {
          console.log(">>> " + result["data"]);
          console.log(">>> " + Object.values(result["data"]));
          return (Object.values(result["data"]));
        })
    ); //convert the event to a promise
  }

  getAllSavedGiphy(): Promise<any> {
    return (this.http.get('/giphy-project_server/savedgifs')
      // .take(1)
      .toPromise()
      .then((result) => {

        console.log(">>> return user's saved giphy");
        return result;

      }).catch ( error => {
        console.log('>>> error: ', error);
      })
    );
  }

  saveGiphy(giphy: Giphy) : Observable<Giphy> {
    return this.http.post<Giphy>('/giphy-project_server/savedgifs', giphy, this.httpOptions);

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
	   let body = res.json();
     return body || {};
  }
}
