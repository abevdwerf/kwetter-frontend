import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from '../../services/tweet.service';
import { TweetInterface } from '../tweet.interface';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  userId: string = '';
  data: TweetInterface[] = [];
  private tweetService = inject(TweetService);
  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId']
    this.tweetService.getTweetsByUserId(this.userId)
      .subscribe((tweets: TweetInterface[]) => {
        this.data = tweets;
      });
  }

  // loadTweets(): void {
  //   this.twitterService.getTweetsByUserId(this.userId).subscribe(data => {
  //     this.tweets = data;
  //     // Handle data as needed
  //   });
  // }
}