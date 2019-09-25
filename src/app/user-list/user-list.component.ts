import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileId } from '../profile-id';
import { Profile } from '../profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  private usersCollection: AngularFirestoreCollection<Profile>;
  users: Observable<ProfileId[]>;

  constructor(private afs: AngularFirestore, private router: Router) {
    this.usersCollection = afs.collection<Profile>('users');
    this.users = this.usersCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Profile;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  deleteUser(id: string) {
    this.afs.doc<Profile>(`users/${id}`).delete();
  }

  addUser() {
    this.router.navigate(['/form']);
  }

  editUser(id: string) {
    this.router.navigate([`/user/${id}/edit`]);
  }
}
