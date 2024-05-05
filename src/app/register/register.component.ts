import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { PostTweetInterface } from '../tweet.interface';
import { RegisterUser } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    displayname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService
        .register(rawForm.email, rawForm.username, rawForm.password)
        .subscribe({
            next: (uuid: string) => {
              const userData: RegisterUser = {
                displayName: rawForm.displayname,
                userName: rawForm.username,
                firebaseUuid: uuid,
              };
              
              this.userService.registerUser(userData)
              .subscribe({
                next: () => {
                  // If registration with both Firebase & user microservice is successful, navigate to home page
                  this.router.navigateByUrl('/');
                },
                error: (err) => {
                  console.error('Error registering user with microservice:', err);
                  this.errorMessage = 'Failed to register user with microservice.';
                  // TODO: make sure user is not authenticated and delete firebase account 
                }
          });
            },
        error: (err) => {
            this.errorMessage = err.code;
        },
    });
  }
}