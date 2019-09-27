import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoanApp } from '../loan-app';
import { LoanAppService } from '../loan-app.service';

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
  loanApp: SubscriptionLike;
  guid: string;

  constructor(
    private loanAppService: LoanAppService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params => this.guid = params.id));
    this.loanApp = this.loanAppService.getLoanApp(this.guid)
      .subscribe(user => {
        const { firstName, lastName, address, city, state, zip, phone, email } = user;

        if (!firstName && !lastName) {
          this.profileForm.reset();
        } else {
          this.profileForm.patchValue({ firstName, lastName, address, city, state, zip, phone, email });
        }
      });
  }

  updateForm() {
    this.loanAppService.updateApp(this.guid, this.profileForm.value);
  }

  submitForm() {
    this.router.navigate([`/user/${this.guid}`]);
  }

  resetForm(form: string) {
    this[form].reset();
    this.router.navigate(['/']);
  }
}
