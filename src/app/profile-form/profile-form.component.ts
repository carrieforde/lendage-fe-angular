import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: [''],
    city: [''],
    state: [''],
    zip: [''],
    phone: [''],
    email: ['']
  });

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private router: Router) { }

  submitForm() {
    const usersCollection = this.afs.collection<Profile>('users');
    usersCollection.add(this.profileForm.value).then(docRef => this.router.navigate([`/user/${docRef.id}`])
    );
  }

  resetForm(form: string) {
    this[form].reset();
    window.alert('Form successfully aborted!');
  }
}
