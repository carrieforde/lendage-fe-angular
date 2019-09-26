import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css']
})
export class SignupLoginComponent {
  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    displayName: [''],
  });
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public afAuth: AngularFireAuth, private fb: FormBuilder) { }

  signup() {
    const { email, password, displayName } = this.signupForm.value;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.auth.currentUser.updateProfile({ displayName });
      });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => console.log('Success!'));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  forgotPassword() {
    const { email } = this.loginForm.value;
    this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
