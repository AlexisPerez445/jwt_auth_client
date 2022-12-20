import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {path: '**', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
