import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogicComponent } from './login/login.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { AccountComponent } from './account/account.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: '',
    component: PostTweetComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectLoggedInToHome},
  },
  {
    path: 'login',
    component: LogicComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectLoggedInToHome},
  },
  { 
    path: 'account/:userId', 
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
  },
];