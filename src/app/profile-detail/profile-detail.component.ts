import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Profile } from '../profile';
import { Observable } from 'rxjs';
import { LoanAppService } from '../loan-app.service';
import { LoanApp } from '../loan-app';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent {
  guid: string;
  loanApp: Observable<LoanApp>;

  constructor(
    private loanAppService: LoanAppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params => this.guid = params.id));
    this.loanApp = this.loanAppService.getLoanApp(this.guid);
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  editUser(id: string) {
    this.router.navigate([`/user/${id}/edit`]);
  }

  deleteUser() {
    this.loanAppService.deleteApp(this.guid)
      .then(() => this.router.navigate(['/']));
  }
}
