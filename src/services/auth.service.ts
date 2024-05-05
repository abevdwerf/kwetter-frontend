import { Injectable, inject, signal } from '@angular/core';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../app/user.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    firebaseAuth = inject(Auth)
    user$ = user(this.firebaseAuth)
    currentUserSig= signal<UserInterface | null | undefined>(undefined)

    register(
        email: string, 
        username: string, 
        password: string
    ): Observable<string> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth, 
            email, 
            password
        ).then((userCredential: UserCredential) => {
            // Update profile with display name
            return updateProfile(userCredential.user, { displayName: username }).then(() => {
              // Return the user's UUID (UID)
              return userCredential.user.uid;
            });
          });
      
        return from(promise);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password,
        ).then(() => {});
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }

    getCurrentUser(): Observable<User | null | undefined> {
        return this.user$;
    }
}