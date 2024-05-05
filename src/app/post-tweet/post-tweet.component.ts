import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TweetService } from '../../services/tweet.service';
import { PostTweetInterface } from '../tweet.interface';

@Component({
  selector: 'app-post-tweet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-tweet.component.html',
})
export class PostTweetComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  tweetService = inject(TweetService);
  userService = inject(UserService);

  form = this.fb.nonNullable.group({
    content: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    // Get the currently authenticated user
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          const rawForm = this.form.getRawValue();
          // Get the user's information'
          this.userService.getUserByUuid(user.uid).subscribe({
            next: (userData) => {
              console.log(userData)
              const tweet: PostTweetInterface = {
                userId: userData.id.toString(),
                displayName: userData.displayName,
                content: rawForm.content
              };
              // Post tweet with user's information
              this.tweetService.postTweet(tweet)
                .subscribe({
                  next: (response: any) => {
                    alert("Tweet successfully posted");
                  },
                  error: (error: any) => {
                    // Handle tweet post error
                    this.errorMessage = 'Failed to post tweet.';
                  }
                });
            },
            error: (error) => {
              // Handle error getting user information
              this.errorMessage = 'Failed to get user information.';
              console.log(error)
            }
          });
        } else {
          // Handle case where user is not authenticated
          this.errorMessage = 'User not authenticated.';
        }
      },
      error: (error) => {
        // Handle error getting current user
        this.errorMessage = 'Failed to get current user.';
      }
    });
  }
}
