import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const API_URI = 'http://104.154.204.160:8080/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userId: string;
  dataForm = this.fb.group({
    monthlyIncome: [''],
    otherMonthlyIncome: [''],
    rentOrOwn: [''],
    otherMonthlyExpenses: [''],
  });

  constructor(private fb: FormBuilder) { }

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
