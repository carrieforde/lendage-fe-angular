import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Profile } from '../profile';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  private userDoc: AngularFirestoreDocument<Profile>;
  userId: string;
  user: Observable<Profile>;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
    this.route.params.subscribe((params => this.userId = params.id));
    this.userDoc = this.afs.doc<Profile>(`users/${this.userId}`);
    this.user = this.userDoc.valueChanges();
  }

  ngOnInit() { }
}
