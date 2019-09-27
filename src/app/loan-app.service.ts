import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoanApp } from './loan-app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LoanAppService {
  private loanAppsCollection: AngularFirestoreCollection<LoanApp>;
  private loanAppDoc: AngularFirestoreDocument<LoanApp>;
  loanApps: Observable<LoanApp[]>;
  loanApp: Observable<LoanApp>;
  guid: string;

  constructor(private afs: AngularFirestore) { }

  generateGuid() {
    return this.guid = v4();
  }

  getLoanAppsCollection() {
    return this.afs.collection<LoanApp>('loanApps');
  }

  getLoanApps() {
    this.loanAppsCollection = this.getLoanAppsCollection();
    return this.loanApps = this.loanAppsCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as LoanApp;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getLoanAppDoc(guid: string) {
    this.guid = guid;
    return this.afs.doc<LoanApp>(`loanApps/${guid}`);
  }

  getLoanApp(guid: string) {
    this.loanAppDoc = this.getLoanAppDoc(guid);
    return this.loanApp = this.loanAppDoc.snapshotChanges()
      .pipe(
        map(action => {
          const data = action.payload.data();
          const id = action.payload.id;
          return { id, ...data };
        })
      );
  }

  addApp(id: string) {
    return this.loanAppsCollection.doc(id).set({ firstName: '', lastName: '' });
  }

  updateApp(guid: string, data: LoanApp) {
    this.guid = guid;
    this.loanAppDoc.update(data);
  }

  deleteApp(guid: string) {
    console.log(guid);

    this.guid = guid;
    return this.loanAppDoc.delete();
  }
}
