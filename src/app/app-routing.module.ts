import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { SignupLoginComponent } from './signup-login/signup-login.component';
import { redirectUnauthorizedTo, AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
const redirectLogginInToItems = redirectLoggedInTo(['/']);

const routes: Routes = [
  { path: '', component: SignupLoginComponent },
  { path: 'login', component: SignupLoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLogginInToItems } },
  { path: 'user', component: UserListComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'user/:id', component: ProfileDetailComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'user/:id/edit', component: ProfileFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
