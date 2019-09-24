import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';


const routes: Routes = [
  { path: '', component: ProfileFormComponent },
  { path: 'user/:id', component: ProfileDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
