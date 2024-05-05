import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { PostTweetInterface } from '../app/tweet.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  postTweet(tweet: PostTweetInterface): Observable<PostTweetInterface> {
    return this.http.post<PostTweetInterface>(`${environment.backendUrl}tweets`, tweet)
  }
}
