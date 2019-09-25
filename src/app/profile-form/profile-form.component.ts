import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Profile } from '../profile';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';

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
  private userDoc: AngularFirestoreDocument<Profile>;
  user: Observable<Profile>;
  userId: string;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params => this.userId = params.id));

    if (this.userId) {
      this.userDoc = this.afs.doc<Profile>(`users/${this.userId}`);
      this.user = this.userDoc.snapshotChanges()
        .pipe(
          map(action => {
            const data = action.payload.data();
            const id = action.payload.id;
            return { id, ...data };
          })
        )
        .pipe(
          tap(user => {
            const { firstName, lastName, address, city, state, zip, phone, email } = user;

            if (!firstName && !lastName) {
              this.profileForm.reset();
            } else {
              this.profileForm.patchValue({ firstName, lastName, address, city, state, zip, phone, email });
            }
          })
        );
    }
  }

  updateForm() {
    this.userDoc.update(this.profileForm.value);
  }

  submitForm() {
    const usersCollection = this.afs.collection<Profile>('users');
    usersCollection.add(this.profileForm.value).then(docRef => this.router.navigate([`/user/${docRef.id}`])
    );
  }

  resetForm(form: string) {
    this[form].reset();

    if (this.userId) {
      // TODO: Give the user the option to delete the user, or undo their changes (try Snapshot changes?)
      this.afs.doc<Profile>(`users/${this.userId}`).delete();
    }

    this.router.navigate(['/']);
  }
}
