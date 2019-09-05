import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const API_URI = 'http://104.154.204.160:8080/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: [''],
    city: [''],
    state: [''],
    zip: [''],
    phone: [''],
    email: ['']
  });
  userId: string;
  dataForm = this.fb.group({
    monthlyIncome: [''],
    otherMonthlyIncome: [''],
    rentOrOwn: [''],
    otherMonthlyExpenses: [''],
  });

  constructor(private fb: FormBuilder) { }

  submitForm() {
    fetch(API_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.profileForm.value)
    })
      .then(res => res.json())
      .then(response => console.log(this.userId = response.id))
      .catch(error => console.error('Error:', error));
  }

  submitData() {
    const { monthlyIncome, otherMonthlyIncome, rentOrOwn, otherMonthlyExpenses } = this.dataForm.value;
    const income = monthlyIncome + otherMonthlyIncome;

    fetch(`${API_URI}/${this.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        income,
        expenses: otherMonthlyExpenses,
        rentOrOwn
      })
    })
      .then(res => res.json())
      .then(response => console.log(response))
      .catch(error => console.error('Error', error));
  }

  resetForm(form: string) {
    this[form].reset();
    this.userId = '';
    window.alert('Form successfully aborted!');
  }
}
