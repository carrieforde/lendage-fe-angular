import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoanAppService } from '../loan-app.service';
import { LoanApp } from '../loan-app';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  loanApps: Observable<LoanApp[]>;
  guid: string;

  constructor(
    private loanAppService: LoanAppService,
    private router: Router
  ) {
    this.loanApps = this.loanAppService.getLoanApps();
  }

  viewApp(id: string) {
    this.router.navigate([`/user/${id}`]);
  }

  addApp() {
    this.guid = this.loanAppService.generateGuid();
    this.loanAppService.addApp(this.guid)
      .then(() => this.router.navigate([`/user/${this.guid}/edit`]));
  }
}
