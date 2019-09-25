import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'form', component: ProfileFormComponent },
  { path: 'user/:id', component: ProfileDetailComponent },
  { path: 'user/:id/edit', component: ProfileFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
